import { useCallback } from 'react';

import type { CalculatorState } from '../types/state.types';
import type { KeyDescriptor } from '../types/ui.types';
import { consumesSecondMode, resolveKeyBinding } from '../utils/keypad/resolveKeyBinding';
import { useCalculatorDispatch, useCalculatorState } from './useCalculatorSelector';

export type KeyDescriptorDispatcher = (descriptor: KeyDescriptor) => void;

export function useDispatchKeyDescriptor(): KeyDescriptorDispatcher {
  const dispatch = useCalculatorDispatch();
  const state: CalculatorState = useCalculatorState();

  return useCallback(
    (descriptor: KeyDescriptor) => {
      const binding = resolveKeyBinding(descriptor, state);
      dispatch(binding.action);

      if (state.isSecondMode && consumesSecondMode(descriptor)) {
        dispatch({ type: 'toggleSecondMode' });
      }
    },
    [dispatch, state],
  );
}
