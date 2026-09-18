import { NextRequest, NextResponse } from 'next/server';
import { dbService } from '@/lib/server-db';
import {
  checkRateLimit,
  generateAccessToken,
  generateRefreshToken,
  setAuthCookies,
  verifyCaptchaToken,
} from '@/lib/auth-security';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateCheck = checkRateLimit(`register_${ip}`, 8, 15 * 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: 'Too many registration requests. Please wait a few minutes.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const {
      name,
      email,
      password,
      role = 'student',
      department,
      year,
      section,
      college,
      githubUsername,
      careerGoal,
      captchaToken,
      expectedCaptcha,
    } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required.' },
        { status: 400 }
      );
    }

    // CAPTCHA check
    if (expectedCaptcha && !verifyCaptchaToken(captchaToken, expectedCaptcha)) {
      return NextResponse.json(
        { error: 'CAPTCHA verification failed. Please try again.' },
        { status: 400 }
      );
    }

    // Register User & auto-generate Builder Profile
    const result = dbService.registerUser(name, email, role, password, {
      department,
      year,
      section,
      college,
      githubUsername,
      careerGoal,
    });

    const authUser = {
      id: result.user.id,
      name: result.user.name,
      email: result.user.email,
      role: result.user.role,
      avatar: result.user.avatar,
      department: department || 'CSE',
      year: year || '1st Year',
      section: section || 'A',
      college: college || 'National Institute of Technology',
      githubUsername: githubUsername || '',
      careerGoal: careerGoal || 'Software Engineer',
      emailVerified: result.user.isEmailVerified,
    };

    // Generate Tokens
    const accessToken = await generateAccessToken(authUser);
    const refreshToken = await generateRefreshToken(authUser);

    await setAuthCookies(accessToken, refreshToken);

    return NextResponse.json({
      success: true,
      message: 'Account created successfully. Builder Profile generated automatically.',
      user: authUser,
      profile: result.profile,
      accessToken,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Registration failed.' },
      { status: 400 }
    );
  }
}
