import { ZERO_ENTRY } from '../constants/numeric.constants';
import { toNumericString } from '../types/primitives.types';
import type { CalculatorState } from '../types/state.types';

export const INITIAL_CALCULATOR_STATE: CalculatorState = {
  entry: toNumericString(ZERO_ENTRY),
  pending: null,
  expression: '',
  isEntering: false,
  hasError: false,
  memory: 0,
};

/** AC keeps the memory register. */
export function resetPreservingPreferences(state: CalculatorState): CalculatorState {
  return { ...INITIAL_CALCULATOR_STATE, memory: state.memory };
}
