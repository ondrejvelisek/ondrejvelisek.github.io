import { createContext, useContext, useMemo, useReducer } from 'react';
import type { ReactNode } from 'react';

import { INITIAL_CALCULATOR_STATE } from '../engine/initialState';
import { calculatorReducer } from '../engine/reducer';
import type { CalculatorStoreValue } from '../types/state.types';

const CalculatorStoreContext = createContext<CalculatorStoreValue | null>(null);

CalculatorStoreContext.displayName = 'CalculatorStore';

export interface CalculatorStoreProviderProps {
  readonly children: ReactNode;
}

export function CalculatorStoreProvider({ children }: CalculatorStoreProviderProps) {
  const [state, dispatch] = useReducer(calculatorReducer, INITIAL_CALCULATOR_STATE);

  const value = useMemo<CalculatorStoreValue>(() => ({ state, dispatch }), [state]);

  return (
    <CalculatorStoreContext.Provider value={value}>{children}</CalculatorStoreContext.Provider>
  );
}

export function useCalculatorStore(): CalculatorStoreValue {
  const value = useContext(CalculatorStoreContext);

  if (value === null) {
    throw new Error('useCalculatorStore must be called inside a <CalculatorStoreProvider>.');
  }

  return value;
}
