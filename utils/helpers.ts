import { FlatExpense, FlatSettlement } from '../types';

export function scrollToSection(sectionId: string): void {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else if (sectionId === 'top') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

export async function copyTextToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Fallback below for iframe / restricted contexts
  }

  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    textArea.style.top = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(textArea);
    return ok;
  } catch {
    return false;
  }
}

export function exportFlatLedgerCsv(
  flatName: string,
  expenses: FlatExpense[],
  settlements: FlatSettlement[]
): void {
  const headers = ['Type', 'Title / Details', 'Category', 'Paid By / From', 'Split With / To', 'Amount (INR)', 'Date'];

  const expenseRows = expenses.map((exp) => [
    'EXPENSE',
    `"${exp.title.replace(/"/g, '""')}"`,
    exp.category,
    `"${exp.payerName}"`,
    `"${exp.splits.map((s) => `${s.displayName} (Rs.${Math.round(s.amount)})`).join('; ')}"`,
    Math.round(exp.amount),
    exp.date
  ]);

  const settlementRows = settlements.map((set) => [
    'SETTLEMENT',
    `"UPI TXN: ${set.upiTxnId}"`,
    'Settlement',
    `"${set.fromName}"`,
    `"${set.toName}"`,
    Math.round(set.amount),
    new Date(set.createdAt).toISOString().slice(0, 10)
  ]);

  const csvLines = [
    headers.join(','),
    ...expenseRows.map((r) => r.join(',')),
    ...settlementRows.map((r) => r.join(','))
  ].join('\n');

  const blob = new Blob([csvLines], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${flatName.replace(/[^a-z0-9]/gi, '_')}_Hisab_Ledger.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
