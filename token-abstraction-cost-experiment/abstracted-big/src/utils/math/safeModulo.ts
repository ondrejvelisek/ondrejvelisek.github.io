/** Remainder that reports an undefined result instead of NaN by accident. */
export function safeModulo(dividend: number, divisor: number): number {
  return divisor === 0 ? Number.NaN : dividend % divisor;
}
