import React, { useMemo, useState } from 'react';
import { Layers, PieChart as PieIcon, BarChart3, Table as TableIcon } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { DivisionSummaryRow, ProjectParameters, ProjectSetup } from '../types';
import { formatCurrency, formatNumber, formatPercent } from '../utils/calculations';

interface DivisionSummaryTabProps {
  divisionSummaries: DivisionSummaryRow[];
  totalEstimateCost: number;
  parameters: ProjectParameters;
  projectSetup: ProjectSetup;
}

const PALETTE = [
  '#2251FF',
  '#051C2C',
  '#00C853',
  '#F59E0B',
  '#8B5CF6',
  '#EC4899',
  '#06B6D4',
  '#D32F2F',
  '#64748B',
  '#10B981',
];

export const DivisionSummaryTab: React.FC<DivisionSummaryTabProps> = ({
  divisionSummaries,
  totalEstimateCost,
  parameters,
  projectSetup,
}) => {
  const [viewMode, setViewMode] = useState<'both' | 'table' | 'charts'>('both');
  const [chartMetric, setChartMetric] = useState<'breakdown' | 'total'>('breakdown');

  const maxDivCost = useMemo(() => {
    return Math.max(...divisionSummaries.map((d) => d.totalCost), 1);
  }, [divisionSummaries]);

  const activeDivisions = useMemo(() => {
    return divisionSummaries.filter((d) => d.totalCost > 0);
  }, [divisionSummaries]);

  const totalMaterial = divisionSummaries.reduce((s, d) => s + d.materialCost, 0);
  const totalLabour = divisionSummaries.reduce((s, d) => s + d.labourCost, 0);
  const totalEquipSub = divisionSummaries.reduce((s, d) => s + d.equipSubCost, 0);
  const grossArea = projectSetup.grossArea > 0 ? projectSetup.grossArea : 1;
  const totalCostPerSqFt = totalEstimateCost / grossArea;

  const CustomChartTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-xl border border-slate-200 text-xs z-50">
          <div className="font-bold font-heading text-sm text-[#051C2C] mb-2 pb-1 border-b border-slate-100">
            {label || payload[0]?.name}
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
    <div id="sheet-03-division-summary" className="space-y-5 animate-fadeUp">
      {/* Title & View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-slate-200 text-slate-700">
              SHEET 03
            </span>
            <h1 className="text-2xl font-bold font-serif tracking-tight text-[#051C2C]">
              Division Cost Rollup & Trade Aggregation
            </h1>
          </div>
          <p className="text-xs text-[#888888]">
            Automated aggregation of all 16 residential construction divisions. Evaluates trade cost distributions, percentage shares, and unit rates ({grossArea.toLocaleString()} sq ft).
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

      {/* Visual Chart Panel */}
      {(viewMode === 'both' || viewMode === 'charts') && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Stacked/Grouped Bar Chart */}
          <div className="lg:col-span-2 card-elevation p-5 bg-white space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#2251FF]" />
                <h3 className="font-serif font-bold text-sm text-[#051C2C]">
                  Division Cost Component Breakdown
                </h3>
              </div>
              <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded text-[11px]">
                <button
                  onClick={() => setChartMetric('breakdown')}
                  className={`px-2 py-0.5 rounded font-medium cursor-pointer ${
                    chartMetric === 'breakdown'
                      ? 'bg-white text-[#2251FF] shadow-xs'
                      : 'text-slate-600'
                  }`}
                >
                  Stacked (Mat/Lab/Eqp)
                </button>
                <button
                  onClick={() => setChartMetric('total')}
                  className={`px-2 py-0.5 rounded font-medium cursor-pointer ${
                    chartMetric === 'total' ? 'bg-white text-[#2251FF] shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Total Cost
                </button>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={activeDivisions}
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
                  {chartMetric === 'breakdown' ? (
                    <>
                      <Bar dataKey="materialCost" name="Material" fill="#051C2C" stackId="a" />
                      <Bar dataKey="labourCost" name="Labour" fill="#00C853" stackId="a" />
                      <Bar dataKey="equipSubCost" name="Equip/Sub" fill="#F59E0B" stackId="a" radius={[4, 4, 0, 0]} />
                    </>
                  ) : (
                    <Bar dataKey="totalCost" name="Total Cost" fill="#2251FF" radius={[4, 4, 0, 0]} />
                  )}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Cost Share Donut Chart */}
          <div className="card-elevation p-5 bg-white space-y-3">
            <div className="flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-[#2251FF]" />
              <h3 className="font-serif font-bold text-sm text-[#051C2C]">
                Trade Cost Allocation Share
              </h3>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={activeDivisions}
                    dataKey="totalCost"
                    nameKey="division"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={85}
                    paddingAngle={2}
                  >
                    {activeDivisions.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={PALETTE[index % PALETTE.length]}
                        stroke="#FFFFFF"
                        strokeWidth={1.5}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomChartTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Top 3 High-Impact Division Insight */}
      <div className="insight-box">
        <h4 className="text-xs font-semibold text-[#051C2C] uppercase tracking-label mb-1">
          Division Concentration Analysis
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
          The top 3 cost drivers account for{' '}
          <strong>
            {formatPercent(
              [...divisionSummaries]
                .sort((a, b) => b.totalCost - a.totalCost)
                .slice(0, 3)
                .reduce((s, d) => s + d.costShare, 0),
            )}
          </strong>{' '}
          of the total construction estimate. Structural Wood Framing, Exterior Cladding, and Interior
          Finishes represent the highest procurement variance risks.
        </p>
      </div>

      {/* Main Aggregation Table */}
      {(viewMode === 'both' || viewMode === 'table') && (
        <div className="card-static overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table
              id="table-division-summary"
              className="w-full text-left text-[12px] border-collapse"
            >
              <thead
                style={{
                  backgroundColor: 'var(--table-header-bg)',
                  borderBottom: '2px solid var(--table-header-sep)',
                }}
              >
                <tr className="uppercase font-semibold tracking-label text-[11px] text-slate-700">
                  <th className="py-2.5 px-3 w-10 text-center">#</th>
                  <th className="py-2.5 px-4 min-w-[220px]">Division / Trade Category</th>
                  <th className="py-2.5 px-3 text-center w-16">Items</th>
                  <th className="py-2.5 px-4 text-right min-w-[120px]">Material Cost</th>
                  <th className="py-2.5 px-4 text-right min-w-[120px]">Labour Cost</th>
                  <th className="py-2.5 px-4 text-right min-w-[120px]">Equip/Sub Cost</th>
                  <th className="py-2.5 px-4 text-right min-w-[160px] bg-slate-100/70 font-bold text-slate-900">
                    Total Cost
                  </th>
                  <th className="py-2.5 px-4 text-right min-w-[140px]">Cost Share %</th>
                  <th className="py-2.5 px-4 text-right min-w-[130px]">Cost / sq ft</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200 font-sans text-slate-800">
                {divisionSummaries.map((row, idx) => {
                  const barWidthPct = Math.min(100, Math.max(2, (row.totalCost / maxDivCost) * 100));

                  return (
                    <tr key={row.division} className="hover:bg-slate-50 transition-colors">
                      <td className="py-2.5 px-3 text-center text-slate-400 font-mono text-[11px]">
                        {String(idx + 1).padStart(2, '0')}
                      </td>
                      <td className="py-2.5 px-4 font-semibold text-slate-800 flex items-center gap-2">
                        <span>{row.division}</span>
                      </td>
                      <td className="py-2.5 px-3 text-center text-slate-500 font-mono">
                        {row.itemCount > 0 ? (
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold text-[11px]">
                            {row.itemCount}
                          </span>
                        ) : (
                          <span className="text-slate-300">0</span>
                        )}
                      </td>
                      <td className="py-2.5 px-4 text-right font-mono text-slate-700">
                        {formatCurrency(row.materialCost, parameters.currencySymbol)}
                      </td>
                      <td className="py-2.5 px-4 text-right font-mono text-slate-700">
                        {formatCurrency(row.labourCost, parameters.currencySymbol)}
                      </td>
                      <td className="py-2.5 px-4 text-right font-mono text-slate-700">
                        {formatCurrency(row.equipSubCost, parameters.currencySymbol)}
                      </td>

                      {/* Total Cost with Dynamic Inline Data Bar */}
                      <td className="py-2.5 px-4 text-right font-mono font-bold bg-slate-50 text-slate-900 relative overflow-hidden">
                        <div className="relative z-10">
                          {formatCurrency(row.totalCost, parameters.currencySymbol)}
                        </div>
                        <div
                          className="absolute bottom-0 right-0 top-0 opacity-12 pointer-events-none transition-all duration-300"
                          style={{
                            width: `${barWidthPct}%`,
                            backgroundColor: 'var(--color-accent)',
                          }}
                        />
                      </td>

                      {/* Cost Share with visual bar */}
                      <td className="py-2.5 px-4 text-right font-mono font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-16 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${row.costShare * 100}%`,
                                backgroundColor: 'var(--color-accent)',
                              }}
                            />
                          </div>
                          <span>{formatPercent(row.costShare, 1)}</span>
                        </div>
                      </td>

                      {/* Cost / sq ft */}
                      <td className="py-2.5 px-4 text-right font-mono text-slate-700">
                        {parameters.currencySymbol}
                        {row.costPerSqFt.toFixed(2)}
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
                  <td colSpan={3} className="py-3 px-4 text-left">
                    Grand Total Summary
                  </td>
                  <td className="py-3 px-4 text-right">
                    {formatCurrency(totalMaterial, parameters.currencySymbol)}
                  </td>
                  <td className="py-3 px-4 text-right">
                    {formatCurrency(totalLabour, parameters.currencySymbol)}
                  </td>
                  <td className="py-3 px-4 text-right">
                    {formatCurrency(totalEquipSub, parameters.currencySymbol)}
                  </td>
                  <td
                    className="py-3 px-4 text-right bg-slate-200 text-sm font-extrabold"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    {formatCurrency(totalEstimateCost, parameters.currencySymbol)}
                  </td>
                  <td className="py-3 px-4 text-right">100.0%</td>
                  <td
                    className="py-3 px-4 text-right font-extrabold"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    {parameters.currencySymbol}
                    {totalCostPerSqFt.toFixed(2)} / sq ft
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

