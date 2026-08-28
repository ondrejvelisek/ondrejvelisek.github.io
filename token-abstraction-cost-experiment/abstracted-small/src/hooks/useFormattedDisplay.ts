import { useMemo } from 'react';

import { ERROR_DISPLAY_TEXT } from '../constants/aria.constants';
import type { DisplayViewModel } from '../types/state.types';
import { formatDisplayValue } from '../utils/format/formatDisplayValue';
import { useCalculatorState } from './useCalculatorSelector';

export function useFormattedDisplay(): DisplayViewModel {
  const state = useCalculatorState();

  return useMemo<DisplayViewModel>(
    () => ({
      formattedEntry: state.hasError ? ERROR_DISPLAY_TEXT : formatDisplayValue(state.entry),
      expression: state.expression,
      hasError: state.hasError,
      hasMemory: state.memory !== 0,
    }),
    [state.entry, state.expression, state.hasError, state.memory],
  );
}
