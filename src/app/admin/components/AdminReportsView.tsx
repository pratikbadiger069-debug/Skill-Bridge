'use client';

import React, { useState } from 'react';
import { FileText, Download, Printer, BarChart3, Building2, TrendingUp, Cpu } from 'lucide-react';

export const AdminReportsView: React.FC = () => {
  const [reportType, setReportType] = useState<'platform' | 'department' | 'institution' | 'growth'>('platform');

  const handleExportCSV = () => {
    alert(`Exporting official ${reportType.toUpperCase()} raw telemetry CSV file...`);
  };

  const handleExportPDF = () => {
    alert(`Generating production-ready ${reportType.toUpperCase()} Report PDF...`);
  };

  return (
    <div className="space-y-6 text-xs">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8E5DD] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#1B1B1B]">Platform Executive Reports &amp; Audit Exporter</h2>
          <p className="text-xs text-[#6F6A60] mt-0.5">
            Generate certified reports for institutional boards, placement cells, department heads, and accreditation committees.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportPDF}
            className="px-4 py-2.5 rounded-xl bg-[#1B1B1B] text-white font-bold hover:bg-[#C76A2A] transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <Download className="w-4 h-4" />
            <span>Export PDF</span>
          </button>
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2.5 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD] text-[#1B1B1B] font-bold hover:bg-[#E8E5DD] transition-colors flex items-center gap-2 cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-[#E8E5DD] pb-2 font-bold">
        {[
          { id: 'platform', label: 'Platform Report', icon: BarChart3 },
          { id: 'department', label: 'Department Report', icon: Cpu },
          { id: 'institution', label: 'Institution Report', icon: Building2 },
          { id: 'growth', label: 'Growth & Velocity Report', icon: TrendingUp },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = reportType === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setReportType(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-[#1B1B1B] text-white shadow-xs'
                  : 'bg-white border border-[#E8E5DD] text-[#6F6A60] hover:text-[#1B1B1B]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Printable Report Box */}
      <div className="p-8 rounded-3xl bg-white border border-[#E8E5DD] space-y-6">
        <div className="pb-4 border-b border-[#E8E5DD] flex justify-between items-center">
          <div>
            <span className="font-mono text-[10px] font-bold text-[#C76A2A] uppercase">SkillBridge AI Ecosystem</span>
            <h3 className="text-xl font-bold text-[#1B1B1B] capitalize mt-1">{reportType} Executive Audit Summary</h3>
          </div>
          <span className="text-[10px] font-mono text-[#6F6A60]">Generated: Sept 26, 2026</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-[#FAF9F5] rounded-2xl border border-[#E8E5DD]">
            <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Verified Users</span>
            <strong className="text-2xl font-mono font-bold text-[#1B1B1B]">14,400 Total</strong>
          </div>
          <div className="p-4 bg-[#FAF9F5] rounded-2xl border border-[#E8E5DD]">
            <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Placements Verified</span>
            <strong className="text-2xl font-mono font-bold text-[#2F7A45]">3,410 Offers</strong>
          </div>
          <div className="p-4 bg-[#FAF9F5] rounded-2xl border border-[#E8E5DD]">
            <span className="text-[10px] text-[#6F6A60] uppercase font-bold block">Ecosystem Health</span>
            <strong className="text-2xl font-mono font-bold text-[#C76A2A]">99.9% Uptime</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
