export type UserRole = 'Student' | 'Faculty' | 'Recruiter' | 'Admin';
export type UserAccountStatus = 'Active' | 'Suspended' | 'Pending Verification';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  status: UserAccountStatus;
  lastLogin: string;
  joinedDate: string;
  avatarUrl?: string;
}

export interface QuestionBankItem {
  id: string;
  question: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  xpReward: number;
  tags: string[];
}

export interface AdminAssessmentConfig {
  id: string;
  title: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  xpReward: number;
  certificationEligible: boolean;
  maxAttempts: number;
  totalQuestions: number;
  passingPercentage: number;
}

export interface CommunityModerationItem {
  id: string;
  type: 'Post' | 'Team' | 'Event' | 'Challenge' | 'Mentorship';
  title: string;
  author: string;
  flagReason?: string;
  status: 'Approved' | 'Flagged' | 'Archived';
  createdAt: string;
}

export interface AdminProjectReview {
  id: string;
  title: string;
  authorName: string;
  techStack: string[];
  verificationScore: number;
  isFeatured: boolean;
  status: 'Pending Review' | 'Verified' | 'Rejected';
  githubUrl: string;
}

export interface AdminOpportunityItem {
  id: string;
  title: string;
  company: string;
  type: string;
  location: string;
  applicantsCount: number;
  status: 'Active' | 'Archived' | 'Draft';
  createdAt: string;
}

export interface SecurityAuditLog {
  id: string;
  timestamp: string;
  ipAddress: string;
  userEmail: string;
  action: string;
  status: 'Success' | 'Failed' | 'Suspicious';
  location: string;
}

export interface SystemFeatureFlag {
  id: string;
  key: string;
  name: string;
  description: string;
  enabled: boolean;
}
