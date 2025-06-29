export function formatCurrency(amount: number): string {
  const isWholeNumber = amount % 1 === 0;
  return isWholeNumber ? `$${amount.toFixed(0)}` : `$${amount.toFixed(2)}`;
}