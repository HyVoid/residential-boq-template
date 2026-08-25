import React from 'react';
import { Building, Calendar, FileText, Info, MapPin, Ruler, User } from 'lucide-react';
import { ProjectSetup } from '../types';

interface ProjectSetupTabProps {
  projectSetup: ProjectSetup;
  onChangeProjectSetup: (newSetup: ProjectSetup) => void;
  currencySymbol: string;
  totalEstimateCost: number;
}

export const ProjectSetupTab: React.FC<ProjectSetupTabProps> = ({
  projectSetup,
  onChangeProjectSetup,
  currencySymbol,
  totalEstimateCost,
}) => {
  const handleChange = (field: keyof ProjectSetup, val: any) => {
    onChangeProjectSetup({
      ...projectSetup,
      [field]: val,
    });
  };

  const grossArea = projectSetup.grossArea > 0 ? projectSetup.grossArea : 0;
  const costPerSqFt = grossArea > 0 ? totalEstimateCost / grossArea : 0;

  return (
    <div id="sheet-01-project-setup" className="space-y-6 animate-fadeUp">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-slate-200 text-slate-700">
            SHEET 01
          </span>
          <h1
            className="text-2xl font-bold font-heading tracking-heading"
            style={{ color: 'var(--color-primary)' }}
          >
            Project Setup & Baseline Metadata
          </h1>
        </div>
        <p className="text-sm text-slate-500 max-w-3xl">
          Records fundamental residential property parameters, building scope, gross floor area, and
          author information. The gross area serves as the denominator for all $/sq ft unit cost analytics.
        </p>
      </div>

      {/* Main Grid: Form Inputs + Live Preview Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Inputs (2 columns wide on large screens) */}
        <div className="lg:col-span-2 card-static p-6 space-y-4">
          <h2
            className="text-base font-bold font-heading tracking-heading mb-4 pb-2 border-b border-slate-200 flex items-center gap-2"
            style={{ color: 'var(--color-primary)' }}
          >
            <FileText className="w-4 h-4 text-blue-600" />
            Project Attributes
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Project Name */}
            <div className="sm:col-span-2">
              <label
                htmlFor="input-project-name"
                className="block text-[11px] font-semibold uppercase tracking-label text-slate-600 mb-1"
              >
                Project Name
              </label>
              <div className="relative">
                <input
                  id="input-project-name"
                  type="text"
                  value={projectSetup.projectName}
                  onChange={(e) => handleChange('projectName', e.target.value)}
                  placeholder="e.g. Riverside Modern Residence (Lot 42)"
                  className="w-full pl-9 pr-3 py-2 text-sm font-medium rounded border border-amber-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ backgroundColor: 'var(--color-input-bg)', color: 'var(--color-primary)' }}
                />
                <Building className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
              </div>
            </div>

            {/* Project Address */}
            <div className="sm:col-span-2">
              <label
                htmlFor="input-project-address"
                className="block text-[11px] font-semibold uppercase tracking-label text-slate-600 mb-1"
              >
                Site Address / Location
              </label>
              <div className="relative">
                <input
                  id="input-project-address"
                  type="text"
                  value={projectSetup.projectAddress}
                  onChange={(e) => handleChange('projectAddress', e.target.value)}
                  placeholder="e.g. 742 Evergreen Terrace, Oakville, ON"
                  className="w-full pl-9 pr-3 py-2 text-sm font-medium rounded border border-amber-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ backgroundColor: 'var(--color-input-bg)', color: 'var(--color-primary)' }}
                />
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
              </div>
            </div>

            {/* Estimate Version */}
            <div>
              <label
                htmlFor="input-estimate-version"
                className="block text-[11px] font-semibold uppercase tracking-label text-slate-600 mb-1"
              >
                Estimate Version / Revision
              </label>
              <input
                id="input-estimate-version"
                type="text"
                value={projectSetup.estimateVersion}
                onChange={(e) => handleChange('estimateVersion', e.target.value)}
                placeholder="e.g. Rev 1.2 (Pre-Construction)"
                className="w-full px-3 py-2 text-sm font-medium rounded border border-amber-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ backgroundColor: 'var(--color-input-bg)', color: 'var(--color-primary)' }}
              />
            </div>

            {/* Gross Area */}
            <div>
              <label
                htmlFor="input-gross-area"
                className="block text-[11px] font-semibold uppercase tracking-label text-slate-600 mb-1"
              >
                Gross Floor Area (sq ft)
              </label>
              <div className="relative">
                <input
                  id="input-gross-area"
                  type="number"
                  min="1"
                  step="10"
                  value={projectSetup.grossArea || ''}
                  onChange={(e) => handleChange('grossArea', parseFloat(e.target.value) || 0)}
                  placeholder="1850"
                  className="w-full pl-9 pr-14 py-2 text-sm font-semibold rounded border border-amber-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ backgroundColor: 'var(--color-input-bg)', color: 'var(--color-primary)' }}
                />
                <Ruler className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                <span className="absolute right-3 top-2.5 text-xs text-slate-600 font-semibold">
                  sq ft
                </span>
              </div>
            </div>

            {/* Estimator */}
            <div>
              <label
                htmlFor="input-estimator"
                className="block text-[11px] font-semibold uppercase tracking-label text-slate-600 mb-1"
              >
                Lead Estimator / PQS
              </label>
              <div className="relative">
                <input
                  id="input-estimator"
                  type="text"
                  value={projectSetup.estimator}
                  onChange={(e) => handleChange('estimator', e.target.value)}
                  placeholder="e.g. David Zhang, P.Eng."
                  className="w-full pl-9 pr-3 py-2 text-sm font-medium rounded border border-amber-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ backgroundColor: 'var(--color-input-bg)', color: 'var(--color-primary)' }}
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
              </div>
            </div>

            {/* Estimate Date */}
            <div>
              <label
                htmlFor="input-estimate-date"
                className="block text-[11px] font-semibold uppercase tracking-label text-slate-600 mb-1"
              >
                Baseline Date
              </label>
              <div className="relative">
                <input
                  id="input-estimate-date"
                  type="date"
                  value={projectSetup.estimateDate}
                  onChange={(e) => handleChange('estimateDate', e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm font-medium rounded border border-amber-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ backgroundColor: 'var(--color-input-bg)', color: 'var(--color-primary)' }}
                />
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Live Calculation Metric Card */}
        <div className="card-elevation p-6 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Info className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-semibold uppercase tracking-label text-slate-500">
                Live Costing Indicator
              </span>
            </div>

            <div className="space-y-4 pt-2">
              <div>
                <span className="text-[11px] font-medium text-slate-500 block">
                  Total Construction Base Estimate
                </span>
                <span
                  className="text-2xl font-bold font-heading tracking-display"
                  style={{ color: 'var(--color-primary)' }}
                >
                  {currencySymbol}
                  {totalEstimateCost.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-medium text-slate-500 block">
                  Current Unit Rate ($/sq ft)
                </span>
                <span
                  className="text-3xl font-bold font-heading tracking-display"
                  style={{ color: 'var(--color-accent)' }}
                >
                  {currencySymbol}
                  {costPerSqFt.toFixed(2)}{' '}
                  <span className="text-sm font-normal text-slate-500 font-sans">/ sq ft</span>
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded border border-slate-200 text-xs text-slate-600 space-y-1">
                <div className="flex justify-between">
                  <span>Gross Footprint:</span>
                  <span className="font-semibold">{grossArea.toLocaleString()} sq ft</span>
                </div>
                <div className="flex justify-between">
                  <span>Typical Residential Target:</span>
                  <span className="font-semibold">$165.00 – $240.00 / sq ft</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
            Residential cost model configured for 1,500 – 2,200 sq ft custom home baselines.
          </div>
        </div>
      </div>
    </div>
  );
};
