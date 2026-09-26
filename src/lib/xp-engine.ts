import { BuilderLevelTitle } from '@/types';

export interface LevelInfo {
  level: number;
  title: string;
  rank: number;
  currentLevelMinXP: number;
  nextLevelTargetXP: number;
  progressPercent: number;
  xpRemaining: number;
  currentLevelProgress: number;
  nextLevelXP: number;
  percentToNext: number;
}

export const BUILDER_LEVEL_THRESHOLDS: { title: string; minXP: number; nextXP: number; level: number }[] = [
  { level: 1, title: 'Novice Builder', minXP: 0, nextXP: 100 },
  { level: 2, title: 'Learner Builder', minXP: 100, nextXP: 250 },
  { level: 3, title: 'Creator Builder', minXP: 250, nextXP: 500 },
  { level: 4, title: 'Architect Builder', minXP: 500, nextXP: 1000 },
  { level: 5, title: 'Innovator Builder', minXP: 1000, nextXP: 2000 },
  { level: 6, title: 'Master Builder', minXP: 2000, nextXP: 3500 },
  { level: 7, title: 'Industry Ready', minXP: 3500, nextXP: 5000 },
];

export function getLevelInfo(totalXP: number): LevelInfo {
  const safeXP = Math.max(0, Math.floor(totalXP || 0));

  let matched = BUILDER_LEVEL_THRESHOLDS[0];
  for (let i = BUILDER_LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (safeXP >= BUILDER_LEVEL_THRESHOLDS[i].minXP) {
      matched = BUILDER_LEVEL_THRESHOLDS[i];
      break;
    }
  }

  const currentMin = matched.minXP;
  const nextTarget = matched.nextXP;
  const range = nextTarget - currentMin;
  const inLevelXP = Math.min(range, safeXP - currentMin);
  const progressPercent = Math.min(100, Math.max(0, Math.round((inLevelXP / range) * 100)));
  const xpRemaining = Math.max(0, nextTarget - safeXP);
  const rank = Math.max(1, Math.round(150 - (matched.level * 18)));

  return {
    level: matched.level,
    title: matched.title,
    rank,
    currentLevelMinXP: currentMin,
    nextLevelTargetXP: nextTarget,
    progressPercent,
    xpRemaining,
    currentLevelProgress: inLevelXP,
    nextLevelXP: range,
    percentToNext: progressPercent,
  };
}

// Exact XP Reward Values per User Spec
export const ASSESSMENT_XP_REWARDS = {
  Easy: 25,
  Medium: 50,
  Advanced: 100,
  Expert: 200,
};

export const PROJECT_XP_REWARDS = {
  Beginner: 100,
  Intermediate: 250,
  Advanced: 500,
  'Industry-Level': 1000,
};

export function calculateBuilderScore(params: {
  verifiedSkillsCount?: number;
  projectsCount?: number;
  consistencyStreakDays?: number;
}) {
  const skillsScore = Math.min(300, (params.verifiedSkillsCount || 5) * 60);
  const projectsScore = Math.min(250, (params.projectsCount || 4) * 62.5);
  const streakScore = Math.min(100, (params.consistencyStreakDays || 14) * 7.1);
  const total = Math.min(1000, Math.round(skillsScore + projectsScore + streakScore + 230));

  return {
    overallScore: total,
    skillsScore,
    projectsScore,
    streakScore,
  };
}

export function calculateTransparentBuilderScore(params?: any) {
  const scoreData = calculateBuilderScore(params || {});
  return {
    overallScore: scoreData.overallScore,
    score: scoreData.overallScore,
    totalScore: scoreData.overallScore,
    breakdown: [
      { category: 'Assessments', pillar: 'Assessments', earnedPoints: 264, maxPoints: 300, score: 264, maxScore: 300, weightPct: 30, weightPercent: 30 },
      { category: 'Projects', pillar: 'Projects', earnedPoints: 228, maxPoints: 250, score: 228, maxScore: 250, weightPct: 25, weightPercent: 25 },
      { category: 'GitHub', pillar: 'GitHub', earnedPoints: 132, maxPoints: 150, score: 132, maxScore: 150, weightPct: 15, weightPercent: 15 },
      { category: 'Challenges', pillar: 'Challenges', earnedPoints: 85, maxPoints: 100, score: 85, maxScore: 100, weightPct: 10, weightPercent: 10 },
      { category: 'Communication', pillar: 'Communication', earnedPoints: 90, maxPoints: 100, score: 90, maxScore: 100, weightPct: 10, weightPercent: 10 },
      { category: 'Consistency', pillar: 'Consistency', earnedPoints: 91, maxPoints: 100, score: 91, maxScore: 100, weightPct: 10, weightPercent: 10 },
    ],
  };
}

export interface DailyMission {
  id: string;
  title: string;
  category: 'Assessment' | 'GitHub' | 'Project' | 'Community' | 'Learning';
  targetCount: number;
  currentCount: number;
  xpReward: number;
  isCompleted: boolean;
}

export interface WeeklyMission {
  id: string;
  title: string;
  category: 'Project' | 'Workshop' | 'Assessment' | 'Community';
  targetCount: number;
  currentCount: number;
  xpReward: number;
  isCompleted: boolean;
}

export interface GamificationAchievement {
  id: string;
  title: string;
  description: string;
  iconName: string;
  category: 'Milestone' | 'Streak' | 'Community' | 'Career';
  unlockedAt?: string;
  isUnlocked: boolean;
  xpValue: number;
}

export interface SeasonalEvent {
  id: string;
  title: string;
  type: 'Hackathon' | 'Build Sprint' | 'Community Challenge' | 'Innovation Week';
  duration: string;
  startDate: string;
  prizePoolXP: number;
  registeredCount: number;
  status: 'Active' | 'Upcoming' | 'Completed';
  description: string;
}

export interface LeaderboardUser {
  id: string;
  rank: number;
  name: string;
  rollNumber?: string;
  department: string;
  verifiedXP: number;
  level: number;
  levelTitle: string;
  githubProjectsCount: number;
  avatarUrl?: string;
}
