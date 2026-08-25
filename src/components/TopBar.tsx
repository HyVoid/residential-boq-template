import React from 'react';
import {
  BarChart3,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Sparkles,
  Upload,
  Download,
} from 'lucide-react';
import { TabId, ProjectParameters, ProjectSetup } from '../types';
import { formatCurrency } from '../utils/formatters';

interface TopBarProps {
  activeTab: TabId;
  onSelectTab: (tabId: TabId) => void;
  isSidebarCollapsed: boolean;
  onToggleSidebar: () => void;
  onOpenMobileMenu: () => void;
  projectName: string;
  projectSetup: ProjectSetup;
  parameters: ProjectParameters;
  totalEstimateCost: number;
  onOpenBulkCsv: () => void;
  onExportBackup: () => void;
}

const TAB_TITLES: Record<TabId, { sheet: string; title: string; subtitle: string }> = {
  '06_Dashboard': {
    sheet: 'SHEET 06',
    title: 'Executive Dashboard & KPI Control',
    subtitle: 'High-level commercial summary, unit benchmarks & variance alerts',
  },
  '07_Visualizer': {
    sheet: 'SHEET 07',
    title: 'Interactive Chart Studio',
    subtitle: 'Real-time multi-dimensional visualizer (Bar, Line, Pie & Area)',
  },
  '02_BOQ_Takeoff': {
    sheet: 'SHEET 02',
    title: 'Master BOQ Takeoff & Cost Estimation',
    subtitle: 'Line-by-line itemized quantities, unit rates & waste adjustments',
  },
  '03_Division_Summary': {
    sheet: 'SHEET 03',
    title: 'CSI Division Cost Summary',
    subtitle: '16 Standard MasterFormat trade divisions & cost per sq ft',
  },
  '04_Subcontractor': {
    sheet: 'SHEET 04',
    title: 'Subcontractor Bid Leveling',
    subtitle: 'Side-by-side vendor quotes vs internal baseline estimates',
  },
  '05_Budget_Cost': {
    sheet: 'SHEET 05',
    title: 'Budget vs Actual Cost Control',
    subtitle: 'Baseline budget variance tracking & real-time overspend alerts',
  },
  '01_Project_Setup': {
    sheet: 'SHEET 01',
    title: 'Project Attributes & Scope Setup',
    subtitle: 'GFA parameters, estimator credentials & revision control',
  },
  '00_Parameters': {
    sheet: 'SHEET 00',
    title: 'Global Cost Multipliers & Parameters',
    subtitle: 'Waste rates, sales taxes, risk contingencies & divisions',
  },
};

export const TopBar: React.FC<TopBarProps> = ({
  activeTab,
  onSelectTab,
  isSidebarCollapsed,
  onToggleSidebar,
  onOpenMobileMenu,
  projectName,
  projectSetup,
  parameters,
  totalEstimateCost,
  onOpenBulkCsv,
  onExportBackup,
}) => {
  const currentTabInfo = TAB_TITLES[activeTab] || {
    sheet: 'ACTIVE',
    title: 'Cost Control Sheet',
    subtitle: 'Residential BOQ engine',
  };

  return (
    <header
      id="app-topbar"
      className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-xs border-b border-[#E2E2E2] transition-all"
      style={{
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)',
      }}
    >
      <div className="h-14 px-4 sm:px-6 md:px-8 flex items-center justify-between gap-3">
        {/* Left: Sidebar Toggle + Current Sheet Title */}
        <div className="flex items-center gap-3 min-w-0">
          {/* Mobile Menu Button */}
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-1.5 rounded-lg hover:bg-slate-100 text-slate-700 cursor-pointer"
            aria-label="Open Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Desktop Toggle Button */}
          <button
            onClick={onToggleSidebar}
            className="hidden lg:flex p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
            title={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isSidebarCollapsed ? (
              <PanelLeftOpen className="w-4 h-4" />
            ) : (
              <PanelLeftClose className="w-4 h-4" />
            )}
          </button>

          <div className="flex items-center gap-2.5 truncate">
            <span className="hidden sm:inline-block font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 uppercase tracking-wider">
              {currentTabInfo.sheet}
            </span>
            <div className="flex flex-col truncate">
              <h1 className="font-serif font-bold text-sm sm:text-base text-[#051C2C] tracking-tight leading-tight truncate">
                {currentTabInfo.title}
              </h1>
              <p className="hidden md:block text-[11px] text-[#888888] truncate">
                {currentTabInfo.subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Key Metric Summary Pill + Quick Chart Studio Switcher */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Real-time Project Stat Badge */}
          <div className="hidden sm:flex items-center gap-3 px-3 py-1 bg-slate-50 rounded-lg border border-slate-200/80 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-[#888888] uppercase font-semibold">GFA:</span>
              <span className="font-semibold text-[#051C2C]">
                {projectSetup.grossArea.toLocaleString()} sq ft
              </span>
            </div>
            <div className="h-3 w-px bg-slate-300" />
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-[#888888] uppercase font-semibold">Total:</span>
              <span className="font-serif font-bold text-[#051C2C]">
                {formatCurrency(totalEstimateCost, parameters.currencySymbol)}
              </span>
            </div>
          </div>

          {/* Quick Tab Shortcut to Chart Visualizer */}
          {activeTab !== '07_Visualizer' ? (
            <button
              id="topbar-btn-chart-studio"
              onClick={() => onSelectTab('07_Visualizer')}
              className="btn btn-primary text-xs"
              title="Open Dynamic Real-Time Chart Studio"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Chart Studio</span>
            </button>
          ) : (
            <button
              id="topbar-btn-dashboard"
              onClick={() => onSelectTab('06_Dashboard')}
              className="btn btn-secondary text-xs"
              title="Back to Executive Dashboard"
            >
              <span>Back to Dashboard</span>
            </button>
          )}

          {/* Quick Bulk CSV */}
          <button
            onClick={onOpenBulkCsv}
            title="Import Bulk CSV Data"
            className="hidden md:inline-flex btn btn-secondary text-xs"
          >
            <Upload className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden xl:inline">Bulk CSV</span>
          </button>
        </div>
      </div>
    </header>
  );
};
