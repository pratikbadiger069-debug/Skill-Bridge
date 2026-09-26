'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  X,
  Send,
  Loader2,
  Compass,
  Layers,
  Mic,
  BookOpen,
  Briefcase,
  Code2,
  Bot,
  User,
  Zap,
  CheckCircle2,
  RotateCcw,
} from 'lucide-react';
import { CopilotMarkdown } from '@/components/copilot/CopilotMarkdown';
import { CopilotMentorMode, CopilotChatMessage, StudentProfile } from '@/types';
import { generateSmartCopilotResponse } from '@/lib/copilot-engine';

interface InteractiveMentorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
  studentProfile: StudentProfile;
  targetRole: string;
  activeProvider: any;
  aiKeys: any;
  copilotMemory: any;
  githubData: any;
  assessmentHistory: any;
}

export function InteractiveMentorDrawer({
  isOpen,
  onClose,
  initialPrompt,
  studentProfile,
  targetRole,
  activeProvider,
  aiKeys,
  copilotMemory,
  githubData,
  assessmentHistory,
}: InteractiveMentorDrawerProps) {
  const [messages, setMessages] = useState<CopilotChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      content: `Hello Pratik! I'm **Dr. Evelyn Vance**, your AI Career Mentor.\n\nI've analyzed your telemetry: **885 Builder Score**, **8 connected GitHub repos**, and your **Backend Engineer** career target. You currently have solid Java fundamentals (82%), but your primary gaps are **Spring Boot (22%)** and **Docker (10%)**.\n\nHow can I guide your career growth today?`,
      timestamp: 'Just now',
      mode: 'career',
      suggestedActions: [
        '🚀 How do I bridge my Docker gap?',
        '📐 Review my Spring Boot API architecture',
        '🎙️ Simulate a 5-min Mock Interview',
        '🗺️ Customize my 6-Month Roadmap',
      ],
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedMode, setSelectedMode] = useState<CopilotMentorMode>('career');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialPrompt && isOpen) {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt, isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query || loading) return;

    setInputQuery('');

    // Add user message
    const userMsg: CopilotChatMessage = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      content: query,
      timestamp: 'Just now',
      mode: selectedMode,
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const response = await generateSmartCopilotResponse(
        query,
        studentProfile,
        targetRole,
        activeProvider,
        aiKeys[activeProvider],
        selectedMode,
        copilotMemory,
        githubData,
        assessmentHistory,
        'gemini-1.5-flash'
      );

      const assistantMsg: CopilotChatMessage = {
        id: `msg-ai-${Date.now()}`,
        sender: 'assistant',
        content: response.text,
        timestamp: 'Just now',
        mode: selectedMode,
        suggestedActions: response.suggestedActions,
        codeSnippets: response.codeSnippets,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      const errorMsg: CopilotChatMessage = {
        id: `msg-err-${Date.now()}`,
        sender: 'assistant',
        content: `⚠️ Temporary mentor connection offline. Please check your AI Provider configuration in Settings.\n\n*Error details: ${err.message || 'Network timeout'}*`,
        timestamp: 'Just now',
        mode: selectedMode,
        suggestedActions: ['Try again', 'Check AI Key Settings'],
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col font-sans text-[#1B1B1B] overflow-hidden"
        >
          {/* Header */}
          <div className="p-4 bg-[#1B1B1B] text-white flex items-center justify-between border-b border-[#2D2D2D]">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#C76A2A]/20 border border-[#C76A2A]/40 text-[#E07A5F]">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>AI Career Mentor Consultation</span>
                  <span className="px-2 py-0.5 text-[9px] font-mono rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Live Telemetry
                  </span>
                </h3>
                <p className="text-[11px] text-[#A3A3A3]">
                  Dr. Evelyn Vance • Target: {targetRole}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-[#262626] hover:bg-[#333] text-[#A3A3A3] hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Mode Selector Chips */}
          <div className="p-2 bg-[#FAF8F5] border-b border-[#E8E5DD] flex items-center gap-1.5 overflow-x-auto text-xs">
            {[
              { id: 'career', label: 'Career Mentor', icon: Compass },
              { id: 'project', label: 'Project Mentor', icon: Layers },
              { id: 'interview', label: 'Interview Sim', icon: Mic },
              { id: 'learning', label: 'Learning Coach', icon: BookOpen },
              { id: 'opportunity', label: 'Placement Match', icon: Briefcase },
            ].map((m) => {
              const Icon = m.icon;
              const isSelected = selectedMode === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setSelectedMode(m.id as CopilotMentorMode)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium shrink-0 transition-all ${
                    isSelected
                      ? 'bg-[#1B1B1B] text-white shadow-xs'
                      : 'text-[#575653] hover:bg-[#E8E5DD]'
                  }`}
                >
                  <Icon className="w-3 h-3 text-[#C76A2A]" />
                  <span>{m.label}</span>
                </button>
              );
            })}
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#F6F4EE]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-8 h-8 rounded-xl bg-[#1B1B1B] text-[#C76A2A] flex items-center justify-center shrink-0 shadow-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-4 text-xs space-y-3 shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-[#1B1B1B] text-white rounded-tr-none'
                      : 'bg-white text-[#1B1B1B] border border-[#E8E5DD] rounded-tl-none'
                  }`}
                >
                  {msg.sender === 'assistant' ? (
                    <CopilotMarkdown content={msg.content} />
                  ) : (
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                  )}

                  {/* Code Snippets */}
                  {msg.codeSnippets?.map((snip, idx) => (
                    <div key={idx} className="bg-[#1B1B1B] text-[#D4D4D4] p-3 rounded-xl font-mono text-[11px] overflow-x-auto">
                      {snip.title && <div className="text-[10px] text-[#A3A3A3] mb-1 font-sans">{snip.title}</div>}
                      <pre>{snip.code}</pre>
                    </div>
                  ))}

                  {/* Suggested Actions */}
                  {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                    <div className="pt-2 border-t border-[#F0ECE1] flex flex-wrap gap-1.5">
                      {msg.suggestedActions.map((action, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(action)}
                          className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-[#FAF8F5] border border-[#DCD6C9] hover:border-[#C76A2A] text-[#1B1B1B] hover:text-[#C76A2A] transition-all"
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-xl bg-[#C76A2A] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-3 items-center text-xs text-[#787774]">
                <div className="w-8 h-8 rounded-xl bg-[#1B1B1B] text-[#C76A2A] flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 animate-spin" />
                </div>
                <span>Dr. Evelyn Vance is analyzing your telemetry & formulating guidance...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-[#E8E5DD]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Ask Dr. Evelyn Vance for guidance, architecture advice, or interview practice..."
                className="flex-1 p-2.5 rounded-xl border border-[#DCD6C9] focus:outline-none focus:border-[#C76A2A] text-xs font-sans"
              />
              <button
                type="submit"
                disabled={loading || !inputQuery.trim()}
                className="p-2.5 rounded-xl bg-[#1B1B1B] hover:bg-[#333] text-white disabled:opacity-50 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
