import {
  EXPONENTIAL_FRACTION_DIGITS,
  EXPONENTIAL_LOWER_BOUND,
  EXPONENTIAL_UPPER_BOUND,
} from '../../constants/numeric.constants';

export function needsExponentialNotation(value: number): boolean {
  const magnitude = Math.abs(value);
  if (magnitude === 0) return false;
  return magnitude >= EXPONENTIAL_UPPER_BOUND || magnitude < EXPONENTIAL_LOWER_BOUND;
}

export function toExponentialNotation(value: number): string {
  return value
    .toExponential(EXPONENTIAL_FRACTION_DIGITS)
    .replace(/e([+-])(\d)$/, 'e$10$2');
}
