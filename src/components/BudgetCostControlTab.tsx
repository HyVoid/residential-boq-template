import React, { useMemo, useState } from 'react';
import { AlertTriangle, CheckCircle, DollarSign, ShieldAlert, TrendingUp, BarChart3, Table as TableIcon } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { AppDataState, BudgetControlRow, ProjectParameters } from '../types';
import { formatCurrency, formatPercent } from '../utils/calculations';

interface BudgetCostControlTabProps {
  budgetRows: BudgetControlRow[];
  rawBudgetData: AppDataState['budgetControls'];
  onChangeBudgets: (newBudgets: AppDataState['budgetControls']) => void;
  parameters: ProjectParameters;
}

export const BudgetCostControlTab: React.FC<BudgetCostControlTabProps> = ({
  budgetRows,
  rawBudgetData,
  onChangeBudgets,
  parameters,
}) => {
  const [viewMode, setViewMode] = useState<'both' | 'table' | 'charts'>('both');

  const handleBudgetFieldChange = (
    division: string,
    field: 'approvedBudget' | 'actualCost',
    val: string,
  ) => {
    const parsed = parseFloat(val) || 0;
    const current = rawBudgetData[division] || { approvedBudget: 0, actualCost: 0 };
    onChangeBudgets({
      ...rawBudgetData,
      [division]: {
        ...current,
        [field]: parsed,
      },
    });
  };

  const totalEstimated = budgetRows.reduce((s, r) => s + r.estimatedCost, 0);
  const totalApproved = budgetRows.reduce((s, r) => s + r.approvedBudget, 0);
  const totalActual = budgetRows.reduce((s, r) => s + r.actualCost, 0);
  const netVariance = totalActual - totalApproved;
  const netVariancePct = totalApproved > 0 ? netVariance / totalApproved : 0;
  const overBudgetCount = budgetRows.filter((r) => r.isOverBudget).length;

  const activeChartRows = useMemo(() => {
    return budgetRows.filter((r) => r.approvedBudget > 0 || r.actualCost > 0);
  }, [budgetRows]);

  const CustomChartTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-xl border border-slate-200 text-xs z-50">
          <div className="font-bold font-heading text-sm text-[#051C2C] mb-2 pb-1 border-b border-slate-100">
            {label}
          </div>
          <div className="space-y-1">
            {payload.map((entry: any, index: number) => (
              <div key={index} className="flex items-center justify-between gap-3">
                <span className="text-slate-600 flex items-center gap-1.5">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: entry.color || entry.fill }}
                  />
                  {entry.name}:
                </span>
                <span className="font-mono font-semibold text-slate-900">
                  {formatCurrency(entry.value, parameters.currencySymbol)}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div id="sheet-05-budget-cost-control" className="space-y-5 animate-fadeUp">
      {/* Title & View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-slate-200 text-slate-700">
              SHEET 05
            </span>
            <h1 className="text-2xl font-bold font-serif tracking-tight text-[#051C2C]">
              Budget vs. Actual Cost Control
            </h1>
          </div>
          <p className="text-xs text-[#888888]">
            Continuous lifecycle cost control tracking. Compares baseline takeoff estimates against authorized client budgets and real-time trade expenditures.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1.5 p-1 bg-white rounded-lg border border-[#E2E2E2] shadow-2xs self-start sm:self-auto">
          <button
            onClick={() => setViewMode('both')}
            className={`btn text-xs py-1 px-2.5 ${
              viewMode === 'both' ? 'btn-primary' : 'bg-transparent text-slate-600 hover:bg-slate-100'
            }`}
          >
            Combined View
          </button>
          <button
            onClick={() => setViewMode('charts')}
            className={`btn text-xs py-1 px-2.5 ${
              viewMode === 'charts' ? 'btn-primary' : 'bg-transparent text-slate-600 hover:bg-slate-100'
            }`}
          >
            <BarChart3 className="w-3 h-3" />
            Charts Only
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`btn text-xs py-1 px-2.5 ${
              viewMode === 'table' ? 'btn-primary' : 'bg-transparent text-slate-600 hover:bg-slate-100'
            }`}
          >
            <TableIcon className="w-3 h-3" />
            Table Only
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Approved Budget */}
        <div className="card-elevation p-4">
          <span className="text-[11px] font-semibold uppercase tracking-label text-[#888888] block mb-1">
            Total Approved Budget
          </span>
          <div className="kpi-val text-2xl">
            {formatCurrency(totalApproved, parameters.currencySymbol)}
          </div>
          <span className="text-xs text-[#888888] font-sans mt-1 block">Baseline Client Allocation</span>
        </div>

        {/* Incurred Actuals */}
        <div className="card-elevation p-4">
          <span className="text-[11px] font-semibold uppercase tracking-label text-[#888888] block mb-1">
            Total Incurred Actuals
          </span>
          <div className="kpi-val text-2xl">
            {formatCurrency(totalActual, parameters.currencySymbol)}
          </div>
          <span className="text-xs text-[#888888] font-sans mt-1 block">
            {formatPercent(totalApproved > 0 ? totalActual / totalApproved : 0)} of budget committed
          </span>
        </div>

        {/* Net Cost Variance */}
        <div className="card-elevation p-4">
          <span className="text-[11px] font-semibold uppercase tracking-label text-[#888888] block mb-1">
            Net Cost Variance
          </span>
          <div
            className="kpi-val text-2xl"
            style={{
              color: netVariance > 0 ? 'var(--error)' : 'var(--brand)',
            }}
          >
            {netVariance > 0 ? '+' : ''}
            {formatCurrency(netVariance, parameters.currencySymbol)}
          </div>
          <span className="text-xs text-[#888888] font-sans mt-1 block">
            {netVariance > 0 ? 'Exceeding baseline budget' : 'Under authorized budget'}
          </span>
        </div>

        {/* Risk Alerts */}
        <div className="card-elevation p-4">
          <span className="text-[11px] font-semibold uppercase tracking-label text-[#888888] block mb-1">
            Over-Budget Trades
          </span>
          <div
            className="kpi-val text-2xl"
            style={{
              color: overBudgetCount > 0 ? 'var(--error)' : 'var(--success)',
            }}
          >
            {overBudgetCount}{' '}
            <span className="text-sm font-normal text-[#888888] font-sans">
              / {budgetRows.length} Divisions
            </span>
          </div>
          <span className="text-xs text-[#888888] font-sans mt-1 block">
            {overBudgetCount > 0 ? 'Action required on flagged trades' : 'All divisions within limit'}
          </span>
        </div>
      </div>

      {/* Visual Recharts Budget Comparison Bar Chart */}
      {(viewMode === 'both' || viewMode === 'charts') && (
        <div className="card-elevation p-5 bg-white space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#2251FF]" />
              <h3 className="font-serif font-bold text-sm text-[#051C2C]">
                Budget vs. Actual Cost Comparison by Division
              </h3>
            </div>
            <span className="text-xs text-[#888888]">
              Live comparative bars highlighting trade expenditures
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={activeChartRows}
                margin={{ top: 10, right: 10, left: 10, bottom: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E2E2" />
                <XAxis
                  dataKey="division"
                  angle={-25}
                  textAnchor="end"
                  interval={0}
                  height={45}
                  tick={{ fill: '#051C2C', fontSize: 10 }}
                />
                <YAxis
                  tickFormatter={(v) => formatCurrency(v, parameters.currencySymbol, 0)}
                  tick={{ fill: '#888888', fontSize: 10 }}
                />
                <Tooltip content={<CustomChartTooltip />} />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 6 }} />
                <Bar dataKey="approvedBudget" name="Approved Budget" fill="#2251FF" radius={[3, 3, 0, 0]} />
                <Bar dataKey="actualCost" name="Incurred Actuals" fill="#D32F2F" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Main Budget Control Table */}
      {(viewMode === 'both' || viewMode === 'table') && (
        <div className="card-static overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table
              id="table-budget-cost-control"
              className="w-full text-left text-[12px] border-collapse"
              style={{ minWidth: '1050px' }}
            >
              <thead
                style={{
                  backgroundColor: 'var(--table-header-bg)',
                  borderBottom: '2px solid var(--table-header-sep)',
                }}
              >
                <tr className="uppercase font-semibold tracking-label text-[11px] text-slate-700">
                  <th className="py-2.5 px-3 w-10 text-center">#</th>
                  <th className="py-2.5 px-4 min-w-[220px]">Division / Work Package</th>
                  <th className="py-2.5 px-4 text-right min-w-[140px] bg-slate-100/70 font-bold text-slate-900">
                    BOQ Estimated Cost
                  </th>
                  <th className="py-2.5 px-4 text-right min-w-[150px]">Approved Budget</th>
                  <th className="py-2.5 px-4 text-right min-w-[150px]">Actual Incurred Cost</th>
                  <th className="py-2.5 px-4 text-right min-w-[140px]">Budget Variance ($)</th>
                  <th className="py-2.5 px-3 text-right min-w-[100px]">Variance %</th>
                  <th className="py-2.5 px-3 text-center min-w-[150px]">Control Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200 font-sans text-slate-800">
                {budgetRows.map((row, idx) => {
                  return (
                    <tr
                      key={row.division}
                      className={`hover:bg-slate-50 transition-colors ${
                        row.isOverBudget ? 'anomaly-row' : ''
                      }`}
                    >
                      <td className="py-2 px-3 text-center text-slate-400 font-mono text-[11px]">
                        {String(idx + 1).padStart(2, '0')}
                      </td>
                      <td className="py-2 px-4 font-semibold text-slate-800">{row.division}</td>

                      {/* Estimated Cost (Readonly) */}
                      <td className="py-2 px-4 text-right font-mono bg-slate-50 text-slate-700">
                        {formatCurrency(row.estimatedCost, parameters.currencySymbol)}
                      </td>

                      {/* Approved Budget (Editable) */}
                      <td className="py-1.5 px-3 text-right">
                        <input
                          type="number"
                          step="100"
                          value={row.approvedBudget || ''}
                          onChange={(e) =>
                            handleBudgetFieldChange(row.division, 'approvedBudget', e.target.value)
                          }
                          placeholder="0.00"
                          className="w-full px-2 py-1 text-xs text-right font-mono rounded border border-amber-200 focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold"
                          style={{ backgroundColor: 'var(--color-input-bg)' }}
                        />
                      </td>

                      {/* Actual Cost (Editable) */}
                      <td className="py-1.5 px-3 text-right">
                        <input
                          type="number"
                          step="100"
                          value={row.actualCost || ''}
                          onChange={(e) =>
                            handleBudgetFieldChange(row.division, 'actualCost', e.target.value)
                          }
                          placeholder="0.00"
                          className="w-full px-2 py-1 text-xs text-right font-mono rounded border border-amber-200 focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold"
                          style={{ backgroundColor: 'var(--color-input-bg)' }}
                        />
                      </td>

                      {/* Variance ($) */}
                      <td
                        className={`py-2 px-4 text-right font-mono font-bold ${
                          row.isOverBudget ? 'text-rose-700' : 'text-slate-700'
                        }`}
                      >
                        {row.budgetVariance > 0 ? '+' : ''}
                        {formatCurrency(row.budgetVariance, parameters.currencySymbol)}
                      </td>

                      {/* Variance % */}
                      <td className="py-2 px-3 text-right font-mono">
                        <span
                          className={row.isOverBudget ? 'font-bold text-rose-700' : 'text-slate-600'}
                        >
                          {row.budgetVariancePct > 0 ? '+' : ''}
                          {formatPercent(row.budgetVariancePct, 1)}
                        </span>
                      </td>

                      {/* Status Flag Pill Badge */}
                      <td className="py-2 px-3 text-center">
                        {row.isOverBudget ? (
                          <span
                            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold text-rose-700 bg-rose-100/90 border border-rose-300"
                          >
                            <AlertTriangle className="w-3 h-3 text-rose-600" />
                            <span>OVER BUDGET</span>
                          </span>
                        ) : (
                          <span
                            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200"
                          >
                            <CheckCircle className="w-3 h-3 text-emerald-600" />
                            <span>OK</span>
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>

              {/* Grand Totals */}
              <tfoot
                className="sticky bottom-0 z-20 font-bold font-mono text-[12px] uppercase"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  borderTop: '2px solid var(--color-primary)',
                }}
              >
                <tr className="text-slate-900">
                  <td colSpan={2} className="py-3 px-4 text-left">
                    Summary Totals
                  </td>
                  <td className="py-3 px-4 text-right bg-slate-100">
                    {formatCurrency(totalEstimated, parameters.currencySymbol)}
                  </td>
                  <td className="py-3 px-4 text-right">
                    {formatCurrency(totalApproved, parameters.currencySymbol)}
                  </td>
                  <td className="py-3 px-4 text-right">
                    {formatCurrency(totalActual, parameters.currencySymbol)}
                  </td>
                  <td
                    className="py-3 px-4 text-right text-sm font-extrabold"
                    style={{
                      color: netVariance > 0 ? 'var(--color-negative)' : 'var(--color-primary)',
                    }}
                  >
                    {netVariance > 0 ? '+' : ''}
                    {formatCurrency(netVariance, parameters.currencySymbol)}
                  </td>
                  <td className="py-3 px-3 text-right">
                    {netVariancePct > 0 ? '+' : ''}
                    {formatPercent(netVariancePct, 1)}
                  </td>
                  <td className="py-3 px-3 text-center">
                    {overBudgetCount > 0 ? (
                      <span className="text-rose-700 font-bold text-[11px]">
                        {overBudgetCount} Overruns Active
                      </span>
                    ) : (
                      <span className="text-emerald-700 font-bold text-[11px]">100% Balanced</span>
                    )}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

