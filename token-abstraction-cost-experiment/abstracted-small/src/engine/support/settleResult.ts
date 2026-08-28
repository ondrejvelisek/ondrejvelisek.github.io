import { ZERO_ENTRY } from '../../constants/numeric.constants';
import type { CalculatorState } from '../../types/state.types';
import { toNumericString } from '../../types/primitives.types';
import { toEntryBuffer } from '../../utils/format/formatDisplayValue';
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

