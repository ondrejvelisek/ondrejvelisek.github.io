import type { DigitToken } from '../../types/action.types';
import type { NumericString } from '../../types/primitives.types';

export function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

export function isNumericString(value: string): value is NumericString {
  return value.length > 0 && Number.isFinite(Number(value));
}

const DIGIT_PATTERN = /^[0-9]$/;

export function isDigitToken(value: string): value is DigitToken {
  return DIGIT_PATTERN.test(value);
}
