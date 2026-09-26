'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Clock,
  Users,
  CheckSquare,
  AlertCircle,
  Flag,
  Zap,
  Plus,
  GitPullRequest,
  GitCommit,
  ExternalLink,
} from 'lucide-react';
import { ProjectHubItem } from '../types';

interface ProjectDashboardViewProps {
  project: ProjectHubItem;
  onUpdateProject: (updated: ProjectHubItem) => void;
}

export function ProjectDashboardView({
  project,
  onUpdateProject,
}: ProjectDashboardViewProps) {
  const [taskFilter, setTaskFilter] = useState<'All' | 'To Do' | 'In Progress' | 'Code Review' | 'Done'>('All');

  const filteredTasks = taskFilter === 'All'
    ? project.tasks
    : project.tasks.filter((t) => t.status === taskFilter);

  const toggleTaskStatus = (taskId: string) => {
    const updatedTasks = project.tasks.map((t) => {
      if (t.id === taskId) {
        const nextStatus = t.status === 'Done' ? 'To Do' : 'Done';
        return { ...t, status: nextStatus as any };
      }
      return t;
    });

    const doneCount = updatedTasks.filter((t) => t.status === 'Done').length;
    const progress = Math.round((doneCount / Math.max(updatedTasks.length, 1)) * 100);

    onUpdateProject({
      ...project,
      tasks: updatedTasks,
      progressPercentage: progress,
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Status, Progress & Impact Score */}
      <div className="bg-white rounded-2xl p-5 border border-[#E8E5DD] shadow-xs grid lg:grid-cols-12 gap-5">
        {/* Project Info & Status (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center gap-2">
            <span
              className={`px-2.5 py-0.5 text-xs font-bold rounded-full ${
                project.status === 'Production Ready'
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  : project.status === 'Verified'
                  ? 'bg-blue-100 text-blue-800 border border-blue-200'
                  : 'bg-amber-100 text-amber-800 border border-amber-200'
              }`}
            >
              Status: {project.status}
            </span>
            <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-[#FAF8F5] text-[#575653] border border-[#E8E5DD]">
              {project.type}
            </span>
            <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-[#FAF8F5] text-[#575653] border border-[#E8E5DD]">
              {project.difficulty}
            </span>
          </div>

          <h2 className="text-xl font-bold text-[#1B1B1B]">{project.title}</h2>
          <p className="text-xs text-[#575653] leading-relaxed">{project.description}</p>

          {/* Progress Bar */}
          <div className="space-y-1.5 pt-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-[#787774]">Completion Progress</span>
              <span className="font-bold text-[#1B1B1B]">{project.progressPercentage}% Complete</span>
            </div>
            <div className="w-full h-2.5 bg-[#F0ECE1] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#C76A2A] to-[#E07A5F] rounded-full transition-all duration-300"
                style={{ width: `${project.progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Impact Score Gauge Card (5 cols) */}
        <div className="lg:col-span-5 bg-[#FAF8F5] p-4 rounded-xl border border-[#E8E5DD] flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#1B1B1B] flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[#C76A2A] fill-[#C76A2A]" />
              Project Impact Score
            </span>
            <span className="text-2xl font-black font-mono text-emerald-700">
              {project.impactScore.overall} / 100
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-[10px] text-[#575653]">
            <div className="bg-white p-2 rounded border border-[#E8E5DD]">
              <span>Complexity</span>
              <div className="font-bold text-[#1B1B1B] mt-0.5 font-mono">{project.impactScore.complexity}/20</div>
            </div>
            <div className="bg-white p-2 rounded border border-[#E8E5DD]">
              <span>Execution</span>
              <div className="font-bold text-[#1B1B1B] mt-0.5 font-mono">{project.impactScore.execution}/20</div>
            </div>
            <div className="bg-white p-2 rounded border border-[#E8E5DD]">
              <span>Activity</span>
              <div className="font-bold text-[#1B1B1B] mt-0.5 font-mono">{project.impactScore.activity}/15</div>
            </div>
          </div>

          <div className="text-[11px] text-[#787774] flex items-center justify-between pt-1 border-t border-[#E8E5DD]">
            <span>Verification: {project.verification.deploymentStatus}</span>
            <a
              href={project.repositoryUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[#C76A2A] hover:underline font-semibold flex items-center gap-1"
            >
              <span>GitHub Repo</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Row 2: Contributors Roster & Milestones */}
      <div className="grid md:grid-cols-2 gap-5">
        {/* Contributors */}
        <div className="bg-white rounded-2xl p-5 border border-[#E8E5DD] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-3">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#C76A2A]" />
              <h3 className="text-sm font-bold text-[#1B1B1B]">Team Contributors</h3>
            </div>
            <span className="text-xs font-mono text-[#787774]">
              {project.teamMembers.length} Active Members
            </span>
          </div>

          <div className="space-y-2.5">
            {project.teamMembers.map((member) => (
              <div
                key={member.id}
                className="p-3 rounded-xl border border-[#E8E5DD] bg-[#FAF8F5] flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#1B1B1B] text-white flex items-center justify-center font-bold text-xs font-mono">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#1B1B1B]">{member.name}</div>
                    <div className="text-[10px] text-[#787774] font-medium">{member.role}</div>
                  </div>
                </div>

                <div className="text-right text-[11px] font-mono text-[#787774]">
                  <div className="font-semibold text-emerald-700">+{member.commitsCount} Commits</div>
                  <div>+{member.linesAdded} / -{member.linesDeleted}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Milestones */}
        <div className="bg-white rounded-2xl p-5 border border-[#E8E5DD] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-3">
            <div className="flex items-center gap-2">
              <Flag className="w-4 h-4 text-purple-600" />
              <h3 className="text-sm font-bold text-[#1B1B1B]">Project Milestones</h3>
            </div>
            <span className="text-xs font-mono text-[#787774]">
              {project.milestones.filter((m) => m.completed).length} / {project.milestones.length} Done
            </span>
          </div>

          <div className="space-y-3">
            {project.milestones.map((m) => (
              <div
                key={m.id}
                className={`p-3 rounded-xl border space-y-1.5 transition-all ${
                  m.completed
                    ? 'bg-emerald-50/50 border-emerald-200'
                    : 'bg-[#FAF8F5] border-[#E8E5DD]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold ${m.completed ? 'text-emerald-900 line-through' : 'text-[#1B1B1B]'}`}>
                    {m.title}
                  </span>
                  <span className="text-[10px] font-mono text-[#787774]">{m.dueDate}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#787774]">
                  <span>Tasks Completed: {m.completedTasksCount} / {m.tasksCount}</span>
                  {m.completed && <span className="text-emerald-700 font-bold">✓ Milestone Reached</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Tasks & Issues Management */}
      <div className="bg-white rounded-2xl p-5 border border-[#E8E5DD] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#F0ECE1] pb-3 gap-2">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-[#C76A2A]" />
            <h3 className="text-sm font-bold text-[#1B1B1B]">Tasks & Issue Tracking</h3>
          </div>

          <div className="flex items-center gap-1.5">
            {['All', 'To Do', 'In Progress', 'Code Review', 'Done'].map((filter) => (
              <button
                key={filter}
                onClick={() => setTaskFilter(filter as any)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                  taskFilter === filter
                    ? 'bg-[#1B1B1B] text-white'
                    : 'bg-[#FAF8F5] text-[#575653] hover:bg-[#E8E5DD]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              onClick={() => toggleTaskStatus(task.id)}
              className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                task.status === 'Done'
                  ? 'bg-emerald-50/50 border-emerald-200'
                  : 'bg-[#FAF8F5] border-[#E8E5DD] hover:border-[#C76A2A]'
              }`}
            >
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#1B1B1B]">{task.title}</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-[#787774]">
                  <span>Assignee: {task.assignee}</span>
                  <span>•</span>
                  <span className="font-semibold text-[#1B1B1B]">{task.priority} Priority</span>
                </div>
              </div>

              <span
                className={`px-2 py-0.5 text-[10px] font-semibold rounded shrink-0 ${
                  task.status === 'Done'
                    ? 'bg-emerald-600 text-white'
                    : task.status === 'Code Review'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-white text-[#1B1B1B] border border-[#E8E5DD]'
                }`}
              >
                {task.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
