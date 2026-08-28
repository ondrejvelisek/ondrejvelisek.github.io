import {
  DECIMAL_SEPARATOR,
  MAX_ENTRY_LENGTH,
  NEGATIVE_SIGN,
  ZERO_ENTRY,
} from '../../constants/numeric.constants';
import type { CalculatorHandlerSlice } from '../../types/action.types';
import { toNumericString } from '../../types/primitives.types';
import type { CalculatorState } from '../../types/state.types';
import { resetPreservingPreferences } from '../initialState';

type EntryActionType = 'appendDigit' | 'appendDecimalSeparator' | 'removeLastCharacter';

function recoverFromError(state: CalculatorState): CalculatorState {
  return state.hasError ? resetPreservingPreferences(state) : state;
}

function significantLength(entry: string): number {
  return entry.replace(/[-.]/g, '').length;
}

export const entryHandlers: CalculatorHandlerSlice<CalculatorState, EntryActionType> = {
  appendDigit: (state, action) => {
    const base = recoverFromError(state);

    if (!base.isEntering) {
      return { ...base, entry: toNumericString(action.digit), isEntering: true, hasError: false };
    }

    if (significantLength(base.entry) >= MAX_ENTRY_LENGTH) return base;

    const next = base.entry === ZERO_ENTRY ? action.digit : `${base.entry}${action.digit}`;
    return { ...base, entry: toNumericString(next) };
  },

  appendDecimalSeparator: (state) => {
    const base = recoverFromError(state);

    if (!base.isEntering) {
      return {
        ...base,
        entry: toNumericString(`${ZERO_ENTRY}${DECIMAL_SEPARATOR}`),
        isEntering: true,
        hasError: false,
      };
    }

    if (base.entry.includes(DECIMAL_SEPARATOR)) return base;
    return { ...base, entry: toNumericString(`${base.entry}${DECIMAL_SEPARATOR}`) };
  },

  removeLastCharacter: (state) => {
    if (state.hasError) {
      return { ...state, entry: toNumericString(ZERO_ENTRY), hasError: false, isEntering: false };
    }

    const trimmed = state.entry.slice(0, -1);
    const next = trimmed === '' || trimmed === NEGATIVE_SIGN ? ZERO_ENTRY : trimmed;
    return { ...state, entry: toNumericString(next), isEntering: next !== ZERO_ENTRY };
  },
};
