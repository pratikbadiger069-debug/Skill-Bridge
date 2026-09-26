export interface BuilderScoreCategoryBreakdown {
  category: 'Assessments' | 'Projects' | 'GitHub' | 'Challenges' | 'Communication' | 'Consistency';
  weightPct: number; // e.g. 30 for 30%
  maxPoints: number; // e.g. 300
  earnedPoints: number; // e.g. 264
  scorePercentage: number; // e.g. 88
  factors: {
    name: string;
    value: string;
    impactPoints: number;
    maxImpact: number;
    explanation: string;
  }[];
  improvementTips: string[];
}

export interface AntiManipulationFlag {
  id: string;
  type: 'Spam Commits' | 'Fake Repositories' | 'Assessment Abuse' | 'Fake Activity' | 'Duplicate Projects' | 'XP Farming';
  severity: 'Clean' | 'Warning' | 'Flagged Penalty';
  penaltyPointsDeducted: number;
  description: string;
  detectedAt: string;
}

export interface ScoreHistoryPoint {
  date: string;
  score: number;
  change: number;
  reason: string;
  milestone?: string;
  rank: number;
}

export interface BuilderLevelTier {
  level: number;
  title: string;
  minScore: number;
  maxScore: number;
  badgeColor: string;
  description: string;
}

export const BUILDER_SCORE_LEVELS: BuilderLevelTier[] = [
  { level: 1, title: 'Novice Builder', minScore: 0, maxScore: 100, badgeColor: 'bg-slate-700 text-white', description: 'Starting builder journey & completing foundational diagnostics.' },
  { level: 2, title: 'Learner Builder', minScore: 101, maxScore: 250, badgeColor: 'bg-blue-600 text-white', description: 'Acquiring core programming syntax & passing beginner micro-quizzes.' },
  { level: 3, title: 'Active Builder', minScore: 251, maxScore: 400, badgeColor: 'bg-indigo-600 text-white', description: 'Building full-stack projects & maintaining active GitHub commit streaks.' },
  { level: 4, title: 'Verified Builder', minScore: 401, maxScore: 550, badgeColor: 'bg-emerald-600 text-white', description: 'Faculty-signed code verification & proven assessment mastery.' },
  { level: 5, title: 'Advanced Builder', minScore: 551, maxScore: 700, badgeColor: 'bg-amber-600 text-white', description: 'Deploying cloud microservices & winning community hackathons.' },
  { level: 6, title: 'Master Builder', minScore: 701, maxScore: 850, badgeColor: 'bg-[#C76A2A] text-white', description: 'Industry-verified capstones, open source contributions & peer mentorship.' },
  { level: 7, title: 'Industry Ready Builder', minScore: 851, maxScore: 1000, badgeColor: 'bg-[#2F7A45] text-white', description: 'Top-tier enterprise qualified builder ready for immediate high-impact roles.' },
];

export function getBuilderLevel(score: number): BuilderLevelTier {
  const safeScore = Math.max(0, Math.min(1000, Math.round(score)));
  for (let i = BUILDER_SCORE_LEVELS.length - 1; i >= 0; i--) {
    if (safeScore >= BUILDER_SCORE_LEVELS[i].minScore) {
      return BUILDER_SCORE_LEVELS[i];
    }
  }
  return BUILDER_SCORE_LEVELS[0];
}

