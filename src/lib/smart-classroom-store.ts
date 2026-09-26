import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type RoomType = 'Live Classroom' | 'Lab Session' | 'Workshop' | 'Discussion Session' | 'Project Review Session';
export type UserClassroomRole = 'Faculty' | 'Student' | 'TA' | 'Admin';

export interface PollOption {
  id: string;
  text: string;
  count: number;
}

export interface LivePoll {
  id: string;
  question: string;
  type: 'mcq' | 'short_answer' | 'long_answer' | 'code' | 'file' | 'image';
  options?: PollOption[];
  allowFileUpload?: boolean;
  correctAnswer?: string;
  status: 'active' | 'closed';
  totalVotes: number;
  userResponses: Record<string, string>; // userId -> response
}

export interface DoubtQuestion {
  id: string;
  authorId: string;
  authorName: string;
  avatarUrl?: string;
  text: string;
  isAnonymous: boolean;
  upvotes: number;
  upvotedBy: string[];
  isResolved: boolean;
  resolvedBy?: string;
  timestamp: string;
}

export interface StudentAttendance {
  id: string;
  studentId: string;
  name: string;
  email: string;
  avatarUrl?: string;
  department: string;
  joinTime: string;
  attendanceStatus: 'Present' | 'Late' | 'Absent';
  participationScore: number; // 0-100
  engagementScore: number; // 0-100
  handRaised: boolean;
  lastReaction?: string;
}

export interface AIClassroomMetrics {
  understoodPct: number; // e.g. 82
  partialPct: number; // e.g. 12
  confusedPct: number; // e.g. 6
  weakConcepts: { concept: string; percentage: number; recommendation: string }[];
  misconceptions: { misconception: string; clarification: string }[];
  faqs: { question: string; answer: string; frequency: number }[];
  knowledgeGaps: string[];
}

export interface PostClassReport {
  roomId: string;
  roomCode: string;
  title: string;
  facultyName: string;
  date: string;
  totalEnrolled: number;
  totalAttended: number;
  attendanceRate: number;
  avgParticipation: number;
  avgUnderstanding: number;
  topicHeatmap: { topic: string; score: number; status: 'Mastered' | 'Review Needed' | 'Critical Gap' }[];
  weakStudents: { studentId: string; name: string; score: number; keyGap: string }[];
  strongStudents: { studentId: string; name: string; score: number; potentialRole: string }[];
  autoNotes: {
    lectureSummary: string;
    keyConcepts: string[];
    actionItems: string[];
    homeworkSuggestions: string[];
    revisionSuggestions: string[];
  };
  generatedQuiz: {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }[];
}

export interface SmartRoom {
  id: string;
  code: string; // e.g. JAVA-3A-2026
  title: string;
  subject: string;
  department: string;
  type: RoomType;
  facultyName: string;
  facultyAvatar?: string;
  taNames: string[];
  status: 'live' | 'upcoming' | 'ended';
  scheduledTime?: string;
  uniqueLink: string;
  qrCodeUrl: string;
  attendeesCount: number;
  activePollId?: string;
  polls: LivePoll[];
  doubts: DoubtQuestion[];
  attendees: StudentAttendance[];
  aiMetrics: AIClassroomMetrics;
  report?: PostClassReport;
  createdAt: string;
}

interface SmartClassroomState {
  rooms: SmartRoom[];
  activeRoomCode: string | null;
  currentUserRole: UserClassroomRole;
  
  // Actions
  setCurrentUserRole: (role: UserClassroomRole) => void;
  createRoom: (roomData: Omit<SmartRoom, 'id' | 'polls' | 'doubts' | 'attendees' | 'aiMetrics' | 'attendeesCount' | 'createdAt'>) => SmartRoom;
  getRoomByCode: (code: string) => SmartRoom | undefined;
  joinRoom: (code: string, studentInfo: { studentId: string; name: string; email: string; avatarUrl?: string; department: string }) => boolean;
  leaveRoom: (code: string, studentId: string) => void;
  createPoll: (code: string, poll: Omit<LivePoll, 'id' | 'status' | 'totalVotes' | 'userResponses'>) => void;
  submitPollResponse: (code: string, pollId: string, userId: string, response: string) => void;
  closePoll: (code: string, pollId: string) => void;
  submitDoubt: (code: string, doubt: Omit<DoubtQuestion, 'id' | 'upvotes' | 'upvotedBy' | 'isResolved' | 'timestamp'>) => void;
  upvoteDoubt: (code: string, doubtId: string, userId: string) => void;
  toggleResolveDoubt: (code: string, doubtId: string) => void;
  toggleRaiseHand: (code: string, studentId: string) => void;
  sendReaction: (code: string, studentId: string, reactionEmoji: string) => void;
  generateReport: (code: string) => PostClassReport;
}

