import { MATH_CONSTANT_REGISTRY } from '../../constants/function.constants';
import { NEGATIVE_SIGN } from '../../constants/numeric.constants';
import type { CalculatorHandlerSlice } from '../../types/action.types';
import { toNumericString } from '../../types/primitives.types';
import type { CalculatorState } from '../../types/state.types';
import { formatDisplayValue } from '../../utils/format/formatDisplayValue';
import {
  evaluateScientificFunction,
  recordsHistory,
  scientificFunctionNotation,
} from '../evaluateScientificFunction';
import { appendHistoryRecord, currentOperand, settleResult } from '../support/settleResult';

type ScientificActionType = 'applyScientificFunction' | 'insertConstant';

export const scientificHandlers: CalculatorHandlerSlice<CalculatorState, ScientificActionType> = {
  applyScientificFunction: (state, action) => {
    if (state.hasError) return state;

    const functionId = action.function;

    // While typing, the sign toggle edits the buffer rather than computing, so
    // "-0." stays editable instead of collapsing to 0.
    if (functionId === 'negate' && state.isEntering) {
      const toggled = state.entry.startsWith(NEGATIVE_SIGN)
        ? state.entry.slice(1)
        : `${NEGATIVE_SIGN}${state.entry}`;
      return { ...state, entry: toNumericString(toggled) };
    }

    const operand = currentOperand(state);
    const result = evaluateScientificFunction(functionId, operand, {
      angleMode: state.angleMode,
    });
    const notation = scientificFunctionNotation(functionId, formatDisplayValue(state.entry));

    if (!recordsHistory(functionId)) {
      return settleResult(state, result, { expression: notation });
    }

    return settleResult(state, result, {
      expression: notation,
      ...appendHistoryRecord(state, notation, result),
    });
  },

  insertConstant: (state, action) => {
    const descriptor = MATH_CONSTANT_REGISTRY[action.constant];
    return settleResult(state, descriptor.value, { expression: descriptor.label });
  },
};
