import { BINARY_OPERATOR_REGISTRY } from '../constants/operator.constants';
import type { BinaryOperatorId } from '../types/operator.types';
import type { PendingOperation } from '../types/state.types';

export function evaluateBinaryOperation(
  operator: BinaryOperatorId,
  left: number,
  right: number,
): number {
  const descriptor = BINARY_OPERATOR_REGISTRY[operator];
  const isPermitted = descriptor.guards.every((guard) => guard(left, right));
  if (!isPermitted) return Number.NaN;
  return descriptor.evaluate(left, right);
}

export function resolvePending(pending: PendingOperation, operand: number): number {
  return evaluateBinaryOperation(pending.operator, pending.accumulator, operand);
}

export function operatorSymbol(operator: BinaryOperatorId): string {
  return BINARY_OPERATOR_REGISTRY[operator].symbol;
}