const DEFAULT_INITIAL_ROOMS: SmartRoom[] = [
  {
    id: 'room-101',
    code: 'JAVA-3A-2026',
    title: 'Advanced Java Microservices & Spring Boot Architecture',
    subject: 'Distributed Systems & Cloud Computing',
    department: 'CSE',
    type: 'Live Classroom',
    facultyName: 'Dr. Ramesh Sharma',
    facultyAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    taNames: ['Ananya Sen', 'Rahul Verma'],
    status: 'live',
    uniqueLink: 'https://skillbridge.edu/classroom/JAVA-3A-2026',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://skillbridge.edu/classroom/JAVA-3A-2026',
    attendeesCount: 48,
    polls: [
      {
        id: 'poll-1',
        question: 'What is the primary advantage of Spring Boot Auto-Configuration?',
        type: 'mcq',
        options: [
          { id: 'opt-1', text: 'Eliminates boilerplate XML & bean definitions', count: 34 },
          { id: 'opt-2', text: 'Replaces Java compiler with JIT engine', count: 6 },
          { id: 'opt-3', text: 'Enforces strictly monolithic DB transactions', count: 4 },
          { id: 'opt-4', text: 'Disables HTTP REST endpoints', count: 2 },
        ],
        correctAnswer: 'opt-1',
        status: 'active',
        totalVotes: 46,
        userResponses: {},
      },
    ],
    doubts: [
      {
        id: 'd-1',
        authorId: 'st-01',
        authorName: 'Manutej Reddy',
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
        text: 'How does Spring Boot resolve circular dependency issues during startup?',
        isAnonymous: false,
        upvotes: 12,
        upvotedBy: ['st-02', 'st-03', 'st-04'],
        isResolved: true,
        resolvedBy: 'Dr. Ramesh Sharma',
        timestamp: '14:15 PM',
      },
      {
        id: 'd-2',
        authorId: 'st-02',
        authorName: 'Priya Sharma',
        text: 'Can we configure `@Lazy` initialization on spring beans at global scope?',
        isAnonymous: true,
        upvotes: 8,
        upvotedBy: ['st-01', 'st-05'],
        isResolved: false,
        timestamp: '14:22 PM',
      },
    ],
    attendees: [
      {
        id: 'att-1',
        studentId: 'st-01',
        name: 'Manutej Reddy',
        email: 'manutej@hitam.edu',
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
        department: 'CSE',
        joinTime: '14:02 PM',
        attendanceStatus: 'Present',
        participationScore: 94,
        engagementScore: 98,
        handRaised: false,
        lastReaction: '👏',
      },
      {
        id: 'att-2',
        studentId: 'st-02',
        name: 'Priya Sharma',
        email: 'priya.s@hitam.edu',
        department: 'CSE',
        joinTime: '14:05 PM',
        attendanceStatus: 'Present',
        participationScore: 82,
        engagementScore: 86,
        handRaised: true,
        lastReaction: '💡',
      },
      {
        id: 'att-3',
        studentId: 'st-03',
        name: 'Karthik Raja',
        email: 'karthik.r@hitam.edu',
        department: 'IT',
        joinTime: '14:12 PM',
        attendanceStatus: 'Late',
        participationScore: 68,
        engagementScore: 72,
        handRaised: false,
      },
    ],
    aiMetrics: {
      understoodPct: 82,
      partialPct: 12,
      confusedPct: 6,
      weakConcepts: [
        { concept: 'Circular Dependency Resolution', percentage: 24, recommendation: 'Review @Lazy annotation and constructor injection patterns' },
        { concept: 'Custom Actuator Endpoints', percentage: 18, recommendation: 'Solve Actuator security exercise in Lab 4' },
      ],
      misconceptions: [
        { misconception: '@Component vs @Bean scope', clarification: '@Component is used for auto-detection, while @Bean creates instances inside @Configuration classes.' },
      ],
      faqs: [
        { question: 'When should we use @Autowired on constructors?', answer: 'From Spring 4.3+, constructor injection is automatic if a class has a single constructor.', frequency: 14 },
      ],
      knowledgeGaps: ['Bean Lifecycle Callbacks', 'Custom Health Indicators'],
    },
    createdAt: '2026-09-26T14:00:00Z',
  },
  {
    id: 'room-102',
    code: 'AI-LAB-4B',
    title: 'PyTorch Deep Learning & Transformer Attention Workshop',
    subject: 'Artificial Intelligence & Neural Networks',
    department: 'AIML',
    type: 'Lab Session',
    facultyName: 'Prof. S. K. Gupta',
    taNames: ['Vikram Patel'],
    status: 'upcoming',
    scheduledTime: 'Today at 4:00 PM',
    uniqueLink: 'https://skillbridge.edu/classroom/AI-LAB-4B',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://skillbridge.edu/classroom/AI-LAB-4B',
    attendeesCount: 36,
    polls: [],
    doubts: [],
    attendees: [],
    aiMetrics: {
      understoodPct: 90,
      partialPct: 8,
      confusedPct: 2,
      weakConcepts: [],
      misconceptions: [],
      faqs: [],
      knowledgeGaps: [],
    },
    createdAt: '2026-09-26T13:00:00Z',
  },
];

