'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { Captcha } from '@/components/auth/Captcha';
import { PaperCard } from '@/components/ui/PaperCard';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import {
  User,
  Mail,
  Lock,
  Building,
  GraduationCap,
  Briefcase,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Loader2,
  Sparkles,
  Layers,
  Award,
} from 'lucide-react';

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

export default function RegisterPage() {
  const router = useRouter();
  const { registerUser } = useAppStore();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    college: '',
    department: 'CSE',
    year: '3rd Year',
    section: 'Section A',
    githubUsername: '',
    careerGoal: 'AI & Full Stack Engineer',
  });

  const [captchaToken, setCaptchaToken] = useState('');
  const [expectedCaptcha, setExpectedCaptcha] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCaptchaVerify = (userAns: string, expectedAns: string) => {
    setCaptchaToken(userAns);
    setExpectedCaptcha(expectedAns);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.college) {
      setErrorMessage('Please fill in all mandatory fields.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: 'student',
          department: formData.department,
          year: formData.year,
          section: formData.section,
          college: formData.college,
          githubUsername: formData.githubUsername,
          careerGoal: formData.careerGoal,
          captchaToken,
          expectedCaptcha,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      await registerUser(formData.name, formData.email, 'student', formData.password);
      setLoading(false);
      router.push('/onboarding');
    } catch (err: any) {
      setLoading(false);
      setErrorMessage(err.message || 'Registration failed. Please check details and try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F4EE] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-body text-[#1B1B1B]">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="sm:mx-auto sm:w-full sm:max-w-xl"
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
              Student Registration
            </span>
          </div>
        </Link>

        <h2 className="text-center font-heading text-2xl font-bold text-[#1B1B1B] tracking-tight">
          Create Your Builder Profile
        </h2>
        <p className="mt-1 text-center text-xs text-[#6F6A60]">
          Already registered?{' '}
          <Link href="/login" className="font-semibold text-[#C76A2A] hover:underline">
            Sign in to your account
          </Link>
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0.05 }}
        className="mt-6 sm:mx-auto sm:w-full sm:max-w-xl"
      >
        <PaperCard padding="lg" className="space-y-6">
          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3 bg-[#C2410C]/10 border border-[#C2410C]/20 rounded-xl flex items-start gap-2.5 text-xs text-[#C2410C]">
              <AlertCircle className="w-4 h-4 text-[#C2410C] shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Step 1: Personal & Account Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-[#E8E5DD] pb-2">
                <Badge variant="accent" size="sm">Step 1</Badge>
                <h3 className="font-heading font-bold text-sm text-[#1B1B1B]">Personal & Account Credentials</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Full Name *"
                  name="name"
                  placeholder="e.g. Alex Rivera"
                  icon={User}
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

                <Input
                  label="Email Address *"
                  name="email"
                  type="email"
                  placeholder="alex@university.edu"
                  icon={Mail}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Password *"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  icon={Lock}
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <Input
                  label="Confirm Password *"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  icon={Lock}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Step 2: Academic Details */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2 border-b border-[#E8E5DD] pb-2">
                <Badge variant="neutral" size="sm">Step 2</Badge>
                <h3 className="font-heading font-bold text-sm text-[#1B1B1B]">Academic Institution Info</h3>
              </div>

              <Input
                label="College / University Name *"
                name="college"
                placeholder="e.g. Hyderabad Institute of Technology and Management (HITAM)"
                icon={Building}
                value={formData.college}
                onChange={handleChange}
                required
              />

              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#1B1B1B]">Department</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full bg-white border border-[#E8E5DD] rounded-xl text-xs text-[#1B1B1B] p-2.5 focus:outline-none focus:border-[#C76A2A]"
                  >
                    <option value="CSE">CSE</option>
                    <option value="IT">IT</option>
                    <option value="ECE">ECE</option>
                    <option value="AIML">AIML</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Mechanical">Mechanical</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#1B1B1B]">Year</label>
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    className="w-full bg-white border border-[#E8E5DD] rounded-xl text-xs text-[#1B1B1B] p-2.5 focus:outline-none focus:border-[#C76A2A]"
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#1B1B1B]">Section</label>
                  <select
                    name="section"
                    value={formData.section}
                    onChange={handleChange}
                    className="w-full bg-white border border-[#E8E5DD] rounded-xl text-xs text-[#1B1B1B] p-2.5 focus:outline-none focus:border-[#C76A2A]"
                  >
                    <option value="Section A">Section A</option>
                    <option value="Section B">Section B</option>
                    <option value="Section C">Section C</option>
                    <option value="Section D">Section D</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 3: Developer & Career Goals */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2 border-b border-[#E8E5DD] pb-2">
                <Badge variant="success" size="sm">Step 3</Badge>
                <h3 className="font-heading font-bold text-sm text-[#1B1B1B]">Builder Profile Setup</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="GitHub Username"
                  name="githubUsername"
                  placeholder="e.g. alexrivera-dev"
                  icon={GithubIcon}
                  value={formData.githubUsername}
                  onChange={handleChange}
                  hint="Used for auto repo & code skill verification"
                />

                <Input
                  label="Career Goal / Target Role"
                  name="careerGoal"
                  placeholder="e.g. AI Engineer, Full Stack"
                  icon={Briefcase}
                  value={formData.careerGoal}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Security CAPTCHA */}
            <Captcha onVerify={handleCaptchaVerify} />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="lg"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Creating Builder Profile & Passport...</span>
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <span>Register & Auto-Generate Builder Passport</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>
        </PaperCard>
      </motion.div>
    </div>
  );
}
