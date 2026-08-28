import type {
  ScientificFunctionDescriptor,
  ScientificFunctionEvaluator,
  ScientificFunctionFamily,
  ScientificFunctionId,
} from '../types/function.types';

export interface ScientificFunctionDescriptorInput<TId extends ScientificFunctionId> {
  readonly id: TId;
  readonly family: ScientificFunctionFamily;
  readonly label: string;
  readonly evaluate: ScientificFunctionEvaluator;
  readonly ariaLabel?: string;
  readonly notation?: (operand: string) => string;
  readonly isInDomain?: (operand: number) => boolean;
  readonly recordsHistory?: boolean;
}

const ACCEPTS_EVERY_OPERAND = (): boolean => true;

export function createScientificFunctionDescriptor<TId extends ScientificFunctionId>(
  input: ScientificFunctionDescriptorInput<TId>,
): ScientificFunctionDescriptor<TId> {
  const label = input.label;

  return {
    id: input.id,
    family: input.family,
    label,
    ariaLabel: input.ariaLabel ?? label,
    notation: input.notation ?? ((operand) => `${label}(${operand})`),
    evaluate: input.evaluate,
    isInDomain: input.isInDomain ?? ACCEPTS_EVERY_OPERAND,
    recordsHistory: input.recordsHistory ?? true,
  };
}
