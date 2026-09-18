'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PaperCard } from '@/components/ui/PaperCard';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Mail, ArrowRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage('Please enter your account email address.');
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'request', email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setLoading(false);
      setSubmitted(true);
    } catch (err: any) {
      setLoading(false);
      setErrorMessage(err.message || 'Unable to issue recovery request.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F4EE] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-body text-[#1B1B1B]">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="sm:mx-auto sm:w-full sm:max-w-md"
      >
        <Link href="/" className="flex items-center justify-center gap-3 mb-6 group">
          <div className="w-10 h-10 rounded-2xl bg-[#1B1B1B] text-white flex items-center justify-center font-heading font-bold text-base shadow-xs group-hover:bg-[#C76A2A] transition-colors">
            0×
          </div>
          <div className="flex flex-col text-left">
            <span className="font-heading font-bold text-[#1B1B1B] text-lg leading-tight">
              ZERO × SkillBridge
            </span>
            <span className="text-[11px] text-[#6F6A60] font-semibold uppercase tracking-wider">
              Account Recovery
            </span>
          </div>
        </Link>

        <h2 className="text-center font-heading text-2xl font-bold text-[#1B1B1B] tracking-tight">
          Forgot Your Password?
        </h2>
        <p className="mt-1 text-center text-xs text-[#6F6A60]">
          Enter your email to receive recovery instructions.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0.05 }}
        className="mt-6 sm:mx-auto sm:w-full sm:max-w-md"
      >
        <PaperCard padding="lg" className="space-y-5">
          {errorMessage && (
            <div className="p-3 bg-[#C2410C]/10 border border-[#C2410C]/20 rounded-xl flex items-start gap-2.5 text-xs text-[#C2410C]">
              <AlertCircle className="w-4 h-4 text-[#C2410C] shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {submitted ? (
            <div className="space-y-4 text-center py-4">
              <div className="w-12 h-12 rounded-2xl bg-[#2F7A45]/10 border border-[#2F7A45]/20 text-[#2F7A45] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-base text-[#1B1B1B]">Recovery Email Sent</h3>
              <p className="text-xs text-[#6F6A60] leading-relaxed">
                If an account exists for <strong>{email}</strong>, password reset instructions have been dispatched.
              </p>
              <Button variant="secondary" size="md" fullWidth onClick={() => setSubmitted(false)}>
                Try another email
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Registered Email Address"
                type="email"
                placeholder="name@university.edu"
                icon={Mail}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Button type="submit" variant="primary" fullWidth size="md" disabled={loading}>
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Issuing Recovery Token...</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <span>Send Reset Instructions</span>
                    <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </form>
          )}

          <div className="text-center border-t border-[#E8E5DD] pt-4">
            <Link href="/login" className="text-xs font-semibold text-[#6F6A60] hover:text-[#1B1B1B]">
              ← Back to Sign In
            </Link>
          </div>
        </PaperCard>
      </motion.div>
    </div>
  );
}
