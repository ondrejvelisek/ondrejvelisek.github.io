import { SIGNIFICANT_DIGITS } from '../../constants/numeric.constants';
import { isFiniteNumber } from '../guards/isFiniteNumber';

export function normalizePrecision(value: number): number {
  if (!isFiniteNumber(value)) return value;
  return Number(value.toPrecision(SIGNIFICANT_DIGITS));
}

export function safeDivide(dividend: number, divisor: number): number {
  return divisor === 0 ? Number.NaN : dividend / divisor;
}

export function safeModulo(dividend: number, divisor: number): number {
  return divisor === 0 ? Number.NaN : dividend % divisor;
}
