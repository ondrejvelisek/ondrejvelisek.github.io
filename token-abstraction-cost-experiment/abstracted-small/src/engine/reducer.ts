import {
  createReducerFromHandlers,
  mergeHandlerSlices,
} from '../factories/createReducerFromHandlers';
import type { CalculatorAction, CalculatorHandlerMap } from '../types/action.types';
import type { CalculatorReducer, CalculatorState } from '../types/state.types';
import { controlHandlers } from './handlers/control.handlers';
import { entryHandlers } from './handlers/entry.handlers';
import { memoryHandlers } from './handlers/memory.handlers';
import { operatorHandlers } from './handlers/operator.handlers';

export const calculatorHandlers: CalculatorHandlerMap<CalculatorState> = mergeHandlerSlices<
  CalculatorState,
  CalculatorAction
>(entryHandlers, operatorHandlers, memoryHandlers, controlHandlers);

export const calculatorReducer: CalculatorReducer = createReducerFromHandlers<
  CalculatorState,
  CalculatorAction
>(calculatorHandlers);
