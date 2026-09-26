import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type NotificationType =
  | 'Assessment'
  | 'Project'
  | 'Community'
  | 'Mentorship'
  | 'Opportunities'
  | 'Classroom'
  | 'System'
  | 'Achievement';

export type NotificationPriority = 'Critical' | 'Important' | 'Normal' | 'Low Priority';

export type NotificationChannel = 'In-App' | 'Email' | 'Push' | 'AI';

export interface AppNotification {
  id: string;
  type: NotificationType;
  priority: NotificationPriority;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionLabel?: string;
  actionUrl?: string;
  iconName?: string;
  isAINotification?: boolean;
  aiContext?: {
    recommendationReason: string;
    impactPts?: number;
  };
}

export interface NotificationSettings {
  categoryPreferences: Record<NotificationType, boolean>;
  emailDigestFrequency: 'Instant' | 'Daily Digest' | 'Weekly Digest' | 'Disabled';
  quietHoursEnabled: boolean;
  quietHoursStart: string; // e.g. "22:00"
  quietHoursEnd: string; // e.g. "07:00"
  pushEnabled: boolean;
  aiInsightsEnabled: boolean;
}

interface NotificationState {
  notifications: AppNotification[];
  settings: NotificationSettings;
  unreadCount: number;

  // Actions
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  addNotification: (notif: Omit<AppNotification, 'id' | 'timestamp' | 'isRead'>) => void;
  updateSettings: (newSettings: Partial<NotificationSettings>) => void;
  toggleCategory: (category: NotificationType) => void;
}

const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    type: 'Classroom',
    priority: 'Critical',
    title: 'Live Smart Classroom Started: JAVA-3A-2026',
    message: 'Dr. Ramesh Sharma started session "Spring Boot Auto-Configuration & Circuit Breakers". Join live now to participate in MCQs.',
    timestamp: 'Just now',
    isRead: false,
    actionLabel: 'Enter Classroom',
    actionUrl: '/classroom/JAVA-3A-2026',
    iconName: 'Video',
  },
  {
    id: 'notif-2',
    type: 'Opportunities',
    priority: 'Critical',
    title: 'New AI Opportunity Match: NVIDIA Research Fellow',
    message: 'Your Builder Score (890) matches 96% of the requirements for high-performance AI GPU kernel sabbatical fellowship.',
    timestamp: '15 mins ago',
    isRead: false,
    actionLabel: 'Apply Now',
    actionUrl: '/opportunities',
    isAINotification: true,
    aiContext: {
      recommendationReason: 'Matched based on high C++ CUDA score & 8 completed projects.',
      impactPts: 45,
    },
  },
  {
    id: 'notif-3',
    type: 'Assessment',
    priority: 'Important',
    title: 'Assignment Due in 6 Hours: Lab 4 Resilience4j',
    message: 'Lab 4 Circuit Breaker submission deadline is today at 11:59 PM. 28/52 classmates have submitted.',
    timestamp: '1 hour ago',
    isRead: false,
    actionLabel: 'Upload Code',
    actionUrl: '/student/assessments',
    iconName: 'Clock',
  },
  {
    id: 'notif-4',
    type: 'Project',
    priority: 'Important',
    title: 'Project Verified: ZERO-OS Event Broker',
    message: 'Faculty Dr. Radhika signed 6-point cryptographic verification badge with 98/100 impact score.',
    timestamp: '3 hours ago',
    isRead: true,
    actionLabel: 'View Badge',
    actionUrl: '/projects',
    iconName: 'ShieldCheck',
  },
  {
    id: 'notif-5',
    type: 'Community',
    priority: 'Normal',
    title: 'Team Invitation: SIH 2026 AI Squad',
    message: 'Priya Sharma invited you to join team "Neural Vision" as Lead Backend Architect.',
    timestamp: '5 hours ago',
    isRead: true,
    actionLabel: 'Accept Invitation',
    actionUrl: '/community',
    iconName: 'Users2',
  },
  {
    id: 'notif-6',
    type: 'Mentorship',
    priority: 'Normal',
    title: 'Mentor Response: Office Hours Session Confirmed',
    message: 'Dr. Ramesh Sharma confirmed 1-on-1 capstone architecture clinic tomorrow at 11:00 AM.',
    timestamp: 'Yesterday',
    isRead: true,
    actionLabel: 'View Slot',
    actionUrl: '/community',
    iconName: 'Calendar',
  },
  {
    id: 'notif-7',
    type: 'Achievement',
    priority: 'Normal',
    title: 'Builder Score Milestone: Top 5% Global Rank',
    message: 'Your Builder Score increased to 890 pts following your hackathon repo verification (+45 pts).',
    timestamp: '2 days ago',
    isRead: true,
    actionLabel: 'View Passport',
    actionUrl: '/student/verified-passport',
    isAINotification: true,
    aiContext: {
      recommendationReason: 'Consistent commits & 100% assessment pass rate.',
      impactPts: 45,
    },
  },
  {
    id: 'notif-8',
    type: 'System',
    priority: 'Low Priority',
    title: 'System Maintenance Completed',
    message: 'SkillBridge vector indexing server upgraded for faster recruiter search queries.',
    timestamp: '3 days ago',
    isRead: true,
  },
];

const INITIAL_SETTINGS: NotificationSettings = {
  categoryPreferences: {
    Assessment: true,
    Project: true,
    Community: true,
    Mentorship: true,
    Opportunities: true,
    Classroom: true,
    System: true,
    Achievement: true,
  },
  emailDigestFrequency: 'Daily Digest',
  quietHoursEnabled: true,
  quietHoursStart: '22:00',
  quietHoursEnd: '07:00',
  pushEnabled: true,
  aiInsightsEnabled: true,
};

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      notifications: INITIAL_NOTIFICATIONS,
      settings: INITIAL_SETTINGS,
      unreadCount: INITIAL_NOTIFICATIONS.filter((n) => !n.isRead).length,

      markAsRead: (id) => {
        const updated = get().notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n));
        set({ notifications: updated, unreadCount: updated.filter((n) => !n.isRead).length });
      },

      markAllAsRead: () => {
        const updated = get().notifications.map((n) => ({ ...n, isRead: true }));
        set({ notifications: updated, unreadCount: 0 });
      },

      deleteNotification: (id) => {
        const updated = get().notifications.filter((n) => n.id !== id);
        set({ notifications: updated, unreadCount: updated.filter((n) => !n.isRead).length });
      },

      addNotification: (notifData) => {
        const newNotif: AppNotification = {
          ...notifData,
          id: `notif-${Date.now()}`,
          timestamp: 'Just now',
          isRead: false,
        };
        const updated = [newNotif, ...get().notifications];
        set({ notifications: updated, unreadCount: updated.filter((n) => !n.isRead).length });
      },

      updateSettings: (newSettings) => {
        set({ settings: { ...get().settings, ...newSettings } });
      },

      toggleCategory: (category) => {
        const currentPrefs = get().settings.categoryPreferences;
        set({
          settings: {
            ...get().settings,
            categoryPreferences: {
              ...currentPrefs,
              [category]: !currentPrefs[category],
            },
          },
        });
      },
    }),
    {
      name: 'zero-notification-system-storage',
    }
  )
);
