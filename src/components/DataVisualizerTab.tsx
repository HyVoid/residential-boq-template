import React, { useMemo, useState } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  BarChart3,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  AreaChart as AreaChartIcon,
  ArrowUpDown,
  Filter,
  SlidersHorizontal,
  Layers,
  Sparkles,
  Info,
  Maximize2,
  Table as TableIcon,
  RefreshCw,
} from 'lucide-react';
import {
  ComputedBOQItem,
  DivisionSummaryRow,
  ProjectParameters,
  ProjectSetup,
  SubcontractorQuoteRow,
  BudgetControlRow,
} from '../types';
import { formatCurrency, formatPercent } from '../utils/formatters';

interface DataVisualizerTabProps {
  divisionSummaries: DivisionSummaryRow[];
  computedBOQ: ComputedBOQItem[];
  subQuotes: SubcontractorQuoteRow[];
  budgetRows: BudgetControlRow[];
  parameters: ProjectParameters;
  projectSetup: ProjectSetup;
}

type DatasetType = 'divisions' | 'boq_items' | 'subcontractors' | 'budget_variance' | 'cost_breakdown';
type ChartType = 'bar' | 'line' | 'pie' | 'area';
type BarOrientation = 'vertical' | 'horizontal';
type SortOrder = 'desc' | 'asc' | 'none';

const PALETTE = [
  '#2251FF', // Brand Accent Blue
  '#051C2C', // Deep Navy
  '#00C853', // Emerald Green
  '#F59E0B', // Amber
  '#8B5CF6', // Purple
  '#EC4899', // Pink
  '#06B6D4', // Cyan
  '#D32F2F', // Crimson Red
  '#64748B', // Slate
  '#10B981', // Teal
];