export const useSmartClassroomStore = create<SmartClassroomState>()(
  persist(
    (set, get) => ({
      rooms: DEFAULT_INITIAL_ROOMS,
      activeRoomCode: 'JAVA-3A-2026',
      currentUserRole: 'Faculty',

      setCurrentUserRole: (role) => set({ currentUserRole: role }),

      createRoom: (roomData) => {
        const id = `room-${Date.now()}`;
        const newRoom: SmartRoom = {
          ...roomData,
          id,
          attendeesCount: 0,
          polls: [],
          doubts: [],
          attendees: [],
          aiMetrics: {
            understoodPct: 85,
            partialPct: 10,
            confusedPct: 5,
            weakConcepts: [],
            misconceptions: [],
            faqs: [],
            knowledgeGaps: [],
          },
          createdAt: new Date().toISOString(),
        };

        set((state) => ({ rooms: [newRoom, ...state.rooms], activeRoomCode: newRoom.code }));
        return newRoom;
      },

      getRoomByCode: (code) => {
        return get().rooms.find((r) => r.code.toUpperCase() === code.toUpperCase());
      },

      joinRoom: (code, studentInfo) => {
        const room = get().rooms.find((r) => r.code.toUpperCase() === code.toUpperCase());
        if (!room) return false;

        const existing = room.attendees.find((a) => a.studentId === studentInfo.studentId);
        if (existing) return true;

        const newAttendee: StudentAttendance = {
          id: `att-${Date.now()}`,
          studentId: studentInfo.studentId,
          name: studentInfo.name,
          email: studentInfo.email,
          avatarUrl: studentInfo.avatarUrl,
          department: studentInfo.department || 'CSE',
          joinTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          attendanceStatus: 'Present',
          participationScore: 75,
          engagementScore: 80,
          handRaised: false,
        };

        const updatedRooms = get().rooms.map((r) => {
          if (r.code.toUpperCase() === code.toUpperCase()) {
            return {
              ...r,
              attendeesCount: r.attendeesCount + 1,
              attendees: [...r.attendees, newAttendee],
            };
          }
          return r;
        });

        set({ rooms: updatedRooms });
        return true;
      },

      leaveRoom: (code, studentId) => {
        const updatedRooms = get().rooms.map((r) => {
          if (r.code.toUpperCase() === code.toUpperCase()) {
            return {
              ...r,
              attendeesCount: Math.max(0, r.attendeesCount - 1),
              attendees: r.attendees.filter((a) => a.studentId !== studentId),
            };
          }
          return r;
        });
        set({ rooms: updatedRooms });
      },

      createPoll: (code, pollData) => {
        const pollId = `poll-${Date.now()}`;
        const newPoll: LivePoll = {
          ...pollData,
          id: pollId,
          status: 'active',
          totalVotes: 0,
          userResponses: {},
        };

        const updatedRooms = get().rooms.map((r) => {
          if (r.code.toUpperCase() === code.toUpperCase()) {
            return {
              ...r,
              activePollId: pollId,
              polls: [newPoll, ...r.polls],
            };
          }
          return r;
        });

        set({ rooms: updatedRooms });
      },

      submitPollResponse: (code, pollId, userId, response) => {
        const updatedRooms = get().rooms.map((r) => {
          if (r.code.toUpperCase() === code.toUpperCase()) {
            const updatedPolls = r.polls.map((p) => {
              if (p.id === pollId) {
                const prevResponse = p.userResponses[userId];
                const updatedResponses = { ...p.userResponses, [userId]: response };
                const totalVotes = Object.keys(updatedResponses).length;

                let updatedOptions = p.options;
                if (p.options) {
                  updatedOptions = p.options.map((opt) => {
                    let count = opt.count;
                    if (opt.id === response) count += 1;
                    if (prevResponse && opt.id === prevResponse) count -= 1;
                    return { ...opt, count: Math.max(0, count) };
                  });
                }

                return {
                  ...p,
                  options: updatedOptions,
                  totalVotes,
                  userResponses: updatedResponses,
                };
              }
              return p;
            });

            return { ...r, polls: updatedPolls };
          }
          return r;
        });

        set({ rooms: updatedRooms });
      },

      closePoll: (code, pollId) => {
        const updatedRooms = get().rooms.map((r) => {
          if (r.code.toUpperCase() === code.toUpperCase()) {
            const updatedPolls = r.polls.map((p) => (p.id === pollId ? { ...p, status: 'closed' as const } : p));
            return {
              ...r,
              activePollId: r.activePollId === pollId ? undefined : r.activePollId,
              polls: updatedPolls,
            };
          }
          return r;
        });

        set({ rooms: updatedRooms });
      },

      submitDoubt: (code, doubtData) => {
        const doubtId = `d-${Date.now()}`;
        const newDoubt: DoubtQuestion = {
          ...doubtData,
          id: doubtId,
          upvotes: 0,
          upvotedBy: [],
          isResolved: false,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        const updatedRooms = get().rooms.map((r) => {
          if (r.code.toUpperCase() === code.toUpperCase()) {
            return {
              ...r,
              doubts: [newDoubt, ...r.doubts],
            };
          }
          return r;
        });

        set({ rooms: updatedRooms });
      },

      upvoteDoubt: (code, doubtId, userId) => {
        const updatedRooms = get().rooms.map((r) => {
          if (r.code.toUpperCase() === code.toUpperCase()) {
            const updatedDoubts = r.doubts.map((d) => {
              if (d.id === doubtId) {
                const hasUpvoted = d.upvotedBy.includes(userId);
                const upvotedBy = hasUpvoted
                  ? d.upvotedBy.filter((id) => id !== userId)
                  : [...d.upvotedBy, userId];
                return {
                  ...d,
                  upvotes: upvotedBy.length,
                  upvotedBy,
                };
              }
              return d;
            });
            return { ...r, doubts: updatedDoubts };
          }
          return r;
        });

        set({ rooms: updatedRooms });
      },

      toggleResolveDoubt: (code, doubtId) => {
        const updatedRooms = get().rooms.map((r) => {
          if (r.code.toUpperCase() === code.toUpperCase()) {
            const updatedDoubts = r.doubts.map((d) => {
              if (d.id === doubtId) {
                return {
                  ...d,
                  isResolved: !d.isResolved,
                  resolvedBy: !d.isResolved ? 'Faculty Host' : undefined,
                };
              }
              return d;
            });
            return { ...r, doubts: updatedDoubts };
          }
          return r;
        });

        set({ rooms: updatedRooms });
      },

      toggleRaiseHand: (code, studentId) => {
        const updatedRooms = get().rooms.map((r) => {
          if (r.code.toUpperCase() === code.toUpperCase()) {
            const updatedAttendees = r.attendees.map((a) => {
              if (a.studentId === studentId) {
                return { ...a, handRaised: !a.handRaised };
              }
              return a;
            });
            return { ...r, attendees: updatedAttendees };
          }
          return r;
        });

        set({ rooms: updatedRooms });
      },

      sendReaction: (code, studentId, reactionEmoji) => {
        const updatedRooms = get().rooms.map((r) => {
          if (r.code.toUpperCase() === code.toUpperCase()) {
            const updatedAttendees = r.attendees.map((a) => {
              if (a.studentId === studentId) {
                return { ...a, lastReaction: reactionEmoji };
              }
              return a;
            });

            // Adjust AI metrics slightly dynamically
            let { understoodPct, partialPct, confusedPct } = r.aiMetrics;
            if (reactionEmoji === '👏' || reactionEmoji === '👍') {
              understoodPct = Math.min(98, understoodPct + 1);
              confusedPct = Math.max(2, confusedPct - 1);
            } else if (reactionEmoji === '🤔') {
              confusedPct = Math.min(30, confusedPct + 2);
              understoodPct = Math.max(50, understoodPct - 2);
            }

            return {
              ...r,
              attendees: updatedAttendees,
              aiMetrics: { ...r.aiMetrics, understoodPct, partialPct, confusedPct },
            };
          }
          return r;
        });

        set({ rooms: updatedRooms });
      },

      generateReport: (code) => {
        const room = get().rooms.find((r) => r.code.toUpperCase() === code.toUpperCase());
        if (!room) throw new Error('Room not found');

        const report: PostClassReport = {
          roomId: room.id,
          roomCode: room.code,
          title: room.title,
          facultyName: room.facultyName,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          totalEnrolled: 52,
          totalAttended: room.attendeesCount || 48,
          attendanceRate: Math.round(((room.attendeesCount || 48) / 52) * 100),
          avgParticipation: 88,
          avgUnderstanding: room.aiMetrics.understoodPct,
          topicHeatmap: [
            { topic: 'Spring Boot Dependency Injection', score: 92, status: 'Mastered' },
            { topic: 'Auto-Configuration & Spring Starters', score: 85, status: 'Mastered' },
            { topic: 'Circular Dependencies & @Lazy', score: 64, status: 'Review Needed' },
            { topic: 'Custom Actuator Metrics', score: 52, status: 'Critical Gap' },
          ],
          weakStudents: [
            { studentId: 'st-03', name: 'Karthik Raja', score: 68, keyGap: 'Circular Bean Dependency Resolution' },
            { studentId: 'st-09', name: 'Vikram Mehta', score: 62, keyGap: 'Spring Boot Actuator Customization' },
          ],
          strongStudents: [
            { studentId: 'st-01', name: 'Manutej Reddy', score: 98, potentialRole: 'Peer Mentor / TA Candidate' },
            { studentId: 'st-02', name: 'Priya Sharma', score: 94, potentialRole: 'Lab Group Leader' },
          ],
          autoNotes: {
            lectureSummary:
              'In today\'s session, Dr. Ramesh Sharma led a comprehensive deep-dive into Spring Boot Auto-Configuration mechanisms, Bean Scopes (@Component vs @Bean), circular dependency resolution using @Lazy, and custom Actuator endpoints for cloud observability.',
            keyConcepts: [
              'Auto-Configuration uses @ConditionalOnClass and spring.factories/AutoConfiguration.imports.',
              'Circular dependencies occur when Bean A requires Bean B and vice versa during constructor initialization.',
              'Use @Lazy annotation or Setter Injection to resolve circular dependency traps cleanly.',
              'Custom Health Indicators implement HealthIndicator interface and return Health.up() or Health.down().',
            ],
            actionItems: [
              'Complete Lab Exercise #4 on Custom Spring Actuator Endpoints before Friday 11:59 PM.',
              'Review peer solutions for Circular Dependency handling in the GitHub repository.',
            ],
            homeworkSuggestions: [
              'Refactor monolithic monolith service to use Spring Boot Starters.',
              'Implement custom HealthIndicator monitoring PostgreSQL connection pool depth.',
            ],
            revisionSuggestions: [
              'Re-watch 15-minute clip on @ConditionalOnMissingBean.',
              'Solve Spring Boot Core 10-Q Practice Assessment in Assessment Hub.',
            ],
          },
          generatedQuiz: [
            {
              id: 'q1',
              question: 'Which annotation is used to auto-configure beans only if a specific class is present on the classpath?',
              options: ['@ConditionalOnClass', '@ConditionalOnBean', '@ConditionalOnProperty', '@EnableAutoConfiguration'],
              correctAnswer: 0,
              explanation: '@ConditionalOnClass checks if the target class exists in the classpath before loading the configuration.',
            },
            {
              id: 'q2',
              question: 'How does Spring Boot handle circular dependency resolution when using constructor injection?',
              options: [
                'It ignores the loop automatically',
                'It throws BeanCurrentlyInCreationException unless @Lazy or setter injection is used',
                'It converts the beans to static singletons',
                'It compiles without error but fails at runtime on first method call',
              ],
              correctAnswer: 1,
              explanation: 'Constructor circular dependencies throw BeanCurrentlyInCreationException at startup unless broke with @Lazy.',
            },
          ],
        };

        const updatedRooms = get().rooms.map((r) => {
          if (r.code.toUpperCase() === code.toUpperCase()) {
            return { ...r, report };
          }
          return r;
        });

        set({ rooms: updatedRooms });
        return report;
      },
    }),
    {
      name: 'zero-smart-classroom-storage',
    }
  )
);
