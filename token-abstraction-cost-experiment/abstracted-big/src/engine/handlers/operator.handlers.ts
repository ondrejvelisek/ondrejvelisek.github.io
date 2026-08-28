import type { CalculatorHandlerSlice } from '../../types/action.types';
import type { CalculatorState } from '../../types/state.types';
import { formatNumericResult } from '../../utils/format/formatDisplayValue';
import { isFiniteNumber } from '../../utils/guards/isFiniteNumber';
import { operatorSymbol, resolvePending } from '../evaluateBinaryOperation';
import { appendHistoryRecord, currentOperand, settleResult } from '../support/settleResult';

type OperatorActionType = 'applyBinaryOperator' | 'evaluateExpression';

export const operatorHandlers: CalculatorHandlerSlice<CalculatorState, OperatorActionType> = {
  applyBinaryOperator: (state, action) => {
    if (state.hasError) return state;

    // Pressing a second operator without typing a number swaps the operator
    // instead of folding the accumulator into itself.
    if (!state.isEntering && state.pending !== null) {
      return {
        ...state,
        pending: { ...state.pending, operator: action.operator },
        expression: `${formatNumericResult(state.pending.accumulator)} ${operatorSymbol(action.operator)}`,
      };
    }

    const operand = currentOperand(state);
    const accumulator =
      state.pending !== null ? resolvePending(state.pending, operand) : operand;

    return settleResult(state, accumulator, {
      pending: isFiniteNumber(accumulator)
        ? { operator: action.operator, accumulator }
        : null,
      expression: `${formatNumericResult(accumulator)} ${operatorSymbol(action.operator)}`,
    });
  },

  evaluateExpression: (state) => {
    if (state.hasError || state.pending === null) return state;

    const operand = currentOperand(state);
    const result = resolvePending(state.pending, operand);
    const expression =
      `${formatNumericResult(state.pending.accumulator)} ` +
      `${operatorSymbol(state.pending.operator)} ${formatNumericResult(operand)}`;

    return settleResult(state, result, {
      pending: null,
      expression: `${expression} =`,
      ...appendHistoryRecord(state, expression, result),
    });
  },
};
