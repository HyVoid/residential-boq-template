import React from 'react';
import {
  BarChart3,
  Calculator,
  ChevronLeft,
  ChevronRight,
  Database,
  DollarSign,
  Download,
  FileSpreadsheet,
  FolderKanban,
  LayoutDashboard,
  PieChart,
  RotateCcw,
  Scale,
  Settings,
  ShieldCheck,
  TrendingUp,
  Upload,
  Zap,
} from 'lucide-react';
import { TabId } from '../types';

interface SidebarProps {
  activeTab: TabId;
  onSelectTab: (tabId: TabId) => void;
  projectName: string;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  lastSaved: string;
  onOpenBulkCsv: () => void;
  onExportBackup: () => void;
  onImportBackup: (file: File) => void;
  onResetData: () => void;
}

interface NavSection {
  title: string;
  items: {
    id: TabId;
    sheetNum: string;
    label: string;
    icon: React.ElementType;
    badge?: string;
  }[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  projectName,
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile,
  lastSaved,
  onOpenBulkCsv,
  onExportBackup,
  onImportBackup,
  onResetData,
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const navSections: NavSection[] = [
    {
      title: 'Analytics & Insights',
      items: [
        {
          id: '06_Dashboard',
          sheetNum: '06',
          label: 'Executive Dashboard',
          icon: LayoutDashboard,
        },
        {
          id: '07_Visualizer',
          sheetNum: '07',
          label: 'Interactive Chart Studio',
          icon: BarChart3,
          badge: 'Live',
        },
      ],
    },
    {
      title: 'Cost Estimation & Takeoff',
      items: [
        {
          id: '02_BOQ_Takeoff',
          sheetNum: '02',
          label: 'Master BOQ Takeoff',
          icon: Calculator,
        },
        {
          id: '03_Division_Summary',
          sheetNum: '03',
          label: 'Division Cost Summary',
          icon: PieChart,
        },
      ],
    },
    {
      title: 'Commercial & Controls',
      items: [
        {
          id: '04_Subcontractor',
          sheetNum: '04',
          label: 'Subcontractor Leveling',
          icon: Scale,
        },
        {
          id: '05_Budget_Cost',
          sheetNum: '05',
          label: 'Budget vs Actual Control',
          icon: TrendingUp,
        },
      ],
    },
    {
      title: 'Setup & Configuration',
      items: [
        {
          id: '01_Project_Setup',
          sheetNum: '01',
          label: 'Project Attributes',
          icon: FolderKanban,
        },
        {
          id: '00_Parameters',
          sheetNum: '00',
          label: 'Parameters & Master',
          icon: Settings,
        },
      ],
    },
  ];

  const handleNavClick = (tabId: TabId) => {
    onSelectTab(tabId);
    if (isMobileOpen) {
      onCloseMobile();
    }
  };

  const formatLastSavedTime = (isoString: string) => {
    if (!isoString) return 'Never';
    try {
      const d = new Date(isoString);
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    } catch {
      return 'Recent';
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        id="app-sidebar"
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-white border-r border-[#E2E2E2] transition-all duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${isCollapsed ? 'w-18' : 'w-64'}`}
        style={{
          boxShadow: '1px 0 6px rgba(0, 0, 0, 0.04)',
        }}
      >
        {/* Brand Header */}
        <div className="h-14 border-b border-[#E2E2E2] flex items-center justify-between px-4 flex-shrink-0 bg-white">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-serif font-bold text-sm text-white flex-shrink-0 shadow-sm"
              style={{ backgroundColor: 'var(--brand)' }}
            >
              EST
            </div>
            {!isCollapsed && (
              <div className="flex flex-col min-w-0 pr-1">
                <span
                  className="font-serif font-bold text-xs tracking-tight text-[#051C2C] leading-snug line-clamp-2"
                  style={{ letterSpacing: '-0.01em' }}
                  title="Estimate Residential BOQ Costs and Control Project Budgets in Excel"
                >
                  Estimate Residential BOQ Costs and Control Project Budgets in Excel
                </span>
                <span className="text-[10px] text-[#888888] font-mono mt-0.5 truncate">
                  {projectName || 'Excel Cost Engine v2.0'}
                </span>
              </div>
            )}
          </div>

          {/* Desktop Collapse Button */}
          <button
            onClick={onToggleCollapse}
            className="hidden lg:flex items-center justify-center w-6 h-6 rounded hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto py-3 px-2 space-y-4 no-scrollbar">
          {navSections.map((section) => (
            <div key={section.title} className="space-y-1">
              {!isCollapsed && (
                <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#888888]">
                  {section.title}
                </div>
              )}
              {section.items.map((item) => {
                const isActive = activeTab === item.id;
                const IconComponent = item.icon;

                return (
                  <button
                    key={item.id}
                    id={`sidebar-nav-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    title={isCollapsed ? item.label : undefined}
                    className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-left text-xs font-semibold transition-all cursor-pointer group relative ${
                      isActive
                        ? 'bg-slate-100 text-[#051C2C] font-bold shadow-xs'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-[#051C2C]'
                    }`}
                  >
                    {/* Active Left Indicator Bar */}
                    {isActive && (
                      <div
                        className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r"
                        style={{ backgroundColor: 'var(--accent)' }}
                      />
                    )}

                    <IconComponent
                      className={`w-4 h-4 flex-shrink-0 transition-colors ${
                        isActive
                          ? 'text-[#2251FF]'
                          : 'text-slate-400 group-hover:text-slate-700'
                      }`}
                    />

                    {!isCollapsed && (
                      <div className="flex-1 flex items-center justify-between truncate">
                        <span className="truncate">{item.label}</span>
                        {item.badge ? (
                          <span className="pill pill-active text-[9px] px-1.5 py-0.2">
                            {item.badge}
                          </span>
                        ) : (
                          <span className="text-[10px] font-mono opacity-50 ml-1">
                            {item.sheetNum}
                          </span>
                        )}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Storage Status & Action Bar */}
        <div className="p-3 border-t border-[#E2E2E2] bg-slate-50/70 flex-shrink-0 space-y-2">
          {!isCollapsed && (
            <div className="flex items-center justify-between text-[11px] text-[#888888] px-1 pb-1">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Auto-Saved</span>
              </span>
              <span className="font-mono text-[10px] text-slate-500">{formatLastSavedTime(lastSaved)}</span>
            </div>
          )}

          {/* Quick Action Buttons */}
          <div className={`grid ${isCollapsed ? 'grid-cols-1 gap-2' : 'grid-cols-2 gap-1.5'}`}>
            <button
              onClick={onOpenBulkCsv}
              title="Bulk CSV Import"
              className="btn btn-secondary justify-center text-[11px] py-1.5 px-2"
            >
              <Upload className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
              {!isCollapsed && <span>Bulk CSV</span>}
            </button>

            <button
              onClick={onExportBackup}
              title="Export JSON Backup"
              className="btn btn-secondary justify-center text-[11px] py-1.5 px-2"
            >
              <Download className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
              {!isCollapsed && <span>Export</span>}
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              title="Import JSON Backup"
              className="btn btn-secondary justify-center text-[11px] py-1.5 px-2"
            >
              <Database className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
              {!isCollapsed && <span>Restore</span>}
            </button>

            <button
              onClick={onResetData}
              title="Reset to Baseline"
              className="btn justify-center text-[11px] py-1.5 px-2 text-white"
              style={{ backgroundColor: 'var(--error)' }}
            >
              <RotateCcw className="w-3.5 h-3.5 flex-shrink-0" />
              {!isCollapsed && <span>Reset</span>}
            </button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                onImportBackup(file);
                e.target.value = '';
              }
            }}
            className="hidden"
          />
        </div>
      </aside>
    </>
  );
};
