import { SCIENTIFIC_FUNCTION_REGISTRY } from '../constants/function.constants';
import type { ScientificFunctionContext, ScientificFunctionId } from '../types/function.types';

export function evaluateScientificFunction(
  functionId: ScientificFunctionId,
  operand: number,
  context: ScientificFunctionContext,
): number {
  const descriptor = SCIENTIFIC_FUNCTION_REGISTRY[functionId];
  if (!descriptor.isInDomain(operand)) return Number.NaN;
  return descriptor.evaluate(operand, context);
}

export function scientificFunctionNotation(
  functionId: ScientificFunctionId,
  formattedOperand: string,
): string {
  return SCIENTIFIC_FUNCTION_REGISTRY[functionId].notation(formattedOperand);
}

export function recordsHistory(functionId: ScientificFunctionId): boolean {
  return SCIENTIFIC_FUNCTION_REGISTRY[functionId].recordsHistory;
}
