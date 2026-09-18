import { NextRequest, NextResponse } from 'next/server';
import { dbService } from '@/lib/server-db';
import { checkRateLimit } from '@/lib/auth-security';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateCheck = checkRateLimit(`reset_${ip}`, 5, 15 * 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: 'Too many recovery requests. Please try again in 15 minutes.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { action, email, token, newPassword } = body;

    // Action 1: Request Password Reset Link / Token
    if (action === 'request') {
      if (!email) {
        return NextResponse.json({ error: 'Email address is required.' }, { status: 400 });
      }

      const resetToken = dbService.generatePasswordResetToken(email);
      return NextResponse.json({
        success: true,
        message: 'Password recovery instructions issued.',
        resetToken: resetToken || 'mock_reset_token_sent_to_email',
      });
    }

    // Action 2: Reset Password with Token
    if (action === 'reset') {
      if (!email || !token || !newPassword) {
        return NextResponse.json(
          { error: 'Email, token, and new password are required.' },
          { status: 400 }
        );
      }

      const success = dbService.resetPasswordWithToken(email, token, newPassword);
      if (!success) {
        return NextResponse.json(
          { error: 'Invalid or expired password reset token.' },
          { status: 400 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Password reset successfully. You can now log in with your new password.',
      });
    }

    return NextResponse.json({ error: 'Invalid reset action.' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Password reset failed.' }, { status: 500 });
  }
}
