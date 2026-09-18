import { NextRequest, NextResponse } from 'next/server';
import { dbService } from '@/lib/server-db';
import {
  checkRateLimit,
  checkBruteForceLockout,
  recordFailedLogin,
  clearFailedLogins,
  generateAccessToken,
  generateRefreshToken,
  setAuthCookies,
  verifyCaptchaToken,
} from '@/lib/auth-security';
import { loginSchema } from '@/lib/validations';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';

    // 1. IP Rate limiting
    const rateCheck = checkRateLimit(`login_${ip}`, 10, 15 * 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: 'Too many authentication attempts. Please wait 15 minutes.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { email, password, role, captchaToken, expectedCaptcha } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }

    // 2. CAPTCHA verification
    if (expectedCaptcha && !verifyCaptchaToken(captchaToken, expectedCaptcha)) {
      return NextResponse.json({ error: 'CAPTCHA verification failed. Please try again.' }, { status: 400 });
    }

    // 3. Brute Force Account Lockout check
    const lockout = checkBruteForceLockout(email);
    if (lockout.locked) {
      const minutesLeft = Math.ceil(lockout.timeRemainingMs / 60000);
      return NextResponse.json(
        { error: `Account locked due to consecutive failed attempts. Try again in ${minutesLeft} minute(s).` },
        { status: 423 }
      );
    }

    // 4. Authenticate user credentials
    try {
      const result = dbService.loginUser(email, password, role);

      // Reset failed attempt counter on success
      clearFailedLogins(email);

      // Generate Access & Refresh Tokens
      const authUser = {
        id: result.user.id,
        name: result.user.name,
        email: result.user.email,
        role: result.user.role,
        avatar: result.user.avatar,
        emailVerified: result.user.isEmailVerified,
      };

      const accessToken = await generateAccessToken(authUser);
      const refreshToken = await generateRefreshToken(authUser);

      // Set Secure HTTP-Only Cookies
      await setAuthCookies(accessToken, refreshToken);

      return NextResponse.json({
        success: true,
        message: 'Authentication successful',
        user: authUser,
        profile: result.profile,
        accessToken,
      });
    } catch (authErr: any) {
      // Record failed attempt for brute force protection
      const failure = recordFailedLogin(email);

      if (failure.isNowLocked) {
        return NextResponse.json(
          { error: 'Too many failed attempts. Account locked for 15 minutes.' },
          { status: 423 }
        );
      }

      return NextResponse.json(
        { error: authErr.message || 'Invalid credentials.' },
        { status: 401 }
      );
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Authentication error' }, { status: 500 });
  }
}
