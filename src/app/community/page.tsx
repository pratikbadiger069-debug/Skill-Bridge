'use client';

import React, { useState } from 'react';
import { PortalLayout } from '@/components/layout/PortalLayout';
import {
  MOCK_FEED_POSTS,
  MOCK_TALENT,
  MOCK_MENTORS,
  MOCK_CHALLENGES,
  MOCK_EVENTS,
  MOCK_ZERO_REPUTATION,
} from './mock-community';
import {
  FeedPost,
  BuilderTalent,
  MentorProfile,
  CommunityChallenge,
  CommunityEvent,
  ZeroReputationProfile,
} from './types';

import { CommunityHeader } from './components/CommunityHeader';
import { BuilderFeedView } from './components/BuilderFeedView';
import { TeamFormationView } from './components/TeamFormationView';
import { MentorshipHubView } from './components/MentorshipHubView';
import { ChallengesView } from './components/ChallengesView';
import { ReputationXPView } from './components/ReputationXPView';
import { EventsView } from './components/EventsView';
import { ZeroProfileView } from './components/ZeroProfileView';
import { GuidelinesView } from './components/GuidelinesView';
import { PostProgressModal } from './components/PostProgressModal';
import { BookSessionModal } from './components/BookSessionModal';

import {
  Users2,
  Newspaper,
  UserPlus,
  BookOpen,
  Trophy,
  Calendar,
  Award,
  User,
  ShieldCheck,
} from 'lucide-react';

export default function ZeroCommunityPage() {
  const [feedPosts, setFeedPosts] = useState<FeedPost[]>(MOCK_FEED_POSTS);
  const [reputation, setReputation] = useState<ZeroReputationProfile>(MOCK_ZERO_REPUTATION);

  const [activeModule, setActiveModule] = useState<
    'feed' | 'teams' | 'mentorship' | 'challenges' | 'events' | 'reputation' | 'profile' | 'guidelines'
  >('feed');

  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState<MentorProfile>(MOCK_MENTORS[0]);

  const handleUpdatePost = (updated: FeedPost) => {
    setFeedPosts((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
  };

  const handleAddPost = (newPost: FeedPost) => {
    setFeedPosts((prev) => [newPost, ...prev]);
    setReputation((prev) => ({
      ...prev,
      contributionScore: prev.contributionScore + 25,
      communityXp: prev.communityXp + 25,
    }));
  };

  const handleBookSession = (mentor: MentorProfile) => {
    setSelectedMentor(mentor);
    setIsBookModalOpen(true);
  };

  const handleInviteTalent = (talent: BuilderTalent) => {
    alert(`Team invitation sent to ${talent.name} (@${talent.handle})!`);
  };

  const handleEnterChallenge = (challenge: CommunityChallenge) => {
    alert(`Successfully registered for challenge: "${challenge.title}"! (+${challenge.xpReward} XP upon completion)`);
  };

  const handleRegisterEvent = (event: CommunityEvent) => {
    alert(`Registered for event: "${event.title}" on ${event.dateTime}!`);
  };

  const modules = [
    { id: 'feed', label: 'Builder Feed', icon: Newspaper, badge: 'No Likes' },
    { id: 'teams', label: 'Team Formation', icon: UserPlus, badge: 'Skill Match' },
    { id: 'mentorship', label: 'Mentorship', icon: BookOpen, badge: 'Office Hours' },
    { id: 'challenges', label: 'Challenges', icon: Trophy, badge: 'Sprints' },
    { id: 'events', label: 'Events', icon: Calendar, badge: 'Live' },
    { id: 'reputation', label: 'Reputation & XP', icon: Award, badge: 'Formula' },
    { id: 'profile', label: 'ZERO Profile', icon: User, badge: 'Passport' },
    { id: 'guidelines', label: 'Guidelines', icon: ShieldCheck, badge: '6 Rules' },
  ];

  return (
    <PortalLayout>
      <div className="space-y-6">
        {/* Top Community Ecosystem Header */}
        <CommunityHeader
          reputation={reputation}
          onPostUpdate={() => setIsPostModalOpen(true)}
        />

        {/* 8 Community Modules Navigation Bar */}
        <div className="bg-white rounded-2xl p-2 border border-[#E8E5DD] shadow-xs flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {modules.map((m) => {
            const Icon = m.icon;
            const isSelected = activeModule === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setActiveModule(m.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  isSelected
                    ? 'bg-[#1B1B1B] text-white shadow-xs'
                    : 'text-[#575653] hover:text-[#1B1B1B] hover:bg-[#FAF8F5]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-[#C76A2A]' : 'text-[#787774]'}`} />
                <span>{m.label}</span>
                <span
                  className={`px-1.5 py-0.5 text-[9px] font-mono rounded ${
                    isSelected
                      ? 'bg-[#C76A2A] text-white'
                      : 'bg-[#FAF8F5] text-[#787774] border border-[#E8E5DD]'
                  }`}
                >
                  {m.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Module Content View */}
        <div>
          {activeModule === 'feed' && (
            <BuilderFeedView
              posts={feedPosts}
              onUpdatePost={handleUpdatePost}
            />
          )}

          {activeModule === 'teams' && (
            <TeamFormationView
              talent={MOCK_TALENT}
              onInviteTalent={handleInviteTalent}
            />
          )}

          {activeModule === 'mentorship' && (
            <MentorshipHubView
              mentors={MOCK_MENTORS}
              onBookSession={handleBookSession}
            />
          )}

          {activeModule === 'challenges' && (
            <ChallengesView
              challenges={MOCK_CHALLENGES}
              onEnterChallenge={handleEnterChallenge}
            />
          )}

          {activeModule === 'events' && (
            <EventsView
              events={MOCK_EVENTS}
              onRegisterEvent={handleRegisterEvent}
            />
          )}

          {activeModule === 'reputation' && (
            <ReputationXPView reputation={reputation} />
          )}

          {activeModule === 'profile' && (
            <ZeroProfileView reputation={reputation} />
          )}

          {activeModule === 'guidelines' && (
            <GuidelinesView />
          )}
        </div>
      </div>

      {/* Post Builder Progress Modal */}
      <PostProgressModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        onSubmit={handleAddPost}
      />

      {/* Book Mentorship Session Modal */}
      <BookSessionModal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
        mentor={selectedMentor}
      />
    </PortalLayout>
  );
}
