import { SIGNIFICANT_DIGITS } from '../../constants/numeric.constants';
import { isFiniteNumber } from '../guards/isFiniteNumber';

/** Round away binary floating point noise, so `0.1 + 0.2` shows as `0.3`. */
export function normalizePrecision(value: number): number {
  if (!isFiniteNumber(value)) return value;
  return Number(value.toPrecision(SIGNIFICANT_DIGITS));
}
