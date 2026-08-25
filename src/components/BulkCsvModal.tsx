import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, Download, FileText, Upload, X } from 'lucide-react';
import { BOQItem } from '../types';
import { parseBOQCSV } from '../utils/storage';

interface BulkCsvModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableDivisions: string[];
  onImportItems: (newItems: BOQItem[], mode: 'replace' | 'append') => void;
  currencySymbol: string;
}

export const BulkCsvModal: React.FC<BulkCsvModalProps> = ({
  isOpen,
  onClose,
  availableDivisions,
  onImportItems,
  currencySymbol,
}) => {
  const [csvText, setCsvText] = useState<string>('');
  const [importMode, setImportMode] = useState<'replace' | 'append'>('replace');
  const [parsedPreview, setParsedPreview] = useState<BOQItem[]>([]);
  const [parseErrors, setParseErrors] = useState<string[]>([]);
  const [hasParsed, setHasParsed] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleDownloadTemplate = () => {
    const headers = [
      'Division',
      'Item ID',
      'Description',
      'Drawing Ref',
      'Location',
      'Base Qty',
      'Unit',
      'Item Waste %',
      `Material Rate (${currencySymbol})`,
      `Labour Rate (${currencySymbol})`,
      `Equip/Sub Rate (${currencySymbol})`,
    ];
    const sampleRows = [
      '01 - Excavation & Earthwork,EX-SAMPLE,Bulk Basement Excavation,S-101,Basement,450,cu yd,0.05,0.0,2.5,14.0',
      '05 - Wood Framing & Structure,FR-SAMPLE,2x6 Exterior Wall Framing,A-102,1st Floor,2400,sq ft,,6.85,4.2,0.0',
      '10 - Plumbing Systems,PL-SAMPLE,Rough-in Water Supply & DWV,M-101,House,1,lot,,4200.0,5600.0,650.0',
    ];
    const content = [headers.join(','), ...sampleRows].join('\n');
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'BOQ_Takeoff_Import_Template.csv');
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        setCsvText(text);
        const { items, errors } = parseBOQCSV(text, availableDivisions);
        setParsedPreview(items);
        setParseErrors(errors);
        setHasParsed(true);
      }
    };
    reader.readAsText(file);
  };

  const handleParseManualText = () => {
    if (!csvText.trim()) return;
    const { items, errors } = parseBOQCSV(csvText, availableDivisions);
    setParsedPreview(items);
    setParseErrors(errors);
    setHasParsed(true);
  };

  const handleConfirmImport = () => {
    if (parsedPreview.length === 0) return;
    onImportItems(parsedPreview, importMode);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(5, 28, 44, 0.5)', backdropFilter: 'blur(8px)' }}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]"
        style={{ border: '1px solid var(--color-border)' }}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-blue-600" />
            <h3
              className="text-base font-bold font-heading tracking-heading"
              style={{ color: 'var(--color-primary)' }}
            >
              Bulk CSV Import — Master BOQ Takeoff
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
          {/* Instructions & Template Download */}
          <div className="p-3 bg-blue-50/70 rounded-lg border border-blue-100 flex items-center justify-between text-blue-900">
            <div>
              <span className="font-semibold block mb-0.5">Need the correct column structure?</span>
              <span className="text-[11px] text-blue-700">
                Download the standardized CSV template matching all 11 BOQ Takeoff attributes.
              </span>
            </div>
            <button
              onClick={handleDownloadTemplate}
              className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold text-xs cursor-pointer shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Get CSV Template</span>
            </button>
          </div>

          {/* Upload or Paste */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-slate-700">Paste CSV Content or Upload File</label>
              <label className="px-2.5 py-1 text-xs font-semibold rounded border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 cursor-pointer shadow-sm flex items-center gap-1">
                <FileText className="w-3.5 h-3.5" />
                <span>Choose .CSV File</span>
                <input
                  type="file"
                  accept=".csv,text/csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            <textarea
              rows={6}
              value={csvText}
              onChange={(e) => {
                setCsvText(e.target.value);
                setHasParsed(false);
              }}
              placeholder="Division,Item ID,Description,Drawing Ref,Location,Base Qty,Unit,Item Waste %,Material Rate,Labour Rate,Equip/Sub Rate&#10;01 - Excavation & Earthwork,EX-001,Basement Excavation,S-101,Basement,460,cu yd,0.05,0.0,2.5,14.2"
              className="w-full p-3 font-mono text-[11px] rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
            />

            {!hasParsed && csvText.trim() && (
              <button
                onClick={handleParseManualText}
                className="px-3 py-1.5 bg-slate-800 text-white rounded font-semibold text-xs hover:bg-slate-900 cursor-pointer"
              >
                Validate & Parse CSV Text
              </button>
            )}
          </div>

          {/* Parse Results Preview */}
          {hasParsed && (
            <div className="space-y-3 pt-2 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold text-slate-800">
                    Successfully Parsed {parsedPreview.length} Items
                  </span>
                </div>

                {/* Import Mode Radio */}
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="importMode"
                      checked={importMode === 'replace'}
                      onChange={() => setImportMode('replace')}
                    />
                    <span>Replace Existing</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="importMode"
                      checked={importMode === 'append'}
                      onChange={() => setImportMode('append')}
                    />
                    <span>Append to Existing</span>
                  </label>
                </div>
              </div>

              {/* Table Preview */}
              <div className="max-h-40 overflow-y-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left text-[11px] border-collapse">
                  <thead className="bg-slate-100 uppercase sticky top-0 font-semibold text-slate-600">
                    <tr>
                      <th className="py-1 px-2">ID</th>
                      <th className="py-1 px-2">Division</th>
                      <th className="py-1 px-2">Description</th>
                      <th className="py-1 px-2 text-right">Qty</th>
                      <th className="py-1 px-2 text-right">Mat $</th>
                      <th className="py-1 px-2 text-right">Lab $</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-sans">
                    {parsedPreview.slice(0, 10).map((p, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="py-1 px-2 font-mono">{p.id}</td>
                        <td className="py-1 px-2 font-medium">{p.division}</td>
                        <td className="py-1 px-2 truncate max-w-[150px]">{p.description}</td>
                        <td className="py-1 px-2 text-right font-mono">
                          {p.baseQty} {p.unit}
                        </td>
                        <td className="py-1 px-2 text-right font-mono">${p.materialRate}</td>
                        <td className="py-1 px-2 text-right font-mono">${p.labourRate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {parsedPreview.length > 10 && (
                <div className="text-[11px] text-slate-500 text-center">
                  ...and {parsedPreview.length - 10} more items
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold rounded border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmImport}
            disabled={parsedPreview.length === 0}
            className="px-4 py-1.5 text-xs font-semibold rounded text-white disabled:opacity-40 cursor-pointer shadow-sm"
            style={{ backgroundColor: 'var(--color-accent)' }}
          >
            Commit Import ({parsedPreview.length} Items)
          </button>
        </div>
      </div>
    </div>
  );
};
