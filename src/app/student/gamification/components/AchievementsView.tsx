'use client';

import React from 'react';
import {
  FolderGit2,
  Award,
  GitCommit,
  Zap,
  Flame,
  Users,
  Trophy,
  ShieldCheck,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { GamificationAchievement } from '@/lib/xp-engine';

interface AchievementsViewProps {
  achievements: GamificationAchievement[];
}

export const AchievementsView: React.FC<AchievementsViewProps> = ({ achievements }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'FolderGit2':
        return FolderGit2;
      case 'Award':
        return Award;
      case 'GitCommit':
        return GitCommit;
      case 'Zap':
        return Zap;
      case 'Flame':
        return Flame;
      case 'Users':
        return Users;
      case 'Trophy':
        return Trophy;
      case 'ShieldCheck':
        return ShieldCheck;
      default:
        return Award;
    }
  };

  return (
    <div className="space-y-6 text-xs">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#1B1B1B]">Capability Achievements &amp; Cryptographic Badges</h2>
          <p className="text-xs text-[#6F6A60] mt-0.5">
            Earned milestone credentials backed by verifiable proof on the ZERO × SkillBridge network.
          </p>
        </div>
      </div>

      {/* 8 Achievements Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {achievements.map((ach) => {
          const Icon = getIcon(ach.iconName);
          return (
            <div
              key={ach.id}
              className={`p-5 rounded-3xl border transition-all space-y-3 flex flex-col justify-between ${
                ach.isUnlocked
                  ? 'bg-white border-[#1B1B1B] shadow-xs'
                  : 'bg-[#FAF9F5] border-[#E8E5DD] opacity-70'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold ${
                      ach.isUnlocked ? 'bg-[#1B1B1B] text-white' : 'bg-[#E8E5DD] text-[#6F6A60]'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <span className="font-mono font-bold text-[#2F7A45] text-xs">+{ach.xpValue} XP</span>
                </div>

                <h3 className="text-sm font-bold text-[#1B1B1B]">{ach.title}</h3>
                <p className="text-[#6F6A60] leading-relaxed text-[11px]">{ach.description}</p>
              </div>

              <div className="pt-3 border-t border-[#E8E5DD] flex items-center justify-between font-mono text-[10px]">
                {ach.isUnlocked ? (
                  <span className="text-[#2F7A45] font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Unlocked {ach.unlockedAt}
                  </span>
                ) : (
                  <span className="text-[#6F6A60] flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5" /> Locked
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
