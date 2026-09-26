'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FolderGit2,
  Sparkles,
  Layers,
  Code2,
  Clock,
  Zap,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

interface ProjectRecommendationViewProps {
  onOpenMentorDrawer: (prompt?: string) => void;
}

export function ProjectRecommendationView({ onOpenMentorDrawer }: ProjectRecommendationViewProps) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'Beginner' | 'Intermediate' | 'Advanced' | 'Industry-Level'>('all');

  const RECOMMENDED_PROJECTS = [
    {
      id: 'proj-1',
      title: 'Spring Boot RESTful Order Management Microservice',
      tier: 'Intermediate' as const,
      gapsBridged: ['Spring Boot (22%)', 'REST APIs (68%)'],
      estHours: '12 Hours (3 Days)',
      techStack: ['Java 21', 'Spring Boot 3', 'PostgreSQL', 'Swagger/OpenAPI'],
      description: 'Build a production-style REST API with Spring Data JPA persistence, `@ControllerAdvice` error handlers, and DTO validation rules.',
      keyDeliverables: [
        'Stateless JWT Authentication Filter',
        'CRUD Endpoints for Product Catalog & Customer Orders',
        'Spring Data JPA Query optimization and pagination',
      ],
      xpReward: 120,
    },
    {
      id: 'proj-2',
      title: 'Dockerized Multi-Container Microservices Cluster',
      tier: 'Advanced' as const,
      gapsBridged: ['Docker (10%)', 'DevOps Pipeline'],
      estHours: '16 Hours (4 Days)',
      techStack: ['Docker', 'Docker Compose', 'Java Spring Boot', 'Redis', 'Nginx'],
      description: 'Create multi-stage Dockerfiles for minimal container footprint, and wire up Java API, PostgreSQL database, Redis cache, and Nginx reverse proxy using Docker Compose.',
      keyDeliverables: [
        'Optimized multi-stage Dockerfile (<180MB image size)',
        'Docker Compose file with volume persistence & health checks',
        'GitHub Actions workflow for automated container build & vulnerability scan',
      ],
      xpReward: 180,
    },
    {
      id: 'proj-3',
      title: 'High-Throughput Distributed Rate Limiter & Caching Gateway',
      tier: 'Industry-Level' as const,
      gapsBridged: ['System Design (35%)', 'Redis Caching'],
      estHours: '24 Hours (1 Week)',
      techStack: ['Java', 'Redis', 'Spring Cloud Gateway', 'Docker', 'Grafana'],
      description: 'Design and implement a distributed API Rate Limiter using Token Bucket / Sliding Window algorithm backed by Redis memory store to withstand 10k QPS.',
      keyDeliverables: [
        'Atomic Lua scripts execution in Redis for concurrent lock-free counters',
        'Sub-5ms response latency benchmarking report',
        'Grafana Telemetry dashboard tracking throughput & throttled requests',
      ],
      xpReward: 250,
    },
    {
      id: 'proj-4',
      title: 'Spring Boot CRUD Inventory & Stock Notification Service',
      tier: 'Beginner' as const,
      gapsBridged: ['Spring Boot (22%)'],
      estHours: '6 Hours (1.5 Days)',
      techStack: ['Java', 'Spring Boot', 'H2 Database', 'Maven'],
      description: 'A beginner-friendly starter project introducing `@RestController`, `@Service`, `@Repository` layer separation and Spring Beans.',
      keyDeliverables: [
        'Structured 3-tier architecture (Controller -> Service -> Repository)',
        'In-memory H2 database integration',
        'Unit tests for Service layer logic using JUnit 5',
      ],
      xpReward: 80,
    },
    {
      id: 'proj-5',
      title: 'Event-Driven Order Processing Engine with Apache Kafka',
      tier: 'Industry-Level' as const,
      gapsBridged: ['Microservices (40%)', 'System Design (35%)'],
      estHours: '30 Hours (1.5 Weeks)',
      techStack: ['Java', 'Spring Cloud Kafka', 'Apache Kafka', 'PostgreSQL', 'Docker'],
      description: 'Production event-driven architecture using Kafka topics for asynchronous payment confirmation, inventory reservation, and email notifications.',
      keyDeliverables: [
        'Kafka Producer & Consumer service decoupled event queues',
        'Dead Letter Queue (DLQ) retry mechanisms for failed messages',
        'End-to-End integration tests using Testcontainers',
      ],
      xpReward: 300,
    },
  ];

  const filteredProjects = selectedDifficulty === 'all'
    ? RECOMMENDED_PROJECTS
    : RECOMMENDED_PROJECTS.filter((p) => p.tier === selectedDifficulty);

  return (
    <div className="space-y-6">
      {/* Header & Tier Filters */}
      <div className="bg-white rounded-2xl p-5 border border-[#E8E5DD] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <FolderGit2 className="w-5 h-5 text-[#C76A2A]" />
              <h2 className="text-lg font-bold text-[#1B1B1B]">Skill-Gap Based Project Recommendations</h2>
            </div>
            <p className="text-xs text-[#575653] mt-0.5">
              Projects curated specifically to bridge your identified skill gaps (Spring Boot 22%, Docker 10%, System Design 35%).
            </p>
          </div>

          <button
            onClick={() => onOpenMentorDrawer("Recommend a custom project tailored to my current GitHub code quality")}
            className="py-2 px-4 rounded-xl bg-[#1B1B1B] hover:bg-[#333] text-white text-xs font-semibold flex items-center gap-2 transition-colors shrink-0"
          >
            <Sparkles className="w-4 h-4 text-[#C76A2A]" />
            <span>Ask Mentor Project Blueprint</span>
          </button>
        </div>

        {/* Tier Filter Tabs: Beginner, Intermediate, Advanced, Industry-Level */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#F0ECE1]">
          {[
            { id: 'all', label: 'All Recommendations' },
            { id: 'Beginner', label: 'Beginner' },
            { id: 'Intermediate', label: 'Intermediate' },
            { id: 'Advanced', label: 'Advanced' },
            { id: 'Industry-Level', label: 'Industry-Level' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedDifficulty(tab.id as any)}
              className={`py-1.5 px-3.5 rounded-xl text-xs font-semibold transition-all ${
                selectedDifficulty === tab.id
                  ? 'bg-[#C76A2A] text-white shadow-xs'
                  : 'bg-[#FAF8F5] text-[#575653] border border-[#E8E5DD] hover:border-[#1B1B1B]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects List Grid */}
      <div className="grid md:grid-cols-2 gap-5">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-2xl p-5 border border-[#E8E5DD] hover:border-[#C76A2A] shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span
                  className={`px-2.5 py-0.5 text-xs font-bold rounded-full ${
                    project.tier === 'Beginner'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : project.tier === 'Intermediate'
                      ? 'bg-amber-100 text-amber-800 border border-amber-200'
                      : project.tier === 'Advanced'
                      ? 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                      : 'bg-purple-100 text-purple-800 border border-purple-200'
                  }`}
                >
                  {project.tier}
                </span>

                <div className="flex items-center gap-3 text-xs font-mono text-[#787774]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {project.estHours}
                  </span>
                  <span className="font-bold text-[#C76A2A]">+{project.xpReward} XP</span>
                </div>
              </div>

              <h3 className="text-base font-bold text-[#1B1B1B]">{project.title}</h3>
              <p className="text-xs text-[#575653] leading-relaxed">{project.description}</p>

              {/* Skill Gaps Bridged Pills */}
              <div className="pt-1">
                <span className="text-[10px] font-mono text-[#787774] block mb-1">SKILL GAPS BRIDGED:</span>
                <div className="flex flex-wrap gap-1.5">
                  {project.gapsBridged.map((gap, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-[10px] font-semibold rounded bg-emerald-50 text-emerald-800 border border-emerald-200"
                    >
                      ✓ {gap}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div className="pt-1">
                <span className="text-[10px] font-mono text-[#787774] block mb-1">TECH STACK:</span>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech, idx) => (
                    <span key={idx} className="px-2 py-0.5 text-[10px] font-mono rounded bg-[#FAF8F5] text-[#1B1B1B] border border-[#E8E5DD]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Deliverables */}
              <div className="pt-2 border-t border-[#F0ECE1] space-y-1">
                <span className="text-[10px] font-mono text-[#787774] block">KEY DELIVERABLES:</span>
                {project.keyDeliverables.map((del, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 text-xs text-[#575653]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C76A2A] shrink-0 mt-0.5" />
                    <span>{del}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[#F0ECE1]">
              <button
                onClick={() => onOpenMentorDrawer(`Give me step-by-step guidance to build the project: "${project.title}"`)}
                className="w-full py-2.5 px-4 rounded-xl bg-[#1B1B1B] hover:bg-[#333] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <span>Start Project with Mentor Guidance</span>
                <ChevronRight className="w-4 h-4 text-[#C76A2A]" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
