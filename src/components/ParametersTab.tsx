import React, { useState } from 'react';
import { Plus, Sliders, Trash2 } from 'lucide-react';
import { ProjectParameters } from '../types';

interface ParametersTabProps {
  parameters: ProjectParameters;
  onChangeParameters: (newParams: ProjectParameters) => void;
}

export const ParametersTab: React.FC<ParametersTabProps> = ({
  parameters,
  onChangeParameters,
}) => {
  const [newDivisionInput, setNewDivisionInput] = useState('');

  const handleRateChange = (
    field: 'defaultWasteRate' | 'contingencyRate' | 'salesTaxRate',
    val: string,
  ) => {
    const parsed = parseFloat(val);
    const rate = !isNaN(parsed) ? parsed / 100 : 0;
    onChangeParameters({
      ...parameters,
      [field]: rate,
    });
  };

  const handleCurrencyChange = (val: string) => {
    onChangeParameters({
      ...parameters,
      currencySymbol: val || '$',
    });
  };

  const handleAddDivision = () => {
    if (!newDivisionInput.trim()) return;
    const trimmed = newDivisionInput.trim();
    if (parameters.masterDivisions.includes(trimmed)) return;
    onChangeParameters({
      ...parameters,
      masterDivisions: [...parameters.masterDivisions, trimmed],
    });
    setNewDivisionInput('');
  };

  const handleDeleteDivision = (indexToRemove: number) => {
    if (parameters.masterDivisions.length <= 1) return;
    const updated = parameters.masterDivisions.filter((_, idx) => idx !== indexToRemove);
    onChangeParameters({
      ...parameters,
      masterDivisions: updated,
    });
  };

  const handleDivisionNameChange = (index: number, newName: string) => {
    const updated = [...parameters.masterDivisions];
    updated[index] = newName;
    onChangeParameters({
      ...parameters,
      masterDivisions: updated,
    });
  };

  return (
    <div id="sheet-00-parameters" className="space-y-6 animate-fadeUp">
      {/* Header & Description */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-slate-200 text-slate-700">
            SHEET 00
          </span>
          <h1
            className="text-2xl font-bold font-heading tracking-heading"
            style={{ color: 'var(--color-primary)' }}
          >
            Global Parameters & Master Assumptions
          </h1>
        </div>
        <p className="text-sm text-slate-500 max-w-3xl">
          Single Source of Truth for all static calculation multipliers, default waste allowances,
          contingency reserves, material sales tax rates, and Master Division classification schema.
        </p>
      </div>

      {/* Insight Block */}
      <div className="insight-block">
        <h4 className="text-xs font-semibold text-slate-800 uppercase tracking-label mb-1">
          Architectural Notice: Zero-Hardcoding Dynamic Reference
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
          Every financial computation across the <strong>02_BOQ_Takeoff</strong>,{' '}
          <strong>03_Division_Summary</strong>, and <strong>06_Dashboard</strong> dynamically binds to
          these parameter values. Modifying the sales tax or contingency below will instantly
          re-aggregate all downstream budgets in real-time.
        </p>
      </div>

      {/* Grid: Global Rates & Currency */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Default Waste % */}
        <div className="card-elevation p-4 flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-label text-slate-500 mb-1">
              Global Default Waste Rate
            </div>
            <div className="text-xs text-slate-500 mb-3">
              Applied to any takeoff line item without an item-specific override.
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              id="input-param-waste"
              type="number"
              step="0.1"
              min="0"
              max="100"
              value={Number((parameters.defaultWasteRate * 100).toFixed(2))}
              onChange={(e) => handleRateChange('defaultWasteRate', e.target.value)}
              className="w-full px-3 py-2 text-sm font-semibold rounded border border-amber-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ backgroundColor: 'var(--color-input-bg)', color: 'var(--color-primary)' }}
            />
            <span className="font-semibold text-sm text-slate-600">%</span>
          </div>
        </div>

        {/* Contingency % */}
        <div className="card-elevation p-4 flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-label text-slate-500 mb-1">
              Unforeseen Contingency %
            </div>
            <div className="text-xs text-slate-500 mb-3">
              Overall risk reserve multiplier computed on Master BOQ grand total.
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              id="input-param-contingency"
              type="number"
              step="0.5"
              min="0"
              max="100"
              value={Number((parameters.contingencyRate * 100).toFixed(2))}
              onChange={(e) => handleRateChange('contingencyRate', e.target.value)}
              className="w-full px-3 py-2 text-sm font-semibold rounded border border-amber-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ backgroundColor: 'var(--color-input-bg)', color: 'var(--color-primary)' }}
            />
            <span className="font-semibold text-sm text-slate-600">%</span>
          </div>
        </div>

        {/* Sales Tax % */}
        <div className="card-elevation p-4 flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-label text-slate-500 mb-1">
              Material Sales Tax Rate
            </div>
            <div className="text-xs text-slate-500 mb-3">
              Automatically added to material procurement cost calculations.
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              id="input-param-salestax"
              type="number"
              step="0.1"
              min="0"
              max="100"
              value={Number((parameters.salesTaxRate * 100).toFixed(2))}
              onChange={(e) => handleRateChange('salesTaxRate', e.target.value)}
              className="w-full px-3 py-2 text-sm font-semibold rounded border border-amber-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ backgroundColor: 'var(--color-input-bg)', color: 'var(--color-primary)' }}
            />
            <span className="font-semibold text-sm text-slate-600">%</span>
          </div>
        </div>

        {/* Currency Symbol */}
        <div className="card-elevation p-4 flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-label text-slate-500 mb-1">
              Currency Symbol
            </div>
            <div className="text-xs text-slate-500 mb-3">
              Formatting symbol across all sheets, exports, and summary KPIs.
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              id="input-param-currency"
              type="text"
              maxLength={4}
              value={parameters.currencySymbol}
              onChange={(e) => handleCurrencyChange(e.target.value)}
              className="w-full px-3 py-2 text-sm font-semibold rounded border border-amber-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center font-mono"
              style={{ backgroundColor: 'var(--color-input-bg)', color: 'var(--color-primary)' }}
            />
          </div>
        </div>
      </div>

      {/* Master Division Schema */}
      <div className="card-static p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-200">
          <div>
            <h2
              className="text-lg font-bold font-heading tracking-heading"
              style={{ color: 'var(--color-primary)' }}
            >
              Master Division Classification ({parameters.masterDivisions.length} Active Categories)
            </h2>
            <p className="text-xs text-slate-500">
              Standard 16-division breakdown for residential builds. These populate dropdowns in BOQ
              Takeoff and aggregate into Division Summaries.
            </p>
          </div>

          {/* Add Division */}
          <div className="flex items-center gap-2">
            <input
              id="input-new-division"
              type="text"
              placeholder="e.g. 17 - Solar & Geothermal"
              value={newDivisionInput}
              onChange={(e) => setNewDivisionInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddDivision()}
              className="px-3 py-1.5 text-xs rounded border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 bg-white"
            />
            <button
              id="btn-add-division"
              onClick={handleAddDivision}
              className="px-3 py-1.5 text-xs font-semibold rounded text-white flex items-center gap-1 cursor-pointer transition-opacity hover:opacity-90"
              style={{ backgroundColor: 'var(--color-accent)' }}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {parameters.masterDivisions.map((divName, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 p-2.5 rounded border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-slate-300 transition-colors"
            >
              <span className="w-6 text-[11px] font-mono text-slate-600 font-semibold text-center">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <input
                type="text"
                value={divName}
                onChange={(e) => handleDivisionNameChange(idx, e.target.value)}
                className="flex-1 px-2 py-1 text-xs font-medium rounded border border-transparent hover:border-slate-300 focus:border-blue-500 focus:bg-white bg-transparent text-slate-800"
              />
              <button
                onClick={() => handleDeleteDivision(idx)}
                disabled={parameters.masterDivisions.length <= 1}
                title="Remove division"
                className="p-1 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors disabled:opacity-30 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