export const MOCK_BUILDER_SCORE_BREAKDOWN: BuilderScoreCategoryBreakdown[] = [
  {
    category: 'Assessments',
    weightPct: 30,
    maxPoints: 300,
    earnedPoints: 264,
    scorePercentage: 88,
    factors: [
      { name: 'Expert & Advanced Benchmark Pass Rate', value: '92.4%', impactPoints: 110, maxImpact: 120, explanation: 'Passed 4 Expert level tests on first attempt.' },
      { name: 'Attempt Efficiency Factor', value: '1.2 avg attempts', impactPoints: 75, maxImpact: 80, explanation: 'Low retake ratio indicates genuine understanding.' },
      { name: 'Confidence Score Weight', value: '94/100', impactPoints: 79, maxImpact: 100, explanation: 'High confidence on complex algorithm questions.' },
    ],
    improvementTips: [
      'Take the Expert PyTorch Attention Mechanism benchmark to earn +16 pts in Assessments.',
      'Maintain first-try pass rate above 90% to maximize attempt efficiency bonus.',
    ],
  },
  {
    category: 'Projects',
    weightPct: 25,
    maxPoints: 250,
    earnedPoints: 228,
    scorePercentage: 91.2,
    factors: [
      { name: 'Faculty Cryptographic Verification', value: 'Signed by Dr. Radhika', impactPoints: 70, maxImpact: 70, explanation: 'Faculty verified code architecture and repository validity.' },
      { name: 'Deployment & Live URL', value: 'Production HTTPS Active', impactPoints: 50, maxImpact: 50, explanation: 'Project deployed with active health-check endpoints.' },
      { name: 'Code Quality & Documentation', value: 'A+ Audit Score', impactPoints: 60, maxImpact: 70, explanation: 'Clean modular structure, unit test suite & OpenAPI specs.' },
      { name: 'Industry Partner Endorsements', value: 'Razorpay Systems Team', impactPoints: 48, maxImpact: 60, explanation: 'Verified by enterprise software engineers.' },
    ],
    improvementTips: [
      'Add end-to-end integration tests to ZERO-OS project to reach max Code Quality points (+10 pts).',
      'Request secondary industry partner review on your Kafka pipeline repo.',
    ],
  },
  {
    category: 'GitHub',
    weightPct: 15,
    maxPoints: 150,
    earnedPoints: 132,
    scorePercentage: 88,
    factors: [
      { name: 'Commit Frequency & Consistency', value: '142 commits this month', impactPoints: 50, maxImpact: 50, explanation: 'Steady organic commits across 5 active repositories.' },
      { name: 'Open Source Contributions', value: '4 Pull Requests Merged', impactPoints: 42, maxImpact: 50, explanation: 'Merged PRs in community & enterprise repositories.' },
      { name: 'Repository Quality & Stars', value: '28 Stars, 6 Forks', impactPoints: 40, maxImpact: 50, explanation: 'High organic engagement on public GitHub repos.' },
    ],
    improvementTips: [
      'Contribute 1 additional PR to upstream open source repo to max OS contribution category (+8 pts).',
    ],
  },
  {
    category: 'Challenges',
    weightPct: 10,
    maxPoints: 100,
    earnedPoints: 85,
    scorePercentage: 85,
    factors: [
      { name: 'Hackathon Rank & Position', value: '1st Place SIH 2026', impactPoints: 50, maxImpact: 50, explanation: 'Winner of national AI Healthcare hackathon.' },
      { name: 'Company Coding Sprint Submissions', value: '3 Completed Sprints', impactPoints: 35, maxImpact: 50, explanation: 'Passed Razorpay & Intel corporate challenge tests.' },
    ],
    improvementTips: [
      'Join the upcoming NVIDIA Autonomous Systems Hackathon to gain remaining +15 pts.',
    ],
  },
  {
    category: 'Communication',
    weightPct: 10,
    maxPoints: 100,
    earnedPoints: 90,
    scorePercentage: 90,
    factors: [
      { name: 'Project Presentations & Pitch', value: 'Rated 4.9/5.0', impactPoints: 30, maxImpact: 30, explanation: 'Presented capstone architecture at campus Tech Summit.' },
      { name: 'Technical Writing & Docs', value: '4 Deep-Dive Articles', impactPoints: 30, maxImpact: 35, explanation: 'Published architectural articles on Spring Boot & Kafka.' },
      { name: 'Peer Code Reviews & Mentorship', value: '18 Code Reviews', impactPoints: 30, maxImpact: 35, explanation: 'Reviewed peer submissions in ZERO Community.' },
    ],
    improvementTips: [
      'Write 1 technical post on Spring Resilience4j circuit breakers (+5 pts).',
    ],
  },
  {
    category: 'Consistency',
    weightPct: 10,
    maxPoints: 100,
    earnedPoints: 91,
    scorePercentage: 91,
    factors: [
      { name: 'Weekly Activity Streak', value: '14 Consecutive Weeks', impactPoints: 45, maxImpact: 50, explanation: 'Active learning and building every single week.' },
      { name: 'Learning & Project Continuity', value: 'Zero Drop-off', impactPoints: 46, maxImpact: 50, explanation: 'Maintained continuous development on core capstones.' },
    ],
    improvementTips: [
      'Extend weekly streak to 16 weeks to reach max Consistency score (+9 pts).',
    ],
  },
];

export const MOCK_ANTI_MANIPULATION_FLAGS: AntiManipulationFlag[] = [
  {
    id: 'flag-1',
    type: 'Spam Commits',
    severity: 'Clean',
    penaltyPointsDeducted: 0,
    description: 'Commit message quality check passed. All 142 commits contain non-trivial code diffs.',
    detectedAt: '2026-09-26 14:00',
  },
  {
    id: 'flag-2',
    type: 'Assessment Abuse',
    severity: 'Clean',
    penaltyPointsDeducted: 0,
    description: 'IP & tab-switch telemetry normal. Zero automated bot patterns or copy-paste detected.',
    detectedAt: '2026-09-25 18:30',
  },
  {
    id: 'flag-3',
    type: 'XP Farming',
    severity: 'Clean',
    penaltyPointsDeducted: 0,
    description: 'No repetitive micro-task looping detected. Growth matches organic learning velocity.',
    detectedAt: '2026-09-24 10:15',
  },
];

export const MOCK_SCORE_HISTORY: ScoreHistoryPoint[] = [
  { date: '2026-05-01', score: 620, change: 0, reason: 'Initial Assessment Benchmark Passed', rank: 142 },
  { date: '2026-06-15', score: 710, change: 90, reason: 'Level 6 Master Builder Milestone & Project Verification', milestone: 'Master Builder', rank: 48 },
  { date: '2026-07-20', score: 790, change: 80, reason: '1st Place SIH 2026 Hackathon Win', milestone: 'Hackathon Champion', rank: 18 },
  { date: '2026-08-30', score: 845, change: 55, reason: 'Open Source PR Merged & 14-Week Streak', rank: 8 },
  { date: '2026-09-26', score: 890, change: 45, reason: 'Level 7 Industry Ready Milestone Unlocked', milestone: 'Industry Ready', rank: 4 },
];
