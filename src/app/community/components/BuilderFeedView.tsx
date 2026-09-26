'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Zap,
  Award,
  CheckCircle2,
  Trophy,
  Briefcase,
  BookOpen,
  ShieldCheck,
  ExternalLink,
  MessageSquare,
  Star,
  ChevronDown,
  Target,
} from 'lucide-react';
import { FeedPost, FeedPostCategory } from '../types';

interface BuilderFeedViewProps {
  posts: FeedPost[];
  onUpdatePost: (updated: FeedPost) => void;
}

export function BuilderFeedView({ posts, onUpdatePost }: BuilderFeedViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedReviewId, setExpandedReviewId] = useState<string | null>(null);
  const [reviewInput, setReviewInput] = useState('');

  const categories: { label: string; value: string }[] = [
    { label: 'All Progress', value: 'All' },
    { label: 'Project Updates', value: 'Project Update' },
    { label: 'Achievements', value: 'Achievement' },
    { label: 'Milestones', value: 'Milestone' },
    { label: 'Hackathon Wins', value: 'Hackathon Win' },
    { label: 'Open Opportunities', value: 'Open Opportunity' },
    { label: 'Mentorship Posts', value: 'Mentorship Post' },
  ];

  const filteredPosts = selectedCategory === 'All'
    ? posts
    : posts.filter((p) => p.category === selectedCategory);

  const handleAppreciate = (post: FeedPost) => {
    const isAppreciated = post.userAppreciated;
    onUpdatePost({
      ...post,
      appreciationsCount: isAppreciated ? post.appreciationsCount - 1 : post.appreciationsCount + 1,
      userAppreciated: !isAppreciated,
    });
  };

  const handleEndorse = (post: FeedPost) => {
    const isEndorsed = post.userEndorsed;
    onUpdatePost({
      ...post,
      endorsementsCount: isEndorsed ? post.endorsementsCount - 1 : post.endorsementsCount + 1,
      userEndorsed: !isEndorsed,
    });
  };

  const handleAddReview = (post: FeedPost) => {
    if (!reviewInput.trim()) return;

    const newRev = {
      id: `rev-${Date.now()}`,
      reviewerName: 'Pratik Badiger',
      text: reviewInput.trim(),
      rating: 5,
      timestamp: 'Just now',
    };

    onUpdatePost({
      ...post,
      reviewsCount: post.reviewsCount + 1,
      reviews: [newRev, ...post.reviews],
    });

    setReviewInput('');
  };

  return (
    <div className="space-y-6">
      {/* Feed Category Filter Chips */}
      <div className="bg-white rounded-2xl p-2 border border-[#E8E5DD] shadow-xs flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.value;
          return (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                isSelected
                  ? 'bg-[#1B1B1B] text-white shadow-xs'
                  : 'text-[#575653] hover:text-[#1B1B1B] hover:bg-[#FAF8F5]'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Posts Feed */}
      <div className="space-y-5">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E8E5DD] shadow-xs space-y-4"
          >
            {/* Author & Header */}
            <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1B1B1B] text-white flex items-center justify-center font-bold text-xs font-mono shrink-0">
                  {post.authorName.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-[#1B1B1B]">{post.authorName}</h3>
                    <span className="text-xs font-mono text-[#787774]">{post.authorHandle}</span>
                    <span className="px-2 py-0.5 text-[9px] font-mono rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                      {post.authorTrustScore}% Trust Score
                    </span>
                  </div>
                  <div className="text-[11px] text-[#575653] mt-0.5">{post.authorRole}</div>
                </div>
              </div>

              <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-[#FAF8F5] border border-[#E8E5DD] text-[#C76A2A]">
                {post.category}
              </span>
            </div>

            {/* Content Body */}
            <div className="space-y-2">
              <h4 className="text-base font-bold text-[#1B1B1B]">{post.title}</h4>
              <p className="text-xs text-[#575653] leading-relaxed">{post.content}</p>
            </div>

            {/* Code Snippet if present */}
            {post.codeSnippet && (
              <div className="bg-[#1B1B1B] text-[#D4D4D4] p-3 rounded-xl font-mono text-[11px] overflow-x-auto">
                <div className="text-[10px] text-[#A3A3A3] mb-1 font-sans">Verified Code Proof:</div>
                <pre>{post.codeSnippet.code}</pre>
              </div>
            )}

            {/* Project / Repo Links */}
            {(post.projectLink || post.repositoryUrl) && (
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-mono">
                {post.projectLink && (
                  <a
                    href={post.projectLink}
                    target="_blank"
                    rel="noreferrer"
                    className="px-2.5 py-1 rounded-lg bg-[#FAF8F5] border border-[#E8E5DD] text-[#C76A2A] hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {post.repositoryUrl && (
                  <a
                    href={post.repositoryUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-2.5 py-1 rounded-lg bg-[#FAF8F5] border border-[#E8E5DD] text-[#1B1B1B] hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>GitHub Repository</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            )}

            {/* NO LIKES ACTION BAR: Appreciations, Endorsements, Reviews */}
            <div className="flex flex-wrap items-center justify-between pt-3 border-t border-[#F0ECE1] gap-2">
              <div className="flex items-center gap-2">
                {/* ⚡ Appreciation */}
                <button
                  onClick={() => handleAppreciate(post)}
                  className={`py-1.5 px-3 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    post.userAppreciated
                      ? 'bg-[#C76A2A] text-white shadow-xs'
                      : 'bg-[#FAF8F5] text-[#575653] border border-[#E8E5DD] hover:border-[#C76A2A]'
                  }`}
                >
                  <Zap className={`w-3.5 h-3.5 ${post.userAppreciated ? 'fill-white' : 'text-[#C76A2A]'}`} />
                  <span>Appreciate ({post.appreciationsCount})</span>
                </button>

                {/* 🎯 Endorsement */}
                <button
                  onClick={() => handleEndorse(post)}
                  className={`py-1.5 px-3 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    post.userEndorsed
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'bg-[#FAF8F5] text-[#575653] border border-[#E8E5DD] hover:border-purple-600'
                  }`}
                >
                  <Target className={`w-3.5 h-3.5 ${post.userEndorsed ? 'fill-white' : 'text-purple-600'}`} />
                  <span>Endorse Capability ({post.endorsementsCount})</span>
                </button>
              </div>

              {/* 💬 Peer Reviews Counter / Toggle */}
              <button
                onClick={() => setExpandedReviewId(expandedReviewId === post.id ? null : post.id)}
                className="py-1.5 px-3 rounded-xl bg-[#FAF8F5] border border-[#E8E5DD] text-[#575653] hover:text-[#1B1B1B] text-xs font-semibold flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                <span>Peer Reviews ({post.reviewsCount})</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expandedReviewId === post.id ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Peer Reviews Expanded Panel */}
            {expandedReviewId === post.id && (
              <div className="pt-3 border-t border-[#F0ECE1] space-y-3">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#1B1B1B] block">Peer Code Reviews & Technical Feedback:</span>
                  {post.reviews.length === 0 ? (
                    <div className="text-xs text-[#787774] italic">No peer reviews yet. Be the first to review!</div>
                  ) : (
                    post.reviews.map((rev) => (
                      <div key={rev.id} className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E5DD] space-y-1 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#1B1B1B]">{rev.reviewerName}</span>
                          <div className="flex items-center gap-1 text-amber-600 font-mono text-[11px]">
                            <Star className="w-3 h-3 fill-amber-500" />
                            <span>{rev.rating}/5</span>
                          </div>
                        </div>
                        <p className="text-[#575653]">{rev.text}</p>
                      </div>
                    ))
                  )}
                </div>

                {/* Add Review Box */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    value={reviewInput}
                    onChange={(e) => setReviewInput(e.target.value)}
                    placeholder="Write a constructive peer review / technical feedback..."
                    className="flex-1 p-2 rounded-xl border border-[#DCD6C9] focus:outline-none focus:border-[#C76A2A] text-xs"
                  />
                  <button
                    onClick={() => handleAddReview(post)}
                    disabled={!reviewInput.trim()}
                    className="py-2 px-3 rounded-xl bg-[#1B1B1B] hover:bg-[#333] text-white text-xs font-bold disabled:opacity-50"
                  >
                    Submit Review
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
