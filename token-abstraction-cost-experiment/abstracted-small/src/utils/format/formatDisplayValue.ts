import { ERROR_DISPLAY_TEXT } from '../../constants/aria.constants';
import type { NumericString } from '../../types/primitives.types';
import { toNumericString } from '../../types/primitives.types';
import { memoizeUnary } from '../fn/memoizeUnary';
import { normalizePrecision } from '../math/precision';
import { groupThousands } from './groupThousands';
import { needsExponentialNotation, toExponentialNotation } from './toExponentialNotation';

export const formatDisplayValue = memoizeUnary((rawEntry: string): string => {
  const parsed = Number(rawEntry);
  if (!Number.isFinite(parsed)) return ERROR_DISPLAY_TEXT;
  if (needsExponentialNotation(parsed)) return toExponentialNotation(parsed);
  return groupThousands(rawEntry);
});

export function formatNumericResult(value: number): string {
  if (!Number.isFinite(value)) return ERROR_DISPLAY_TEXT;
  return formatDisplayValue(String(normalizePrecision(value)));
}

export function toEntryBuffer(value: number): NumericString {
  return toNumericString(String(normalizePrecision(value)));
}
