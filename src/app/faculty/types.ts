export interface FacultyClass {
  id: string;
  code: string; // e.g. CS-301
  title: string;
  department: string;
  semester: string;
  enrolledStudents: number;
  avgAttendanceRate: number;
  avgBuilderScore: number;
  nextSessionTime: string;
  activeAssignmentsCount: number;
}

export interface StudentRecord {
  id: string;
  name: string;
  rollNumber: string;
  department: string;
  email: string;
  avatarUrl?: string;
  builderScore: number;
  attendanceRate: number; // e.g. 92
  assessmentAvg: number; // e.g. 88
  githubCommitsThisMonth: number;
  projectsCompleted: number;
  participationIndex: number; // 0-100
  riskStatus: 'Safe' | 'Watchlist' | 'High Risk';
  riskReason?: string;
  weakTopics: string[];
}

export interface AssignmentItem {
  id: string;
  title: string;
  classCode: string;
  dueDate: string;
  totalPoints: number;
  submissionsCount: number;
  totalStudents: number;
  evaluatedCount: number;
  status: 'Active' | 'Draft' | 'Graded' | 'Past Due';
  techStack: string[];
  rubricCriteria: { name: string; maxPoints: number; description: string }[];
}

export interface StudentSubmission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  submittedAt: string;
  status: 'Pending Evaluation' | 'Evaluated' | 'Late';
  repoUrl?: string;
  demoUrl?: string;
  notes?: string;
  score?: number;
  facultyFeedback?: string;
  rubricScores?: Record<string, number>;
}

export interface UpcomingSession {
  id: string;
  title: string;
  classCode: string;
  time: string;
  type: 'Live Lecture' | 'Lab Session' | 'Office Hours' | 'Capstone Review';
  roomCode?: string;
}

export interface AIHelpStudent {
  studentId: string;
  name: string;
  classCode: string;
  builderScore: number;
  primaryStruggle: string;
  suggestedAction: string;
  riskLevel: 'High' | 'Medium' | 'Low';
}

export interface CommonConfusion {
  topic: string;
  classCode: string;
  doubtCount: number;
  affectedPct: number;
  sampleQuestion: string;
  aiClarification: string;
}
