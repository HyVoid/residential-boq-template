import React, { useMemo, useState } from 'react';
import { Award, DollarSign, TrendingDown, TrendingUp, UserCheck, Users, BarChart3, Table as TableIcon } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { AppDataState, ProjectParameters, SubcontractorQuoteRow } from '../types';
import { formatCurrency, formatPercent } from '../utils/calculations';

interface SubcontractorComparisonTabProps {
  quotes: SubcontractorQuoteRow[];
  subNames: AppDataState['subcontractorInfo'];
  onChangeSubNames: (names: AppDataState['subcontractorInfo']) => void;
  rawQuoteData: AppDataState['subcontractorQuotes'];
  onChangeQuotes: (newQuotes: AppDataState['subcontractorQuotes']) => void;
  parameters: ProjectParameters;
}

export const SubcontractorComparisonTab: React.FC<SubcontractorComparisonTabProps> = ({
  quotes,
  subNames,
  onChangeSubNames,
  rawQuoteData,
  onChangeQuotes,
  parameters,
}) => {
  const [viewMode, setViewMode] = useState<'both' | 'table' | 'charts'>('both');

  const handleQuoteChange = (
    division: string,
    field: 'subAQuote' | 'subBQuote' | 'subCQuote',
    val: string,
  ) => {
    const parsed = parseFloat(val) || 0;
    const current = rawQuoteData[division] || { subAQuote: 0, subBQuote: 0, subCQuote: 0 };
    onChangeQuotes({
      ...rawQuoteData,
      [division]: {
        ...current,
        [field]: parsed,
      },
    });
  };

  const handleSubNameChange = (field: keyof AppDataState['subcontractorInfo'], val: string) => {
    onChangeSubNames({
      ...subNames,
      [field]: val,
    });
  };

  const totalBase = quotes.reduce((s, q) => s + q.internalEstimate, 0);
  const totalSubA = quotes.reduce((s, q) => s + q.subAQuote, 0);
  const totalSubB = quotes.reduce((s, q) => s + q.subBQuote, 0);
  const totalSubC = quotes.reduce((s, q) => s + q.subCQuote, 0);
  const totalLowest = quotes.reduce((s, q) => s + q.lowestQuote, 0);
  const totalVariance = totalLowest - totalBase;
  const totalVariancePct = totalBase > 0 ? totalVariance / totalBase : 0;

  const activeQuoteRows = useMemo(() => {
    return quotes.filter(
      (q) => q.internalEstimate > 0 || q.subAQuote > 0 || q.subBQuote > 0 || q.subCQuote > 0,
    );
  }, [quotes]);

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
    <div id="sheet-04-subcontractor" className="space-y-5 animate-fadeUp">
      {/* Title & View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-slate-200 text-slate-700">
              SHEET 04
            </span>
            <h1 className="text-2xl font-bold font-serif tracking-tight text-[#051C2C]">
              Subcontractor Quote Comparison & Bid Leveling
            </h1>
          </div>
          <p className="text-xs text-[#888888]">
            Evaluates market procurement bids against internal quantity takeoff baselines. Automatically
            identifies the lowest qualified trade contractor and flags pricing variances.
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

      {/* Subcontractor Name Headers Configuration */}
      <div className="card-static p-4">
        <div className="text-[11px] font-semibold uppercase tracking-label text-[#888888] mb-2 flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 text-[#2251FF]" />
          <span>Vendor / Subcontractor Profiles</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-[11px] font-medium text-slate-500 block mb-1">
              Subcontractor A Name
            </label>
            <input
              type="text"
              value={subNames.subAName}
              onChange={(e) => handleSubNameChange('subAName', e.target.value)}
              className="w-full px-3 py-1.5 text-xs font-semibold rounded border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-[11px] font-medium text-slate-500 block mb-1">
              Subcontractor B Name
            </label>
            <input
              type="text"
              value={subNames.subBName}
              onChange={(e) => handleSubNameChange('subBName', e.target.value)}
              className="w-full px-3 py-1.5 text-xs font-semibold rounded border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-[11px] font-medium text-slate-500 block mb-1">
              Subcontractor C Name
            </label>
            <input
              type="text"
              value={subNames.subCName}
              onChange={(e) => handleSubNameChange('subCName', e.target.value)}
              className="w-full px-3 py-1.5 text-xs font-semibold rounded border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Recharts Trade Bid Comparison Bar Chart */}
      {(viewMode === 'both' || viewMode === 'charts') && (
        <div className="card-elevation p-5 bg-white space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#2251FF]" />
              <h3 className="font-serif font-bold text-sm text-[#051C2C]">
                Trade Bid Leveling & Vendor Comparison
              </h3>
            </div>
            <span className="text-xs text-[#888888]">
              Comparison of baseline estimate vs. trade quotes
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={activeQuoteRows}
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
                <Bar dataKey="internalEstimate" name="Internal Baseline" fill="#051C2C" radius={[3, 3, 0, 0]} />
                <Bar dataKey="subAQuote" name={subNames.subAName || 'Sub A'} fill="#2251FF" radius={[3, 3, 0, 0]} />
                <Bar dataKey="subBQuote" name={subNames.subBName || 'Sub B'} fill="#10B981" radius={[3, 3, 0, 0]} />
                <Bar dataKey="subCQuote" name={subNames.subCName || 'Sub C'} fill="#F59E0B" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Comparison Table */}
      {(viewMode === 'both' || viewMode === 'table') && (
        <div className="card-static overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table
              id="table-subcontractor-comparison"
              className="w-full text-left text-[12px] border-collapse"
              style={{ minWidth: '1100px' }}
            >
              <thead
                style={{
                  backgroundColor: 'var(--table-header-bg)',
                  borderBottom: '2px solid var(--table-header-sep)',
                }}
              >
                <tr className="uppercase font-semibold tracking-label text-[11px] text-slate-700">
                  <th className="py-2.5 px-3 w-10 text-center">#</th>
                  <th className="py-2.5 px-4 min-w-[200px]">Division / Trade</th>
                  <th className="py-2.5 px-4 text-right min-w-[130px] bg-slate-100/70 font-bold text-slate-900">
                    Internal Baseline
                  </th>
                  <th className="py-2.5 px-3 text-right min-w-[130px]">{subNames.subAName || 'Sub A'}</th>
                  <th className="py-2.5 px-3 text-right min-w-[130px]">{subNames.subBName || 'Sub B'}</th>
                  <th className="py-2.5 px-3 text-right min-w-[130px]">{subNames.subCName || 'Sub C'}</th>
                  <th className="py-2.5 px-4 text-right min-w-[130px] bg-slate-200/80 font-bold text-slate-900">
                    Lowest Quote
                  </th>
                  <th className="py-2.5 px-3 text-center min-w-[160px]">Lowest Vendor</th>
                  <th className="py-2.5 px-3 text-right min-w-[120px]">Variance ($)</th>
                  <th className="py-2.5 px-3 text-right min-w-[100px]">Variance %</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200 font-sans text-slate-800">
                {quotes.map((row, idx) => {
                  const isSignificantAnomaly = row.variancePct > 0.08; // >8% above estimate
                  const isSavings = row.varianceVsBase < 0;

                  return (
                    <tr
                      key={row.division}
                      className={`hover:bg-slate-50 transition-colors ${
                        isSignificantAnomaly ? 'anomaly-row' : ''
                      }`}
                    >
                      <td className="py-2 px-3 text-center text-slate-400 font-mono text-[11px]">
                        {String(idx + 1).padStart(2, '0')}
                      </td>
                      <td className="py-2 px-4 font-semibold text-slate-800">{row.division}</td>

                      {/* Internal Baseline (Readonly) */}
                      <td className="py-2 px-4 text-right font-mono bg-slate-50 font-semibold text-slate-800">
                        {formatCurrency(row.internalEstimate, parameters.currencySymbol)}
                      </td>

                      {/* Sub A Quote (Editable) */}
                      <td className="py-1.5 px-2 text-right">
                        <input
                          type="number"
                          step="50"
                          value={row.subAQuote || ''}
                          onChange={(e) => handleQuoteChange(row.division, 'subAQuote', e.target.value)}
                          placeholder="0.00"
                          className="w-full px-2 py-1 text-xs text-right font-mono rounded border border-amber-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          style={{ backgroundColor: 'var(--color-input-bg)' }}
                        />
                      </td>

                      {/* Sub B Quote (Editable) */}
                      <td className="py-1.5 px-2 text-right">
                        <input
                          type="number"
                          step="50"
                          value={row.subBQuote || ''}
                          onChange={(e) => handleQuoteChange(row.division, 'subBQuote', e.target.value)}
                          placeholder="0.00"
                          className="w-full px-2 py-1 text-xs text-right font-mono rounded border border-amber-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          style={{ backgroundColor: 'var(--color-input-bg)' }}
                        />
                      </td>

                      {/* Sub C Quote (Editable) */}
                      <td className="py-1.5 px-2 text-right">
                        <input
                          type="number"
                          step="50"
                          value={row.subCQuote || ''}
                          onChange={(e) => handleQuoteChange(row.division, 'subCQuote', e.target.value)}
                          placeholder="0.00"
                          className="w-full px-2 py-1 text-xs text-right font-mono rounded border border-amber-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          style={{ backgroundColor: 'var(--color-input-bg)' }}
                        />
                      </td>

                      {/* Lowest Quote (Formula) */}
                      <td className="py-2 px-4 text-right font-mono font-bold bg-slate-100 text-slate-900">
                        {formatCurrency(row.lowestQuote, parameters.currencySymbol)}
                      </td>

                      {/* Lowest Vendor Pill */}
                      <td className="py-2 px-3 text-center">
                        <span
                          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold transition-transform hover:scale-105"
                          style={{
                            backgroundColor: 'rgba(5, 28, 44, 0.08)',
                            color: 'var(--color-primary)',
                          }}
                        >
                          <Award className="w-3 h-3 text-amber-600" />
                          <span className="truncate max-w-[130px]">{row.lowestVendor}</span>
                        </span>
                      </td>

                      {/* Variance vs Base ($) */}
                      <td
                        className={`py-2 px-3 text-right font-mono font-medium ${
                          isSavings ? 'text-slate-600' : 'text-slate-800'
                        }`}
                      >
                        {row.varianceVsBase > 0 ? '+' : ''}
                        {formatCurrency(row.varianceVsBase, parameters.currencySymbol)}
                      </td>

                      {/* Variance % */}
                      <td className="py-2 px-3 text-right font-mono">
                        <span
                          className={
                            isSignificantAnomaly
                              ? 'font-bold'
                              : 'text-slate-600'
                          }
                          style={{
                            color: isSignificantAnomaly ? 'var(--color-negative)' : undefined,
                          }}
                        >
                          {row.variancePct > 0 ? '+' : ''}
                          {formatPercent(row.variancePct, 1)}
                        </span>
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
                    Summary Bid Leveling Total
                  </td>
                  <td className="py-3 px-4 text-right bg-slate-100">
                    {formatCurrency(totalBase, parameters.currencySymbol)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono">
                    {formatCurrency(totalSubA, parameters.currencySymbol)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono">
                    {formatCurrency(totalSubB, parameters.currencySymbol)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono">
                    {formatCurrency(totalSubC, parameters.currencySymbol)}
                  </td>
                  <td
                    className="py-3 px-4 text-right bg-slate-200 text-sm font-extrabold"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    {formatCurrency(totalLowest, parameters.currencySymbol)}
                  </td>
                  <td className="text-center text-[11px] text-slate-500 font-sans">Optimized Trade Basket</td>
                  <td className="py-3 px-3 text-right font-mono font-bold">
                    {totalVariance > 0 ? '+' : ''}
                    {formatCurrency(totalVariance, parameters.currencySymbol)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold">
                    {totalVariancePct > 0 ? '+' : ''}
                    {formatPercent(totalVariancePct, 1)}
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

