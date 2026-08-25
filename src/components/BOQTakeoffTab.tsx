import React, { useMemo, useState } from 'react';
import {
  Copy,
  Download,
  Filter,
  Layers,
  Plus,
  Search,
  Trash2,
  Upload,
} from 'lucide-react';
import { BOQItem, ComputedBOQItem, ProjectParameters } from '../types';
import { computeAllBOQItems, formatCurrency, formatNumber, formatPercent } from '../utils/calculations';
import { exportBOQCSV } from '../utils/storage';

interface BOQTakeoffTabProps {
  boqItems: BOQItem[];
  parameters: ProjectParameters;
  onChangeBOQItems: (items: BOQItem[]) => void;
  onOpenBulkCsv: () => void;
}

export const BOQTakeoffTab: React.FC<BOQTakeoffTabProps> = ({
  boqItems,
  parameters,
  onChangeBOQItems,
  onOpenBulkCsv,
}) => {
  const [selectedDivisionFilter, setSelectedDivisionFilter] = useState<string>('ALL');
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  // Compute all items with live parameters
  const computedItems: ComputedBOQItem[] = useMemo(() => {
    return computeAllBOQItems(
      boqItems,
      parameters.defaultWasteRate,
      parameters.salesTaxRate,
    );
  }, [boqItems, parameters.defaultWasteRate, parameters.salesTaxRate]);

  // Filter items
  const filteredItems = useMemo(() => {
    return computedItems.filter((item) => {
      const matchDiv =
        selectedDivisionFilter === 'ALL' || item.division === selectedDivisionFilter;
      const matchSearch =
        searchKeyword.trim() === '' ||
        item.description.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        item.id.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        item.location.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        item.drawingRef.toLowerCase().includes(searchKeyword.toLowerCase());
      return matchDiv && matchSearch;
    });
  }, [computedItems, selectedDivisionFilter, searchKeyword]);

  // Max item cost for data bars
  const maxItemCost = useMemo(() => {
    return Math.max(...computedItems.map((i) => i.totalItemCost), 1);
  }, [computedItems]);

  // Totals
  const totalBaseQty = filteredItems.reduce((s, i) => s + (Number(i.baseQty) || 0), 0);
  const totalAdjustedQty = filteredItems.reduce((s, i) => s + i.adjustedQty, 0);
  const totalMaterialCost = filteredItems.reduce((s, i) => s + i.materialCost, 0);
  const totalLabourCost = filteredItems.reduce((s, i) => s + i.labourCost, 0);
  const totalEquipSubCost = filteredItems.reduce((s, i) => s + i.equipSubCost, 0);
  const totalOverallCost = filteredItems.reduce((s, i) => s + i.totalItemCost, 0);

  const handleUpdateItem = (id: string, field: keyof BOQItem, value: any) => {
    const updated = boqItems.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          [field]: value,
        };
      }
      return item;
    });
    onChangeBOQItems(updated);
  };

  const handleAddItem = () => {
    let nextNum = boqItems.length + 1;
    let newId = `ITM-${String(nextNum).padStart(3, '0')}`;
    while (boqItems.some((i) => i.id === newId)) {
      nextNum += 1;
      newId = `ITM-${String(nextNum).padStart(3, '0')}`;
    }
    const defaultDiv =
      selectedDivisionFilter !== 'ALL'
        ? selectedDivisionFilter
        : parameters.masterDivisions[0] || '01 - Excavation & Earthwork';
    const newItem: BOQItem = {
      id: newId,
      division: defaultDiv,
      description: 'New takeoff specification',
      drawingRef: 'A-101',
      location: 'Main Building',
      baseQty: 100,
      unit: 'sq ft',
      itemWasteRate: null,
      materialRate: 10.0,
      labourRate: 5.0,
      equipSubRate: 0.0,
    };
    onChangeBOQItems([...boqItems, newItem]);
  };

  const handleDuplicateItem = (itemToDuplicate: BOQItem) => {
    let copyIndex = 1;
    let newId = `${itemToDuplicate.id}-C${copyIndex}`;
    while (boqItems.some((i) => i.id === newId)) {
      copyIndex += 1;
      newId = `${itemToDuplicate.id}-C${copyIndex}`;
    }
    const newItem: BOQItem = {
      ...itemToDuplicate,
      id: newId,
      description: `${itemToDuplicate.description} (Copy)`,
    };
    const idx = boqItems.findIndex((i) => i.id === itemToDuplicate.id);
    const updated = [...boqItems];
    updated.splice(idx + 1, 0, newItem);
    onChangeBOQItems(updated);
  };

  const handleDeleteItem = (id: string) => {
    if (boqItems.length <= 1) return;
    onChangeBOQItems(boqItems.filter((i) => i.id !== id));
  };

  return (
    <div id="sheet-02-boq-takeoff" className="space-y-5 animate-fadeUp">
      {/* Title & Sheet Summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-slate-200 text-slate-700">
              SHEET 02
            </span>
            <h1
              className="text-2xl font-bold font-heading tracking-heading"
              style={{ color: 'var(--color-primary)' }}
            >
              Master BOQ Quantity Takeoff & Cost Build-up
            </h1>
          </div>
          <p className="text-xs text-slate-500">
            Single Source of Truth (SSOT). Editable manual input fields are highlighted in pale
            yellow (<strong>#FFFDE7</strong>); grey and white columns are real-time formula calculations.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            id="btn-add-takeoff-row"
            onClick={handleAddItem}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded text-white cursor-pointer shadow-sm hover:opacity-90 transition-opacity"
            style={{ backgroundColor: 'var(--color-accent)' }}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Row</span>
          </button>

          <button
            id="btn-takeoff-bulk-csv"
            onClick={onOpenBulkCsv}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 cursor-pointer shadow-sm transition-colors"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Bulk CSV Import</span>
          </button>

          <button
            id="btn-export-takeoff-csv"
            onClick={() => exportBOQCSV(boqItems, parameters.currencySymbol)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 cursor-pointer shadow-sm transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Control Bar: Division Filter, Search & Count */}
      <div className="card-static p-3.5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5 w-full md:w-auto flex-wrap">
          {/* Division Filter */}
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              id="select-division-filter"
              value={selectedDivisionFilter}
              onChange={(e) => setSelectedDivisionFilter(e.target.value)}
              className="px-2.5 py-1.5 text-xs font-medium rounded border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 max-w-[240px]"
            >
              <option value="ALL">All Divisions ({boqItems.length} items)</option>
              {parameters.masterDivisions.map((div) => {
                const count = boqItems.filter((i) => i.division === div).length;
                return (
                  <option key={div} value={div}>
                    {div} ({count})
                  </option>
                );
              })}
            </select>
          </div>

          {/* Search Box */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2 pointer-events-none" />
            <input
              id="input-takeoff-search"
              type="text"
              placeholder="Search description, ID, ref..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Stats on Current View */}
        <div className="flex items-center gap-4 text-slate-500 flex-shrink-0">
          <span>
            Showing <strong className="text-slate-800">{filteredItems.length}</strong> of{' '}
            {boqItems.length} records
          </span>
          <span className="h-3 w-px bg-slate-300" />
          <span>
            Subtotal:{' '}
            <strong
              className="font-mono text-sm font-bold"
              style={{ color: 'var(--color-primary)' }}
            >
              {formatCurrency(totalOverallCost, parameters.currencySymbol)}
            </strong>
          </span>
        </div>
      </div>

      {/* Main Interactive Table */}
      <div className="card-static overflow-hidden shadow-sm">
        <div className="overflow-x-auto max-h-[640px] relative">
          <table
            id="table-master-boq-takeoff"
            className="w-full text-left text-[12px] border-collapse"
            style={{ minWidth: '1400px' }}
          >
            {/* Table Header */}
            <thead
              className="sticky top-0 z-20"
              style={{
                backgroundColor: 'var(--table-header-bg)',
                borderBottom: '2px solid var(--table-header-sep)',
              }}
            >
              <tr className="uppercase font-semibold tracking-label text-[11px] text-slate-700">
                <th className="py-2.5 px-2 text-center w-10">#</th>
                <th className="py-2.5 px-3 min-w-[190px]">Division</th>
                <th className="py-2.5 px-2.5 w-24">Item ID</th>
                <th className="py-2.5 px-3 min-w-[240px]">Item Description</th>
                <th className="py-2.5 px-2.5 w-24">Dwg Ref</th>
                <th className="py-2.5 px-2.5 w-28">Location</th>
                <th className="py-2.5 px-2.5 text-right w-24">Base Qty</th>
                <th className="py-2.5 px-2 text-center w-16">Unit</th>
                <th className="py-2.5 px-2.5 text-right w-20" title="Overrides default waste if specified">
                  Waste %
                </th>
                <th className="py-2.5 px-2.5 text-right w-24 bg-slate-100/70 font-bold text-slate-800">
                  Adj Qty
                </th>
                <th className="py-2.5 px-2.5 text-right w-24">Mat Rate</th>
                <th className="py-2.5 px-2.5 text-right w-28 bg-slate-100/70 font-bold text-slate-800">
                  Mat Cost
                </th>
                <th className="py-2.5 px-2.5 text-right w-24">Lab Rate</th>
                <th className="py-2.5 px-2.5 text-right w-28 bg-slate-100/70 font-bold text-slate-800">
                  Lab Cost
                </th>
                <th className="py-2.5 px-2.5 text-right w-24">Sub Rate</th>
                <th className="py-2.5 px-2.5 text-right w-28 bg-slate-100/70 font-bold text-slate-800">
                  Sub Cost
                </th>
                <th className="py-2.5 px-3 text-right min-w-[150px] bg-slate-200/80 font-bold text-slate-900">
                  Total Cost
                </th>
                <th className="py-2.5 px-2 text-center w-16">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-200">
              {filteredItems.map((item, idx) => {
                const barWidthPct = Math.min(100, Math.max(3, (item.totalItemCost / maxItemCost) * 100));

                return (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50 transition-colors group text-slate-800 font-sans"
                  >
                    {/* Index */}
                    <td className="py-1.5 px-2 text-center text-slate-400 font-mono text-[11px]">
                      {idx + 1}
                    </td>

                    {/* Division (Editable) */}
                    <td className="py-1.5 px-2">
                      <select
                        value={item.division}
                        onChange={(e) => handleUpdateItem(item.id, 'division', e.target.value)}
                        className="w-full px-2 py-1 text-xs rounded border border-amber-200 focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
                        style={{ backgroundColor: 'var(--color-input-bg)' }}
                      >
                        {parameters.masterDivisions.map((div) => (
                          <option key={div} value={div}>
                            {div}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Item ID (Editable) */}
                    <td className="py-1.5 px-1.5">
                      <input
                        type="text"
                        value={item.id}
                        onChange={(e) => handleUpdateItem(item.id, 'id', e.target.value)}
                        className="w-full px-2 py-1 text-xs rounded border border-amber-200 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                        style={{ backgroundColor: 'var(--color-input-bg)' }}
                      />
                    </td>

                    {/* Description (Editable) */}
                    <td className="py-1.5 px-2">
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => handleUpdateItem(item.id, 'description', e.target.value)}
                        className="w-full px-2 py-1 text-xs rounded border border-amber-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        style={{ backgroundColor: 'var(--color-input-bg)' }}
                      />
                    </td>

                    {/* Dwg Ref (Editable) */}
                    <td className="py-1.5 px-1.5">
                      <input
                        type="text"
                        value={item.drawingRef}
                        onChange={(e) => handleUpdateItem(item.id, 'drawingRef', e.target.value)}
                        className="w-full px-2 py-1 text-xs rounded border border-amber-200 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                        style={{ backgroundColor: 'var(--color-input-bg)' }}
                      />
                    </td>

                    {/* Location (Editable) */}
                    <td className="py-1.5 px-1.5">
                      <input
                        type="text"
                        value={item.location}
                        onChange={(e) => handleUpdateItem(item.id, 'location', e.target.value)}
                        className="w-full px-2 py-1 text-xs rounded border border-amber-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        style={{ backgroundColor: 'var(--color-input-bg)' }}
                      />
                    </td>

                    {/* Base Qty (Editable) */}
                    <td className="py-1.5 px-1.5 text-right">
                      <input
                        type="number"
                        step="any"
                        value={item.baseQty ?? ''}
                        onChange={(e) =>
                          handleUpdateItem(item.id, 'baseQty', parseFloat(e.target.value) || 0)
                        }
                        className="w-full px-2 py-1 text-xs text-right font-mono font-semibold rounded border border-amber-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        style={{ backgroundColor: 'var(--color-input-bg)' }}
                      />
                    </td>

                    {/* Unit (Editable) */}
                    <td className="py-1.5 px-1 text-center">
                      <input
                        type="text"
                        value={item.unit}
                        onChange={(e) => handleUpdateItem(item.id, 'unit', e.target.value)}
                        className="w-full px-1 py-1 text-xs text-center font-mono rounded border border-amber-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        style={{ backgroundColor: 'var(--color-input-bg)' }}
                      />
                    </td>

                    {/* Waste % Override (Editable) */}
                    <td className="py-1.5 px-1.5 text-right">
                      <input
                        type="number"
                        step="0.5"
                        placeholder={formatPercent(parameters.defaultWasteRate, 1)}
                        value={
                          item.itemWasteRate !== null && item.itemWasteRate !== undefined
                            ? Number((item.itemWasteRate * 100).toFixed(1))
                            : ''
                        }
                        onChange={(e) => {
                          const val = e.target.value;
                          const rate = val === '' ? null : (parseFloat(val) || 0) / 100;
                          handleUpdateItem(item.id, 'itemWasteRate', rate);
                        }}
                        title={
                          item.itemWasteRate !== null
                            ? 'Custom waste override'
                            : `Inherited default (${formatPercent(parameters.defaultWasteRate)})`
                        }
                        className={`w-full px-1.5 py-1 text-xs text-right font-mono rounded border ${
                          item.itemWasteRate !== null
                            ? 'border-blue-400 bg-amber-50'
                            : 'border-amber-200'
                        } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                        style={{
                          backgroundColor:
                            item.itemWasteRate !== null ? 'var(--color-input-bg)' : '#FFFFFF',
                        }}
                      />
                    </td>

                    {/* Adjusted Qty (Formula) */}
                    <td className="py-1.5 px-2.5 text-right font-mono bg-slate-50/70 font-semibold text-slate-700">
                      {formatNumber(item.adjustedQty, 2)}
                    </td>

                    {/* Mat Rate (Editable) */}
                    <td className="py-1.5 px-1.5 text-right">
                      <input
                        type="number"
                        step="any"
                        value={item.materialRate ?? ''}
                        onChange={(e) =>
                          handleUpdateItem(item.id, 'materialRate', parseFloat(e.target.value) || 0)
                        }
                        className="w-full px-1.5 py-1 text-xs text-right font-mono rounded border border-amber-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        style={{ backgroundColor: 'var(--color-input-bg)' }}
                      />
                    </td>

                    {/* Mat Cost (Formula - includes Sales Tax) */}
                    <td
                      className="py-1.5 px-2.5 text-right font-mono bg-slate-50/70 text-slate-700"
                      title="Adjusted Qty * Rate * (1 + Sales Tax)"
                    >
                      {formatCurrency(item.materialCost, parameters.currencySymbol)}
                    </td>

                    {/* Lab Rate (Editable) */}
                    <td className="py-1.5 px-1.5 text-right">
                      <input
                        type="number"
                        step="any"
                        value={item.labourRate ?? ''}
                        onChange={(e) =>
                          handleUpdateItem(item.id, 'labourRate', parseFloat(e.target.value) || 0)
                        }
                        className="w-full px-1.5 py-1 text-xs text-right font-mono rounded border border-amber-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        style={{ backgroundColor: 'var(--color-input-bg)' }}
                      />
                    </td>

                    {/* Lab Cost (Formula) */}
                    <td className="py-1.5 px-2.5 text-right font-mono bg-slate-50/70 text-slate-700">
                      {formatCurrency(item.labourCost, parameters.currencySymbol)}
                    </td>

                    {/* Equip/Sub Rate (Editable) */}
                    <td className="py-1.5 px-1.5 text-right">
                      <input
                        type="number"
                        step="any"
                        value={item.equipSubRate ?? ''}
                        onChange={(e) =>
                          handleUpdateItem(item.id, 'equipSubRate', parseFloat(e.target.value) || 0)
                        }
                        className="w-full px-1.5 py-1 text-xs text-right font-mono rounded border border-amber-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        style={{ backgroundColor: 'var(--color-input-bg)' }}
                      />
                    </td>

                    {/* Equip/Sub Cost (Formula) */}
                    <td className="py-1.5 px-2.5 text-right font-mono bg-slate-50/70 text-slate-700">
                      {formatCurrency(item.equipSubCost, parameters.currencySymbol)}
                    </td>

                    {/* Total Cost (Formula with Inline Data Bar) */}
                    <td className="py-1.5 px-3 text-right bg-slate-100/80 font-mono font-bold text-slate-900 relative overflow-hidden">
                      {/* Inline Data Bar Track & Fill */}
                      <div className="relative z-10">
                        {formatCurrency(item.totalItemCost, parameters.currencySymbol)}
                      </div>
                      <div
                        className="absolute bottom-0 right-0 top-0 opacity-15 pointer-events-none transition-all duration-300"
                        style={{
                          width: `${barWidthPct}%`,
                          backgroundColor: 'var(--color-accent)',
                        }}
                      />
                    </td>

                    {/* Row Actions */}
                    <td className="py-1.5 px-1 text-center">
                      <div className="flex items-center justify-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleDuplicateItem(item)}
                          title="Duplicate row"
                          className="p-1 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded cursor-pointer transition-colors"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          title="Delete row"
                          disabled={boqItems.length <= 1}
                          className="p-1 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded cursor-pointer transition-colors disabled:opacity-20"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>

            {/* Table Footer - Grand Totals */}
            <tfoot
              className="sticky bottom-0 z-20 font-bold font-mono text-[12px] uppercase"
              style={{
                backgroundColor: 'var(--color-surface)',
                borderTop: '2px solid var(--color-primary)',
              }}
            >
              <tr className="text-slate-900">
                <td colSpan={6} className="py-3 px-3 text-left">
                  Summary Totals ({filteredItems.length} Items Listed)
                </td>
                <td className="py-3 px-2.5 text-right">{formatNumber(totalBaseQty, 1)}</td>
                <td className="py-3 px-1 text-center">—</td>
                <td className="py-3 px-2 text-right">—</td>
                <td className="py-3 px-2.5 text-right bg-slate-100">
                  {formatNumber(totalAdjustedQty, 1)}
                </td>
                <td className="py-3 px-2 text-right">—</td>
                <td className="py-3 px-2.5 text-right bg-slate-100">
                  {formatCurrency(totalMaterialCost, parameters.currencySymbol)}
                </td>
                <td className="py-3 px-2 text-right">—</td>
                <td className="py-3 px-2.5 text-right bg-slate-100">
                  {formatCurrency(totalLabourCost, parameters.currencySymbol)}
                </td>
                <td className="py-3 px-2 text-right">—</td>
                <td className="py-3 px-2.5 text-right bg-slate-100">
                  {formatCurrency(totalEquipSubCost, parameters.currencySymbol)}
                </td>
                <td
                  className="py-3 px-3 text-right bg-slate-200 text-sm font-extrabold"
                  style={{ color: 'var(--color-primary)' }}
                >
                  {formatCurrency(totalOverallCost, parameters.currencySymbol)}
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};
