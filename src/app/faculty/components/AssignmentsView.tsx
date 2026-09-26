'use client';

import React, { useState } from 'react';
import {
  FileText,
  Plus,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  Award,
  X,
  PlusCircle,
  MessageSquare,
} from 'lucide-react';
import { AssignmentItem, StudentSubmission } from '../types';

interface AssignmentsViewProps {
  assignments: AssignmentItem[];
  submissions: StudentSubmission[];
  onCreateAssignment: (newAsg: Omit<AssignmentItem, 'id' | 'submissionsCount' | 'evaluatedCount'>) => void;
}

export const AssignmentsView: React.FC<AssignmentsViewProps> = ({
  assignments,
  submissions,
  onCreateAssignment,
}) => {
  const [selectedAsgId, setSelectedAsgId] = useState<string>('asg-1');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedSub, setSelectedSub] = useState<StudentSubmission | null>(null);

  // Form states for Create Assignment
  const [title, setTitle] = useState('');
  const [classCode, setClassCode] = useState('JAVA-3A');
  const [dueDate, setDueDate] = useState('');
  const [totalPoints, setTotalPoints] = useState('100');

  // Rubric evaluation state
  const [evalScore, setEvalScore] = useState<number>(90);
  const [feedback, setFeedback] = useState<string>('');

  const selectedAsg = assignments.find((a) => a.id === selectedAsgId) || assignments[0];
  const asgSubmissions = submissions.filter((s) => s.assignmentId === selectedAsg.id);

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !dueDate) return;

    onCreateAssignment({
      title,
      classCode,
      dueDate,
      totalPoints: parseInt(totalPoints) || 100,
      totalStudents: 52,
      status: 'Active',
      techStack: ['Spring Boot', 'PostgreSQL', 'Docker'],
      rubricCriteria: [
        { name: 'Core Architecture', maxPoints: 40, description: 'Design clean decoupled service modules.' },
        { name: 'Unit Test Coverage', maxPoints: 30, description: 'Minimum 80% coverage on domain logic.' },
        { name: 'Documentation & Config', maxPoints: 30, description: 'Docker compose file with seed script.' },
      ],
    });

    setTitle('');
    setShowCreateModal(false);
  };

  const handleSaveEvaluation = () => {
    if (!selectedSub) return;
    alert(`Successfully saved score (${evalScore}/100) and feedback for ${selectedSub.studentName}.`);
    setSelectedSub(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Controls */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#1B1B1B]">Assignments &amp; Automated Rubric Evaluator</h2>
          <p className="text-xs text-[#6F6A60] mt-0.5">
            Create practical coding assignments, set weighted rubric dimensions, track GitHub submissions, and grade code quality.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2.5 rounded-xl bg-[#C76A2A] text-white text-xs font-bold hover:bg-[#b05a22] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Create Assignment</span>
        </button>
      </div>

      {/* Main Grid: Assignment List & Submissions Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Assignment Catalog & Due Dates */}
        <div className="space-y-4">
          <div className="p-5 rounded-3xl bg-white border border-[#E8E5DD] space-y-3">
            <h3 className="text-sm font-bold text-[#1B1B1B]">Active &amp; Past Assignments</h3>

            <div className="space-y-3">
              {assignments.map((asg) => (
                <div
                  key={asg.id}
                  onClick={() => setSelectedAsgId(asg.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                    selectedAsgId === asg.id
                      ? 'bg-[#1B1B1B] text-white border-[#1B1B1B] shadow-md'
                      : 'bg-[#FAF9F5] border-[#E8E5DD] text-[#1B1B1B] hover:border-[#1B1B1B]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold ${
                        selectedAsgId === asg.id ? 'bg-white/20 text-white' : 'bg-[#1B1B1B] text-white'
                      }`}
                    >
                      {asg.classCode}
                    </span>
                    <span
                      className={`text-[10px] font-mono ${
                        selectedAsgId === asg.id ? 'text-emerald-300' : 'text-[#2F7A45]'
                      }`}
                    >
                      Due: {asg.dueDate}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold leading-snug">{asg.title}</h4>

                  <div className="pt-2 border-t border-current/10 flex items-center justify-between text-[11px]">
                    <span>{asg.submissionsCount} / {asg.totalStudents} Submissions</span>
                    <span className="font-mono font-bold">{asg.totalPoints} pts</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 2 Cols: Submission Tracking & Evaluation Workspace */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E8E5DD]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#1B1B1B] text-white text-[10px] font-mono font-bold">
                    {selectedAsg.classCode}
                  </span>
                  <span className="text-xs font-mono text-[#2F7A45]">Due Date: {selectedAsg.dueDate}</span>
                </div>
                <h3 className="text-lg font-bold text-[#1B1B1B] mt-1">{selectedAsg.title}</h3>
              </div>

              <div className="text-left sm:text-right font-mono text-xs">
                <strong className="text-[#C76A2A] block">{selectedAsg.submissionsCount} Submissions Received</strong>
                <span className="text-[#6F6A60]">{selectedAsg.evaluatedCount} Evaluated</span>
              </div>
            </div>

            {/* Rubric Definition Preview */}
            <div className="p-4 bg-[#FAF9F5] rounded-2xl border border-[#E8E5DD] space-y-3 text-xs">
              <strong className="text-[#1B1B1B] block font-bold">Evaluation Rubric Criteria ({selectedAsg.totalPoints} Points Total):</strong>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedAsg.rubricCriteria.map((rc, idx) => (
                  <div key={idx} className="p-2.5 bg-white rounded-xl border border-[#E8E5DD] space-y-1">
                    <div className="flex items-center justify-between font-bold text-[#1B1B1B]">
                      <span>{rc.name}</span>
                      <span className="font-mono text-[#C76A2A]">{rc.maxPoints} pts</span>
                    </div>
                    <p className="text-[10px] text-[#6F6A60]">{rc.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Student Submissions List */}
            <div className="space-y-3 text-xs">
              <h4 className="font-bold text-[#1B1B1B]">Submitted Work by Students:</h4>

              {asgSubmissions.map((sub) => (
                <div
                  key={sub.id}
                  className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E8E5DD] hover:border-[#1B1B1B] transition-all space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <strong className="text-sm font-bold text-[#1B1B1B]">{sub.studentName}</strong>
                      <span className="text-[10px] font-mono text-[#6F6A60] block">Submitted at {sub.submittedAt}</span>
                    </div>

                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono self-start sm:self-auto ${
                        sub.status === 'Pending Evaluation'
                          ? 'bg-[#C76A2A]/10 text-[#C76A2A]'
                          : sub.status === 'Evaluated'
                          ? 'bg-[#2F7A45]/10 text-[#2F7A45]'
                          : 'bg-red-500/10 text-red-700'
                      }`}
                    >
                      {sub.status}
                    </span>
                  </div>

                  <p className="text-xs text-[#6F6A60] leading-relaxed">{sub.notes || 'No extra submission notes.'}</p>

                  <div className="pt-2 border-t border-[#E8E5DD] flex items-center justify-between">
                    {sub.repoUrl ? (
                      <a
                        href={sub.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-mono font-bold text-[#1B1B1B] hover:text-[#C76A2A] flex items-center gap-1"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>View GitHub Repository</span>
                      </a>
                    ) : (
                      <span className="text-[10px] text-[#6F6A60]">File uploaded directly</span>
                    )}

                    <button
                      onClick={() => setSelectedSub(sub)}
                      className="px-3.5 py-1.5 bg-[#1B1B1B] text-white text-xs font-bold rounded-xl hover:bg-[#C76A2A] transition-colors cursor-pointer"
                    >
                      Evaluate Rubric &rarr;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Evaluation Rubric Modal Drawer */}
      {selectedSub && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 border border-[#E8E5DD] shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E5DD]">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#1B1B1B] text-white text-[10px] font-mono font-bold uppercase">
                  Rubric Evaluation
                </span>
                <h3 className="text-base font-bold text-[#1B1B1B] mt-1">{selectedSub.studentName}</h3>
              </div>
              <button onClick={() => setSelectedSub(null)} className="p-1 text-[#6F6A60] hover:text-[#1B1B1B] cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="space-y-2">
                <label className="font-bold text-[#1B1B1B] block">Total Points Score (out of 100)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={evalScore}
                  onChange={(e) => setEvalScore(parseInt(e.target.value) || 0)}
                  className="w-full p-3 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD] font-mono text-base font-bold text-[#1B1B1B]"
                />
              </div>

              <div className="space-y-2">
                <label className="font-bold text-[#1B1B1B] block">Faculty Constructive Feedback &amp; Code Review</label>
                <textarea
                  rows={4}
                  placeholder="Provide targeted feedback on code architecture, error handling, or performance..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD] focus:outline-none focus:border-[#1B1B1B]"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedSub(null)}
                  className="px-4 py-2 rounded-xl bg-[#FAF9F5] text-[#6F6A60] font-bold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveEvaluation}
                  className="px-5 py-2 rounded-xl bg-[#2F7A45] text-white font-bold hover:bg-[#256337] transition-colors cursor-pointer"
                >
                  Publish Grade &amp; Feedback
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Assignment Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 border border-[#E8E5DD] shadow-2xl">
            <h3 className="text-base font-bold text-[#1B1B1B]">Create New Assignment</h3>
            <form onSubmit={handleCreateSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-[#1B1B1B] block mb-1">Assignment Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lab 5: Distributed Kafka Pipeline Telemetry"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#1B1B1B] block mb-1">Target Class</label>
                  <select
                    value={classCode}
                    onChange={(e) => setClassCode(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD]"
                  >
                    <option value="JAVA-3A">JAVA-3A</option>
                    <option value="AI-4B">AI-4B</option>
                    <option value="DS-2C">DS-2C</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-[#1B1B1B] block mb-1">Due Date</label>
                  <input
                    type="date"
                    required
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD]"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-3 py-2 rounded-xl bg-[#FAF9F5] text-[#6F6A60] font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#C76A2A] text-white font-bold hover:bg-[#b05a22]"
                >
                  Publish Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
