export type AssessmentType =
  | 'MCQ'
  | 'Coding'
  | 'Debugging'
  | 'Case Study'
  | 'Scenario Analysis'
  | 'Project Evaluation'
  | 'Communication Evaluation';

export type AssessmentDifficulty = 'Easy' | 'Medium' | 'Advanced' | 'Expert';

export interface AntiCheatingLog {
  tabSwitches: number;
  copyPasteAttempts: number;
  rapidClicks: number; // <500ms response
  uniformPatternDetected: boolean;
  trustScore: number; // 0-100%
  flaggedForReview: boolean;
}

export interface SkillVerificationSource {
  name: 'Assessment' | 'Project' | 'GitHub' | 'Community Validation';
  weightPct: number;
  score: number; // 0-100
}

export interface SkillConfidenceMatrix {
  skill: string;
  levelPct: number; // e.g. 82%
  confidencePct: number; // e.g. 91%
  sources: SkillVerificationSource[];
  lastUpdated: string;
}

// STRICT PASSING THRESHOLDS PER DIFFICULTY
export const PASSING_THRESHOLDS: Record<AssessmentDifficulty, number> = {
  Easy: 60,
  Medium: 70,
  Advanced: 75,
  Expert: 80,
};

// BASE XP REWARDS PER DIFFICULTY
export const BASE_XP_REWARDS: Record<AssessmentDifficulty, number> = {
  Easy: 50,
  Medium: 100,
  Advanced: 175,
  Expert: 250,
};

/**
 * Calculates XP earned based strictly on score and passing threshold.
 * Score 90-100 -> 100% XP
 * Score 80-89 -> 80% XP
 * Score 70-79 -> 50% XP
 * Below Passing Threshold -> 0 XP (No participation points!)
 */
export function calculateStrictXP(score: number, difficulty: AssessmentDifficulty): { xpEarned: number; passed: boolean; scalingPct: number } {
  const threshold = PASSING_THRESHOLDS[difficulty];
  const baseXP = BASE_XP_REWARDS[difficulty];

  if (score < threshold) {
    return { xpEarned: 0, passed: false, scalingPct: 0 };
  }

  let scalingPct = 0.5; // Default 50% for passing
  if (score >= 90) {
    scalingPct = 1.0;
  } else if (score >= 80) {
    scalingPct = 0.8;
  } else if (score >= 70) {
    scalingPct = 0.5;
  }

  const xpEarned = Math.round(baseXP * scalingPct);
  return { xpEarned, passed: true, scalingPct: Math.round(scalingPct * 100) };
}

/**
 * Calculates Builder Score Impact (15 to 40 points upon passing)
 */
export function calculateBuilderScoreImpact(score: number, passed: boolean, difficulty: AssessmentDifficulty): number {
  if (!passed) return 0;
  const difficultyMultiplier: Record<AssessmentDifficulty, number> = {
    Easy: 1.0,
    Medium: 1.25,
    Advanced: 1.5,
    Expert: 2.0,
  };
  return Math.min(40, Math.round(15 + (score / 100) * 10 * difficultyMultiplier[difficulty]));
}

/**
 * Shuffles array deterministically / randomly for question pool & options
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Evaluates Anti-Cheating logs & produces trust score
 */
export function evaluateAntiCheatingLogs(logs: {
  tabSwitches: number;
  copyPasteAttempts: number;
  rapidClicks: number;
  uniformPatternDetected: boolean;
}): AntiCheatingLog {
  let trustScore = 100;
  trustScore -= logs.tabSwitches * 10;
  trustScore -= logs.copyPasteAttempts * 15;
  trustScore -= logs.rapidClicks * 8;
  if (logs.uniformPatternDetected) trustScore -= 20;

  trustScore = Math.max(0, trustScore);
  const flaggedForReview = trustScore < 70;

  return {
    ...logs,
    trustScore,
    flaggedForReview,
  };
}

/**
 * Calculates dynamic Skill Confidence % based on 4 verification sources
 */
export function calculateSkillConfidence(
  skill: string,
  assessmentScore: number,
  projectScore = 85,
  githubScore = 88,
  communityScore = 90
): SkillConfidenceMatrix {
  const sources: SkillVerificationSource[] = [
    { name: 'Assessment', weightPct: 40, score: assessmentScore },
    { name: 'Project', weightPct: 30, score: projectScore },
    { name: 'GitHub', weightPct: 15, score: githubScore },
    { name: 'Community Validation', weightPct: 15, score: communityScore },
  ];

  const weightedSum = sources.reduce((acc, s) => acc + (s.score * s.weightPct) / 100, 0);
  const levelPct = Math.round(weightedSum);
  const confidencePct = Math.min(99, Math.round(weightedSum * 1.08));

  return {
    skill,
    levelPct,
    confidencePct,
    sources,
    lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
  };
}
