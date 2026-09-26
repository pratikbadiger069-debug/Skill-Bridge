'use client';

import React, { useState } from 'react';
import {
  Video,
  Plus,
  HelpCircle,
  BarChart3,
  Users,
  CheckCircle2,
  Sparkles,
  FileText,
  StopCircle,
  Send,
  Download,
  Flame,
  Award,
  BookOpen,
} from 'lucide-react';
import { useSmartClassroomStore, SmartRoom } from '@/lib/smart-classroom-store';

interface SmartClassroomControlViewProps {
  selectedRoomCode?: string;
  onSelectRoom: (code: string) => void;
}

export const SmartClassroomControlView: React.FC<SmartClassroomControlViewProps> = ({
  selectedRoomCode = 'JAVA-3A-2026',
  onSelectRoom,
}) => {
  const { rooms, createRoom, createPoll, closePoll, generateReport } = useSmartClassroomStore();
  const [activePollQuestion, setActivePollQuestion] = useState('');
  const [opt1, setOpt1] = useState('');
  const [opt2, setOpt2] = useState('');
  const [opt3, setOpt3] = useState('');
  const [opt4, setOpt4] = useState('');
  const [showPollCreator, setShowPollCreator] = useState(false);
  const [viewReportModal, setViewReportModal] = useState(false);

  const room = rooms.find((r) => r.code.toUpperCase() === selectedRoomCode.toUpperCase()) || rooms[0];

  const handleLaunchPoll = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activePollQuestion || !opt1 || !opt2) return;

    createPoll(room.code, {
      question: activePollQuestion,
      type: 'mcq',
      options: [
        { id: 'opt-1', text: opt1, count: 0 },
        { id: 'opt-2', text: opt2, count: 0 },
        ...(opt3 ? [{ id: 'opt-3', text: opt3, count: 0 }] : []),
        ...(opt4 ? [{ id: 'opt-4', text: opt4, count: 0 }] : []),
      ],
      correctAnswer: 'opt-1',
    });

    setActivePollQuestion('');
    setOpt1('');
    setOpt2('');
    setOpt3('');
    setOpt4('');
    setShowPollCreator(false);
  };

  const handleGenerateReportClick = () => {
    generateReport(room.code);
    setViewReportModal(true);
  };

  const activePoll = room.polls.find((p) => p.status === 'active');

  return (
    <div className="space-y-6">
      {/* Top Selector & Live Status Banner */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2F7A45] animate-pulse" />
            <span className="px-2.5 py-0.5 rounded-md bg-[#1B1B1B] text-white text-xs font-mono font-bold">
              {room.code}
            </span>
            <span className="text-xs font-bold text-[#2F7A45] bg-[#2F7A45]/10 px-2.5 py-0.5 rounded-full">
              Live Room Control Center
            </span>
          </div>
          <h2 className="text-xl font-bold text-[#1B1B1B] mt-1">{room.title}</h2>
          <p className="text-xs text-[#6F6A60] mt-0.5">Faculty Host: {room.facultyName} • Department: {room.department}</p>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto shrink-0">
          {rooms.map((r) => (
            <button
              key={r.id}
              onClick={() => onSelectRoom(r.code)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                room.code === r.code
                  ? 'bg-[#1B1B1B] text-white shadow-xs'
                  : 'bg-[#FAF9F5] border border-[#E8E5DD] text-[#6F6A60] hover:text-[#1B1B1B]'
              }`}
            >
              {r.code}
            </button>
          ))}
        </div>
      </div>

      {/* Control Panel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Live Telemetry, Active Polls, Participation */}
        <div className="lg:col-span-2 space-y-6">
          {/* Real-Time Live Responses & Poll Manager */}
          <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E5DD]">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#C76A2A]" />
                <h3 className="text-base font-bold text-[#1B1B1B]">Live Poll &amp; Quiz Responses</h3>
              </div>
              <button
                onClick={() => setShowPollCreator(true)}
                className="px-3.5 py-1.5 bg-[#C76A2A] text-white text-xs font-bold rounded-xl hover:bg-[#b05a22] transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Start Poll</span>
              </button>
            </div>

            {activePoll ? (
              <div className="p-5 rounded-2xl bg-[#FAF9F5] border border-[#E8E5DD] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#2F7A45]/10 text-[#2F7A45] text-xs font-bold font-mono">
                    Active Poll ({activePoll.totalVotes} Votes Recorded)
                  </span>
                  <button
                    onClick={() => closePoll(room.code, activePoll.id)}
                    className="text-xs font-bold text-red-600 hover:underline cursor-pointer"
                  >
                    End Poll
                  </button>
                </div>

                <h4 className="text-sm font-bold text-[#1B1B1B]">{activePoll.question}</h4>

                <div className="space-y-2.5 text-xs">
                  {activePoll.options?.map((opt) => {
                    const pct = activePoll.totalVotes > 0 ? Math.round((opt.count / activePoll.totalVotes) * 100) : 0;
                    return (
                      <div key={opt.id} className="space-y-1">
                        <div className="flex items-center justify-between text-xs font-medium">
                          <span className="text-[#1B1B1B] font-semibold">{opt.text}</span>
                          <span className="font-mono font-bold text-[#C76A2A]">{opt.count} votes ({pct}%)</span>
                        </div>
                        <div className="w-full h-2.5 bg-[#E8E5DD] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#C76A2A] rounded-full transition-all duration-300"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-[#FAF9F5] border border-dashed border-[#E8E5DD] text-center space-y-2">
                <HelpCircle className="w-8 h-8 text-[#6F6A60] mx-auto" />
                <p className="text-xs font-bold text-[#1B1B1B]">No Active Poll Running Right Now</p>
                <p className="text-xs text-[#6F6A60]">Launch an instant poll or micro-quiz to measure student understanding in real-time.</p>
              </div>
            )}
          </div>

          {/* Student Participation & Hand Raised Queue */}
          <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E5DD]">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#2F7A45]" />
                <h3 className="text-base font-bold text-[#1B1B1B]">Track Participation ({room.attendees.length} Live)</h3>
              </div>
              <span className="text-xs font-mono font-bold text-[#2F7A45] bg-[#2F7A45]/10 px-3 py-1 rounded-full">
                88% Avg Participation
              </span>
            </div>

            <div className="space-y-3">
              {room.attendees.map((att) => (
                <div
                  key={att.id}
                  className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#E8E5DD] flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#1B1B1B] text-white font-bold flex items-center justify-center text-xs">
                      {att.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <strong className="text-[#1B1B1B] font-bold block">{att.name}</strong>
                      <span className="text-[10px] text-[#6F6A60]">Joined at {att.joinTime} • {att.department}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {att.handRaised && (
                      <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-700 text-[10px] font-bold flex items-center gap-1">
                        ✋ Hand Raised
                      </span>
                    )}

                    <div className="text-right font-mono">
                      <span className="text-xs font-bold text-[#2F7A45] block">{att.participationScore}% Score</span>
                      <span className="text-[10px] text-[#6F6A60]">{att.attendanceStatus}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: AI Live Understanding Metrics & Actions */}
        <div className="space-y-6">
          {/* AI Understanding Telemetry Gauge */}
          <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E5DD]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C76A2A]" />
                <h3 className="text-base font-bold text-[#1B1B1B]">AI Classroom Diagnostic</h3>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 bg-[#FAF9F5] rounded-2xl border border-[#E8E5DD] space-y-2">
                <div className="flex justify-between items-center font-bold">
                  <span className="text-[#1B1B1B]">Concept Understanding</span>
                  <span className="font-mono text-[#2F7A45] text-base">{room.aiMetrics.understoodPct}%</span>
                </div>
                <div className="w-full h-2 bg-[#E8E5DD] rounded-full overflow-hidden">
                  <div className="h-full bg-[#2F7A45]" style={{ width: `${room.aiMetrics.understoodPct}%` }} />
                </div>
              </div>

              <div className="p-3.5 bg-[#FAF9F5] rounded-2xl border border-[#E8E5DD] space-y-1">
                <strong className="text-[#1B1B1B] text-xs block">Detected Weak Concept:</strong>
                <p className="text-[#6F6A60] text-xs">
                  {room.aiMetrics.weakConcepts[0]?.concept || 'Circular Dependency Resolution'} ({room.aiMetrics.weakConcepts[0]?.percentage || 24}% confused)
                </p>
              </div>
            </div>
          </div>

          {/* Session Control Buttons */}
          <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] space-y-3">
            <h3 className="text-sm font-bold text-[#1B1B1B]">Session Controls</h3>

            <button
              onClick={handleGenerateReportClick}
              className="w-full py-3 rounded-2xl bg-[#1B1B1B] text-white text-xs font-bold hover:bg-[#C76A2A] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <FileText className="w-4 h-4" />
              <span>Generate AI Post-Class Report</span>
            </button>

            <button
              onClick={handleGenerateReportClick}
              className="w-full py-2.5 rounded-2xl bg-[#FAF9F5] border border-[#E8E5DD] text-red-600 text-xs font-bold hover:bg-red-50 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <StopCircle className="w-4 h-4" />
              <span>End Session &amp; Export Summary</span>
            </button>
          </div>
        </div>
      </div>

      {/* Start Poll Modal */}
      {showPollCreator && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 border border-[#E8E5DD] shadow-2xl">
            <h3 className="text-base font-bold text-[#1B1B1B]">Launch Live MCQ Poll</h3>
            <form onSubmit={handleLaunchPoll} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-[#1B1B1B] block mb-1">Poll Question</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. What is the default scope of a Spring Bean?"
                  value={activePollQuestion}
                  onChange={(e) => setActivePollQuestion(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD] focus:outline-none focus:border-[#1B1B1B]"
                />
              </div>

              <div>
                <label className="font-bold text-[#1B1B1B] block mb-1">Option 1 (Correct)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Singleton"
                  value={opt1}
                  onChange={(e) => setOpt1(e.target.value)}
                  className="w-full p-2 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD]"
                />
              </div>

              <div>
                <label className="font-bold text-[#1B1B1B] block mb-1">Option 2</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Prototype"
                  value={opt2}
                  onChange={(e) => setOpt2(e.target.value)}
                  className="w-full p-2 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD]"
                />
              </div>

              <div>
                <label className="font-bold text-[#6F6A60] block mb-1">Option 3 (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Request"
                  value={opt3}
                  onChange={(e) => setOpt3(e.target.value)}
                  className="w-full p-2 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowPollCreator(false)}
                  className="px-3 py-2 rounded-xl bg-[#FAF9F5] text-[#6F6A60] font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#C76A2A] text-white font-bold hover:bg-[#b05a22]"
                >
                  Broadcast Live
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Post-Class AI Report Modal */}
      {viewReportModal && room.report && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 space-y-5 border border-[#E8E5DD] shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E5DD]">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#2F7A45]/10 text-[#2F7A45] text-[10px] font-mono font-bold uppercase">
                  AI Generated Report
                </span>
                <h3 className="text-lg font-bold text-[#1B1B1B] mt-1">{room.report.title}</h3>
              </div>
              <button onClick={() => setViewReportModal(false)} className="text-xs font-bold text-[#6F6A60]">Close</button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-[#FAF9F5] rounded-2xl text-center">
                  <span className="text-[10px] text-[#6F6A60] font-bold block">Attendance</span>
                  <strong className="text-base font-mono text-[#2F7A45]">{room.report.attendanceRate}%</strong>
                </div>
                <div className="p-3 bg-[#FAF9F5] rounded-2xl text-center">
                  <span className="text-[10px] text-[#6F6A60] font-bold block">Avg Understanding</span>
                  <strong className="text-base font-mono text-[#C76A2A]">{room.report.avgUnderstanding}%</strong>
                </div>
                <div className="p-3 bg-[#FAF9F5] rounded-2xl text-center">
                  <span className="text-[10px] text-[#6F6A60] font-bold block font-mono">Participation</span>
                  <strong className="text-base font-mono text-[#1B1B1B]">{room.report.avgParticipation}%</strong>
                </div>
              </div>

              <div className="p-4 bg-[#FAF9F5] rounded-2xl space-y-2">
                <strong className="text-[#1B1B1B] block">Lecture AI Summary:</strong>
                <p className="text-[#6F6A60] leading-relaxed">{room.report.autoNotes.lectureSummary}</p>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => alert('Downloading official Session Report PDF...')}
                  className="px-4 py-2 bg-[#1B1B1B] text-white rounded-xl font-bold flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF Report</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
