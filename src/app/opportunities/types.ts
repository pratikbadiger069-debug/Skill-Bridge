export type OpportunityType =
  | 'Internships'
  | 'Jobs'
  | 'Hackathons'
  | 'Research Programs'
  | 'Competitions'
  | 'Scholarships'
  | 'Fellowships'
  | 'Startup Opportunities'
  | 'Open Source Programs'
  | 'Campus Ambassador Programs'
  | 'Freelance Projects'
  | 'Industry Challenges';

export type ApplicationStage =
  | 'Applied'
  | 'Shortlisted'
  | 'Interview'
  | 'Selected'
  | 'Rejected'
  | 'Completed';

export interface SkillAlignmentItem {
  skill: string;
  requiredLevel: string;
  studentLevel: string;
  status: 'Matched' | 'Partial' | 'Missing';
  matchPct: number;
}

export interface OpportunityMatchBreakdown {
  overallMatchScore: number; // 0-100
  readinessScore: number; // 0-100
  skillAlignmentPct: number;
  projectAlignmentPct: number;
  githubAlignmentPct: number;
  assessmentAlignmentPct: number;
  builderScoreAlignmentPct: number;
  missingSkills: string[];
  matchedSkills: string[];
  recommendedProjectsToBuild: string[];
  recommendedAssessmentsToTake: string[];
  expectedReadinessGain: string;
}

export interface OpportunityItem {
  id: string;
  title: string;
  organization: string;
  logoUrl?: string;
  type: OpportunityType;
  description: string;
  eligibility: string;
  skillsRequired: string[];
  deadline: string;
  location: string;
  compensation: string; // e.g., "₹45,000 / month" or "₹14 LPA - ₹18 LPA"
  difficultyLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Industry-Level';
  applicationUrl: string;
  postedDate: string;
  match: OpportunityMatchBreakdown;
  saved?: boolean;
  applied?: boolean;
  applicationStage?: ApplicationStage;
  appliedDate?: string;
}

export interface ApplicationRecord {
  id: string;
  opportunityId: string;
  title: string;
  organization: string;
  stage: ApplicationStage;
  appliedDate: string;
  lastUpdatedDate: string;
  nextStep?: string;
  notes?: string;
}

export interface RecruiterBuilderCard {
  id: string;
  name: string;
  avatar?: string;
  role: string;
  builderScore: number;
  verifiedProjectsCount: number;
  commitsCount: number;
  passedAssessmentsCount: number;
  communityContributionsCount: number;
  skills: string[];
  matchScoreForRole: number;
  status: 'Available' | 'In Discussions' | 'Placed';
}
