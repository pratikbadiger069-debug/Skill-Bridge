export type ProjectType =
  | 'Personal'
  | 'Team'
  | 'Research'
  | 'Startup'
  | 'Hackathon'
  | 'Industry Challenge';

export type ProjectDifficulty =
  | 'Beginner'
  | 'Intermediate'
  | 'Advanced'
  | 'Industry-Level';

export type ProjectStatus =
  | 'In Development'
  | 'Code Review'
  | 'Verified'
  | 'Production Ready';

export interface ProjectContributor {
  id: string;
  name: string;
  avatar?: string;
  role: 'Lead Architect' | 'Frontend Engineer' | 'Backend Developer' | 'DevOps Specialist' | 'AI Engineer' | 'UI/UX Designer';
  commitsCount: number;
  linesAdded: number;
  linesDeleted: number;
  githubUsername: string;
}

export interface ProjectTask {
  id: string;
  title: string;
  assignee: string;
  status: 'To Do' | 'In Progress' | 'Code Review' | 'Done';
  priority: 'High' | 'Medium' | 'Low';
  dueDate?: string;
}

export interface ProjectIssue {
  id: string;
  issueNumber: number;
  title: string;
  author: string;
  status: 'Open' | 'Closed';
  createdAt: string;
  labels: string[];
}

export interface ProjectMilestone {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
  tasksCount: number;
  completedTasksCount: number;
}

export interface ProjectVerificationDetails {
  codeQualityScore: number; // 0-100
  documentationScore: number; // 0-100
  githubActivityScore: number; // 0-100
  deploymentStatus: 'Live Production' | 'Staging' | 'Not Deployed';
  deploymentUrl?: string;
  peerReviewsCount: number;
  facultyReviewer?: string;
  facultyGrade?: string;
  verifiedAt?: string;
}

export interface ProjectImpactBreakdown {
  overall: number; // 0-100
  complexity: number; // 0-20
  execution: number; // 0-20
  activity: number; // 0-15
  users: number; // 0-15
  documentation: number; // 0-15
  consistency: number; // 0-15
}

export interface ProjectChatMessage {
  id: string;
  sender: string;
  avatar?: string;
  text: string;
  timestamp: string;
  isAnnouncement?: boolean;
}

export interface ProjectHubItem {
  id: string;
  title: string;
  description: string;
  type: ProjectType;
  techStack: string[];
  difficulty: ProjectDifficulty;
  status: ProjectStatus;
  progressPercentage: number;
  repositoryUrl: string;
  demoUrl?: string;
  documentationUrl?: string;
  teamMembers: ProjectContributor[];
  tasks: ProjectTask[];
  issues: ProjectIssue[];
  milestones: ProjectMilestone[];
  verification: ProjectVerificationDetails;
  impactScore: ProjectImpactBreakdown;
  chatMessages: ProjectChatMessage[];
  screenshots: string[];
  starsCount: number;
  viewsCount: number;
  forksCount: number;
  createdAt: string;
  updatedAt: string;
}
