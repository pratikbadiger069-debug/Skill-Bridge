import {
  AdminUser,
  QuestionBankItem,
  AdminAssessmentConfig,
  CommunityModerationItem,
  AdminProjectReview,
  AdminOpportunityItem,
  SecurityAuditLog,
  SystemFeatureFlag,
} from './types';

export const MOCK_ADMIN_USERS: AdminUser[] = [
  {
    id: 'usr-1',
    name: 'Manutej Reddy',
    email: 'manutej@hitam.edu',
    role: 'Student',
    department: 'Computer Science & Engineering',
    status: 'Active',
    lastLogin: '2 mins ago',
    joinedDate: '2025-08-15',
  },
  {
    id: 'usr-2',
    name: 'Dr. Ramesh Sharma',
    email: 'ramesh.sharma@hitam.edu',
    role: 'Faculty',
    department: 'Computer Science & Engineering',
    status: 'Active',
    lastLogin: '15 mins ago',
    joinedDate: '2024-01-10',
  },
  {
    id: 'usr-3',
    name: 'Sarah Jenkins',
    email: 'sarah.j@nvidia.com',
    role: 'Recruiter',
    status: 'Active',
    lastLogin: '1 hour ago',
    joinedDate: '2025-03-22',
  },
  {
    id: 'usr-4',
    name: 'Karthik Raja',
    email: 'karthik.r@hitam.edu',
    role: 'Student',
    department: 'Information Technology',
    status: 'Suspended',
    lastLogin: '3 days ago',
    joinedDate: '2025-09-01',
  },
  {
    id: 'usr-5',
    name: 'Admin System Control',
    email: 'admin@skillbridge.edu',
    role: 'Admin',
    status: 'Active',
    lastLogin: 'Just now',
    joinedDate: '2023-01-01',
  },
];

export const MOCK_QUESTION_BANK: QuestionBankItem[] = [
  {
    id: 'qb-1',
    question: 'How does Spring Boot resolve circular dependency traps during context startup?',
    category: 'Backend & Spring Boot',
    difficulty: 'Advanced',
    xpReward: 150,
    tags: ['Java', 'Spring Boot', 'Architecture'],
  },
  {
    id: 'qb-2',
    question: 'Explain QLoRA parameter-efficient fine-tuning for 8B model architectures.',
    category: 'Artificial Intelligence & LLMs',
    difficulty: 'Expert',
    xpReward: 300,
    tags: ['PyTorch', 'HuggingFace', 'LoRA'],
  },
  {
    id: 'qb-3',
    question: 'What is the function of Kafka Consumer Group offset commits in partition rebalancing?',
    category: 'Distributed Systems',
    difficulty: 'Intermediate',
    xpReward: 100,
    tags: ['Kafka', 'Distributed Systems'],
  },
];

export const MOCK_ADMIN_ASSESSMENTS: AdminAssessmentConfig[] = [
  {
    id: 'asm-1',
    title: 'Spring Boot & Resilient Microservices Master Benchmark',
    category: 'Backend Development',
    difficulty: 'Advanced',
    xpReward: 500,
    certificationEligible: true,
    maxAttempts: 3,
    totalQuestions: 25,
    passingPercentage: 75,
  },
  {
    id: 'asm-2',
    title: 'PyTorch Neural Network Training & Transformer Attention',
    category: 'AI & Machine Learning',
    difficulty: 'Expert',
    xpReward: 750,
    certificationEligible: true,
    maxAttempts: 2,
    totalQuestions: 30,
    passingPercentage: 80,
  },
];

