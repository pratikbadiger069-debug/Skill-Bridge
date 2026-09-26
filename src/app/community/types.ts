export type FeedPostCategory =
  | 'Project Update'
  | 'Achievement'
  | 'Milestone'
  | 'Hackathon Win'
  | 'Open Opportunity'
  | 'Mentorship Post';

export interface FeedPost {
  id: string;
  authorName: string;
  authorAvatar?: string;
  authorHandle: string;
  authorRole: string;
  authorTrustScore: number;
  category: FeedPostCategory;
  title: string;
  content: string;
  codeSnippet?: { language: string; code: string };
  projectLink?: string;
  repositoryUrl?: string;
  appreciationsCount: number;
  endorsementsCount: number;
  reviewsCount: number;
  userAppreciated?: boolean;
  userEndorsed?: boolean;
  reviews: { id: string; reviewerName: string; text: string; rating: number; timestamp: string }[];
  timestamp: string;
}

export type TeamSearchRole =
  | 'Find Builders'
  | 'Find Designers'
  | 'Find Developers'
  | 'Find Researchers'
  | 'Find Founders';

export interface BuilderTalent {
  id: string;
  name: string;
  avatar?: string;
  handle: string;
  primaryRole: string;
  skills: string[];
  reputationScore: number;
  builderLevel: string;
  availableForTeams: boolean;
  bio: string;
  matchedScore?: number;
}

export interface MentorProfile {
  id: string;
  name: string;
  avatar?: string;
  title: string;
  companyOrDept: string;
  expertise: string[];
  rating: number; // 0-5
  totalSessions: number;
  availableSlots: string[];
  bio: string;
}

export type ChallengeCategory =
  | 'Weekly Challenge'
  | 'Monthly Challenge'
  | 'Hackathon'
  | 'Build Sprint'
  | 'Innovation Challenge';

export interface CommunityChallenge {
  id: string;
  title: string;
  category: ChallengeCategory;
  description: string;
  xpReward: number;
  deadline: string;
  participantsCount: number;
  sponsor: string;
  tags: string[];
}

export type EventCategory =
  | 'Workshop'
  | 'Hackathon'
  | 'Tech Talk'
  | 'Founder Session'
  | 'Founder Sessions'
  | 'Industry Session'
  | 'Industry Sessions';

export interface CommunityEvent {
  id: string;
  title: string;
  category: EventCategory;
  hostName: string;
  hostRole: string;
  dateTime: string;
  duration: string;
  venueOrUrl: string;
  attendeesCount: number;
  registered: boolean;
  description: string;
}

export interface ZeroReputationProfile {
  builderReputation: number; // 0-100
  mentorReputation: number; // 0-100
  communityImpact: number; // 0-100
  contributionScore: number; // Pts
  trustScore: number; // %
  communityXp: number;
  unlockedBadges: { title: string; category: string; date: string }[];
  mentorshipHistory: { sessionTitle: string; menteeName: string; date: string; rating: number }[];
}
