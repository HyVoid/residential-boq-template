import { INITIAL_DATA, MASTER_DIVISIONS } from '../initialData';
import { AppDataState, BOQItem } from '../types';

const STORAGE_KEY = 'residential_boq_system_data_v1';

export function loadAppState(): AppDataState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_DATA;
    const parsed = JSON.parse(raw) as AppDataState;
    if (!parsed.parameters || !parsed.projectSetup || !Array.isArray(parsed.boqItems)) {
      return INITIAL_DATA;
    }
    // Ensure all master divisions exist in parameters
    if (!parsed.parameters.masterDivisions || parsed.parameters.masterDivisions.length === 0) {
      parsed.parameters.masterDivisions = [...MASTER_DIVISIONS];
    }
    // Ensure all boqItem IDs are unique (remedy duplicate DW-001 or any legacy clashes)
    const seenIds = new Set<string>();
    parsed.boqItems = parsed.boqItems.map((item, index) => {
      let uniqueId = item.id;
      if (!uniqueId || seenIds.has(uniqueId)) {
        if (item.division?.includes('15 - Driveway') && uniqueId === 'DW-001') {
          uniqueId = 'DR-001';
        } else {
          uniqueId = `${item.id || 'ITEM'}_${index + 1}`;
        }
      }
      seenIds.add(uniqueId);
      return { ...item, id: uniqueId };
    });
    return parsed;
  } catch (err) {
    console.error('Failed to load state from localStorage:', err);
    return INITIAL_DATA;
  }
}

export function saveAppState(state: AppDataState): string {
  const updatedTime = new Date().toISOString();
  const stateToSave: AppDataState = {
    ...state,
    lastSaved: updatedTime,
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
  } catch (err) {
    console.error('Failed to save state to localStorage:', err);
  }
  return updatedTime;
}

export function clearAppState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear localStorage:', err);
  }
}

export function exportBackupJSON(state: AppDataState): void {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(state, null, 2));
  const downloadAnchor = document.createElement('a');
  const safeName = (state.projectSetup.projectName || 'Residential_BOQ')
    .replace(/[^a-z0-9]/gi, '_')
    .toLowerCase();
  const dateStr = new Date().toISOString().slice(0, 10);
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `BOQ_Backup_${safeName}_${dateStr}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function exportBOQCSV(items: BOQItem[], currencySymbol: string = '$'): void {
  const headers = [
    'Division',
    'Item ID',
    'Description',
    'Drawing Ref',
    'Location',
    'Base Qty',
    'Unit',
    'Item Waste % (Decimal, e.g. 0.05)',
    `Material Rate (${currencySymbol})`,
    `Labour Rate (${currencySymbol})`,
    `Equip/Sub Rate (${currencySymbol})`,
  ];

  const escapeCSV = (val: any) => {
    if (val === null || val === undefined) return '';
    const str = String(val);
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const rows = items.map((item) => [
    escapeCSV(item.division),
    escapeCSV(item.id),
    escapeCSV(item.description),
    escapeCSV(item.drawingRef),
    escapeCSV(item.location),
    item.baseQty,
    escapeCSV(item.unit),
    item.itemWasteRate !== null ? item.itemWasteRate : '',
    item.materialRate,
    item.labourRate,
    item.equipSubRate,
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `BOQ_Takeoff_Export_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export function parseBOQCSV(
  csvText: string,
  availableDivisions: string[],
): { items: BOQItem[]; errors: string[] } {
  const lines = csvText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const errors: string[] = [];
  const items: BOQItem[] = [];

  if (lines.length < 2) {
    return { items: [], errors: ['CSV file is empty or missing data rows.'] };
  }

  // Simple CSV line parser respecting quotes
  const parseCSVLine = (line: string): string[] => {
    const result: string[] = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        result.push(cur.trim());
        cur = '';
      } else {
        cur += char;
      }
    }
    result.push(cur.trim());
    return result;
  };

  // Start from row 1 (skip header)
  for (let i = 1; i < lines.length; i++) {
    const cols = parseCSVLine(lines[i]);
    if (cols.length < 3) continue;

    const rawDivision = cols[0] || '';
    // Find closest division or match
    let matchedDiv = availableDivisions.find(
      (d) => d.toLowerCase() === rawDivision.toLowerCase() || d.includes(rawDivision),
    );
    if (!matchedDiv) {
      matchedDiv = availableDivisions[0] || '01 - Excavation & Earthwork';
    }

    const id = cols[1] || `ITEM-${String(i).padStart(3, '0')}`;
    const description = cols[2] || 'Imported item';
    const drawingRef = cols[3] || '';
    const location = cols[4] || '';
    const baseQty = parseFloat(cols[5]) || 0;
    const unit = cols[6] || 'ea';
    const wasteRaw = cols[7];
    let itemWasteRate: number | null = null;
    if (wasteRaw && wasteRaw !== '' && !isNaN(parseFloat(wasteRaw))) {
      itemWasteRate = parseFloat(wasteRaw);
      // If entered as percentage like 5 instead of 0.05
      if (itemWasteRate > 1 && itemWasteRate <= 100) {
        itemWasteRate = itemWasteRate / 100;
      }
    }

    const materialRate = parseFloat(cols[8]) || 0;
    const labourRate = parseFloat(cols[9]) || 0;
    const equipSubRate = parseFloat(cols[10]) || 0;

    items.push({
      id,
      division: matchedDiv,
      description,
      drawingRef,
      location,
      baseQty,
      unit,
      itemWasteRate,
      materialRate,
      labourRate,
      equipSubRate,
    });
  }

  return { items, errors };
}
