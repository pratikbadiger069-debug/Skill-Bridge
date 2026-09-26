'use client';

import React, { useState } from 'react';
import {
  Users,
  Plus,
  Search,
  Filter,
  BookOpen,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Award,
  Calendar,
  X,
  PlusCircle,
  ExternalLink,
} from 'lucide-react';
import { FacultyClass, StudentRecord, AssignmentItem } from '../types';

interface ClassManagementViewProps {
  classes: FacultyClass[];
  students: StudentRecord[];
  assignments: AssignmentItem[];
  onAddClass: (newClass: Omit<FacultyClass, 'id'>) => void;
}

export const ClassManagementView: React.FC<ClassManagementViewProps> = ({
  classes,
  students,
  assignments,
  onAddClass,
}) => {
  const [selectedClassCode, setSelectedClassCode] = useState<string>('JAVA-3A');
  const [activeSubTab, setActiveSubTab] = useState<'students' | 'attendance' | 'materials' | 'assignments' | 'assessments'>('students');
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Form states for Create Class
  const [newTitle, setNewTitle] = useState('');
  const [newCode, setNewCode] = useState('');
  const [newDept, setNewDept] = useState('Computer Science & Engineering');
  const [newSem, setNewSem] = useState('Semester 6');
  const [newStudentsCount, setNewStudentsCount] = useState('50');

  const selectedClass = classes.find((c) => c.code === selectedClassCode) || classes[0];

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newCode) return;

    onAddClass({
      code: newCode.toUpperCase(),
      title: newTitle,
      department: newDept,
      semester: newSem,
      enrolledStudents: parseInt(newStudentsCount) || 50,
      avgAttendanceRate: 90,
      avgBuilderScore: 750,
      nextSessionTime: 'Upcoming Session',
      activeAssignmentsCount: 1,
    });

    setNewTitle('');
    setNewCode('');
    setShowCreateModal(false);
  };

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Controls: Class Selector & Create Class Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-[#E8E5DD]">
        <div className="flex items-center gap-3 overflow-x-auto">
          <span className="text-xs font-bold text-[#6F6A60] uppercase shrink-0">Class Cohort:</span>
          {classes.map((cls) => (
            <button
              key={cls.id}
              onClick={() => setSelectedClassCode(cls.code)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedClassCode === cls.code
                  ? 'bg-[#1B1B1B] text-white shadow-xs'
                  : 'bg-[#FAF9F5] border border-[#E8E5DD] text-[#6F6A60] hover:text-[#1B1B1B]'
              }`}
            >
              {cls.code} • {cls.title.split(' ')[0]}
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2.5 rounded-xl bg-[#C76A2A] text-white text-xs font-bold hover:bg-[#b05a22] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Create Class</span>
        </button>
      </div>

      {/* Selected Class Meta Card */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E8E5DD]">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 rounded-full bg-[#1B1B1B] text-white text-xs font-bold font-mono">
                {selectedClass.code}
              </span>
              <span className="text-xs font-semibold text-[#6F6A60]">
                {selectedClass.department} • {selectedClass.semester}
              </span>
            </div>
            <h2 className="text-xl font-bold text-[#1B1B1B] mt-1">{selectedClass.title}</h2>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <div className="p-3 bg-[#FAF9F5] rounded-2xl border border-[#E8E5DD] text-center px-4">
              <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Enrolled</span>
              <strong className="text-base font-bold font-mono text-[#1B1B1B]">
                {selectedClass.enrolledStudents}
              </strong>
            </div>

            <div className="p-3 bg-[#FAF9F5] rounded-2xl border border-[#E8E5DD] text-center px-4">
              <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Attendance</span>
              <strong className="text-base font-bold font-mono text-[#2F7A45]">
                {selectedClass.avgAttendanceRate}%
              </strong>
            </div>

            <div className="p-3 bg-[#FAF9F5] rounded-2xl border border-[#E8E5DD] text-center px-4">
              <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Avg Builder Score</span>
              <strong className="text-base font-bold font-mono text-[#C76A2A]">
                {selectedClass.avgBuilderScore}
              </strong>
            </div>
          </div>
        </div>

        {/* Navigation Sub-Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto text-xs font-bold border-b border-[#E8E5DD] pb-2">
          {[
            { id: 'students', label: 'Manage Students', icon: Users },
            { id: 'attendance', label: 'Attendance Logs', icon: CheckCircle2 },
            { id: 'materials', label: 'Course Materials', icon: BookOpen },
            { id: 'assignments', label: 'Assignments', icon: FileText },
            { id: 'assessments', label: 'Assessments & Quizzes', icon: Award },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#1B1B1B] text-white shadow-xs'
                    : 'bg-[#FAF9F5] border border-[#E8E5DD] text-[#6F6A60] hover:text-[#1B1B1B]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Sub-Tab Content */}

        {/* 1. Manage Students */}
        {activeSubTab === 'students' && (
          <div className="space-y-4 pt-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-sm">
                <Search className="w-4 h-4 text-[#6F6A60] absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search students by name, roll no, email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD] text-xs focus:outline-none focus:border-[#1B1B1B]"
                />
              </div>
              <span className="text-xs font-mono font-semibold text-[#6F6A60]">
                Showing {filteredStudents.length} of {students.length} students
              </span>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-[#E8E5DD]">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-[#FAF9F5] border-b border-[#E8E5DD] text-[#6F6A60] font-mono uppercase text-[10px]">
                  <tr>
                    <th className="p-3">Student Name</th>
                    <th className="p-3">Roll Number</th>
                    <th className="p-3">Builder Score</th>
                    <th className="p-3">Attendance</th>
                    <th className="p-3">Assessment Avg</th>
                    <th className="p-3">Risk Level</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E5DD] bg-white">
                  {filteredStudents.map((st) => (
                    <tr key={st.id} className="hover:bg-[#FAF9F5]/50 transition-colors">
                      <td className="p-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-[#1B1B1B] text-white flex items-center justify-center font-bold text-[10px]">
                            {st.name.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <strong className="text-[#1B1B1B] font-bold block">{st.name}</strong>
                            <span className="text-[10px] text-[#6F6A60]">{st.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 font-mono text-[#1B1B1B] font-semibold">{st.rollNumber}</td>
                      <td className="p-3 font-mono font-bold text-[#C76A2A]">{st.builderScore}</td>
                      <td className="p-3 font-mono font-semibold text-[#2F7A45]">{st.attendanceRate}%</td>
                      <td className="p-3 font-mono font-semibold text-[#1B1B1B]">{st.assessmentAvg}%</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono ${
                            st.riskStatus === 'Safe'
                              ? 'bg-[#2F7A45]/10 text-[#2F7A45]'
                              : st.riskStatus === 'Watchlist'
                              ? 'bg-amber-500/10 text-amber-700'
                              : 'bg-red-500/10 text-red-700'
                          }`}
                        >
                          {st.riskStatus}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button className="px-2.5 py-1 rounded-lg bg-[#FAF9F5] border border-[#E8E5DD] hover:bg-[#1B1B1B] hover:text-white text-[#1B1B1B] text-[10px] font-bold transition-colors cursor-pointer">
                          Profile
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 2. Attendance */}
        {activeSubTab === 'attendance' && (
          <div className="space-y-4 pt-2">
            <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E8E5DD] flex items-center justify-between text-xs">
              <div>
                <strong className="text-[#1B1B1B] block">Session Attendance Summary ({selectedClass.code})</strong>
                <span className="text-[#6F6A60]">Overall attendance rate is 94.0% across 12 conducted sessions.</span>
              </div>
              <button className="px-3.5 py-1.5 bg-[#2F7A45] text-white text-xs font-bold rounded-xl hover:bg-[#256337] transition-colors cursor-pointer">
                Mark Live Session Attendance
              </button>
            </div>
          </div>
        )}

        {/* 3. Course Materials */}
        {activeSubTab === 'materials' && (
          <div className="space-y-3 pt-2 text-xs">
            <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E8E5DD] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-[#C76A2A]" />
                <div>
                  <strong className="text-[#1B1B1B] block">Module 1: Spring Boot Starters &amp; Auto-Configuration</strong>
                  <span className="text-[#6F6A60]">PDF Slides • Code Samples • Lab Guide (Updated yesterday)</span>
                </div>
              </div>
              <button className="px-3 py-1.5 bg-[#1B1B1B] text-white text-xs font-bold rounded-xl hover:bg-[#C76A2A] transition-colors cursor-pointer">
                Download Pack
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E8E5DD] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-[#2F7A45]" />
                <div>
                  <strong className="text-[#1B1B1B] block">Module 2: Resilience4j Circuit Breakers &amp; Microservices</strong>
                  <span className="text-[#6F6A60]">Architecture Diagrams • GitHub Starter Repo</span>
                </div>
              </div>
              <button className="px-3 py-1.5 bg-[#1B1B1B] text-white text-xs font-bold rounded-xl hover:bg-[#C76A2A] transition-colors cursor-pointer">
                Download Pack
              </button>
            </div>
          </div>
        )}

        {/* 4. Assignments */}
        {activeSubTab === 'assignments' && (
          <div className="space-y-3 pt-2 text-xs">
            {assignments.map((asg) => (
              <div key={asg.id} className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E8E5DD] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-[#1B1B1B] text-white text-[10px] font-mono font-bold">
                      {asg.classCode}
                    </span>
                    <span className="text-[10px] font-mono text-[#6F6A60]">Due: {asg.dueDate}</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#1B1B1B]">{asg.title}</h4>
                </div>
                <div className="text-left sm:text-right shrink-0 space-y-1">
                  <span className="text-xs font-mono font-bold text-[#2F7A45] block">
                    {asg.submissionsCount} / {asg.totalStudents} Submissions
                  </span>
                  <span className="text-[10px] text-[#6F6A60]">Evaluated {asg.evaluatedCount}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 5. Assessments */}
        {activeSubTab === 'assessments' && (
          <div className="space-y-3 pt-2 text-xs">
            <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E8E5DD] flex items-center justify-between">
              <div>
                <strong className="text-[#1B1B1B] block">Weekly Micro-Quiz #4: Microservices Resilience</strong>
                <span className="text-[#6F6A60]">15 Questions • Auto-evaluated • Class Avg: 84%</span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#2F7A45]/10 text-[#2F7A45] text-xs font-bold font-mono">
                Completed
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Create Class Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 border border-[#E8E5DD] shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E5DD]">
              <h3 className="text-base font-bold text-[#1B1B1B]">Create New Class Cohort</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 text-[#6F6A60] hover:text-[#1B1B1B] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-[#1B1B1B]">Class Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Distributed Cloud Computing & Kubernetes"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD] focus:outline-none focus:border-[#1B1B1B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#1B1B1B]">Course Code</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CS-402"
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD] focus:outline-none focus:border-[#1B1B1B]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#1B1B1B]">Capacity</label>
                  <input
                    type="number"
                    value={newStudentsCount}
                    onChange={(e) => setNewStudentsCount(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD] focus:outline-none focus:border-[#1B1B1B]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#1B1B1B]">Department</label>
                <select
                  value={newDept}
                  onChange={(e) => setNewDept(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD] focus:outline-none focus:border-[#1B1B1B]"
                >
                  <option value="Computer Science & Engineering">Computer Science &amp; Engineering</option>
                  <option value="Artificial Intelligence & Machine Learning">Artificial Intelligence &amp; Machine Learning</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Information Technology">Information Technology</option>
                </select>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD] text-[#6F6A60] font-bold hover:text-[#1B1B1B]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#1B1B1B] text-white font-bold hover:bg-[#C76A2A] transition-colors cursor-pointer"
                >
                  Add Class
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
