'use client';

import React from 'react';
import { ShieldCheck, Lock, AlertTriangle, Key, Activity, CheckCircle2, UserCheck } from 'lucide-react';
import { SecurityAuditLog } from '../types';

interface SecurityDashboardViewProps {
  logs: SecurityAuditLog[];
}

export const SecurityDashboardView: React.FC<SecurityDashboardViewProps> = ({ logs }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#2F7A45]" />
            <span className="px-2.5 py-0.5 rounded-full bg-[#2F7A45]/10 text-[#2F7A45] text-xs font-bold font-mono">
              Zero-Trust Security Monitor
            </span>
          </div>
          <h2 className="text-xl font-bold text-[#1B1B1B] mt-1">Platform Security &amp; Audit Logs</h2>
          <p className="text-xs text-[#6F6A60] mt-0.5">
            Real-time audit telemetry, automated brute-force IP rate-limiting, failed login detection, and role permissions enforcement.
          </p>
        </div>
      </div>

      {/* Security Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
        <div className="p-4 bg-white rounded-3xl border border-[#E8E5DD] space-y-1">
          <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Login Activity</span>
          <strong className="text-2xl font-bold font-mono text-[#2F7A45]">14,210 Logins</strong>
          <span className="text-[10px] text-[#2F7A45] font-bold block">99.8% Success Rate</span>
        </div>

        <div className="p-4 bg-white rounded-3xl border border-[#E8E5DD] space-y-1">
          <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Suspicious Activity</span>
          <strong className="text-2xl font-bold font-mono text-amber-700">1 Incident Alert</strong>
          <span className="text-[10px] text-[#6F6A60] block">IP Rate-Limited in DE</span>
        </div>

        <div className="p-4 bg-white rounded-3xl border border-[#E8E5DD] space-y-1">
          <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Failed Logins</span>
          <strong className="text-2xl font-bold font-mono text-red-600">14 Attempts Blocked</strong>
          <span className="text-[10px] text-[#6F6A60] block">2FA Enforced</span>
        </div>

        <div className="p-4 bg-white rounded-3xl border border-[#E8E5DD] space-y-1">
          <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Permissions Audit</span>
          <strong className="text-2xl font-bold font-mono text-[#1B1B1B]">RBAC Compliant</strong>
          <span className="text-[10px] text-[#2F7A45] font-bold block">Strict Scoping</span>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] space-y-4 text-xs">
        <h3 className="text-base font-bold text-[#1B1B1B]">System Security &amp; Access Audit Logs</h3>

        <div className="overflow-x-auto rounded-2xl border border-[#E8E5DD]">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#FAF9F5] border-b border-[#E8E5DD] font-mono text-[10px] text-[#6F6A60] uppercase">
              <tr>
                <th className="p-3">Timestamp</th>
                <th className="p-3">User Email</th>
                <th className="p-3">Action Description</th>
                <th className="p-3">IP Address</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E5DD]">
              {logs.map((log) => (
                <tr key={log.id}>
                  <td className="p-3 font-mono text-[#1B1B1B]">{log.timestamp}</td>
                  <td className="p-3 font-semibold text-[#1B1B1B]">{log.userEmail}</td>
                  <td className="p-3 text-[#6F6A60]">{log.action}</td>
                  <td className="p-3 font-mono text-[#6F6A60]">{log.ipAddress} ({log.location})</td>
                  <td className="p-3 font-mono font-bold">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] ${
                        log.status === 'Success'
                          ? 'bg-[#2F7A45]/10 text-[#2F7A45]'
                          : log.status === 'Suspicious'
                          ? 'bg-amber-500/10 text-amber-700'
                          : 'bg-red-500/10 text-red-700'
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
