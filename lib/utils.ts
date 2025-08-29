/**
 * Format a number or numeric string to a locale string with limited decimals.
 *
 * @param x The number or string to format
 * @param digits Maximum number of fractional digits (default 6)
 * @returns Formatted string or '-' if NaN
 */
export function fmt(x: number | string, digits = 6) {
  const n = typeof x === 'string' ? Number(x) : x;
  if (isNaN(n)) return '-';
  return n.toLocaleString(undefined, { maximumFractionDigits: digits });
}