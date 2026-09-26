'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, Code2, Link as LinkIcon } from 'lucide-react';
import { FeedPost, FeedPostCategory } from '../types';

interface PostProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (post: FeedPost) => void;
}

export function PostProgressModal({
  isOpen,
  onClose,
  onSubmit,
}: PostProgressModalProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<FeedPostCategory>('Project Update');
  const [code, setCode] = useState('');
  const [projectLink, setProjectLink] = useState('');
  const [repositoryUrl, setRepositoryUrl] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newPost: FeedPost = {
      id: `post-${Date.now()}`,
      authorName: 'Pratik Badiger',
      authorAvatar: 'https://github.com/pratikbadiger069.png',
      authorHandle: '@pratikbadiger069',
      authorRole: 'Lead Architect • SDE-1 Target',
      authorTrustScore: 98,
      category: category,
      title: title.trim(),
      content: content.trim(),
      codeSnippet: code.trim() ? { language: 'typescript', code: code.trim() } : undefined,
      projectLink: projectLink.trim() || undefined,
      repositoryUrl: repositoryUrl.trim() || undefined,
      appreciationsCount: 1,
      endorsementsCount: 0,
      reviewsCount: 0,
      userAppreciated: true,
      userEndorsed: false,
      reviews: [],
      timestamp: 'Just now',
    };

    onSubmit(newPost);
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
              <Zap className="w-5 h-5 text-[#C76A2A]" />
              <span>Share Verified Builder Progress</span>
            </h2>
            <p className="text-xs text-[#575653] mt-0.5">
              Share project updates, hackathon wins, or mentorship posts with code proof.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-[#1B1B1B] block mb-1">Post Category:</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as FeedPostCategory)}
                className="w-full p-2.5 rounded-xl border border-[#DCD6C9] focus:outline-none focus:border-[#C76A2A]"
              >
                <option value="Project Update">Project Update</option>
                <option value="Achievement">Achievement</option>
                <option value="Milestone">Milestone</option>
                <option value="Hackathon Win">Hackathon Win</option>
                <option value="Open Opportunity">Open Opportunity</option>
                <option value="Mentorship Post">Mentorship Post</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-[#1B1B1B] block mb-1">Headline / Title:</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Deployed Spring Security Stateless JWT Filter v1.2"
                className="w-full p-2.5 rounded-xl border border-[#DCD6C9] focus:outline-none focus:border-[#C76A2A]"
              />
            </div>

            <div>
              <label className="font-bold text-[#1B1B1B] block mb-1">Progress Details & Architecture:</label>
              <textarea
                required
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Explain engineering details, benchmarking metrics, or role requirements..."
                className="w-full p-2.5 rounded-xl border border-[#DCD6C9] focus:outline-none focus:border-[#C76A2A]"
              />
            </div>

            <div>
              <label className="font-bold text-[#1B1B1B] block mb-1">Verified Code Snippet (Optional):</label>
              <textarea
                rows={3}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="// Paste code snippet for peer review..."
                className="w-full p-2.5 rounded-xl border border-[#DCD6C9] focus:outline-none focus:border-[#C76A2A] font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-[#1B1B1B] block mb-1">Demo Link (Optional):</label>
                <input
                  type="url"
                  value={projectLink}
                  onChange={(e) => setProjectLink(e.target.value)}
                  placeholder="https://app.skillbridge.dev"
                  className="w-full p-2.5 rounded-xl border border-[#DCD6C9] focus:outline-none focus:border-[#C76A2A]"
                />
              </div>

              <div>
                <label className="font-bold text-[#1B1B1B] block mb-1">Repository URL (Optional):</label>
                <input
                  type="url"
                  value={repositoryUrl}
                  onChange={(e) => setRepositoryUrl(e.target.value)}
                  placeholder="https://github.com/user/repo"
                  className="w-full p-2.5 rounded-xl border border-[#DCD6C9] focus:outline-none focus:border-[#C76A2A]"
                />
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
                Publish Progress Post
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