export const MOCK_COMMUNITY_MODERATION: CommunityModerationItem[] = [
  {
    id: 'mod-1',
    type: 'Post',
    title: 'Showcase: Built a real-time Distributed Telemetry Pipeline in Go & Kafka',
    author: 'Manutej Reddy',
    status: 'Approved',
    createdAt: '2 hours ago',
  },
  {
    id: 'mod-2',
    type: 'Post',
    title: 'Promotional spam for paid telegram signals',
    author: 'Unknown User',
    flagReason: 'Automated spam filter triggered (Telegram link)',
    status: 'Flagged',
    createdAt: '5 mins ago',
  },
  {
    id: 'mod-3',
    type: 'Team',
    title: 'SIH 2026 AI Healthcare Hackathon Squad',
    author: 'Priya Sharma',
    status: 'Approved',
    createdAt: 'Yesterday',
  },
];

export const MOCK_ADMIN_PROJECTS: AdminProjectReview[] = [
  {
    id: 'prj-1',
    title: 'ZERO-OS: Cloud Native Distributed Event Broker',
    authorName: 'Manutej Reddy',
    techStack: ['Go', 'Kafka', 'Docker', 'Kubernetes'],
    verificationScore: 98,
    isFeatured: true,
    status: 'Verified',
    githubUrl: 'https://github.com/manutej/zero-os',
  },
  {
    id: 'prj-2',
    title: 'Neural Vision RAG Diagnostic Engine',
    authorName: 'Priya Sharma',
    techStack: ['PyTorch', 'FastAPI', 'Pinecone', 'React'],
    verificationScore: 94,
    isFeatured: true,
    status: 'Verified',
    githubUrl: 'https://github.com/priya/neural-vision',
  },
];

export const MOCK_ADMIN_OPPORTUNITIES: AdminOpportunityItem[] = [
  {
    id: 'opp-1',
    title: 'Autonomous AI Systems Research Fellowship',
    company: 'NVIDIA Research',
    type: 'Internship',
    location: 'Bengaluru / Hybrid',
    applicantsCount: 142,
    status: 'Active',
    createdAt: '3 days ago',
  },
  {
    id: 'opp-2',
    title: 'Backend Systems Engineer — Distributed Routing',
    company: 'Razorpay',
    type: 'Full-time Job',
    location: 'Bengaluru',
    applicantsCount: 98,
    status: 'Active',
    createdAt: '1 week ago',
  },
];

export const MOCK_SECURITY_LOGS: SecurityAuditLog[] = [
  {
    id: 'log-1',
    timestamp: '2026-09-26 15:10:42',
    ipAddress: '192.168.1.104',
    userEmail: 'admin@skillbridge.edu',
    action: 'Admin Privilege Elevated Session',
    status: 'Success',
    location: 'Hyderabad, IN',
  },
  {
    id: 'log-2',
    timestamp: '2026-09-26 14:52:10',
    ipAddress: '45.12.89.201',
    userEmail: 'unknown@external-scanner.com',
    action: 'Failed Login Attempt (Brute Force Detected)',
    status: 'Suspicious',
    location: 'Frankfurt, DE',
  },
  {
    id: 'log-3',
    timestamp: '2026-09-26 14:20:15',
    ipAddress: '103.22.45.12',
    userEmail: 'karthik.r@hitam.edu',
    action: 'Account Suspended Action Enforced',
    status: 'Success',
    location: 'Hyderabad, IN',
  },
];

export const MOCK_FEATURE_FLAGS: SystemFeatureFlag[] = [
  {
    id: 'ff-1',
    key: 'ENABLE_AI_CAREER_COPILOT',
    name: 'AI Career Copilot Engine',
    description: 'Enable real-time AI roadmap and interview prep suite for students.',
    enabled: true,
  },
  {
    id: 'ff-[#ff-2]',
    key: 'ENABLE_ZERO_COMMUNITY_NO_LIKES',
    name: 'ZERO Ecosystem Appreciation Engine',
    description: 'Replace standard likes with appreciations, endorsements, and peer code reviews.',
    enabled: true,
  },
  {
    id: 'ff-[#ff-3]',
    key: 'ENABLE_DYNAMIC_QR_ATTENDANCE',
    name: 'Smart Classroom Dynamic QR Check-in',
    description: 'Allow faculty to broadcast dynamic 30-second QR codes for instant attendance.',
    enabled: true,
  },
];
