import { useCalculatorStore } from '../context/CalculatorStoreContext';
import type { CalculatorDispatch } from '../types/action.types';
import type { CalculatorSelector, CalculatorState } from '../types/state.types';

export function useCalculatorSelector<TResult>(selector: CalculatorSelector<TResult>): TResult {
  const { state } = useCalculatorStore();
  return selector(state);
}

export function useCalculatorState(): CalculatorState {
  return useCalculatorStore().state;
}

export function useCalculatorDispatch(): CalculatorDispatch {
  return useCalculatorStore().dispatch;
}
