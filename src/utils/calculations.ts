import {
  AppDataState,
  BOQItem,
  BudgetControlRow,
  ComputedBOQItem,
  DashboardMetrics,
  DivisionSummaryRow,
  SubcontractorQuoteRow,
} from '../types';

export function computeBOQItem(
  item: BOQItem,
  defaultWasteRate: number,
  salesTaxRate: number,
): ComputedBOQItem {
  const baseQty = Number(item.baseQty) || 0;
  const effectiveWasteRate =
    item.itemWasteRate !== null &&
    item.itemWasteRate !== undefined &&
    !isNaN(Number(item.itemWasteRate)) &&
    Number(item.itemWasteRate) >= 0
      ? Number(item.itemWasteRate)
      : Number(defaultWasteRate) || 0;

  const adjustedQty = baseQty * (1 + effectiveWasteRate);

  const materialRate = Number(item.materialRate) || 0;
  const labourRate = Number(item.labourRate) || 0;
  const equipSubRate = Number(item.equipSubRate) || 0;

  const materialCost = adjustedQty * materialRate * (1 + (Number(salesTaxRate) || 0));
  const labourCost = adjustedQty * labourRate;
  const equipSubCost = adjustedQty * equipSubRate;
  const totalItemCost = materialCost + labourCost + equipSubCost;

  return {
    ...item,
    effectiveWasteRate,
    adjustedQty,
    materialCost,
    labourCost,
    equipSubCost,
    totalItemCost,
  };
}

export function computeAllBOQItems(
  items: BOQItem[],
  defaultWasteRate: number,
  salesTaxRate: number,
): ComputedBOQItem[] {
  return items.map((item) => computeBOQItem(item, defaultWasteRate, salesTaxRate));
}

export function computeDivisionSummaries(
  masterDivisions: string[],
  computedItems: ComputedBOQItem[],
  grossArea: number,
): { summaries: DivisionSummaryRow[]; totalEstimateCost: number } {
  // Aggregate costs by division
  const divMap: Record<
    string,
    { materialCost: number; labourCost: number; equipSubCost: number; count: number }
  > = {};

  masterDivisions.forEach((div) => {
    divMap[div] = { materialCost: 0, labourCost: 0, equipSubCost: 0, count: 0 };
  });

  computedItems.forEach((item) => {
    if (!divMap[item.division]) {
      divMap[item.division] = { materialCost: 0, labourCost: 0, equipSubCost: 0, count: 0 };
    }
    divMap[item.division].materialCost += item.materialCost;
    divMap[item.division].labourCost += item.labourCost;
    divMap[item.division].equipSubCost += item.equipSubCost;
    divMap[item.division].count += 1;
  });

  let totalEstimateCost = 0;
  const rawSummaries = masterDivisions.map((division) => {
    const data = divMap[division] || {
      materialCost: 0,
      labourCost: 0,
      equipSubCost: 0,
      count: 0,
    };
    const totalCost = data.materialCost + data.labourCost + data.equipSubCost;
    totalEstimateCost += totalCost;
    return {
      division,
      materialCost: data.materialCost,
      labourCost: data.labourCost,
      equipSubCost: data.equipSubCost,
      totalCost,
      itemCount: data.count,
    };
  });

  const validArea = grossArea > 0 ? grossArea : 1;

  const summaries: DivisionSummaryRow[] = rawSummaries.map((s) => ({
    ...s,
    costShare: totalEstimateCost > 0 ? s.totalCost / totalEstimateCost : 0,
    costPerSqFt: s.totalCost / validArea,
  }));

  return { summaries, totalEstimateCost };
}

export function computeSubcontractorComparison(
  masterDivisions: string[],
  divisionSummaries: DivisionSummaryRow[],
  quotes: AppDataState['subcontractorQuotes'],
  subNames: AppDataState['subcontractorInfo'],
): SubcontractorQuoteRow[] {
  const summaryMap = new Map(divisionSummaries.map((d) => [d.division, d.totalCost]));

  return masterDivisions.map((division) => {
    const internalEstimate = summaryMap.get(division) || 0;
    const q = quotes[division] || { subAQuote: 0, subBQuote: 0, subCQuote: 0 };

    const validQuotes: { name: string; quote: number }[] = [];
    if (q.subAQuote > 0) validQuotes.push({ name: subNames.subAName || 'Sub A', quote: q.subAQuote });
    if (q.subBQuote > 0) validQuotes.push({ name: subNames.subBName || 'Sub B', quote: q.subBQuote });
    if (q.subCQuote > 0) validQuotes.push({ name: subNames.subCName || 'Sub C', quote: q.subCQuote });

    let lowestQuote = 0;
    let lowestVendor = 'N/A';

    if (validQuotes.length > 0) {
      const minItem = validQuotes.reduce((prev, curr) => (curr.quote < prev.quote ? curr : prev));
      lowestQuote = minItem.quote;
      lowestVendor = minItem.name;
    } else {
      lowestQuote = internalEstimate;
      lowestVendor = 'Internal Baseline';
    }

    const varianceVsBase = lowestQuote > 0 ? lowestQuote - internalEstimate : 0;
    const variancePct = internalEstimate > 0 ? varianceVsBase / internalEstimate : 0;

    return {
      division,
      internalEstimate,
      subAQuote: q.subAQuote,
      subBQuote: q.subBQuote,
      subCQuote: q.subCQuote,
      lowestQuote,
      lowestVendor,
      varianceVsBase,
      variancePct,
    };
  });
}

