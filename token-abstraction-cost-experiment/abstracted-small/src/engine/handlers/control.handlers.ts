import { ZERO_ENTRY } from '../../constants/numeric.constants';
import type { CalculatorHandlerSlice } from '../../types/action.types';
import { toNumericString } from '../../types/primitives.types';
import type { CalculatorState } from '../../types/state.types';
import { resetPreservingPreferences } from '../initialState';

type ControlActionType = 'clearEntry' | 'clearAll';

export const controlHandlers: CalculatorHandlerSlice<CalculatorState, ControlActionType> = {
  clearEntry: (state) => ({
    ...state,
    entry: toNumericString(ZERO_ENTRY),
    isEntering: false,
    hasError: false,
  }),

  clearAll: (state) => resetPreservingPreferences(state),
};
