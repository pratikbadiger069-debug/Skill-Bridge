'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mic,
  Code2,
  MessageSquare,
  FileText,
  FolderGit2,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  Award,
  AlertTriangle,
  Play,
  RotateCcw,
  Star,
  Send,
} from 'lucide-react';

interface InterviewPrepViewProps {
  onOpenMentorDrawer: (prompt?: string) => void;
}

export function InterviewPrepView({ onOpenMentorDrawer }: InterviewPrepViewProps) {
  const [activePrepTab, setActivePrepTab] = useState<'technical' | 'behavioral' | 'mock' | 'resume' | 'portfolio'>('technical');
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

  // Behavioral response simulation state
  const [behavioralAnswer, setBehavioralAnswer] = useState('');
  const [behavioralScore, setBehavioralScore] = useState<any>(null);
  const [isScoringBehavioral, setIsScoringBehavioral] = useState(false);

  const TECHNICAL_QUESTIONS = [
    {
      id: 'tech-1',
      category: 'Spring Boot & Java',
      question: 'Explain Spring Bean Scopes and how Spring handles Singleton beans in a multi-threaded web application environment.',
      difficulty: 'Intermediate',
      keyAnswer: 'Spring Singleton beans are shared across the application context. Spring does NOT automatically make Singleton beans thread-safe; stateful instance variables must be avoided or guarded with thread-local variables.',
      codeSnippet: `@Service\npublic class OrderService {\n    // GOOD: Stateless dependency\n    private final OrderRepository orderRepository;\n\n    // BAD: Shared mutable state in Singleton bean\n    // private List<Order> cachedOrders = new ArrayList<>(); \n}`,
    },
    {
      id: 'tech-2',
      category: 'System Design',
      question: 'How would you prevent the Cache Stampede (Thundering Herd) problem when a hot Redis cache key expires?',
      difficulty: 'Advanced',
      keyAnswer: 'Use Mutex Locking (Distributed Lock with Redis Redlock), Probabilistic Early Expiration (XFetch algorithm), or Background Async Refresh before TTL expires.',
    },
    {
      id: 'tech-3',
      category: 'Docker & DevOps',
      question: 'What is the difference between ENTRYPOINT and CMD in a Dockerfile, and how do they work together?',
      difficulty: 'Intermediate',
      keyAnswer: 'ENTRYPOINT sets the default executable for the container (e.g., java -jar app.jar), while CMD sets default arguments that can be easily overridden at docker run.',
    },
  ];

  const BEHAVIORAL_QUESTIONS = [
    {
      id: 'beh-1',
      title: 'STAR Method: Conflict & Technical Disagreement',
      scenario: 'Describe a situation where you disagreed with a teammate on system architecture or database design. How did you resolve it?',
      starGuide: {
        S: 'Situation: Context of the project & team setup',
        T: 'Task: The specific design disagreement (e.g. SQL vs NoSQL)',
        A: 'Action: Benchmarked performance, gathered empirical metrics, discussed trade-offs',
        R: 'Result: Data-driven decision, team alignment, successful launch',
      },
    },
    {
      id: 'beh-2',
      title: 'STAR Method: Production Failure / High Pressure',
      scenario: 'Tell me about a time a project failed or encountered a major bug in production. What did you learn?',
      starGuide: {
        S: 'Situation: Critical bug or memory leak identified during user testing',
        T: 'Task: Identify root cause without causing data loss',
        A: 'Action: Inspected heap dump logs, applied patch, added automated regression test',
        R: 'Result: Restored service in <30 mins, documented post-mortem',
      },
    },
  ];

  const handleScoreBehavioral = () => {
    if (!behavioralAnswer.trim()) return;
    setIsScoringBehavioral(true);
    setTimeout(() => {
      setBehavioralScore({
        score: 88,
        strengths: ['Clear Situation framing', 'Empirical Action steps highlighted'],
        improvements: ['Include quantitative Result metrics (e.g. % improvement or time saved)'],
      });
      setIsScoringBehavioral(false);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Header & Sub-Navigation Tabs */}
      <div className="bg-white rounded-2xl p-5 border border-[#E8E5DD] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Mic className="w-5 h-5 text-[#C76A2A]" />
              <h2 className="text-lg font-bold text-[#1B1B1B]">Interview Preparation Suite</h2>
            </div>
            <p className="text-xs text-[#575653] mt-0.5">
              Practice technical questions, behavioral STAR scenarios, live mock interviews, and review your resume/portfolio.
            </p>
          </div>

          <button
            onClick={() => onOpenMentorDrawer("Simulate a 10-minute technical interview for Backend Engineer role")}
            className="py-2 px-4 rounded-xl bg-[#1B1B1B] hover:bg-[#333] text-white text-xs font-semibold flex items-center gap-2 transition-colors shrink-0"
          >
            <Sparkles className="w-4 h-4 text-[#C76A2A]" />
            <span>Launch Live AI Interview</span>
          </button>
        </div>

        {/* 5 Sub-Module Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#F0ECE1]">
          {[
            { id: 'technical', label: 'Technical Questions', icon: Code2 },
            { id: 'behavioral', label: 'Behavioral Questions', icon: MessageSquare },
            { id: 'mock', label: 'Mock Interviews', icon: Mic },
            { id: 'resume', label: 'Resume Review', icon: FileText },
            { id: 'portfolio', label: 'Portfolio Review', icon: FolderGit2 },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activePrepTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActivePrepTab(tab.id as any)}
                className={`flex items-center gap-1.5 py-1.5 px-3.5 rounded-xl text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-[#1B1B1B] text-white shadow-xs'
                    : 'bg-[#FAF8F5] text-[#575653] border border-[#E8E5DD] hover:border-[#1B1B1B]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#C76A2A]' : ''}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sub-Tab 1: Technical Questions */}
      {activePrepTab === 'technical' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-[#787774] px-1 font-mono">
            <span>Core Role Questions: Backend Engineer</span>
            <span>3 Practice Questions Loaded</span>
          </div>

          <div className="space-y-3">
            {TECHNICAL_QUESTIONS.map((q) => {
              const isOpen = expandedQuestion === q.id;
              return (
                <div key={q.id} className="bg-white rounded-2xl p-4 border border-[#E8E5DD] shadow-xs space-y-3">
                  <div
                    onClick={() => setExpandedQuestion(isOpen ? null : q.id)}
                    className="flex items-start justify-between cursor-pointer gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-amber-100 text-amber-800 font-semibold">
                          {q.category}
                        </span>
                        <span className="text-[10px] text-[#787774] font-medium">{q.difficulty}</span>
                      </div>
                      <h4 className="text-sm font-bold text-[#1B1B1B]">{q.question}</h4>
                    </div>

                    <div className="p-1 rounded-lg bg-[#FAF8F5] text-[#787774]">
                      <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </div>
                  </div>

                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="pt-3 border-t border-[#F0ECE1] space-y-3 text-xs"
                    >
                      <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200 text-[#1B1B1B]">
                        <span className="font-bold text-emerald-800 block mb-1">Mentor Key Answer Breakdown:</span>
                        <p className="text-[#575653] leading-relaxed">{q.keyAnswer}</p>
                      </div>

                      {q.codeSnippet && (
                        <div className="bg-[#1B1B1B] text-[#D4D4D4] p-3 rounded-xl font-mono text-[11px] overflow-x-auto">
                          <pre>{q.codeSnippet}</pre>
                        </div>
                      )}

                      <div className="flex justify-end">
                        <button
                          onClick={() => onOpenMentorDrawer(`Explain the answer to "${q.question}" in detail with code examples`)}
                          className="text-xs font-bold text-[#C76A2A] hover:underline flex items-center gap-1"
                        >
                          <span>Ask Mentor for Deep Explanation</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Sub-Tab 2: Behavioral Questions */}
      {activePrepTab === 'behavioral' && (
        <div className="bg-white rounded-2xl p-5 border border-[#E8E5DD] shadow-xs space-y-5">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-[#1B1B1B]">STAR Framework Behavioral Evaluator</h3>
            <p className="text-xs text-[#575653]">
              Type your practice response to the scenario below and receive instant AI Mentor feedback.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E5DD] space-y-3">
            <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-blue-100 text-blue-800 font-bold">
              {BEHAVIORAL_QUESTIONS[0].title}
            </span>
            <h4 className="text-sm font-bold text-[#1B1B1B]">{BEHAVIORAL_QUESTIONS[0].scenario}</h4>

            {/* STAR guide breakdown */}
            <div className="grid sm:grid-cols-2 gap-2 text-[11px] text-[#575653] pt-1">
              <div className="bg-white p-2 rounded border border-[#E8E5DD]">{BEHAVIORAL_QUESTIONS[0].starGuide.S}</div>
              <div className="bg-white p-2 rounded border border-[#E8E5DD]">{BEHAVIORAL_QUESTIONS[0].starGuide.T}</div>
              <div className="bg-white p-2 rounded border border-[#E8E5DD]">{BEHAVIORAL_QUESTIONS[0].starGuide.A}</div>
              <div className="bg-white p-2 rounded border border-[#E8E5DD]">{BEHAVIORAL_QUESTIONS[0].starGuide.R}</div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-[#1B1B1B] block">Your Practice Answer:</label>
            <textarea
              value={behavioralAnswer}
              onChange={(e) => setBehavioralAnswer(e.target.value)}
              placeholder="In my previous project, we had a debate on choosing PostgreSQL vs Redis for caching..."
              rows={4}
              className="w-full p-3 rounded-xl border border-[#DCD6C9] focus:outline-none focus:border-[#C76A2A] text-xs font-sans"
            />

            <button
              onClick={handleScoreBehavioral}
              disabled={isScoringBehavioral || !behavioralAnswer.trim()}
              className="py-2.5 px-5 rounded-xl bg-[#1B1B1B] hover:bg-[#333] text-white text-xs font-bold flex items-center gap-2 transition-colors disabled:opacity-50"
            >
              {isScoringBehavioral ? (
                <span>Scoring Response...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#C76A2A]" />
                  <span>Evaluate Response with AI Mentor</span>
                </>
              )}
            </button>
          </div>

          {behavioralScore && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-900">AI Mentor Rubric Score</span>
                <span className="text-sm font-bold font-mono text-emerald-800">{behavioralScore.score} / 100</span>
              </div>
              <div className="text-xs text-emerald-800 space-y-1">
                <div>✓ Strengths: {behavioralScore.strengths.join(', ')}</div>
                <div>💡 Improvement Tip: {behavioralScore.improvements.join(', ')}</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Sub-Tab 3: Mock Interviews */}
      {activePrepTab === 'mock' && (
        <div className="bg-white rounded-2xl p-5 border border-[#E8E5DD] shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-[#1B1B1B]">Live Mock Interview Simulator</h3>
              <p className="text-xs text-[#575653]">
                Simulate realistic 15-minute technical screening rounds with live AI mentor prompts.
              </p>
            </div>
            <button
              onClick={() => onOpenMentorDrawer("Start a live 15-minute Backend Mock Interview now")}
              className="py-2.5 px-5 rounded-xl bg-[#C76A2A] hover:bg-[#b05b22] text-white text-xs font-bold flex items-center gap-2 transition-colors"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Start Live Simulation</span>
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-[#E8E5DD] bg-[#FAF8F5] space-y-2">
              <h4 className="text-xs font-bold text-[#1B1B1B]">Backend Technical Screening</h4>
              <p className="text-[11px] text-[#575653]">Java, Spring Boot, REST APIs, SQL indexing & Docker CLI.</p>
              <span className="text-[10px] font-mono text-[#787774] block">Duration: 15 Mins</span>
            </div>
            <div className="p-4 rounded-xl border border-[#E8E5DD] bg-[#FAF8F5] space-y-2">
              <h4 className="text-xs font-bold text-[#1B1B1B]">System Design Architecture</h4>
              <p className="text-[11px] text-[#575653]">High-load URL Shortener, Rate Limiter & Distributed Caching.</p>
              <span className="text-[10px] font-mono text-[#787774] block">Duration: 25 Mins</span>
            </div>
            <div className="p-4 rounded-xl border border-[#E8E5DD] bg-[#FAF8F5] space-y-2">
              <h4 className="text-xs font-bold text-[#1B1B1B]">Behavioral & Leadership</h4>
              <p className="text-[11px] text-[#575653]">STAR framework, teamwork, handling failure under deadline pressure.</p>
              <span className="text-[10px] font-mono text-[#787774] block">Duration: 10 Mins</span>
            </div>
          </div>
        </div>
      )}

      {/* Sub-Tab 4: Resume Review */}
      {activePrepTab === 'resume' && (
        <div className="bg-white rounded-2xl p-5 border border-[#E8E5DD] shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-3">
            <div>
              <h3 className="text-base font-bold text-[#1B1B1B]">Resume ATS & Impact Review</h3>
              <p className="text-xs text-[#575653]">AI diagnostic of your target role keyword alignment and bullet impact.</p>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold font-mono text-emerald-700">84 / 100</div>
              <span className="text-[10px] font-semibold text-emerald-600">ATS Compatible</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-2">
              <h4 className="text-xs font-bold text-emerald-900">Strong Points Identified</h4>
              <ul className="text-xs text-emerald-800 space-y-1">
                <li>✓ Clear quantified impact: "Reduced API latency by 35% using Redis caching"</li>
                <li>✓ Verified Builder Score and GitHub profile link included</li>
                <li>✓ Java 21 & Spring Boot 3 tech stack highlighted</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 space-y-2">
              <h4 className="text-xs font-bold text-amber-900">Missing Keywords for Backend Role</h4>
              <ul className="text-xs text-amber-800 space-y-1">
                <li>⚠️ Docker & Containerization (Add Dockerfile multi-stage build experience)</li>
                <li>⚠️ CI/CD Pipelines (Mention GitHub Actions automated workflows)</li>
                <li>⚠️ Unit Testing (Mention JUnit 5 & Mockito test coverage %)</li>
              </ul>
            </div>
          </div>

          <button
            onClick={() => onOpenMentorDrawer("Audit my full resume and rewrite my bullet points for SDE-1 Backend role")}
            className="w-full py-2.5 px-4 rounded-xl bg-[#1B1B1B] hover:bg-[#333] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <Sparkles className="w-4 h-4 text-[#C76A2A]" />
            <span>Ask Mentor to Rewrite Resume Bullets</span>
          </button>
        </div>
      )}

      {/* Sub-Tab 5: Portfolio Review */}
      {activePrepTab === 'portfolio' && (
        <div className="bg-white rounded-2xl p-5 border border-[#E8E5DD] shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-3">
            <div>
              <h3 className="text-base font-bold text-[#1B1B1B]">GitHub & Portfolio Showcase Audit</h3>
              <p className="text-xs text-[#575653]">Evaluation of public repository quality, README documentation & deployment links.</p>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold font-mono text-[#C76A2A]">88 / 100</div>
              <span className="text-[10px] font-semibold text-[#C76A2A]">Portfolio Score</span>
            </div>
          </div>

          <div className="space-y-3 text-xs text-[#575653]">
            <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E5DD] flex items-center justify-between">
              <div>
                <span className="font-bold text-[#1B1B1B]">SkillBridge Mentorship Engine Repo</span>
                <p className="text-[11px] text-[#787774]">Next.js, TypeScript, Tailwind, Zustand, Prisma</p>
              </div>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-100 text-emerald-800">Grade: A+</span>
            </div>

            <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E5DD] flex items-center justify-between">
              <div>
                <span className="font-bold text-[#1B1B1B]">Microservice Order API Repo</span>
                <p className="text-[11px] text-[#787774]">Missing Architecture Diagram image in README.md</p>
              </div>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-amber-100 text-amber-800">Grade: B+</span>
            </div>
          </div>

          <button
            onClick={() => onOpenMentorDrawer("Generate a professional README.md template for my Java Spring Boot project")}
            className="w-full py-2.5 px-4 rounded-xl bg-[#1B1B1B] hover:bg-[#333] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <Sparkles className="w-4 h-4 text-[#C76A2A]" />
            <span>Generate Professional README Template</span>
          </button>
        </div>
      )}
    </div>
  );
}
