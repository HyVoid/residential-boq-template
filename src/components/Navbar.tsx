import React, { useRef } from 'react';
import {
  Building2,
  Calendar,
  CheckCircle2,
  Download,
  FileSpreadsheet,
  Layers,
  RotateCcw,
  Sliders,
  TrendingUp,
  Upload,
  UserCheck,
} from 'lucide-react';
import { TabId } from '../types';

interface NavbarProps {
  activeTab: TabId;
  onSelectTab: (tab: TabId) => void;
  lastSaved: string;
  projectName: string;
  onExportBackup: () => void;
  onImportBackup: (file: File) => void;
  onOpenBulkCsv: () => void;
  onResetData: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  lastSaved,
  projectName,
  onExportBackup,
  onImportBackup,
  onOpenBulkCsv,
  onResetData,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const tabs: { id: TabId; label: string; icon: React.ReactNode; sheetNum: string }[] = [
    {
      id: '06_Dashboard',
      label: 'Dashboard',
      sheetNum: '06',
      icon: <TrendingUp className="w-3.5 h-3.5" />,
    },
    {
      id: '02_BOQ_Takeoff',
      label: 'BOQ Takeoff',
      sheetNum: '02',
      icon: <FileSpreadsheet className="w-3.5 h-3.5" />,
    },
    {
      id: '03_Division_Summary',
      label: 'Division Summary',
      sheetNum: '03',
      icon: <Layers className="w-3.5 h-3.5" />,
    },
    {
      id: '04_Subcontractor',
      label: 'Subcontractors',
      sheetNum: '04',
      icon: <UserCheck className="w-3.5 h-3.5" />,
    },
    {
      id: '05_Budget_Cost',
      label: 'Budget Control',
      sheetNum: '05',
      icon: <Building2 className="w-3.5 h-3.5" />,
    },
    {
      id: '01_Project_Setup',
      label: 'Project Setup',
      sheetNum: '01',
      icon: <Calendar className="w-3.5 h-3.5" />,
    },
    {
      id: '00_Parameters',
      label: 'Parameters',
      sheetNum: '00',
      icon: <Sliders className="w-3.5 h-3.5" />,
    },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImportBackup(file);
      e.target.value = '';
    }
  };

  const formatLastSavedTime = (isoString: string) => {
    if (!isoString) return 'Just now';
    try {
      const d = new Date(isoString);
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    } catch {
      return 'Just now';
    }
  };

  return (
    <header
      id="app-header-navbar"
      className="sticky top-0 z-50 w-full bg-white"
      style={{
        height: '56px',
        borderBottom: '1px solid #E2E2E2',
        boxShadow: 'var(--shadow-nav)',
      }}
    >
      <div className="max-w-[1400px] h-full mx-auto px-4 md:px-8 flex items-center justify-between gap-4">
        {/* Left: Brand & Status */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <span
              className="font-serif font-bold text-sm sm:text-base tracking-tight max-w-[360px] truncate"
              style={{
                color: 'var(--brand)',
                letterSpacing: '-0.01em',
              }}
              title="Estimate Residential BOQ Costs and Control Project Budgets in Excel"
            >
              Estimate Residential BOQ Costs and Control Project Budgets in Excel
            </span>
            <span className="hidden sm:inline-block text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
              Excel
            </span>
          </div>

          <div className="hidden xl:flex items-center gap-1.5 text-xs text-[#888888] pl-3 border-l border-slate-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            <span>
              Saved <strong className="font-semibold text-slate-700">{formatLastSavedTime(lastSaved)}</strong>
            </span>
          </div>
        </div>

        {/* Center: Clean Minimalism Tabs */}
        <nav className="flex items-center gap-2 sm:gap-6 md:gap-7 overflow-x-auto no-scrollbar h-full">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-btn-${tab.id}`}
                onClick={() => onSelectTab(tab.id)}
                className={`relative h-full flex items-center gap-1.5 text-[13px] font-semibold transition-colors whitespace-nowrap cursor-pointer px-1 ${
                  isActive ? 'text-[#051C2C]' : 'text-[#888888] hover:text-[#051C2C]'
                }`}
                style={{
                  color: isActive ? 'var(--brand)' : 'var(--grey)',
                }}
              >
                <span className="opacity-60 text-[10px] font-mono">{tab.sheetNum}</span>
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                {isActive && (
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[2px]"
                    style={{ backgroundColor: 'var(--accent)' }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Clean Minimalism Toolbar Buttons */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            id="btn-bulk-csv"
            onClick={onOpenBulkCsv}
            title="Bulk CSV Import for BOQ Takeoff"
            className="btn btn-secondary text-xs"
          >
            <Upload className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden lg:inline">Bulk CSV</span>
          </button>

          <button
            id="btn-export-backup"
            onClick={onExportBackup}
            title="Export full project backup (.json)"
            className="btn btn-secondary text-xs"
          >
            <Download className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden lg:inline">Export</span>
          </button>

          <button
            id="btn-import-backup"
            onClick={() => fileInputRef.current?.click()}
            title="Import project backup (.json)"
            className="btn btn-secondary text-xs"
          >
            <Upload className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden lg:inline">Import</span>
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".json"
            className="hidden"
          />

          <button
            id="btn-reset-data"
            onClick={onResetData}
            title="Reset data to initial residential template"
            className="btn text-xs text-white"
            style={{ backgroundColor: 'var(--error)' }}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>
    </header>
  );
};
