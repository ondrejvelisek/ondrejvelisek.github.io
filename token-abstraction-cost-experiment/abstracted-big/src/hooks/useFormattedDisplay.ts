import { useMemo } from 'react';

import { ERROR_DISPLAY_TEXT } from '../constants/aria.constants';
import type { DisplayViewModel } from '../types/state.types';
import { formatDisplayValue, formatWithoutGrouping } from '../utils/format/formatDisplayValue';
import { useCalculatorState } from './useCalculatorSelector';

export function useFormattedDisplay(): DisplayViewModel {
  const state = useCalculatorState();

  return useMemo<DisplayViewModel>(
    () => ({
      formattedEntry: state.hasError
        ? ERROR_DISPLAY_TEXT
        : state.settings.grouping
          ? formatDisplayValue(state.entry)
          : formatWithoutGrouping(state.entry),
      expression: state.expression,
      hasError: state.hasError,
      angleMode: state.angleMode,
      isSecondMode: state.isSecondMode,
      settings: state.settings,
      hasMemory: state.memory !== 0,
    }),
    [state.entry, state.expression, state.hasError, state.angleMode, state.isSecondMode, state.memory, state.settings],
  );
}
