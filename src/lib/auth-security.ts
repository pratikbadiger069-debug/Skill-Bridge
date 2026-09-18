import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { AuthUser, UserRole } from '@/types';

// JWT Secret Key configuration
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'zero_skillbridge_production_auth_secret_key_2026_verifiable_jwt'
);

const ACCESS_TOKEN_EXPIRY = '15m';
const REFRESH_TOKEN_EXPIRY = '7d';

// ============================================
// RATE LIMITING & BRUTE FORCE LOCKOUT ENGINE
// ============================================

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

interface LockoutRecord {
  attempts: number;
  lockoutUntil: number | null;
}

const rateLimitStore = new Map<string, RateLimitRecord>();
const lockoutStore = new Map<string, LockoutRecord>();

/**
 * Check and increment rate limiting for an identifier (IP address or email)
 */
export function checkRateLimit(
  identifier: string,
  maxRequests: number = 10,
  windowMs: number = 15 * 60 * 1000
): { allowed: boolean; remaining: number; resetTimeMs: number } {
  const now = Date.now();
  const record = rateLimitStore.get(identifier);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(identifier, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1, resetTimeMs: now + windowMs };
  }

  if (record.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetTimeMs: record.resetTime };
  }

  record.count += 1;
  return { allowed: true, remaining: maxRequests - record.count, resetTimeMs: record.resetTime };
}

/**
 * Check if an account/email is locked out due to brute force attempts
 */
export function checkBruteForceLockout(email: string): { locked: boolean; timeRemainingMs: number } {
  const now = Date.now();
  const record = lockoutStore.get(email.toLowerCase());

  if (record && record.lockoutUntil && now < record.lockoutUntil) {
    return { locked: true, timeRemainingMs: record.lockoutUntil - now };
  }

  if (record && record.lockoutUntil && now >= record.lockoutUntil) {
    // Reset lockout window
    lockoutStore.delete(email.toLowerCase());
  }

  return { locked: false, timeRemainingMs: 0 };
}

/**
 * Record a failed login attempt for brute force protection
 */
export function recordFailedLogin(email: string, maxAttempts: number = 5, lockoutMs: number = 15 * 60 * 1000): { isNowLocked: boolean; attemptsLeft: number } {
  const key = email.toLowerCase();
  const now = Date.now();
  const record = lockoutStore.get(key) || { attempts: 0, lockoutUntil: null };

  record.attempts += 1;

  if (record.attempts >= maxAttempts) {
    record.lockoutUntil = now + lockoutMs;
    lockoutStore.set(key, record);
    return { isNowLocked: true, attemptsLeft: 0 };
  }

  lockoutStore.set(key, record);
  return { isNowLocked: false, attemptsLeft: maxAttempts - record.attempts };
}

/**
 * Reset failed attempts on successful login
 */
export function clearFailedLogins(email: string): void {
  lockoutStore.delete(email.toLowerCase());
}

// ============================================
// PASSWORD HASHING
// ============================================

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

// ============================================
// JWT TOKEN MANAGEMENT
// ============================================

export async function generateAccessToken(user: AuthUser): Promise<string> {
  return await new SignJWT({
    sub: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    department: user.department,
    year: user.year,
    college: user.college,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(ACCESS_TOKEN_EXPIRY)
    .sign(JWT_SECRET);
}

export async function generateRefreshToken(user: AuthUser): Promise<string> {
  return await new SignJWT({
    sub: user.id,
    email: user.email,
    role: user.role,
    tokenType: 'refresh',
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(REFRESH_TOKEN_EXPIRY)
    .sign(JWT_SECRET);
}

export async function verifyJWT(token: string): Promise<any | null> {
  try {
    const verified = await jwtVerify(token, JWT_SECRET);
    return verified.payload;
  } catch {
    return null;
  }
}

// ============================================
// COOKIE SESSION STORAGE
// ============================================

export async function setAuthCookies(accessToken: string, refreshToken: string) {
  const cookieStore = await cookies();

  cookieStore.set('sb_access_token', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 15 * 60, // 15 minutes
  });

  cookieStore.set('sb_refresh_token', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });
}

export async function clearAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.delete('sb_access_token');
  cookieStore.delete('sb_refresh_token');
}

export async function getAuthSession(): Promise<AuthUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('sb_access_token')?.value;

    if (!token) return null;

    const payload = await verifyJWT(token);
    if (!payload) return null;

    return {
      id: payload.sub as string,
      email: payload.email as string,
      name: payload.name as string,
      role: payload.role as UserRole,
      department: payload.department as string,
      year: payload.year as string,
      college: payload.college as string,
    };
  } catch {
    return null;
  }
}

// ============================================
// CAPTCHA VERIFICATION
// ============================================

export function verifyCaptchaToken(userAnswer: string, expectedAnswer: string): boolean {
  if (!userAnswer || !expectedAnswer) return false;
  return userAnswer.trim().toLowerCase() === expectedAnswer.trim().toLowerCase();
}
