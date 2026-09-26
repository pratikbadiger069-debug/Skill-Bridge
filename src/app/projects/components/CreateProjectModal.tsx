'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, FolderGit2, Code2, Link as LinkIcon, Users, CheckCircle2 } from 'lucide-react';
import { ProjectHubItem, ProjectType, ProjectDifficulty } from '../types';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (newProject: ProjectHubItem) => void;
}

export function CreateProjectModal({
  isOpen,
  onClose,
  onCreate,
}: CreateProjectModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [projectType, setProjectType] = useState<ProjectType>('Personal');
  const [difficulty, setDifficulty] = useState<ProjectDifficulty>('Intermediate');
  const [techStackInput, setTechStackInput] = useState('React, TypeScript, Next.js, Node.js');
  const [teamMembersInput, setTeamMembersInput] = useState('');
  const [repositoryUrl, setRepositoryUrl] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [documentationUrl, setDocumentationUrl] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const techArray = techStackInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const membersArray = teamMembersInput
      ? teamMembersInput.split(',').map((email, idx) => ({
          id: `mem-${idx}-${Date.now()}`,
          name: email.split('@')[0].trim(),
          role: 'Contributor' as any,
          commitsCount: 0,
          linesAdded: 0,
          linesDeleted: 0,
          githubUsername: email.split('@')[0].trim(),
        }))
      : [
          {
            id: 'mem-lead',
            name: 'Pratik Badiger',
            role: 'Lead Architect' as any,
            commitsCount: 1,
            linesAdded: 100,
            linesDeleted: 0,
            githubUsername: 'pratikbadiger069',
          },
        ];

    const newProject: ProjectHubItem = {
      id: `proj-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      type: projectType,
      techStack: techArray.length > 0 ? techArray : ['TypeScript', 'Next.js'],
      difficulty: difficulty,
      status: 'In Development',
      progressPercentage: 10,
      repositoryUrl: repositoryUrl.trim() || 'https://github.com/pratikbadiger069/new-project',
      demoUrl: demoUrl.trim(),
      documentationUrl: documentationUrl.trim(),
      teamMembers: membersArray,
      tasks: [
        { id: 't-init-1', title: 'Initialize Repository & Setup Architecture', assignee: membersArray[0].name, status: 'In Progress', priority: 'High' },
      ],
      issues: [],
      milestones: [
        { id: 'm-init-1', title: 'Phase 1 MVP Release', dueDate: 'In 2 weeks', completed: false, tasksCount: 5, completedTasksCount: 1 },
      ],
      verification: {
        codeQualityScore: 85,
        documentationScore: 80,
        githubActivityScore: 88,
        deploymentStatus: demoUrl.trim() ? 'Live Production' : 'Not Deployed',
        deploymentUrl: demoUrl.trim(),
        peerReviewsCount: 0,
      },
      impactScore: {
        overall: 80,
        complexity: 15,
        execution: 15,
        activity: 13,
        users: 12,
        documentation: 13,
        consistency: 12,
      },
      chatMessages: [],
      screenshots: [],
      starsCount: 1,
      viewsCount: 10,
      forksCount: 0,
      createdAt: 'Just Now',
      updatedAt: 'Just Now',
    };

    onCreate(newProject);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-[#E8E5DD] shadow-2xl relative space-y-5 font-sans text-[#1B1B1B]"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-[#FAF8F5] hover:bg-[#E8E5DD] text-[#787774] hover:text-[#1B1B1B]"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="border-b border-[#F0ECE1] pb-3">
            <h2 className="text-xl font-bold text-[#1B1B1B] flex items-center gap-2">
              <FolderGit2 className="w-5 h-5 text-[#C76A2A]" />
              <span>Create New Capability Project</span>
            </h2>
            <p className="text-xs text-[#575653] mt-0.5">
              Submit your project details to initiate GitHub telemetry sync and faculty verification.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Title */}
            <div>
              <label className="font-bold text-[#1B1B1B] block mb-1">Project Title:</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Distributed Task Execution Engine"
                className="w-full p-2.5 rounded-xl border border-[#DCD6C9] focus:outline-none focus:border-[#C76A2A]"
              />
            </div>

            {/* Description */}
            <div>
              <label className="font-bold text-[#1B1B1B] block mb-1">Description:</label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe project architecture, problem solved, and key features..."
                className="w-full p-2.5 rounded-xl border border-[#DCD6C9] focus:outline-none focus:border-[#C76A2A]"
              />
            </div>

            {/* Project Type & Difficulty Row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-[#1B1B1B] block mb-1">Project Type:</label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value as ProjectType)}
                  className="w-full p-2.5 rounded-xl border border-[#DCD6C9] focus:outline-none focus:border-[#C76A2A]"
                >
                  <option value="Personal">Personal</option>
                  <option value="Team">Team</option>
                  <option value="Research">Research</option>
                  <option value="Startup">Startup</option>
                  <option value="Hackathon">Hackathon</option>
                  <option value="Industry Challenge">Industry Challenge</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-[#1B1B1B] block mb-1">Difficulty Tier:</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as ProjectDifficulty)}
                  className="w-full p-2.5 rounded-xl border border-[#DCD6C9] focus:outline-none focus:border-[#C76A2A]"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Industry-Level">Industry-Level</option>
                </select>
              </div>
            </div>

            {/* Tech Stack & Team Members */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-[#1B1B1B] block mb-1">Tech Stack (comma-separated):</label>
                <input
                  type="text"
                  value={techStackInput}
                  onChange={(e) => setTechStackInput(e.target.value)}
                  placeholder="Java, Spring Boot, Docker"
                  className="w-full p-2.5 rounded-xl border border-[#DCD6C9] focus:outline-none focus:border-[#C76A2A]"
                />
              </div>

              <div>
                <label className="font-bold text-[#1B1B1B] block mb-1">Team Member Emails:</label>
                <input
                  type="text"
                  value={teamMembersInput}
                  onChange={(e) => setTeamMembersInput(e.target.value)}
                  placeholder="rohan@hitam.org, ananya@hitam.org"
                  className="w-full p-2.5 rounded-xl border border-[#DCD6C9] focus:outline-none focus:border-[#C76A2A]"
                />
              </div>
            </div>

            {/* Links */}
            <div className="space-y-2 pt-1 border-t border-[#F0ECE1]">
              <div>
                <label className="font-bold text-[#1B1B1B] block mb-1">GitHub Repository Link:</label>
                <input
                  type="url"
                  value={repositoryUrl}
                  onChange={(e) => setRepositoryUrl(e.target.value)}
                  placeholder="https://github.com/username/repository"
                  className="w-full p-2.5 rounded-xl border border-[#DCD6C9] focus:outline-none focus:border-[#C76A2A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#1B1B1B] block mb-1">Demo / Deployment Link:</label>
                  <input
                    type="url"
                    value={demoUrl}
                    onChange={(e) => setDemoUrl(e.target.value)}
                    placeholder="https://app.vercel.app"
                    className="w-full p-2.5 rounded-xl border border-[#DCD6C9] focus:outline-none focus:border-[#C76A2A]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#1B1B1B] block mb-1">Documentation URL:</label>
                  <input
                    type="url"
                    value={documentationUrl}
                    onChange={(e) => setDocumentationUrl(e.target.value)}
                    placeholder="https://github.com/user/repo#readme"
                    className="w-full p-2.5 rounded-xl border border-[#DCD6C9] focus:outline-none focus:border-[#C76A2A]"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-[#F0ECE1]">
              <button
                type="button"
                onClick={onClose}
                className="py-2.5 px-4 rounded-xl border border-[#E8E5DD] font-semibold text-[#575653]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-2.5 px-5 rounded-xl bg-[#1B1B1B] hover:bg-[#333] text-white font-bold transition-colors"
              >
                Create Project Hub
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
