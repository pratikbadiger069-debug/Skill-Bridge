'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { PaperCard } from '@/components/ui/PaperCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Sparkles,
  Target,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Briefcase,
  Code2,
  Compass,
  Award,
  ShieldCheck,
  Loader2,
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

export default function OnboardingPage() {
  const router = useRouter();
  const { studentProfile, updateStudentProfile, loginWithGitHub } = useAppStore();

  const [step, setStep] = useState(1); // Steps 1 to 6
  const [selectedGoal, setSelectedGoal] = useState('High-Growth Startup Job');
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['TypeScript', 'React', 'Python']);
  const [careerPath, setCareerPath] = useState('AI & Full Stack Engineer');
  const [githubUser, setGithubUser] = useState(studentProfile?.professional?.githubUrl?.split('/').pop() || 'alex-dev-builder');
  const [isGeneratingPassport, setIsGeneratingPassport] = useState(false);

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleNext = async () => {
    if (step < 6) {
      setStep((prev) => prev + 1);
    } else {
      // Step 6: Generate Builder Passport & Finish
      setIsGeneratingPassport(true);
      try {
        await updateStudentProfile({
          onboardingCompleted: true,
          targetRole: careerPath,
          professional: {
            ...studentProfile?.professional,
            careerGoal: selectedGoal,
            knownSkills: selectedSkills,
            githubUrl: `https://github.com/${githubUser}`,
          },
        });
        setTimeout(() => {
          setIsGeneratingPassport(false);
          router.push('/student');
        }, 1200);
      } catch {
        setIsGeneratingPassport(false);
        router.push('/student');
      }
    }
  };

  const handleBack = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  return (
    <div className="min-h-screen bg-[#F6F4EE] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-body text-[#1B1B1B]">
      <div className="max-w-2xl mx-auto w-full space-y-6">
        {/* Progress Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#1B1B1B] text-white flex items-center justify-center font-heading font-bold text-xs">
              0×
            </div>
            <span className="font-heading font-bold text-sm text-[#1B1B1B]">ZERO × SkillBridge Onboarding</span>
          </div>
          <Badge variant="accent" size="sm">Step {step} of 6</Badge>
        </div>

        {/* Step Progress Bar */}
        <div className="w-full h-1.5 bg-[#E8E5DD] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#C76A2A] rounded-full transition-all duration-300"
            style={{ width: `${(step / 6) * 100}%` }}
          />
        </div>

        {/* Main Wizard Card */}
        <PaperCard padding="lg" className="min-h-[420px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {/* STEP 1: GOAL SELECTION */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4"
              >
                <div className="space-y-1">
                  <h2 className="font-heading text-xl font-bold text-[#1B1B1B]">1. Select Your Primary Goal</h2>
                  <p className="text-xs text-[#6F6A60]">
                    What is your immediate focus for career growth and skill verification?
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {[
                    { id: 'High-Growth Startup Job', title: 'Full-Time Job Placement', desc: 'Secure high-growth engineering roles' },
                    { id: 'Paid Internship', title: 'Paid Industry Internship', desc: 'Build real-world experience while studying' },
                    { id: 'Freelance & Contracting', title: 'Client Project Contracting', desc: 'Monetize verified skill badges' },
                    { id: 'Higher Studies & Research', title: 'Research & Higher Studies', desc: 'Build academic proof of capability' },
                  ].map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setSelectedGoal(g.id)}
                      className={`p-4 rounded-2xl border text-left transition-all duration-150 cursor-pointer ${
                        selectedGoal === g.id
                          ? 'border-[#C76A2A] bg-[#C76A2A]/5'
                          : 'border-[#E8E5DD] bg-white hover:border-[#1B1B1B]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-heading font-bold text-sm text-[#1B1B1B]">{g.title}</span>
                        {selectedGoal === g.id && <CheckCircle2 className="w-4 h-4 text-[#C76A2A]" />}
                      </div>
                      <p className="text-xs text-[#6F6A60]">{g.desc}</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 2: SKILL SELECTION */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4"
              >
                <div className="space-y-1">
                  <h2 className="font-heading text-xl font-bold text-[#1B1B1B]">2. Select Your Current Core Skills</h2>
                  <p className="text-xs text-[#6F6A60]">
                    Select technologies you actively code with. We will initialize your skill verification matrix.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {[
                    'TypeScript', 'Python', 'React', 'Next.js', 'PostgreSQL',
                    'Node.js', 'PyTorch', 'Docker', 'System Design', 'Git',
                    'TailwindCSS', 'GraphQL', 'AWS', 'Rust', 'Go'
                  ].map((skill) => {
                    const isSelected = selectedSkills.includes(skill);
                    return (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => toggleSkill(skill)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all duration-150 cursor-pointer ${
                          isSelected
                            ? 'bg-[#1B1B1B] text-white border-[#1B1B1B]'
                            : 'bg-white text-[#6F6A60] border-[#E8E5DD] hover:border-[#1B1B1B]'
                        }`}
                      >
                        {isSelected ? `✓ ${skill}` : `+ ${skill}`}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 3: CAREER PATH */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4"
              >
                <div className="space-y-1">
                  <h2 className="font-heading text-xl font-bold text-[#1B1B1B]">3. Choose Target Career Path</h2>
                  <p className="text-xs text-[#6F6A60]">
                    Your Career Copilot will personalize daily missions & roadmap tracks based on this selection.
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  {[
                    { title: 'AI & Full Stack Engineer', desc: 'Build generative AI apps, modern React interfaces & scalable backends.' },
                    { title: 'Backend & Distributed Systems Architect', desc: 'Design microservices, high-throughput APIs, databases & cloud infrastructure.' },
                    { title: 'Data Scientist & Machine Learning Specialist', desc: 'Model training, neural architectures, data pipelines & predictive ML.' },
                    { title: 'DevOps & Cloud Native Engineer', desc: 'Kubernetes, CI/CD pipelines, terraform, security & reliability.' },
                  ].map((p) => (
                    <button
                      key={p.title}
                      type="button"
                      onClick={() => setCareerPath(p.title)}
                      className={`w-full p-3.5 rounded-xl border text-left transition-all duration-150 cursor-pointer ${
                        careerPath === p.title
                          ? 'border-[#C76A2A] bg-[#C76A2A]/5'
                          : 'border-[#E8E5DD] bg-white hover:border-[#1B1B1B]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-heading font-bold text-sm text-[#1B1B1B]">{p.title}</span>
                        {careerPath === p.title && <CheckCircle2 className="w-4 h-4 text-[#C76A2A]" />}
                      </div>
                      <p className="text-xs text-[#6F6A60]">{p.desc}</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 4: GITHUB CONNECT */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4"
              >
                <div className="space-y-1">
                  <h2 className="font-heading text-xl font-bold text-[#1B1B1B]">4. Connect GitHub Account</h2>
                  <p className="text-xs text-[#6F6A60]">
                    Verify open source contributions, repositories, commit velocity, and language distribution.
                  </p>
                </div>

                <div className="p-4 bg-[#F6F4EE] border border-[#E8E5DD] rounded-2xl space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#1B1B1B] text-white flex items-center justify-center">
                      <GithubIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-sm text-[#1B1B1B]">GitHub Developer Sync</h4>
                      <p className="text-xs text-[#6F6A60]">Automated deterministic repository evidence scanning</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#1B1B1B]">github.com/</span>
                    <input
                      type="text"
                      value={githubUser}
                      onChange={(e) => setGithubUser(e.target.value)}
                      placeholder="username"
                      className="flex-1 bg-white border border-[#E8E5DD] rounded-xl text-xs p-2 font-mono focus:outline-none focus:border-[#C76A2A]"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 5: ASSESSMENT RECOMMENDATION */}
            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4"
              >
                <div className="space-y-1">
                  <h2 className="font-heading text-xl font-bold text-[#1B1B1B]">5. Recommended Initial Assessment</h2>
                  <p className="text-xs text-[#6F6A60]">
                    We generated a recommended diagnostic 10-Q assessment to establish your starting baseline.
                  </p>
                </div>

                <div className="p-4 bg-white border border-[#E8E5DD] rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="accent">Recommended Baseline</Badge>
                    <span className="text-xs font-mono text-[#6F6A60]">10 Questions • 15 Mins</span>
                  </div>
                  <h3 className="font-heading font-bold text-base text-[#1B1B1B]">
                    {careerPath} Baseline Diagnostic
                  </h3>
                  <p className="text-xs text-[#6F6A60] leading-relaxed">
                    Evaluates core proficiency in {selectedSkills.slice(0, 3).join(', ')} with automated solution analysis.
                  </p>
                </div>
              </motion.div>
            )}

            {/* STEP 6: GENERATE BUILDER PASSPORT */}
            {step === 6 && (
              <motion.div
                key="step6"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4 text-center py-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#1B1B1B] text-[#C76A2A] flex items-center justify-center mx-auto">
                  <Award className="w-6 h-6" />
                </div>

                <div className="space-y-1">
                  <h2 className="font-heading text-2xl font-bold text-[#1B1B1B]">Generate Builder Passport</h2>
                  <p className="text-xs text-[#6F6A60] max-w-md mx-auto">
                    Initialize your verifiable Builder Passport with SHA-256 evidence hashing and initial score calculation.
                  </p>
                </div>

                <div className="p-4 bg-[#F6F4EE] border border-[#E8E5DD] rounded-2xl max-w-md mx-auto space-y-2 text-left">
                  <div className="flex justify-between text-xs font-bold text-[#1B1B1B]">
                    <span>Target Role</span>
                    <span className="text-[#C76A2A]">{careerPath}</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold text-[#1B1B1B]">
                    <span>Initial Score</span>
                    <span className="font-mono text-[#2F7A45]">450 / 1000</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Footer Controls */}
          <div className="pt-4 border-t border-[#E8E5DD] flex items-center justify-between">
            {step > 1 ? (
              <Button type="button" variant="secondary" size="md" onClick={handleBack}>
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </Button>
            ) : <div />}

            <Button
              type="button"
              variant="primary"
              size="md"
              disabled={isGeneratingPassport}
              onClick={handleNext}
            >
              {isGeneratingPassport ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Generating Passport...</span>
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <span>{step === 6 ? 'Generate Passport & Launch Dashboard' : 'Next Step'}</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </div>
        </PaperCard>
      </div>
    </div>
  );
}
