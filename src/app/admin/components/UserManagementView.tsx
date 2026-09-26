'use client';

import React, { useState } from 'react';
import {
  Users,
  Plus,
  Search,
  Filter,
  ShieldCheck,
  UserCheck,
  UserX,
  Trash2,
  Edit2,
  X,
  Check,
} from 'lucide-react';
import { AdminUser, UserRole, UserAccountStatus } from '../types';

interface UserManagementViewProps {
  users: AdminUser[];
  onAddUser: (newUser: Omit<AdminUser, 'id' | 'joinedDate' | 'lastLogin'>) => void;
  onUpdateUserRole: (id: string, newRole: UserRole) => void;
  onToggleUserStatus: (id: string, newStatus: UserAccountStatus) => void;
  onDeleteUser: (id: string) => void;
}

export const UserManagementView: React.FC<UserManagementViewProps> = ({
  users,
  onAddUser,
  onUpdateUserRole,
  onToggleUserStatus,
  onDeleteUser,
}) => {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<'All' | UserRole>('All');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);

  // Form states for Create User
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('Student');
  const [dept, setDept] = useState('Computer Science & Engineering');

  const filtered = users.filter((u) => {
    const matchesRole = roleFilter === 'All' ? true : u.role === roleFilter;
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    return matchesRole && matchesSearch;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    onAddUser({
      name,
      email,
      role,
      department: dept,
      status: 'Active',
    });

    setName('');
    setEmail('');
    setShowCreateModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Create Controls */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#1B1B1B]">User Account &amp; Role Management</h2>
          <p className="text-xs text-[#6F6A60] mt-0.5">
            Provision platform credentials, assign system roles, edit profile attributes, and enforce account suspensions.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2.5 rounded-xl bg-[#C76A2A] text-white text-xs font-bold hover:bg-[#b05a22] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Create New User</span>
        </button>
      </div>

      {/* Search & Role Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#6F6A60] absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by user name or email address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-[#E8E5DD] text-xs focus:outline-none focus:border-[#1B1B1B]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-bold">
          {['All', 'Student', 'Faculty', 'Recruiter', 'Admin'].map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r as any)}
              className={`px-3 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                roleFilter === r
                  ? 'bg-[#1B1B1B] text-white shadow-xs'
                  : 'bg-white border border-[#E8E5DD] text-[#6F6A60] hover:text-[#1B1B1B]'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* User Table Card */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] space-y-4">
        <div className="overflow-x-auto rounded-2xl border border-[#E8E5DD]">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-[#FAF9F5] border-b border-[#E8E5DD] text-[#6F6A60] font-mono uppercase text-[10px]">
              <tr>
                <th className="p-3">User</th>
                <th className="p-3">System Role</th>
                <th className="p-3">Department</th>
                <th className="p-3">Status</th>
                <th className="p-3">Last Login</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E5DD] bg-white">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-[#FAF9F5]/50 transition-colors">
                  <td className="p-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#1B1B1B] text-white flex items-center justify-center font-bold text-xs">
                        {u.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <strong className="text-[#1B1B1B] font-bold block">{u.name}</strong>
                        <span className="text-[10px] text-[#6F6A60]">{u.email}</span>
                      </div>
                    </div>
                  </td>

                  <td className="p-3">
                    <select
                      value={u.role}
                      onChange={(e) => onUpdateUserRole(u.id, e.target.value as UserRole)}
                      className="p-1.5 rounded-lg bg-[#FAF9F5] border border-[#E8E5DD] font-mono text-[11px] font-bold text-[#1B1B1B] focus:outline-none"
                    >
                      <option value="Student">Student</option>
                      <option value="Faculty">Faculty</option>
                      <option value="Recruiter">Recruiter</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </td>

                  <td className="p-3 text-[#6F6A60]">{u.department || 'N/A'}</td>

                  <td className="p-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        u.status === 'Active'
                          ? 'bg-[#2F7A45]/10 text-[#2F7A45]'
                          : 'bg-red-500/10 text-red-700'
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>

                  <td className="p-3 font-mono text-[11px] text-[#6F6A60]">{u.lastLogin}</td>

                  <td className="p-3 text-right space-x-1.5">
                    {u.status === 'Active' ? (
                      <button
                        onClick={() => onToggleUserStatus(u.id, 'Suspended')}
                        className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-800 font-bold text-[10px] hover:bg-amber-500/20 cursor-pointer"
                      >
                        Suspend
                      </button>
                    ) : (
                      <button
                        onClick={() => onToggleUserStatus(u.id, 'Active')}
                        className="px-2.5 py-1 rounded-lg bg-[#2F7A45]/10 text-[#2F7A45] font-bold text-[10px] hover:bg-[#2F7A45]/20 cursor-pointer"
                      >
                        Activate
                      </button>
                    )}

                    <button
                      onClick={() => onDeleteUser(u.id)}
                      className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 border border-[#E8E5DD] shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E5DD]">
              <h3 className="text-base font-bold text-[#1B1B1B]">Provision New User Credentials</h3>
              <button onClick={() => setShowCreateModal(false)} className="p-1 text-[#6F6A60] hover:text-[#1B1B1B]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-[#1B1B1B] block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikram Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD]"
                />
              </div>

              <div>
                <label className="font-bold text-[#1B1B1B] block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. vikram@hitam.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#1B1B1B] block mb-1">System Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as UserRole)}
                    className="w-full p-2.5 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD]"
                  >
                    <option value="Student">Student</option>
                    <option value="Faculty">Faculty</option>
                    <option value="Recruiter">Recruiter</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-[#1B1B1B] block mb-1">Department</label>
                  <input
                    type="text"
                    value={dept}
                    onChange={(e) => setDept(e.target.value)}
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
                  Provision User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
