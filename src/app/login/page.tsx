'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { UserRole } from '@/types';
import { Captcha } from '@/components/auth/Captcha';
import { PaperCard } from '@/components/ui/PaperCard';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import {
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Loader2,
  GraduationCap,
  Building2,
  Briefcase,
  Sparkles,
} from 'lucide-react';

function GoogleIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.04 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  );
}

function GithubIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const { loginUser, loginWithGoogle, loginWithGitHub } = useAppStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [captchaToken, setCaptchaToken] = useState('');
  const [expectedCaptcha, setExpectedCaptcha] = useState('');
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<'google' | 'github' | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCaptchaVerify = (userAns: string, expectedAns: string) => {
    setCaptchaToken(userAns);
    setExpectedCaptcha(expectedAns);
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Please enter both email address and password.');
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          role,
          captchaToken,
          expectedCaptcha,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      await loginUser(email, role, password);
      setLoading(false);

      const state = useAppStore.getState();
      if (role === 'student' && !state.studentProfile?.onboardingCompleted) {
        router.push('/onboarding');
      } else {
        router.push(`/${role === 'faculty' ? 'faculty' : role === 'admin' ? 'admin' : 'student'}`);
      }
    } catch (err: any) {
      setLoading(false);
      setErrorMessage(err.message || 'Invalid credentials. Please verify your email and password.');
    }
  };

  const handleGoogleLogin = async () => {
    setOauthLoading('google');
    setErrorMessage(null);
    try {
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name: 'Alex Rivera' }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      await loginWithGoogle(data.googleData.email, data.googleData.name);
      setOauthLoading(null);
      router.push('/student');
    } catch (err: any) {
      setOauthLoading(null);
      setErrorMessage(err.message || 'Google OAuth failed.');
    }
  };

  const handleGithubLogin = async () => {
    setOauthLoading('github');
    setErrorMessage(null);
    try {
      const res = await fetch('/api/auth/github', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'alex-dev-builder' }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      await loginWithGitHub('alex-dev-builder');
      setOauthLoading(null);
      router.push('/student');
    } catch (err: any) {
      setOauthLoading(null);
      setErrorMessage(err.message || 'GitHub OAuth failed.');
    }
  };

  const handleQuickFill = (demoEmail: string, demoRole: UserRole, demoPass: string) => {
    setEmail(demoEmail);
    setRole(demoRole);
    setPassword(demoPass);
  };

  return (
    <div className="min-h-screen bg-[#F6F4EE] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-body text-[#1B1B1B]">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="sm:mx-auto sm:w-full sm:max-w-md"
      >
        {/* Brand Header */}
        <Link href="/" className="flex items-center justify-center gap-3 mb-6 group">
          <div className="w-10 h-10 rounded-2xl bg-[#1B1B1B] text-white flex items-center justify-center font-heading font-bold text-base shadow-xs group-hover:bg-[#C76A2A] transition-colors">
            0×
          </div>
          <div className="flex flex-col text-left">
            <span className="font-heading font-bold text-[#1B1B1B] text-lg leading-tight">
              ZERO × SkillBridge
            </span>
            <span className="text-[11px] text-[#6F6A60] font-semibold uppercase tracking-wider">
              Production OS
            </span>
          </div>
        </Link>

        <h2 className="text-center font-heading text-2xl font-bold text-[#1B1B1B] tracking-tight">
          Sign in to Workspace
        </h2>
        <p className="mt-1 text-center text-xs text-[#6F6A60]">
          Or{' '}
          <Link href="/register" className="font-semibold text-[#C76A2A] hover:underline">
            create a fresh student builder account
          </Link>
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0.05 }}
        className="mt-6 sm:mx-auto sm:w-full sm:max-w-md"
      >
        <PaperCard padding="lg" className="space-y-5">
          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3 bg-[#C2410C]/10 border border-[#C2410C]/20 rounded-xl flex items-start gap-2.5 text-xs text-[#C2410C]">
              <AlertCircle className="w-4 h-4 text-[#C2410C] shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Social OAuth Buttons */}
          <div className="space-y-2.5">
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={oauthLoading !== null || loading}
              className="w-full py-2.5 px-4 bg-white border border-[#E8E5DD] hover:border-[#1B1B1B] text-[#1B1B1B] rounded-xl text-xs font-semibold flex items-center justify-center gap-2.5 transition-all duration-150 cursor-pointer disabled:opacity-50"
            >
              {oauthLoading === 'google' ? (
                <Loader2 className="w-4 h-4 animate-spin text-[#C76A2A]" />
              ) : (
                <GoogleIcon className="w-4 h-4" />
              )}
              <span>Continue with Google</span>
            </button>

            <button
              type="button"
              onClick={handleGithubLogin}
              disabled={oauthLoading !== null || loading}
              className="w-full py-2.5 px-4 bg-[#1B1B1B] hover:bg-[#2B2B2B] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2.5 transition-all duration-150 cursor-pointer disabled:opacity-50"
            >
              {oauthLoading === 'github' ? (
                <Loader2 className="w-4 h-4 animate-spin text-white" />
              ) : (
                <GithubIcon className="w-4 h-4 text-white" />
              )}
              <span>Continue with GitHub</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="border-t border-[#E8E5DD] w-full" />
            <span className="bg-white px-3 text-[10px] text-[#6F6A60] uppercase font-mono tracking-wider shrink-0">
              or select portal role
            </span>
          </div>

          {/* User Type Tabs (Student, Faculty, Admin, Recruiter, Institution) */}
          <div className="space-y-1.5">
            <div className="grid grid-cols-5 gap-1 p-1 bg-[#F6F4EE] rounded-xl border border-[#E8E5DD] text-center">
              {[
                { id: 'student', label: 'Student' },
                { id: 'faculty', label: 'Faculty' },
                { id: 'admin', label: 'Admin' },
                { id: 'recruiter', label: 'Recruiter' },
                { id: 'institution', label: 'Institute' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setRole(t.id as UserRole)}
                  className={`py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-150 ${
                    role === t.id
                      ? 'bg-[#1B1B1B] text-white shadow-xs'
                      : 'text-[#6F6A60] hover:text-[#1B1B1B]'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Email Login Form */}
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="name@university.edu"
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-[#1B1B1B]">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-[11px] font-semibold text-[#C76A2A] hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <Input
                type="password"
                placeholder="••••••••"
                icon={Lock}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Interactive CAPTCHA Component */}
            <Captcha onVerify={handleCaptchaVerify} />

            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="md"
              disabled={loading || oauthLoading !== null}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <span>Sign In as {role.toUpperCase()}</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>

          {/* Quick Demo Credentials */}
          <div className="p-3.5 bg-[#F6F4EE] rounded-2xl border border-[#E8E5DD] space-y-2">
            <div className="flex items-center justify-between text-[11px] font-bold text-[#1B1B1B]">
              <span>Quick-Fill Seed Credentials</span>
              <span className="text-[10px] text-[#6F6A60] font-mono">PW: Demo1234!</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5 pt-1">
              <button
                type="button"
                onClick={() => handleQuickFill('demo.student@stanford.edu', 'student', 'Demo1234!')}
                className="py-1 px-2 text-[10px] font-semibold bg-white border border-[#E8E5DD] text-[#1B1B1B] rounded-lg hover:border-[#1B1B1B] text-center truncate cursor-pointer"
              >
                🎓 Student
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('demo.institute@stanford.edu', 'faculty', 'Demo1234!')}
                className="py-1 px-2 text-[10px] font-semibold bg-white border border-[#E8E5DD] text-[#1B1B1B] rounded-lg hover:border-[#1B1B1B] text-center truncate cursor-pointer"
              >
                🏛️ Faculty
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('admin@skillbridge.io', 'admin', 'Admin2026!')}
                className="py-1 px-2 text-[10px] font-semibold bg-white border border-[#E8E5DD] text-[#1B1B1B] rounded-lg hover:border-[#1B1B1B] text-center truncate cursor-pointer"
              >
                🛡️ Admin
              </button>
            </div>
          </div>
        </PaperCard>
      </motion.div>
    </div>
  );
}
