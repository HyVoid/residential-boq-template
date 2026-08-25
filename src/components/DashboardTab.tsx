import React from 'react';
import {
  AlertCircle,
  Building,
  CheckCircle2,
  DollarSign,
  Layers,
  PieChart as PieIcon,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  Zap,
} from 'lucide-react';
import {
  BudgetControlRow,
  DashboardMetrics,
  DivisionSummaryRow,
  ProjectParameters,
  ProjectSetup,
  SubcontractorQuoteRow,
} from '../types';
import { formatCurrency, formatNumber, formatPercent } from '../utils/calculations';

interface DashboardTabProps {
  metrics: DashboardMetrics;
  parameters: ProjectParameters;
  projectSetup: ProjectSetup;
  divisionSummaries: DivisionSummaryRow[];
  budgetRows: BudgetControlRow[];
  subQuotes: SubcontractorQuoteRow[];
  onNavigateTab: (tabId: any) => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  metrics,
  parameters,
  projectSetup,
  divisionSummaries,
  budgetRows,
  subQuotes,
  onNavigateTab,
}) => {
  const grossArea = projectSetup.grossArea > 0 ? projectSetup.grossArea : 1;
  const maxTopDivCost = metrics.topDivisions.length > 0 ? metrics.topDivisions[0].totalCost : 1;

  const overBudgetRows = budgetRows.filter((b) => b.isOverBudget);

  return (
    <div id="sheet-06-dashboard" className="space-y-6 animate-fadeUp">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-slate-200 text-slate-700">
              SHEET 06
            </span>
            <h1
              className="text-2xl font-bold font-heading tracking-heading"
              style={{ color: 'var(--color-primary)' }}
            >
              Executive Decision Support & Cost Management Dashboard
            </h1>
          </div>
          <p className="text-xs text-slate-500">
            Real-time project intelligence for {projectSetup.projectName || 'Residential Build'} (
            {grossArea.toLocaleString()} sq ft). Dynamic cost breakdown, risk variance radar, and trade
            procurement benchmarks.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
          <Building className="w-4 h-4 text-blue-600" />
          <span>
            Target Baseline:{' '}
            <strong className="text-slate-800">{projectSetup.estimateVersion}</strong>
          </span>
        </div>
      </div>

      {/* KPI Hero Cards (4-Column Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Base Construction Estimate */}
        <div className="card-elevation p-5 flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-label text-[#888888] block mb-1">
              Base Construction Estimate
            </span>
            <div className="kpi-val">
              {formatCurrency(metrics.totalEstimateCost, parameters.currencySymbol)}
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-[#888888]">
            <span>Direct Works Sum</span>
            <button
              onClick={() => onNavigateTab('02_BOQ_Takeoff')}
              className="text-[#2251FF] font-semibold hover:underline cursor-pointer"
            >
              View BOQ &rarr;
            </button>
          </div>
        </div>

        {/* 2. Unforeseen Risk Contingency */}
        <div className="card-elevation p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-semibold uppercase tracking-label text-[#888888]">
                Risk Contingency ({formatPercent(parameters.contingencyRate, 0)})
              </span>
              <ShieldCheck className="w-3.5 h-3.5 text-[#2251FF]" />
            </div>
            <div className="kpi-val">
              {formatCurrency(metrics.contingencyCost, parameters.currencySymbol)}
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-[#888888]">
            <span>Unallocated Reserve</span>
            <button
              onClick={() => onNavigateTab('00_Parameters')}
              className="text-[#2251FF] font-semibold hover:underline cursor-pointer"
            >
              Parameters &rarr;
            </button>
          </div>
        </div>

        {/* 3. Grand Total Project Cost */}
        <div className="card-elevation p-5 flex flex-col justify-between" style={{ borderTop: '3px solid var(--accent)' }}>
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-label text-[#888888] block mb-1">
              Project Grand Total Cost
            </span>
            <div className="kpi-val" style={{ color: 'var(--accent)' }}>
              {formatCurrency(metrics.grandTotalCost, parameters.currencySymbol)}
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-[#888888]">
            <span>Estimate + Contingency</span>
            <span className="font-semibold text-slate-700">100% Comprehensive</span>
          </div>
        </div>

        {/* 4. Unit Benchmark Rate ($/sq ft) */}
        <div className="card-elevation p-5 flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-label text-[#888888] block mb-1">
              Unit Benchmark Cost
            </span>
            <div className="kpi-val">
              {parameters.currencySymbol}
              {metrics.costPerSqFt.toFixed(2)}{' '}
              <span className="text-sm font-normal text-[#888888] font-sans">/ sq ft</span>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-[#888888]">
            <span>Gross Floor Area</span>
            <span className="font-semibold text-slate-700">{grossArea.toLocaleString()} sq ft</span>
          </div>
        </div>
      </div>

      {/* Insight Block */}
      <div className="insight-box">
        <h4 className="text-xs font-semibold text-[#051C2C] uppercase tracking-label mb-1">
          Executive Summary & Commercial Strategy
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
          The baseline residential unit cost of{' '}
          <strong>
            {parameters.currencySymbol}
            {metrics.costPerSqFt.toFixed(2)}/sq ft
          </strong>{' '}
          falls comfortably within the target market bracket ($170 - $240/sq ft). Current
          subcontractor bid leveling indicates a potential procurement variance of{' '}
          <strong>
            {metrics.subcontractorTotalVariance > 0 ? '+' : ''}
            {formatCurrency(metrics.subcontractorTotalVariance, parameters.currencySymbol)}
          </strong>{' '}
          vs internal estimates across all 16 work packages.
        </p>
      </div>

      {/* Middle Section: Cost Element Breakdown & Top Cost Divisions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: 3-Part Cost Build-up Analysis */}
        <div className="card-static p-6 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200">
              <h3
                className="text-base font-bold font-heading tracking-heading"
                style={{ color: 'var(--color-primary)' }}
              >
                Three Core Cost Elements
              </h3>
              <PieIcon className="w-4 h-4 text-slate-400" />
            </div>

            {/* Stacked Visual Bar */}
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex mb-6">
              <div
                className="h-full"
                title={`Material: ${formatPercent(metrics.materialShare)}`}
                style={{
                  width: `${metrics.materialShare * 100}%`,
                  backgroundColor: 'var(--color-primary)',
                }}
              />
              <div
                className="h-full"
                title={`Labour: ${formatPercent(metrics.labourShare)}`}
                style={{
                  width: `${metrics.labourShare * 100}%`,
                  backgroundColor: 'var(--color-accent)',
                }}
              />
              <div
                className="h-full"
                title={`Equip/Sub: ${formatPercent(metrics.equipSubShare)}`}
                style={{
                  width: `${metrics.equipSubShare * 100}%`,
                  backgroundColor: '#888888',
                }}
              />
            </div>

            {/* Detailed 3 Elements List */}
            <div className="space-y-4">
              {/* Material */}
              <div className="p-3 rounded-lg border border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-3 h-3 rounded"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-800">Materials (w/ Tax)</div>
                    <div className="text-[11px] text-slate-500">Procurement & delivery</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold font-mono text-slate-800">
                    {formatCurrency(metrics.totalMaterialCost, parameters.currencySymbol)}
                  </div>
                  <div className="text-[11px] font-semibold text-slate-500">
                    {formatPercent(metrics.materialShare, 1)}
                  </div>
                </div>
              </div>

              {/* Labour */}
              <div className="p-3 rounded-lg border border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-3 h-3 rounded"
                    style={{ backgroundColor: 'var(--color-accent)' }}
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-800">Direct Labour</div>
                    <div className="text-[11px] text-slate-500">Trade installation hours</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold font-mono text-slate-800">
                    {formatCurrency(metrics.totalLabourCost, parameters.currencySymbol)}
                  </div>
                  <div className="text-[11px] font-semibold text-slate-500">
                    {formatPercent(metrics.labourShare, 1)}
                  </div>
                </div>
              </div>

              {/* Equip / Sub */}
              <div className="p-3 rounded-lg border border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded bg-slate-400" />
                  <div>
                    <div className="text-xs font-bold text-slate-800">Equipment & Subcontract</div>
                    <div className="text-[11px] text-slate-500">Machinery & specialty works</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold font-mono text-slate-800">
                    {formatCurrency(metrics.totalEquipSubCost, parameters.currencySymbol)}
                  </div>
                  <div className="text-[11px] font-semibold text-slate-500">
                    {formatPercent(metrics.equipSubShare, 1)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 pt-2">
            * Material tax rate calculated at {formatPercent(parameters.salesTaxRate, 1)} globally.
          </div>
        </div>

        {/* Right: Top 5 Cost Divisions Ranking (2 Columns Wide) */}
        <div className="lg:col-span-2 card-static p-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div>
              <h3
                className="text-base font-bold font-heading tracking-heading"
                style={{ color: 'var(--color-primary)' }}
              >
                Top 5 High-Impact Cost Divisions
              </h3>
              <p className="text-xs text-slate-500">
                Ranked by total direct cost magnitude. Priority targets for value engineering.
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('03_Division_Summary')}
              className="text-xs text-blue-600 font-semibold hover:underline cursor-pointer"
            >
              All 16 Divisions &rarr;
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="uppercase font-semibold tracking-label text-[11px] text-slate-500 border-b border-slate-200">
                  <th className="py-2 px-2 w-8">Rank</th>
                  <th className="py-2 px-3">Division Category</th>
                  <th className="py-2 px-3 text-right">Total Cost</th>
                  <th className="py-2 px-3 text-right">Share %</th>
                  <th className="py-2 px-3 text-right">Unit Rate</th>
                  <th className="py-2 px-3 w-36 text-center">Magnitude</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {metrics.topDivisions.map((div, idx) => {
                  const barPct = Math.min(100, Math.max(5, (div.totalCost / maxTopDivCost) * 100));

                  return (
                    <tr key={div.division} className="hover:bg-slate-50 transition-colors">
                      <td className="py-2.5 px-2 text-slate-400 font-mono font-bold">
                        #{idx + 1}
                      </td>
                      <td className="py-2.5 px-3 font-semibold text-slate-800">
                        {div.division}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">
                        {formatCurrency(div.totalCost, parameters.currencySymbol)}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-slate-600">
                        {formatPercent(div.costShare, 1)}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-slate-600">
                        {parameters.currencySymbol}
                        {div.costPerSqFt.toFixed(2)}/sq ft
                      </td>
                      <td className="py-2.5 px-3 flex justify-center items-center">
                        <div className="data-bar-rail">
                          <div
                            className="data-bar-fill"
                            style={{
                              width: `${barPct}%`,
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Bottom Section: Risk Anomaly Radar & Subcontractor Procurement Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Budget Risk Alerts */}
        <div className="card-static p-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <AlertCircle
                className="w-4 h-4"
                style={{
                  color: overBudgetRows.length > 0 ? 'var(--color-negative)' : 'var(--color-positive)',
                }}
              />
              <h3
                className="text-base font-bold font-heading tracking-heading"
                style={{ color: 'var(--color-primary)' }}
              >
                Budget Control Risk Radar ({overBudgetRows.length} Overruns)
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab('05_Budget_Cost')}
              className="text-xs text-blue-600 font-semibold hover:underline cursor-pointer"
            >
              Full Budget Sheet &rarr;
            </button>
          </div>

          {overBudgetRows.length > 0 ? (
            <div className="space-y-2.5">
              {overBudgetRows.map((row) => (
                <div
                  key={row.division}
                  className="p-3 rounded-lg border border-rose-200 bg-rose-50/50 flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-bold text-slate-900">{row.division}</div>
                    <div className="text-[11px] text-slate-500">
                      Approved Budget: {formatCurrency(row.approvedBudget, parameters.currencySymbol)} |
                      Actual: {formatCurrency(row.actualCost, parameters.currencySymbol)}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-rose-700 font-mono block">
                      +{formatCurrency(row.budgetVariance, parameters.currencySymbol)}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-rose-600">
                      +{formatPercent(row.budgetVariancePct, 1)} Overrun
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-emerald-50/50 rounded-lg border border-emerald-200 text-emerald-800 space-y-1">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <div className="font-bold text-sm">All Trade Packages Within Budget</div>
              <p className="text-xs text-emerald-700">
                No active budget breaches detected across any of the 16 residential divisions.
              </p>
            </div>
          )}
        </div>

        {/* Subcontractor Market Basket Highlights */}
        <div className="card-static p-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <h3
                className="text-base font-bold font-heading tracking-heading"
                style={{ color: 'var(--color-primary)' }}
              >
                Market Subcontractor Leveling
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab('04_Subcontractor')}
              className="text-xs text-blue-600 font-semibold hover:underline cursor-pointer"
            >
              Compare Quotes &rarr;
            </button>
          </div>

          <div className="space-y-3">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-500 block">Total Optimized Lowest Sub Quotes</span>
                <span className="font-bold font-mono text-sm text-slate-900">
                  {formatCurrency(metrics.lowestQuoteSum, parameters.currencySymbol)}
                </span>
              </div>
              <div className="text-right">
                <span className="text-slate-500 block">Net Variance vs Estimate</span>
                <span
                  className="font-bold font-mono text-sm"
                  style={{
                    color:
                      metrics.subcontractorTotalVariance < 0
                        ? 'var(--color-positive)'
                        : 'var(--color-primary)',
                  }}
                >
                  {metrics.subcontractorTotalVariance > 0 ? '+' : ''}
                  {formatCurrency(metrics.subcontractorTotalVariance, parameters.currencySymbol)}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Evaluating bids across all trade contractors allows selective buyout per division,
              capturing lowest qualified vendor pricing for each work scope.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
