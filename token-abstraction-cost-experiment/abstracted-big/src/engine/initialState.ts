import { DEFAULT_ANGLE_MODE } from '../constants/angle.constants';
import { ZERO_ENTRY } from '../constants/numeric.constants';
import { toNumericString } from '../types/primitives.types';
import type { CalculatorState } from '../types/state.types';

export const INITIAL_CALCULATOR_STATE: CalculatorState = {
  entry: toNumericString(ZERO_ENTRY),
  pending: null,
  expression: '',
  isEntering: false,
  hasError: false,
  angleMode: DEFAULT_ANGLE_MODE,
  isSecondMode: false,
  memory: 0,
  history: [],
  nextHistoryId: 1,
  settings: { precision: 12, grouping: true, keepExpression: true },
};

/** AC keeps the angle mode, the memory register and the history. */
export function resetPreservingPreferences(state: CalculatorState): CalculatorState {
  return {
    ...INITIAL_CALCULATOR_STATE,
    angleMode: state.angleMode,
    memory: state.memory,
    history: state.history,
    nextHistoryId: state.nextHistoryId,
    settings: state.settings,
  };
}