export function computeBudgetControl(
  masterDivisions: string[],
  divisionSummaries: DivisionSummaryRow[],
  budgets: AppDataState['budgetControls'],
): BudgetControlRow[] {
  const summaryMap = new Map(divisionSummaries.map((d) => [d.division, d.totalCost]));

  return masterDivisions.map((division) => {
    const estimatedCost = summaryMap.get(division) || 0;
    const b = budgets[division] || { approvedBudget: estimatedCost, actualCost: 0 };

    const approvedBudget = b.approvedBudget >= 0 ? b.approvedBudget : 0;
    const actualCost = b.actualCost >= 0 ? b.actualCost : 0;
    const budgetVariance = actualCost - approvedBudget;
    const budgetVariancePct = approvedBudget > 0 ? budgetVariance / approvedBudget : 0;
    const isOverBudget = actualCost > approvedBudget;

    return {
      division,
      estimatedCost,
      approvedBudget,
      actualCost,
      budgetVariance,
      budgetVariancePct,
      isOverBudget,
      statusFlag: isOverBudget ? '⚠️ OVER BUDGET' : '✅ OK',
    };
  });
}

export function computeDashboardMetrics(
  state: AppDataState,
  computedBOQ: ComputedBOQItem[],
  divisionSummaries: DivisionSummaryRow[],
  subQuotes: SubcontractorQuoteRow[],
  budgetRows: BudgetControlRow[],
): DashboardMetrics {
  const totalEstimateCost = divisionSummaries.reduce((sum, d) => sum + d.totalCost, 0);
  const contingencyCost = totalEstimateCost * (Number(state.parameters.contingencyRate) || 0);
  const grandTotalCost = totalEstimateCost + contingencyCost;
  const grossArea = state.projectSetup.grossArea > 0 ? state.projectSetup.grossArea : 1;
  const costPerSqFt = grandTotalCost / grossArea;

  const totalMaterialCost = computedBOQ.reduce((sum, item) => sum + item.materialCost, 0);
  const totalLabourCost = computedBOQ.reduce((sum, item) => sum + item.labourCost, 0);
  const totalEquipSubCost = computedBOQ.reduce((sum, item) => sum + item.equipSubCost, 0);

  const materialShare = totalEstimateCost > 0 ? totalMaterialCost / totalEstimateCost : 0;
  const labourShare = totalEstimateCost > 0 ? totalLabourCost / totalEstimateCost : 0;
  const equipSubShare = totalEstimateCost > 0 ? totalEquipSubCost / totalEstimateCost : 0;

  const totalApprovedBudget = budgetRows.reduce((sum, b) => sum + b.approvedBudget, 0);
  const totalActualCost = budgetRows.reduce((sum, b) => sum + b.actualCost, 0);
  const totalBudgetVariance = totalActualCost - totalApprovedBudget;
  const overBudgetDivisionCount = budgetRows.filter((b) => b.isOverBudget).length;

  const topDivisions = [...divisionSummaries]
    .sort((a, b) => b.totalCost - a.totalCost)
    .slice(0, 5);

  const lowestQuoteSum = subQuotes.reduce((sum, s) => sum + s.lowestQuote, 0);
  const subcontractorTotalVariance = lowestQuoteSum - totalEstimateCost;

  return {
    totalEstimateCost,
    contingencyCost,
    grandTotalCost,
    costPerSqFt,
    totalMaterialCost,
    totalLabourCost,
    totalEquipSubCost,
    materialShare,
    labourShare,
    equipSubShare,
    totalApprovedBudget,
    totalActualCost,
    totalBudgetVariance,
    overBudgetDivisionCount,
    topDivisions,
    lowestQuoteSum,
    subcontractorTotalVariance,
  };
}

export function formatCurrency(amount: number, symbol: string = '$', decimals: number = 2): string {
  const isNeg = amount < 0;
  const abs = Math.abs(amount);
  const formatted = abs.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return isNeg ? `(${symbol}${formatted})` : `${symbol}${formatted}`;
}

export function formatPercent(value: number, decimals: number = 1): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

export function formatNumber(value: number, decimals: number = 2): string {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}
