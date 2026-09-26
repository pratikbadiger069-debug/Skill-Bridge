'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Compass,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Layers,
  Code2,
  Server,
  Container,
  Cloud,
  Cpu,
  BookOpen,
  FileCheck2,
  FolderGit2,
  Zap,
  RefreshCw,
} from 'lucide-react';

interface RoadmapEngineViewProps {
  onOpenMentorDrawer: (prompt?: string) => void;
}

export function RoadmapEngineView({ onOpenMentorDrawer }: RoadmapEngineViewProps) {
  const [selectedGoal, setSelectedGoal] = useState('Backend Engineer');
  const [customGoal, setCustomGoal] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeMonth, setActiveMonth] = useState<number>(1);

  const PRESET_GOALS = [
    'Backend Engineer',
    'Full-Stack Developer',
    'AI / Machine Learning Engineer',
    'DevOps & Cloud Engineer',
    'Systems Architect',
  ];

  // Visual Node Chain for Backend Engineer (Matching prompt example: Java -> Spring Boot -> REST APIs -> Microservices -> Docker -> System Design -> Cloud)
  const ROADMAP_NODES = [
    { id: '1', title: 'Java', status: 'completed', score: '82%', icon: Code2, desc: 'OOP, Collections & Concurrency' },
    { id: '2', title: 'Spring Boot', status: 'current', score: '22%', icon: Server, desc: 'Dependency Injection & Data JPA' },
    { id: '3', title: 'REST APIs', status: 'upcoming', score: '65%', icon: Layers, desc: 'HTTP Specifications & OpenAPI' },
    { id: '4', title: 'Microservices', status: 'upcoming', score: '40%', icon: Cpu, desc: 'Spring Cloud & Service Mesh' },
    { id: '5', title: 'Docker', status: 'gap', score: '10%', icon: Container, desc: 'Containerization & Docker Compose' },
    { id: '6', title: 'System Design', status: 'upcoming', score: '35%', icon: Compass, desc: 'Caching, Queues & Load Balancing' },
    { id: '7', title: 'Cloud', status: 'upcoming', score: '15%', icon: Cloud, desc: 'AWS ECS, S3 & IAM Security' },
  ];

  // Month-by-Month Generated Plan
  const MONTHLY_PLAN = [
    {
      month: 1,
      title: 'Month 1: Java Deep-Dive & Core Spring Boot Framework',
      focus: 'Master Dependency Injection, Bean Lifecycle, and `@RestController` endpoints.',
      topics: [
        'Spring IoC Container & `@Autowired` Annotations',
        'Spring Data JPA with PostgreSQL persistence',
        'Exception Handling with `@ControllerAdvice`',
        'JUnit 5 & Mockito Unit Testing for Controllers',
      ],
      handsOnProject: 'RESTful E-Commerce Microservice API (Order & Catalog endpoints)',
      reading: 'Spring in Action (6th Ed) — Chapters 1-4 & Official Spring Guides',
      checkpointQuiz: 'SkillBridge Spring Boot Core Certification (Target: >85%)',
    },
    {
      month: 2,
      title: 'Month 2: Relational Databases, ORM & REST Security',
      focus: 'Design normalized SQL schemas, query optimization, and Spring Security JWT.',
      topics: [
        'PostgreSQL Indexing (B-Tree, Hash) & Execution Plans (`EXPLAIN ANALYZE`)',
        'Spring Security 6 Stateless JWT Filter Chain',
        'Transactional Isolation Levels & `@Transactional` Gotchas',
        'OpenAPI / Swagger 3 Automated API Documentation',
      ],
      handsOnProject: 'Multi-Tenant Authentication & Authorization Microservice',
      reading: 'Designing Data-Intensive Applications — Ch 3 & 7',
      checkpointQuiz: 'Database & Security Verification Test',
    },
    {
      month: 3,
      title: 'Month 3: Microservices Architecture & Event-Driven Systems',
      focus: 'Deconstruct monoliths into independent services using Spring Cloud & Kafka.',
      topics: [
        'Service Discovery with Spring Cloud Eureka',
        'API Gateway routing with Spring Cloud Gateway',
        'Event-Driven Messaging with Apache Kafka / RabbitMQ',
        'Resilience4j Circuit Breaker & Rate Limiter Patterns',
      ],
      handsOnProject: 'Distributed Multi-Service Payment & Notification Pipeline',
      reading: 'Microservices Patterns by Chris Richardson',
      checkpointQuiz: 'Microservices Architecture Assessment',
    },
    {
      month: 4,
      title: 'Month 4: Docker Containerization & CI/CD DevOps Pipelines',
      focus: 'Containerize microservices and build automated build/test pipelines.',
      topics: [
        'Multi-stage Dockerfiles for minimal production images',
        'Docker Compose for multi-container local stack (App, Postgres, Redis, Kafka)',
        'GitHub Actions for automated lint, build, test, and container push',
        'Environment Secret Management & 12-Factor App Principles',
      ],
      handsOnProject: 'Dockerized Local Development Cluster & CI/CD Pipeline',
      reading: 'Docker Deep Dive by Nigel Poulton',
      checkpointQuiz: 'Docker & DevOps Engineering Practical Lab',
    },
    {
      month: 5,
      title: 'Month 5: Distributed System Design & Performance Engineering',
      focus: 'Prepare for high-throughput system design interviews and caching strategies.',
      topics: [
        'Redis Cache-Aside, Write-Through & Eviction Strategies',
        'Consistent Hashing, Load Balancing & Reverse Proxies (Nginx)',
        'Database Sharding, Master-Replica Replication & CQRS Pattern',
        'System Design Mock Case Studies (URL Shortener, Rate Limiter, News Feed)',
      ],
      handsOnProject: 'High-Throughput Redis Rate Limiter & URL Analytics Engine',
      reading: 'System Design Interview – An Insider’s Guide (Vol 1 & 2)',
      checkpointQuiz: 'System Design Interview Readiness Eval',
    },
    {
      month: 6,
      title: 'Month 6: Cloud Deployment & Production Readiness',
      focus: 'Deploy microservices to AWS, setup Prometheus/Grafana, and prepare for interviews.',
      topics: [
        'AWS ECS Fargate / EKS Container Orchestration',
        'Prometheus Metrics Collection & Grafana Telemetry Dashboards',
        'Log Aggregation with ELK / Loki Stack',
        'Mock Interview Screening & Resume Polish',
      ],
      handsOnProject: 'Production-Deployed Cloud Microservice System on AWS',
      reading: 'AWS Certified Developer Study Guide',
      checkpointQuiz: 'Final Career Readiness Verification Assessment',
    },
  ];

  const handleGeneratePlan = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Goal Selector */}
      <div className="bg-white rounded-2xl p-5 border border-[#E8E5DD] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#C76A2A]" />
              <h2 className="text-lg font-bold text-[#1B1B1B]">Career Roadmap Engine</h2>
            </div>
            <p className="text-xs text-[#575653] mt-0.5">
              Select your career goal to generate a personalized, month-by-month execution plan.
            </p>
          </div>

          <button
            onClick={() => onOpenMentorDrawer(`Generate a customized roadmap for my goal: ${selectedGoal}`)}
            className="py-2 px-4 rounded-xl bg-[#C76A2A] hover:bg-[#b05b22] text-white text-xs font-semibold flex items-center gap-2 transition-colors shrink-0"
          >
            <Sparkles className="w-4 h-4" />
            <span>Customize with AI Mentor</span>
          </button>
        </div>

        {/* Goal Preset Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          {PRESET_GOALS.map((goal) => (
            <button
              key={goal}
              onClick={() => setSelectedGoal(goal)}
              className={`py-1.5 px-3 rounded-xl text-xs font-medium transition-all ${
                selectedGoal === goal
                  ? 'bg-[#1B1B1B] text-white shadow-xs'
                  : 'bg-[#FAF8F5] text-[#575653] border border-[#E8E5DD] hover:border-[#1B1B1B]'
              }`}
            >
              {goal}
            </button>
          ))}
        </div>
      </div>

      {/* Visual Roadmap Sequence Flow (Matching prompt example: Java -> Spring Boot -> REST APIs -> Microservices -> Docker -> System Design -> Cloud) */}
      <div className="bg-[#1B1B1B] text-white rounded-2xl p-5 border border-[#2D2D2D] shadow-lg space-y-4">
        <div className="flex items-center justify-between border-b border-[#2D2D2D] pb-3">
          <div>
            <span className="text-[10px] font-mono text-[#A3A3A3] uppercase tracking-wider">
              VISUAL SKILL PROGRESSION FLOW
            </span>
            <h3 className="text-sm font-bold text-white mt-0.5">
              Target Path: <span className="text-[#E07A5F]">{selectedGoal}</span>
            </h3>
          </div>
          <button
            onClick={handleGeneratePlan}
            disabled={isGenerating}
            className="py-1.5 px-3 rounded-lg bg-[#262626] hover:bg-[#333] border border-[#3A3A3A] text-xs font-mono text-[#D4D4D4] flex items-center gap-2"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>Regenerate Flow</span>
          </button>
        </div>

        {/* Nodes Chain */}
        <div className="flex flex-col lg:flex-row items-center gap-3 overflow-x-auto pb-2 pt-1 scrollbar-none">
          {ROADMAP_NODES.map((node, index) => {
            const Icon = node.icon;
            const isLast = index === ROADMAP_NODES.length - 1;

            let borderStyle = 'border-[#3A3A3A] bg-[#262626] text-[#D4D4D4]';
            let badgeStyle = 'bg-[#1B1B1B] text-[#A3A3A3]';

            if (node.status === 'completed') {
              borderStyle = 'border-emerald-500/50 bg-emerald-950/20 text-white';
              badgeStyle = 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
            } else if (node.status === 'current') {
              borderStyle = 'border-amber-500/80 bg-amber-950/30 text-white ring-2 ring-amber-500/40';
              badgeStyle = 'bg-amber-500/20 text-amber-400 border border-amber-500/30';
            } else if (node.status === 'gap') {
              borderStyle = 'border-rose-500/80 bg-rose-950/30 text-white';
              badgeStyle = 'bg-rose-500/20 text-rose-400 border border-rose-500/30';
            }

            return (
              <React.Fragment key={node.id}>
                <div className={`flex flex-col p-3 rounded-xl border min-w-[150px] w-full lg:w-44 shrink-0 transition-all ${borderStyle}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-1.5 rounded-lg bg-[#1B1B1B]">
                      <Icon className="w-4 h-4 text-[#C76A2A]" />
                    </div>
                    <span className={`px-1.5 py-0.5 text-[10px] font-mono font-bold rounded ${badgeStyle}`}>
                      {node.score}
                    </span>
                  </div>

                  <div className="text-xs font-bold font-sans truncate">{node.title}</div>
                  <div className="text-[10px] text-[#A3A3A3] truncate mt-0.5">{node.desc}</div>
                </div>

                {!isLast && (
                  <ArrowRight className="w-4 h-4 text-[#787774] shrink-0 hidden lg:block" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Month-by-Month Execution Plan Output */}
      <div className="bg-white rounded-2xl p-5 border border-[#E8E5DD] shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#F0ECE1] pb-3 gap-2">
          <div>
            <h3 className="text-base font-bold text-[#1B1B1B] flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#C76A2A]" />
              Month-by-Month Mastery Plan
            </h3>
            <p className="text-xs text-[#575653]">
              Step-by-step 6-month roadmap designed to move you from foundational knowledge to production ready.
            </p>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            {[1, 2, 3, 4, 5, 6].map((m) => (
              <button
                key={m}
                onClick={() => setActiveMonth(m)}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                  activeMonth === m
                    ? 'bg-[#1B1B1B] text-white shadow-xs'
                    : 'bg-[#FAF8F5] text-[#575653] hover:bg-[#E8E5DD]'
                }`}
              >
                Month {m}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Month Detail Card */}
        {MONTHLY_PLAN.filter((p) => p.month === activeMonth).map((plan) => (
          <div key={plan.month} className="space-y-4">
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8E5DD] space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-[#C76A2A]/10 text-[#C76A2A] border border-[#C76A2A]/20">
                  Sprint Milestone #{plan.month}
                </span>
                <span className="text-xs font-mono text-[#787774]">Estimated Workload: 12 hrs/week</span>
              </div>
              <h4 className="text-base font-bold text-[#1B1B1B]">{plan.title}</h4>
              <p className="text-xs text-[#575653]">{plan.focus}</p>
            </div>

            {/* 3 Grid Pillars for the Month */}
            <div className="grid md:grid-cols-3 gap-4">
              {/* Key Core Topics */}
              <div className="p-4 rounded-xl border border-[#E8E5DD] bg-white space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1B1B1B] border-b border-[#F0ECE1] pb-2">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <span>Key Technical Topics</span>
                </div>
                <ul className="space-y-2 text-xs text-[#575653]">
                  {plan.topics.map((t, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hands-On Project */}
              <div className="p-4 rounded-xl border border-[#E8E5DD] bg-white space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1B1B1B] border-b border-[#F0ECE1] pb-2">
                  <FolderGit2 className="w-4 h-4 text-[#C76A2A]" />
                  <span>Hands-On Project Build</span>
                </div>
                <div className="text-xs text-[#575653] space-y-2">
                  <div className="font-semibold text-[#1B1B1B] bg-[#FAF8F5] p-2.5 rounded-lg border border-[#E8E5DD]">
                    {plan.handsOnProject}
                  </div>
                  <p className="text-[11px] text-[#787774]">
                    Submit repository to Builder Passport upon completion for automated code evaluation.
                  </p>
                </div>
              </div>

              {/* Checkpoint & Reading */}
              <div className="p-4 rounded-xl border border-[#E8E5DD] bg-white space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1B1B1B] border-b border-[#F0ECE1] pb-2">
                  <FileCheck2 className="w-4 h-4 text-purple-600" />
                  <span>Reading & Verification</span>
                </div>
                <div className="space-y-2 text-xs text-[#575653]">
                  <div>
                    <span className="font-semibold text-[#1B1B1B]">Recommended Reading:</span>
                    <p className="text-[11px] text-[#787774] mt-0.5">{plan.reading}</p>
                  </div>
                  <div className="pt-2 border-t border-[#F0ECE1]">
                    <span className="font-semibold text-[#1B1B1B]">Checkpoint Assessment:</span>
                    <p className="text-[11px] text-purple-700 font-medium mt-0.5">{plan.checkpointQuiz}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
