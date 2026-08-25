export interface ProjectParameters {
  defaultWasteRate: number; // e.g. 0.05 (5.0%)
  contingencyRate: number; // e.g. 0.10 (10.0%)
  salesTaxRate: number; // e.g. 0.08 (8.0%)
  currencySymbol: string; // e.g. "$"
  masterDivisions: string[];
}

export interface ProjectSetup {
  projectName: string;
  projectAddress: string;
  estimateVersion: string;
  grossArea: number; // Gross Area in sq ft (e.g. 1850)
  estimator: string;
  estimateDate: string;
}

export interface BOQItem {
  id: string; // e.g. "EX-001"
  division: string;
  description: string;
  drawingRef: string;
  location: string;
  baseQty: number;
  unit: string;
  itemWasteRate: number | null; // Specific waste % or null to inherit default
  materialRate: number;
  labourRate: number;
  equipSubRate: number;
}

export interface ComputedBOQItem extends BOQItem {
  effectiveWasteRate: number;
  adjustedQty: number;
  materialCost: number;
  labourCost: number;
  equipSubCost: number;
  totalItemCost: number;
}

export interface DivisionSummaryRow {
  division: string;
  materialCost: number;
  labourCost: number;
  equipSubCost: number;
  totalCost: number;
  costShare: number; // 0.0 to 1.0
  costPerSqFt: number;
  itemCount: number;
}

export interface SubcontractorQuoteRow {
  division: string;
  internalEstimate: number;
  subAQuote: number;
  subBQuote: number;
  subCQuote: number;
  lowestQuote: number;
  lowestVendor: string;
  varianceVsBase: number;
  variancePct: number;
}

export interface SubcontractorInfo {
  subAName: string;
  subBName: string;
  subCName: string;
}

export interface BudgetControlRow {
  division: string;
  estimatedCost: number;
  approvedBudget: number;
  actualCost: number;
  budgetVariance: number;
  budgetVariancePct: number;
  isOverBudget: boolean;
  statusFlag: '⚠️ OVER BUDGET' | '✅ OK';
}

export interface DashboardMetrics {
  totalEstimateCost: number;
  contingencyCost: number;
  grandTotalCost: number;
  costPerSqFt: number;
  totalMaterialCost: number;
  totalLabourCost: number;
  totalEquipSubCost: number;
  materialShare: number;
  labourShare: number;
  equipSubShare: number;
  totalApprovedBudget: number;
  totalActualCost: number;
  totalBudgetVariance: number;
  overBudgetDivisionCount: number;
  topDivisions: DivisionSummaryRow[];
  lowestQuoteSum: number;
  subcontractorTotalVariance: number;
}

export interface AppDataState {
  parameters: ProjectParameters;
  projectSetup: ProjectSetup;
  boqItems: BOQItem[];
  subcontractorInfo: SubcontractorInfo;
  subcontractorQuotes: Record<string, { subAQuote: number; subBQuote: number; subCQuote: number }>;
  budgetControls: Record<string, { approvedBudget: number; actualCost: number }>;
  lastSaved: string;
}

export type TabId =
  | '06_Dashboard'
  | '07_Visualizer'
  | '02_BOQ_Takeoff'
  | '03_Division_Summary'
  | '04_Subcontractor'
  | '05_Budget_Cost'
  | '01_Project_Setup'
  | '00_Parameters';
