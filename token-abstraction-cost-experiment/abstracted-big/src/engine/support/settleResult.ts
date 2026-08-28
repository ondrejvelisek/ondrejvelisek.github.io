import { MAX_HISTORY_ENTRIES, ZERO_ENTRY } from '../../constants/numeric.constants';
import type { CalculatorState, HistoryRecord } from '../../types/state.types';
import { toNumericString } from '../../types/primitives.types';
import { formatNumericResult, toEntryBuffer } from '../../utils/format/formatDisplayValue';
import { isFiniteNumber } from '../../utils/guards/isFiniteNumber';

export function currentOperand(state: CalculatorState): number {
  return Number(state.entry);
}

export function settleResult(
  state: CalculatorState,
  value: number,
  patch: Partial<CalculatorState> = {},
): CalculatorState {
  if (!isFiniteNumber(value)) {
    return {
      ...state,
      ...patch,
      entry: toNumericString(ZERO_ENTRY),
      isEntering: false,
      hasError: true,
    };
  }

  return {
    ...state,
    ...patch,
    entry: toEntryBuffer(value),
    isEntering: false,
    hasError: false,
  };
}

export function appendHistoryRecord(
  state: CalculatorState,
  expression: string,
  result: number,
): Pick<CalculatorState, 'history' | 'nextHistoryId'> {
  const record: HistoryRecord = {
    id: state.nextHistoryId,
    expression,
    result: formatNumericResult(result),
  };

  return {
    history: [record, ...state.history].slice(0, MAX_HISTORY_ENTRIES),
    nextHistoryId: state.nextHistoryId + 1,
  };
}