export const DataVisualizerTab: React.FC<DataVisualizerTabProps> = ({
  divisionSummaries,
  computedBOQ,
  subQuotes,
  budgetRows,
  parameters,
  projectSetup,
}) => {
  // State for chart configuration
  const [selectedDataset, setSelectedDataset] = useState<DatasetType>('divisions');
  const [selectedChartType, setSelectedChartType] = useState<ChartType>('bar');
  const [barOrientation, setBarOrientation] = useState<BarOrientation>('vertical');
  const [isStacked, setIsStacked] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [topNFilter, setTopNFilter] = useState<number>(0); // 0 = all
  const [showDataTable, setShowDataTable] = useState<boolean>(false);

  // Column / Series selection state
  const [activeMetrics, setActiveMetrics] = useState<string[]>(['totalCost']);

  // Update default active metrics when dataset changes
  const handleDatasetChange = (ds: DatasetType) => {
    setSelectedDataset(ds);
    if (ds === 'divisions') {
      setActiveMetrics(['totalCost']);
    } else if (ds === 'boq_items') {
      setActiveMetrics(['totalItemCost']);
    } else if (ds === 'subcontractors') {
      setActiveMetrics(['internalEstimate', 'lowestQuote']);
    } else if (ds === 'budget_variance') {
      setActiveMetrics(['approvedBudget', 'actualCost']);
    } else if (ds === 'cost_breakdown') {
      setActiveMetrics(['value']);
    }
  };

  // Available metrics configuration per dataset
  const datasetConfig = useMemo(() => {
    switch (selectedDataset) {
      case 'divisions':
        return {
          title: 'CSI Division Summary Data',
          categoryKey: 'division',
          categoryLabel: 'Division',
          metrics: [
            { key: 'totalCost', label: 'Total Direct Cost ($)', color: '#2251FF' },
            { key: 'materialCost', label: 'Material Cost ($)', color: '#051C2C' },
            { key: 'labourCost', label: 'Direct Labour Cost ($)', color: '#00C853' },
            { key: 'equipSubCost', label: 'Equipment & Sub ($)', color: '#F59E0B' },
            { key: 'costPerSqFt', label: 'Unit Rate ($/sq ft)', color: '#8B5CF6' },
          ],
        };
      case 'boq_items':
        return {
          title: 'BOQ Takeoff Items Data',
          categoryKey: 'description',
          categoryLabel: 'Item Description',
          metrics: [
            { key: 'totalItemCost', label: 'Total Line Cost ($)', color: '#2251FF' },
            { key: 'materialCost', label: 'Material Sum ($)', color: '#051C2C' },
            { key: 'labourCost', label: 'Labour Sum ($)', color: '#00C853' },
            { key: 'equipSubCost', label: 'Equip/Sub Sum ($)', color: '#F59E0B' },
            { key: 'adjustedQty', label: 'Adjusted Qty', color: '#64748B' },
          ],
        };
      case 'subcontractors':
        return {
          title: 'Subcontractor Bid Leveling Data',
          categoryKey: 'division',
          categoryLabel: 'Division',
          metrics: [
            { key: 'internalEstimate', label: 'Internal Baseline ($)', color: '#051C2C' },
            { key: 'subAQuote', label: 'Subcontractor A ($)', color: '#2251FF' },
            { key: 'subBQuote', label: 'Subcontractor B ($)', color: '#8B5CF6' },
            { key: 'subCQuote', label: 'Subcontractor C ($)', color: '#F59E0B' },
            { key: 'lowestQuote', label: 'Lowest Bid ($)', color: '#00C853' },
          ],
        };
      case 'budget_variance':
        return {
          title: 'Budget vs Actual Control Data',
          categoryKey: 'division',
          categoryLabel: 'Division',
          metrics: [
            { key: 'approvedBudget', label: 'Approved Budget ($)', color: '#2251FF' },
            { key: 'actualCost', label: 'Incurred Actual Cost ($)', color: '#D32F2F' },
            { key: 'estimatedCost', label: 'Baseline Estimate ($)', color: '#051C2C' },
            { key: 'budgetVariance', label: 'Variance (Over/Under) ($)', color: '#F59E0B' },
          ],
        };
      case 'cost_breakdown':
        return {
          title: '3-Part Direct Cost Composition',
          categoryKey: 'name',
          categoryLabel: 'Cost Element',
          metrics: [{ key: 'value', label: 'Element Amount ($)', color: '#2251FF' }],
        };
    }
  }, [selectedDataset]);

  // Process and sort dataset for charting
  const processedData = useMemo(() => {
    let raw: any[] = [];

    if (selectedDataset === 'divisions') {
      raw = divisionSummaries.filter((d) => d.totalCost > 0);
    } else if (selectedDataset === 'boq_items') {
      raw = [...computedBOQ];
    } else if (selectedDataset === 'subcontractors') {
      raw = subQuotes.filter((s) => s.internalEstimate > 0 || s.lowestQuote > 0);
    } else if (selectedDataset === 'budget_variance') {
      raw = budgetRows.filter((b) => b.approvedBudget > 0 || b.actualCost > 0);
    } else if (selectedDataset === 'cost_breakdown') {
      const mat = divisionSummaries.reduce((acc, d) => acc + d.materialCost, 0);
      const lab = divisionSummaries.reduce((acc, d) => acc + d.labourCost, 0);
      const eqp = divisionSummaries.reduce((acc, d) => acc + d.equipSubCost, 0);
      raw = [
        { name: 'Materials (Inc. Tax & Waste)', value: mat, share: mat / (mat + lab + eqp || 1) },
        { name: 'Direct Labour', value: lab, share: lab / (mat + lab + eqp || 1) },
        { name: 'Equipment & Subcontracts', value: eqp, share: eqp / (mat + lab + eqp || 1) },
      ];
    }

    // Apply Sorting
    const primaryMetric = activeMetrics[0] || 'totalCost';
    if (sortOrder === 'desc') {
      raw.sort((a, b) => (b[primaryMetric] ?? 0) - (a[primaryMetric] ?? 0));
    } else if (sortOrder === 'asc') {
      raw.sort((a, b) => (a[primaryMetric] ?? 0) - (b[primaryMetric] ?? 0));
    }

    // Apply Top N Filter
    if (topNFilter > 0 && raw.length > topNFilter) {
      return raw.slice(0, topNFilter);
    }

    return raw;
  }, [selectedDataset, divisionSummaries, computedBOQ, subQuotes, budgetRows, sortOrder, topNFilter, activeMetrics]);

  // Key KPI stats for the active metric
  const stats = useMemo(() => {
    if (!processedData.length) return null;
    const primaryMetric = activeMetrics[0] || 'totalCost';
    const values = processedData.map((d) => Number(d[primaryMetric]) || 0);
    const sum = values.reduce((a, b) => a + b, 0);
    const max = Math.max(...values);
    const min = Math.min(...values);
    const avg = sum / values.length;

    // Find top item
    const topItem = processedData.find((d) => Number(d[primaryMetric]) === max);
    const categoryKey = datasetConfig.categoryKey;
    const topName = topItem ? topItem[categoryKey] : 'N/A';

    return { sum, max, min, avg, count: values.length, topName };
  }, [processedData, activeMetrics, datasetConfig.categoryKey]);

  // Toggle metric selection
  const handleToggleMetric = (metricKey: string) => {
    if (selectedChartType === 'pie') {
      // Pie chart can only have one active value metric
      setActiveMetrics([metricKey]);
      return;
    }
    if (activeMetrics.includes(metricKey)) {
      if (activeMetrics.length > 1) {
        setActiveMetrics(activeMetrics.filter((m) => m !== metricKey));
      }
    } else {
      setActiveMetrics([...activeMetrics, metricKey]);
    }
  };

  // Custom Tooltip for Recharts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-xl border border-slate-200 text-xs z-50 min-w-[200px]">
          <div className="font-bold font-heading text-sm text-[#051C2C] mb-2 pb-1.5 border-b border-slate-100 truncate">
            {label || payload[0]?.name}
          </div>
          <div className="space-y-1.5">
            {payload.map((entry: any, index: number) => {
              const metricConfig = datasetConfig.metrics.find((m) => m.key === entry.dataKey);
              const labelName = metricConfig ? metricConfig.label : entry.name;
              const isMoney =
                entry.dataKey !== 'adjustedQty' &&
                entry.dataKey !== 'costShare' &&
                entry.dataKey !== 'share';
              const valFormatted = isMoney
                ? formatCurrency(entry.value, parameters.currencySymbol)
                : typeof entry.value === 'number'
                ? entry.value.toLocaleString()
                : entry.value;

              return (
                <div key={index} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: entry.color || entry.fill }}
                    />
                    <span className="text-slate-600 truncate max-w-[130px]">{labelName}:</span>
                  </div>
                  <span className="font-semibold text-slate-900">{valFormatted}</span>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 animate-fadeUp">
      {/* 1. Header & Dataset Selector Bar */}
      <div className="card-elevation p-5 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#2251FF]" />
              <h2 className="font-serif font-bold text-xl text-[#051C2C] tracking-tight">
                Live Data Visualization & Chart Studio
              </h2>
            </div>
            <p className="text-xs text-[#888888] mt-1">
              Select any table dataset, choose chart archetype (Bar, Line, Pie, Area), and toggle columns for real-time comparative analysis.
            </p>
          </div>

          {/* Dataset Selector Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg overflow-x-auto no-scrollbar">
            <button
              onClick={() => handleDatasetChange('divisions')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md whitespace-nowrap transition-all cursor-pointer ${
                selectedDataset === 'divisions'
                  ? 'bg-white text-[#051C2C] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              03 Division Summary
            </button>
            <button
              onClick={() => handleDatasetChange('boq_items')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md whitespace-nowrap transition-all cursor-pointer ${
                selectedDataset === 'boq_items'
                  ? 'bg-white text-[#051C2C] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              02 BOQ Items
            </button>
            <button
              onClick={() => handleDatasetChange('subcontractors')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md whitespace-nowrap transition-all cursor-pointer ${
                selectedDataset === 'subcontractors'
                  ? 'bg-white text-[#051C2C] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              04 Subcontractor Leveling
            </button>
            <button
              onClick={() => handleDatasetChange('budget_variance')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md whitespace-nowrap transition-all cursor-pointer ${
                selectedDataset === 'budget_variance'
                  ? 'bg-white text-[#051C2C] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              05 Budget vs Actual
            </button>
            <button
              onClick={() => handleDatasetChange('cost_breakdown')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md whitespace-nowrap transition-all cursor-pointer ${
                selectedDataset === 'cost_breakdown'
                  ? 'bg-white text-[#051C2C] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Cost 3-Part Share
            </button>
          </div>
        </div>

        {/* 2. Controls & Configuration Toolbar */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Left: Chart Type Picker */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-[#888888] uppercase tracking-wider">
              Chart Type:
            </span>
            <div className="flex items-center p-0.5 bg-slate-100 rounded-lg">
              <button
                onClick={() => setSelectedChartType('bar')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
                  selectedChartType === 'bar'
                    ? 'bg-white text-[#2251FF] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Bar Chart"
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Bar</span>
              </button>

              <button
                onClick={() => setSelectedChartType('line')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
                  selectedChartType === 'line'
                    ? 'bg-white text-[#2251FF] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Line Graph"
              >
                <LineChartIcon className="w-3.5 h-3.5" />
                <span>Line</span>
              </button>

              <button
                onClick={() => {
                  setSelectedChartType('pie');
                  if (activeMetrics.length > 1) {
                    setActiveMetrics([activeMetrics[0]]);
                  }
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
                  selectedChartType === 'pie'
                    ? 'bg-white text-[#2251FF] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Pie / Donut Chart"
              >
                <PieChartIcon className="w-3.5 h-3.5" />
                <span>Pie</span>
              </button>

              <button
                onClick={() => setSelectedChartType('area')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
                  selectedChartType === 'area'
                    ? 'bg-white text-[#2251FF] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Area Chart"
              >
                <AreaChartIcon className="w-3.5 h-3.5" />
                <span>Area</span>
              </button>
            </div>

            {/* Sub-options for Bar */}
            {selectedChartType === 'bar' && (
              <div className="flex items-center gap-1.5 pl-2 border-l border-slate-200">
                <button
                  onClick={() => setIsStacked(!isStacked)}
                  className={`px-2 py-1 rounded border text-[11px] font-medium transition-colors cursor-pointer ${
                    isStacked
                      ? 'bg-blue-50 border-blue-300 text-[#2251FF]'
                      : 'bg-white border-slate-200 text-slate-600'
                  }`}
                >
                  {isStacked ? 'Stacked' : 'Grouped'}
                </button>
                <button
                  onClick={() =>
                    setBarOrientation(barOrientation === 'vertical' ? 'horizontal' : 'vertical')
                  }
                  className="px-2 py-1 rounded border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 text-[11px] font-medium cursor-pointer"
                >
                  {barOrientation === 'vertical' ? 'Vertical' : 'Horizontal'}
                </button>
              </div>
            )}
          </div>

          {/* Center/Right: Data Filter & Sorting Controls */}
          <div className="flex items-center gap-3">
            {/* Sorting Dropdown */}
            <div className="flex items-center gap-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as SortOrder)}
                className="bg-white border border-slate-200 rounded px-2 py-1 text-xs text-slate-700 font-medium cursor-pointer focus:outline-none"
              >
                <option value="desc">Highest First (Desc)</option>
                <option value="asc">Lowest First (Asc)</option>
                <option value="none">Original Order</option>
              </select>
            </div>

            {/* Top N Limit */}
            <div className="flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={topNFilter}
                onChange={(e) => setTopNFilter(Number(e.target.value))}
                className="bg-white border border-slate-200 rounded px-2 py-1 text-xs text-slate-700 font-medium cursor-pointer focus:outline-none"
              >
                <option value={0}>All Rows ({processedData.length})</option>
                <option value={5}>Top 5</option>
                <option value={8}>Top 8</option>
                <option value={12}>Top 12</option>
              </select>
            </div>

            {/* Toggle Data Table */}
            <button
              onClick={() => setShowDataTable(!showDataTable)}
              className={`btn ${showDataTable ? 'btn-primary' : 'btn-secondary'} text-xs`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>{showDataTable ? 'Hide Table' : 'Show Table'}</span>
            </button>
          </div>
        </div>

        {/* 3. Column / Data Series Metric Checkboxes */}
        <div className="pt-2 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-bold text-[#888888] uppercase tracking-wider mr-1">
            Data Series Columns:
          </span>
          {datasetConfig.metrics.map((metric) => {
            const isSelected = activeMetrics.includes(metric.key);
            return (
              <button
                key={metric.key}
                onClick={() => handleToggleMetric(metric.key)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: isSelected ? '#FFFFFF' : metric.color }}
                />
                <span>{metric.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Analytical KPI Stats Bar */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="card-elevation p-3.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#888888] block">
              Sum Total Plotted
            </span>
            <div className="kpi-val text-xl mt-0.5">
              {formatCurrency(stats.sum, parameters.currencySymbol)}
            </div>
            <span className="text-[11px] text-slate-500">{stats.count} categories evaluated</span>
          </div>

          <div className="card-elevation p-3.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#888888] block">
              Top Contributor
            </span>
            <div className="font-serif font-bold text-sm text-[#051C2C] mt-0.5 truncate" title={stats.topName}>
              {stats.topName}
            </div>
            <span className="text-[11px] text-[#2251FF] font-semibold">
              {formatCurrency(stats.max, parameters.currencySymbol)}
            </span>
          </div>

          <div className="card-elevation p-3.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#888888] block">
              Mean Average
            </span>
            <div className="kpi-val text-xl mt-0.5">
              {formatCurrency(stats.avg, parameters.currencySymbol)}
            </div>
            <span className="text-[11px] text-slate-500">Per category average</span>
          </div>

          <div className="card-elevation p-3.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#888888] block">
              Lowest Plotted
            </span>
            <div className="kpi-val text-xl mt-0.5">
              {formatCurrency(stats.min, parameters.currencySymbol)}
            </div>
            <span className="text-[11px] text-slate-500">Minimum value in series</span>
          </div>
        </div>
      )}

      {/* 3. Main Chart Canvas Area */}
      <div className="card-elevation p-6 bg-white space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-base text-[#051C2C]">
              {datasetConfig.title}
            </span>
            <span className="pill pill-active text-[10px]">Real-Time Active</span>
          </div>
          <span className="text-xs text-[#888888]">
            {processedData.length} records • Synchronized with Takeoff & Parameters
          </span>
        </div>

        {/* Chart Rendering */}
        <div className="w-full h-[420px]">
          {processedData.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-2">
              <Info className="w-8 h-8 text-slate-300" />
              <p className="text-sm">No data available for this criteria.</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              {selectedChartType === 'bar' ? (
                <BarChart
                  data={processedData}
                  layout={barOrientation === 'horizontal' ? 'vertical' : 'horizontal'}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E2E2" />
                  {barOrientation === 'horizontal' ? (
                    <>
                      <XAxis
                        type="number"
                        tickFormatter={(v) => formatCurrency(v, parameters.currencySymbol, 0)}
                        tick={{ fill: '#888888', fontSize: 11 }}
                      />
                      <YAxis
                        type="category"
                        dataKey={datasetConfig.categoryKey}
                        tick={{ fill: '#051C2C', fontSize: 11, fontWeight: 500 }}
                        width={120}
                      />
                    </>
                  ) : (
                    <>
                      <XAxis
                        dataKey={datasetConfig.categoryKey}
                        angle={-30}
                        textAnchor="end"
                        interval={0}
                        height={60}
                        tick={{ fill: '#051C2C', fontSize: 10.5 }}
                      />
                      <YAxis
                        tickFormatter={(v) => formatCurrency(v, parameters.currencySymbol, 0)}
                        tick={{ fill: '#888888', fontSize: 11 }}
                      />
                    </>
                  )}
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ paddingTop: 10, fontSize: 12 }} />
                  {activeMetrics.map((metricKey, idx) => {
                    const metricConfig = datasetConfig.metrics.find((m) => m.key === metricKey);
                    const color = metricConfig?.color || PALETTE[idx % PALETTE.length];
                    return (
                      <Bar
                        key={metricKey}
                        dataKey={metricKey}
                        name={metricConfig?.label || metricKey}
                        fill={color}
                        stackId={isStacked ? 'a' : undefined}
                        radius={isStacked ? [0, 0, 0, 0] : [4, 4, 0, 0]}
                      />
                    );
                  })}
                </BarChart>
              ) : selectedChartType === 'line' ? (
                <LineChart
                  data={processedData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E2E2" />
                  <XAxis
                    dataKey={datasetConfig.categoryKey}
                    angle={-30}
                    textAnchor="end"
                    interval={0}
                    height={60}
                    tick={{ fill: '#051C2C', fontSize: 10.5 }}
                  />
                  <YAxis
                    tickFormatter={(v) => formatCurrency(v, parameters.currencySymbol, 0)}
                    tick={{ fill: '#888888', fontSize: 11 }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ paddingTop: 10, fontSize: 12 }} />
                  {activeMetrics.map((metricKey, idx) => {
                    const metricConfig = datasetConfig.metrics.find((m) => m.key === metricKey);
                    const color = metricConfig?.color || PALETTE[idx % PALETTE.length];
                    return (
                      <Line
                        key={metricKey}
                        type="monotone"
                        dataKey={metricKey}
                        name={metricConfig?.label || metricKey}
                        stroke={color}
                        strokeWidth={2.5}
                        dot={{ r: 4, strokeWidth: 1.5, fill: '#FFFFFF' }}
                        activeDot={{ r: 6 }}
                      />
                    );
                  })}
                </LineChart>
              ) : selectedChartType === 'pie' ? (
                <PieChart margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                  <Pie
                    data={processedData}
                    dataKey={activeMetrics[0] || 'totalCost'}
                    nameKey={datasetConfig.categoryKey}
                    cx="50%"
                    cy="50%"
                    innerRadius={75}
                    outerRadius={140}
                    paddingAngle={2}
                    label={({ name, percent }) =>
                      `${(name || '').split(' ')[0]} ${((percent || 0) * 100).toFixed(1)}%`
                    }
                    labelLine={true}
                  >
                    {processedData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={PALETTE[index % PALETTE.length]}
                        stroke="#FFFFFF"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                </PieChart>
              ) : (
                <AreaChart
                  data={processedData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                  <defs>
                    {activeMetrics.map((metricKey, idx) => {
                      const metricConfig = datasetConfig.metrics.find((m) => m.key === metricKey);
                      const color = metricConfig?.color || PALETTE[idx % PALETTE.length];
                      return (
                        <linearGradient
                          key={`grad-${metricKey}`}
                          id={`grad-${metricKey}`}
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop offset="5%" stopColor={color} stopOpacity={0.4} />
                          <stop offset="95%" stopColor={color} stopOpacity={0.0} />
                        </linearGradient>
                      );
                    })}
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E2E2" />
                  <XAxis
                    dataKey={datasetConfig.categoryKey}
                    angle={-30}
                    textAnchor="end"
                    interval={0}
                    height={60}
                    tick={{ fill: '#051C2C', fontSize: 10.5 }}
                  />
                  <YAxis
                    tickFormatter={(v) => formatCurrency(v, parameters.currencySymbol, 0)}
                    tick={{ fill: '#888888', fontSize: 11 }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ paddingTop: 10, fontSize: 12 }} />
                  {activeMetrics.map((metricKey, idx) => {
                    const metricConfig = datasetConfig.metrics.find((m) => m.key === metricKey);
                    const color = metricConfig?.color || PALETTE[idx % PALETTE.length];
                    return (
                      <Area
                        key={metricKey}
                        type="monotone"
                        dataKey={metricKey}
                        name={metricConfig?.label || metricKey}
                        stroke={color}
                        fillOpacity={1}
                        fill={`url(#grad-${metricKey})`}
                        strokeWidth={2}
                      />
                    );
                  })}
                </AreaChart>
              )}
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* 4. Optional Underlying Raw Data Table */}
      {showDataTable && (
        <div className="card-elevation p-5 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="font-serif font-bold text-sm text-[#051C2C]">
              Underlying Dataset Table ({processedData.length} entries)
            </h3>
            <span className="text-xs text-[#888888]">Direct live array binding</span>
          </div>

          <div className="overflow-x-auto">
            <table className="data-table text-xs">
              <thead>
                <tr className="bg-slate-50">
                  <th className="py-2.5 px-3">#</th>
                  <th className="py-2.5 px-3">{datasetConfig.categoryLabel}</th>
                  {datasetConfig.metrics.map((m) => (
                    <th key={m.key} className="py-2.5 px-3 text-right">
                      {m.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {processedData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2 px-3 text-slate-400 font-mono">{idx + 1}</td>
                    <td className="py-2 px-3 font-semibold text-[#051C2C]">
                      {row[datasetConfig.categoryKey]}
                    </td>
                    {datasetConfig.metrics.map((m) => {
                      const val = row[m.key];
                      const isMoney =
                        m.key !== 'adjustedQty' && m.key !== 'costShare' && m.key !== 'share';
                      return (
                        <td key={m.key} className="py-2 px-3 text-right font-mono">
                          {isMoney
                            ? formatCurrency(val || 0, parameters.currencySymbol)
                            : typeof val === 'number'
                            ? val.toLocaleString()
                            : val}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
