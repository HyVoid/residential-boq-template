import React, { useEffect, useMemo, useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { DashboardTab } from './components/DashboardTab';
import { DataVisualizerTab } from './components/DataVisualizerTab';
import { BOQTakeoffTab } from './components/BOQTakeoffTab';
import { DivisionSummaryTab } from './components/DivisionSummaryTab';
import { SubcontractorComparisonTab } from './components/SubcontractorComparisonTab';
import { BudgetCostControlTab } from './components/BudgetCostControlTab';
import { ProjectSetupTab } from './components/ProjectSetupTab';
import { ParametersTab } from './components/ParametersTab';
import { BulkCsvModal } from './components/BulkCsvModal';
import { FooterNotice } from './components/FooterNotice';
import { INITIAL_DATA } from './initialData';
import {
  AppDataState,
  BOQItem,
  ProjectParameters,
  ProjectSetup,
  TabId,
} from './types';
import {
  computeAllBOQItems,
  computeBudgetControl,
  computeDashboardMetrics,
  computeDivisionSummaries,
  computeSubcontractorComparison,
} from './utils/calculations';
import {
  exportBackupJSON,
  loadAppState,
  saveAppState,
} from './utils/storage';

export default function App() {
  const [appState, setAppState] = useState<AppDataState>(() => loadAppState());
  const [activeTab, setActiveTab] = useState<TabId>('06_Dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isBulkCsvOpen, setIsBulkCsvOpen] = useState(false);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);

  // Auto-save debounced whenever appState changes
  useEffect(() => {
    const timer = setTimeout(() => {
      const savedTime = saveAppState(appState);
      if (savedTime !== appState.lastSaved) {
        setAppState((prev) => ({ ...prev, lastSaved: savedTime }));
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [appState.parameters, appState.projectSetup, appState.boqItems, appState.subcontractorQuotes, appState.budgetControls, appState.subcontractorInfo]);

  // Derived Calculations (Instant Single Source of Truth propagation)
  const computedBOQ = useMemo(() => {
    return computeAllBOQItems(
      appState.boqItems,
      appState.parameters.defaultWasteRate,
      appState.parameters.salesTaxRate,
    );
  }, [appState.boqItems, appState.parameters.defaultWasteRate, appState.parameters.salesTaxRate]);

  const { summaries: divisionSummaries, totalEstimateCost } = useMemo(() => {
    return computeDivisionSummaries(
      appState.parameters.masterDivisions,
      computedBOQ,
      appState.projectSetup.grossArea,
    );
  }, [appState.parameters.masterDivisions, computedBOQ, appState.projectSetup.grossArea]);

  const subQuotes = useMemo(() => {
    return computeSubcontractorComparison(
      appState.parameters.masterDivisions,
      divisionSummaries,
      appState.subcontractorQuotes,
      appState.subcontractorInfo,
    );
  }, [appState.parameters.masterDivisions, divisionSummaries, appState.subcontractorQuotes, appState.subcontractorInfo]);

  const budgetRows = useMemo(() => {
    return computeBudgetControl(
      appState.parameters.masterDivisions,
      divisionSummaries,
      appState.budgetControls,
    );
  }, [appState.parameters.masterDivisions, divisionSummaries, appState.budgetControls]);

  const dashboardMetrics = useMemo(() => {
    return computeDashboardMetrics(
      appState,
      computedBOQ,
      divisionSummaries,
      subQuotes,
      budgetRows,
    );
  }, [appState, computedBOQ, divisionSummaries, subQuotes, budgetRows]);

  // State handlers
  const handleUpdateParameters = (newParams: ProjectParameters) => {
    setAppState((prev) => ({ ...prev, parameters: newParams }));
  };

  const handleUpdateProjectSetup = (newSetup: ProjectSetup) => {
    setAppState((prev) => ({ ...prev, projectSetup: newSetup }));
  };

  const handleUpdateBOQItems = (items: BOQItem[]) => {
    setAppState((prev) => ({ ...prev, boqItems: items }));
  };

  const handleUpdateSubNames = (names: AppDataState['subcontractorInfo']) => {
    setAppState((prev) => ({ ...prev, subcontractorInfo: names }));
  };

  const handleUpdateSubQuotes = (quotes: AppDataState['subcontractorQuotes']) => {
    setAppState((prev) => ({ ...prev, subcontractorQuotes: quotes }));
  };

  const handleUpdateBudgets = (budgets: AppDataState['budgetControls']) => {
    setAppState((prev) => ({ ...prev, budgetControls: budgets }));
  };

  // Backups & CSV
  const handleExportBackup = () => {
    exportBackupJSON(appState);
  };

  const handleImportBackup = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target?.result as string);
        if (parsed.parameters && parsed.projectSetup && Array.isArray(parsed.boqItems)) {
          setAppState({
            ...parsed,
            lastSaved: new Date().toISOString(),
          });
          saveAppState(parsed);
        } else {
          alert('Invalid backup file structure.');
        }
      } catch (err) {
        alert('Failed to parse backup JSON file.');
      }
    };
    reader.readAsText(file);
  };

  const handleImportBulkCSV = (newItems: BOQItem[], mode: 'replace' | 'append') => {
    if (mode === 'replace') {
      setAppState((prev) => ({ ...prev, boqItems: newItems }));
    } else {
      setAppState((prev) => ({ ...prev, boqItems: [...prev.boqItems, ...newItems] }));
    }
  };

  const handleConfirmReset = () => {
    setAppState({
      ...INITIAL_DATA,
      lastSaved: new Date().toISOString(),
    });
    saveAppState(INITIAL_DATA);
    setResetConfirmOpen(false);
  };

  return (
    <div className="min-h-screen flex bg-[#F5F5F2] text-[#1A1A2E]">
      {/* 1. Left Fixed / Collapsible Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        projectName={appState.projectSetup.projectName}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isMobileOpen={isMobileNavOpen}
        onCloseMobile={() => setIsMobileNavOpen(false)}
        lastSaved={appState.lastSaved}
        onOpenBulkCsv={() => setIsBulkCsvOpen(true)}
        onExportBackup={handleExportBackup}
        onImportBackup={handleImportBackup}
        onResetData={() => setResetConfirmOpen(true)}
      />

      {/* 2. Main Layout Area with dynamic left margin for Sidebar */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          isSidebarCollapsed ? 'lg:ml-18' : 'lg:ml-64'
        }`}
      >
        {/* Simplified Clean Top Bar */}
        <TopBar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          onOpenMobileMenu={() => setIsMobileNavOpen(true)}
          projectName={appState.projectSetup.projectName}
          projectSetup={appState.projectSetup}
          parameters={appState.parameters}
          totalEstimateCost={totalEstimateCost}
          onOpenBulkCsv={() => setIsBulkCsvOpen(true)}
          onExportBackup={handleExportBackup}
        />

        {/* Content Body */}
        <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 py-6">
          {activeTab === '06_Dashboard' && (
            <DashboardTab
              metrics={dashboardMetrics}
              parameters={appState.parameters}
              projectSetup={appState.projectSetup}
              divisionSummaries={divisionSummaries}
              budgetRows={budgetRows}
              subQuotes={subQuotes}
              onNavigateTab={setActiveTab}
            />
          )}

          {activeTab === '07_Visualizer' && (
            <DataVisualizerTab
              divisionSummaries={divisionSummaries}
              computedBOQ={computedBOQ}
              subQuotes={subQuotes}
              budgetRows={budgetRows}
              parameters={appState.parameters}
              projectSetup={appState.projectSetup}
            />
          )}

          {activeTab === '02_BOQ_Takeoff' && (
            <BOQTakeoffTab
              boqItems={appState.boqItems}
              parameters={appState.parameters}
              onChangeBOQItems={handleUpdateBOQItems}
              onOpenBulkCsv={() => setIsBulkCsvOpen(true)}
            />
          )}

          {activeTab === '03_Division_Summary' && (
            <DivisionSummaryTab
              divisionSummaries={divisionSummaries}
              totalEstimateCost={totalEstimateCost}
              parameters={appState.parameters}
              projectSetup={appState.projectSetup}
            />
          )}

          {activeTab === '04_Subcontractor' && (
            <SubcontractorComparisonTab
              quotes={subQuotes}
              subNames={appState.subcontractorInfo}
              onChangeSubNames={handleUpdateSubNames}
              rawQuoteData={appState.subcontractorQuotes}
              onChangeQuotes={handleUpdateSubQuotes}
              parameters={appState.parameters}
            />
          )}

          {activeTab === '05_Budget_Cost' && (
            <BudgetCostControlTab
              budgetRows={budgetRows}
              rawBudgetData={appState.budgetControls}
              onChangeBudgets={handleUpdateBudgets}
              parameters={appState.parameters}
            />
          )}

          {activeTab === '01_Project_Setup' && (
            <ProjectSetupTab
              projectSetup={appState.projectSetup}
              onChangeProjectSetup={handleUpdateProjectSetup}
              currencySymbol={appState.parameters.currencySymbol}
              totalEstimateCost={totalEstimateCost}
            />
          )}

          {activeTab === '00_Parameters' && (
            <ParametersTab
              parameters={appState.parameters}
              onChangeParameters={handleUpdateParameters}
            />
          )}
        </main>

        {/* Privacy Notice Footer */}
        <FooterNotice />
      </div>

      {/* Bulk CSV Import Modal */}
      <BulkCsvModal
        isOpen={isBulkCsvOpen}
        onClose={() => setIsBulkCsvOpen(false)}
        availableDivisions={appState.parameters.masterDivisions}
        onImportItems={handleImportBulkCSV}
        currencySymbol={appState.parameters.currencySymbol}
      />

      {/* Reset Confirmation Modal */}
      {resetConfirmOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(5, 28, 44, 0.5)', backdropFilter: 'blur(8px)' }}
        >
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 space-y-4 border border-slate-200">
            <h3
              className="text-lg font-bold font-serif tracking-tight text-[#051C2C]"
            >
              Reset Project to Default Template?
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              This will overwrite all current BOQ Takeoff lines, custom parameters, subcontractor
              quotes, and budget logs with the default 1,850 sq ft residential baseline dataset.
            </p>
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setResetConfirmOpen(false)}
                className="btn btn-secondary text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReset}
                className="btn text-xs text-white"
                style={{ backgroundColor: 'var(--error)' }}
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

