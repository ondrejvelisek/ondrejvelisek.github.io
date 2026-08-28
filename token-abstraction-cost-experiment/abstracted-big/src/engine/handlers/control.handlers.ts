import { NEXT_ANGLE_MODE } from '../../constants/angle.constants';
import { ZERO_ENTRY } from '../../constants/numeric.constants';
import type { CalculatorHandlerSlice } from '../../types/action.types';
import { toNumericString } from '../../types/primitives.types';
import type { CalculatorState } from '../../types/state.types';
import { resetPreservingPreferences } from '../initialState';
import { settleResult } from '../support/settleResult';

type ControlActionType =
  | 'clearEntry'
  | 'clearAll'
  | 'toggleAngleMode'
  | 'toggleSecondMode'
  | 'clearHistory'
  | 'updateSettings'
  | 'recallHistoryRecord';

export const controlHandlers: CalculatorHandlerSlice<CalculatorState, ControlActionType> = {
  clearEntry: (state) => ({
    ...state,
    entry: toNumericString(ZERO_ENTRY),
    isEntering: false,
    hasError: false,
  }),

  clearAll: (state) => resetPreservingPreferences(state),

  toggleAngleMode: (state) => ({ ...state, angleMode: NEXT_ANGLE_MODE[state.angleMode] }),

  toggleSecondMode: (state) => ({ ...state, isSecondMode: !state.isSecondMode }),

  clearHistory: (state) => ({ ...state, history: [] }),

  updateSettings: (state, action) => ({
    ...state,
    settings: { ...state.settings, ...action.patch },
  }),

  recallHistoryRecord: (state, action) => {
    const record = state.history.find((candidate) => candidate.id === action.id);
    if (!record) return state;
    const value = Number(record.result.replace(/,/g, ''));
    if (!Number.isFinite(value)) return state;
    return settleResult(state, value, { expression: record.expression });
  },
};
