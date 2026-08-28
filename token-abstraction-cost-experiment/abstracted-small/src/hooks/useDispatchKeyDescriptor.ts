import { useCallback } from 'react';

import type { CalculatorState } from '../types/state.types';
import type { KeyDescriptor } from '../types/ui.types';
import { resolveKeyBinding } from '../utils/keypad/resolveKeyBinding';
import { useCalculatorDispatch, useCalculatorState } from './useCalculatorSelector';

export type KeyDescriptorDispatcher = (descriptor: KeyDescriptor) => void;

export function useDispatchKeyDescriptor(): KeyDescriptorDispatcher {
  const dispatch = useCalculatorDispatch();
  const state: CalculatorState = useCalculatorState();

  return useCallback(
    (descriptor: KeyDescriptor) => {
      dispatch(resolveKeyBinding(descriptor, state).action);
    },
    [dispatch, state],
  );
}
