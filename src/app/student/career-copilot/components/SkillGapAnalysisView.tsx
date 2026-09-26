'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Cpu,
  BookOpen,
  FolderGit2,
  Code2,
  FileCheck2,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

interface SkillGapAnalysisViewProps {
  onOpenMentorDrawer: (prompt?: string) => void;
}

export function SkillGapAnalysisView({ onOpenMentorDrawer }: SkillGapAnalysisViewProps) {
  const [activeSkillId, setActiveSkillId] = useState<string>('springboot');
  const [activePathwayTab, setActivePathwayTab] = useState<'learn' | 'build' | 'practice' | 'assess'>('learn');

  // Exact prompt values: Java 82%, Spring Boot 22%, Docker 10% + complimentary skills
  const SKILLS_DATA = [
    {
      id: 'java',
      name: 'Java Core',
      score: 82,
      category: 'Languages',
      status: 'Strong Foundation',
      statusColor: 'text-emerald-700 bg-emerald-100 border-emerald-300',
      description: 'Solid understanding of OOP principles, Generics, Stream API, and Collections framework.',
      learn: [
        'Advanced Java Concurrency & `CompletableFuture` asynchronous programming',
        'JVM Memory Management, Garbage Collectors (G1, ZGC), and Heap Tuning',
        'Java 21 Virtual Threads & Structured Concurrency',
      ],
      build: [
        'Build a Multi-Threaded In-Memory Key-Value Store with LRU Eviction',
        'Implement custom ThreadPoolExecutor with bounding queue and rejection handler',
      ],
      practice: [
        'Solve 5 Java Concurrency & Executor Service problems on SkillBridge Practice Hub',
        'Implement Custom Hashmap with linked bucket chaining from scratch',
      ],
      assess: 'Take Java Senior Level Concurrency & JVM Tuning Verification Exam',
    },
    {
      id: 'springboot',
      name: 'Spring Boot',
      score: 22,
      category: 'Frameworks',
      status: 'Critical Skill Gap',
      statusColor: 'text-amber-800 bg-amber-100 border-amber-300',
      description: 'Deficit in Dependency Injection, Spring Bean Scopes, Data JPA, and REST Controllers.',
      learn: [
        'Spring IoC & `@Component` / `@Bean` lifecycle management',
        'Spring Data JPA Repository methods, `@Query` annotations, and N+1 query problem',
        'Spring Security 6 Stateless Authentication with JWT tokens',
      ],
      build: [
        'Build a RESTful Order Management Microservice API with Spring Boot & PostgreSQL',
        'Implement `@ControllerAdvice` global exception handling and DTO mapping',
      ],
      practice: [
        'Solve 4 Spring Boot `@RestController` coding exercises',
        'Write 5 JPA entity mapping unit tests using `@DataJpaTest`',
      ],
      assess: 'Take Spring Boot Core REST Architecture Assessment (Gain +45 XP)',
    },
    {
      id: 'docker',
      name: 'Docker',
      score: 10,
      category: 'DevOps & Infra',
      status: 'Severe Gap',
      statusColor: 'text-rose-800 bg-rose-100 border-rose-300',
      description: 'Required in 88% of Backend job postings. Missing Dockerfile syntax and container network configs.',
      learn: [
        'Dockerfile directives (`FROM`, `RUN`, `COPY`, `ENTRYPOINT`, `CMD`)',
        'Multi-stage Docker builds to reduce Java image size from 800MB to 150MB',
        'Docker Compose networking, environment variables, and persistent volumes',
      ],
      build: [
        'Containerize a multi-service stack: Java API + PostgreSQL + Redis + Nginx Gateway',
        'Write a automated bash script for container health checking and restart',
      ],
      practice: [
        'Complete 6 Docker CLI terminal simulation challenges (`docker build`, `exec`, `logs`, `network`)',
        'Fix 3 broken Dockerfile configuration files in interactive sandbox',
      ],
      assess: 'Take Docker & Containerization Practical Lab Exam (Gain +50 XP)',
    },
    {
      id: 'systemdesign',
      name: 'System Design',
      score: 35,
      category: 'Architecture',
      status: 'Developing',
      statusColor: 'text-blue-800 bg-blue-100 border-blue-300',
      description: 'Foundational understanding of HTTP/REST, but missing caching, queueing, and load balancing design.',
      learn: [
        'Redis Cache-Aside Pattern, TTL, Cache Stampede prevention',
        'Rate Limiting algorithms (Token Bucket, Leaky Bucket, Sliding Window)',
        'Database Sharding vs Partitioning vs Read-Replicas',
      ],
      build: [
        'Build an API Rate Limiter middleware using Redis & Java Filter',
        'Design a Sub-15ms URL Shortener with analytics logging',
      ],
      practice: [
        'Diagram 3 System Design architectures (Notification System, E-Commerce Checkout, Newsfeed)',
        'Calculate QPS and Storage requirements for 10M DAU service',
      ],
      assess: 'Take System Design & Scalability Diagnostic Assessment',
    },
  ];

  const activeSkill = SKILLS_DATA.find((s) => s.id === activeSkillId) || SKILLS_DATA[1];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 border border-[#E8E5DD] shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-[#C76A2A]" />
              <h2 className="text-lg font-bold text-[#1B1B1B]">Skill Gap Analysis Matrix</h2>
            </div>
            <p className="text-xs text-[#575653] mt-0.5">
              Comparative analysis of your current evaluated scores against target role requirements.
            </p>
          </div>

          <button
            onClick={() => onOpenMentorDrawer("Analyze my skill gaps and give me a 1-week action plan")}
            className="py-2 px-4 rounded-xl bg-[#1B1B1B] hover:bg-[#333] text-white text-xs font-semibold flex items-center gap-2 transition-colors shrink-0"
          >
            <Sparkles className="w-4 h-4 text-[#C76A2A]" />
            <span>Ask Mentor Strategy</span>
          </button>
        </div>

        {/* Skill Gauges Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          {SKILLS_DATA.map((skill) => (
            <button
              key={skill.id}
              onClick={() => setActiveSkillId(skill.id)}
              className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden ${
                activeSkillId === skill.id
                  ? 'border-[#C76A2A] bg-white ring-2 ring-[#C76A2A]/20 shadow-xs'
                  : 'border-[#E8E5DD] bg-[#FAF8F5] hover:border-[#1B1B1B]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#1B1B1B]">{skill.name}</span>
                <span className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded border ${skill.statusColor}`}>
                  {skill.score}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-[#F0ECE1] rounded-full overflow-hidden mt-3">
                <div
                  className={`h-full rounded-full transition-all ${
                    skill.score >= 75
                      ? 'bg-emerald-600'
                      : skill.score >= 30
                      ? 'bg-amber-600'
                      : 'bg-rose-600'
                  }`}
                  style={{ width: `${skill.score}%` }}
                />
              </div>

              <div className="text-[10px] text-[#787774] mt-2 font-medium truncate">
                {skill.status}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Skill Detail & 4 Recommendation Pathways */}
      <div className="bg-white rounded-2xl p-5 border border-[#E8E5DD] shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#F0ECE1] pb-4 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-[#1B1B1B]">{activeSkill.name}</span>
              <span className={`px-2.5 py-0.5 text-xs font-mono font-bold rounded-md border ${activeSkill.statusColor}`}>
                Current Score: {activeSkill.score}%
              </span>
            </div>
            <p className="text-xs text-[#575653] mt-1">{activeSkill.description}</p>
          </div>

          {/* 4 Recommendation Action Tabs: Learn, Build, Practice, Assess */}
          <div className="flex items-center gap-1.5 bg-[#FAF8F5] p-1 rounded-xl border border-[#E8E5DD] shrink-0">
            {[
              { id: 'learn', label: 'Learn', icon: BookOpen, color: 'text-blue-600' },
              { id: 'build', label: 'Build', icon: FolderGit2, color: 'text-[#C76A2A]' },
              { id: 'practice', label: 'Practice', icon: Code2, color: 'text-indigo-600' },
              { id: 'assess', label: 'Assess', icon: FileCheck2, color: 'text-emerald-600' },
            ].map((tab) => {
              const Icon = tab.icon;
              const isSelected = activePathwayTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActivePathwayTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-white text-[#1B1B1B] shadow-xs border border-[#E8E5DD]'
                      : 'text-[#787774] hover:text-[#1B1B1B]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${tab.color}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Pane for Selected Pathway */}
        <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E5DD] min-h-[160px]">
          {activePathwayTab === 'learn' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-[#1B1B1B] flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <span>Recommended Learning Modules (Curated Docs & Concept Guides)</span>
                </h4>
                <span className="text-[11px] text-[#787774]">Est: 3-4 Hours</span>
              </div>
              <ul className="space-y-2 text-xs text-[#575653]">
                {activeSkill.learn.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-white p-3 rounded-lg border border-[#E8E5DD]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <span className="font-medium text-[#1B1B1B]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activePathwayTab === 'build' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-[#1B1B1B] flex items-center gap-2">
                  <FolderGit2 className="w-4 h-4 text-[#C76A2A]" />
                  <span>Hands-On Project Builds to Close Gap</span>
                </h4>
                <span className="text-[11px] text-[#787774]">Est: 1-2 Days</span>
              </div>
              <div className="space-y-2">
                {activeSkill.build.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-white p-3 rounded-lg border border-[#E8E5DD]">
                    <span className="text-xs font-medium text-[#1B1B1B]">{item}</span>
                    <button
                      onClick={() => onOpenMentorDrawer(`Guide me on how to build: ${item}`)}
                      className="text-xs font-bold text-[#C76A2A] hover:underline shrink-0"
                    >
                      Build Spec →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activePathwayTab === 'practice' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-[#1B1B1B] flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-indigo-600" />
                  <span>Targeted Coding Exercises & Problem Sets</span>
                </h4>
                <span className="text-[11px] text-[#787774]">Interactive Sandbox</span>
              </div>
              <div className="space-y-2">
                {activeSkill.practice.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-white p-3 rounded-lg border border-[#E8E5DD]">
                    <span className="text-xs font-medium text-[#1B1B1B]">{item}</span>
                    <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                      Practice Hub
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activePathwayTab === 'assess' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-[#1B1B1B] flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-emerald-600" />
                  <span>Skill Verification Exam</span>
                </h4>
                <span className="text-[11px] text-emerald-700 font-bold">+50 XP Reward</span>
              </div>
              <div className="bg-white p-4 rounded-lg border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h5 className="text-xs font-bold text-[#1B1B1B]">{activeSkill.assess}</h5>
                  <p className="text-[11px] text-[#575653] mt-0.5">
                    Passing with 80%+ updates your skill score and boosts placement readiness score.
                  </p>
                </div>
                <button
                  onClick={() => onOpenMentorDrawer(`I want to take the assessment for ${activeSkill.name}`)}
                  className="py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shrink-0 transition-colors"
                >
                  Start Assessment Now
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
