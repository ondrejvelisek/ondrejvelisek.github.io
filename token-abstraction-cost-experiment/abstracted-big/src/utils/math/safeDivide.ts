/** Division that reports an undefined result instead of Infinity. */
export function safeDivide(dividend: number, divisor: number): number {
  return divisor === 0 ? Number.NaN : dividend / divisor;
}
