import type { CalculatorHandlerSlice } from '../../types/action.types';
import type { CalculatorState } from '../../types/state.types';
import { assertNever } from '../../utils/guards/assertNever';
import { normalizePrecision } from '../../utils/math/precision';
import { currentOperand, settleResult } from '../support/settleResult';

type MemoryActionType = 'applyMemoryOperation';

export const memoryHandlers: CalculatorHandlerSlice<CalculatorState, MemoryActionType> = {
  applyMemoryOperation: (state, action) => {
    const operand = currentOperand(state);

    switch (action.operation) {
      case 'clear':
        return { ...state, memory: 0 };

      case 'recall':
        return settleResult(state, state.memory);

      case 'add':
        return {
          ...state,
          memory: normalizePrecision(state.memory + operand),
          isEntering: false,
        };

      case 'subtract':
        return {
          ...state,
          memory: normalizePrecision(state.memory - operand),
          isEntering: false,
        };

      default:
        return assertNever(action.operation, 'memory operation');
    }
  },
};
