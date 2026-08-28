import type { CalculatorState } from '../../types/state.types';
import type { KeyDescriptor, ResolvedKeyBinding } from '../../types/ui.types';

/**
 * Work out what a key currently shows and does. Kept as its own step so the key
 * component never reads state itself.
 */
export function resolveKeyBinding(
  descriptor: KeyDescriptor,
  state: CalculatorState,
): ResolvedKeyBinding {
  const isPendingOperator =
    descriptor.action.type === 'applyBinaryOperator' &&
    state.pending?.operator === descriptor.action.operator;

  return {
    label: descriptor.label,
    ariaLabel: descriptor.ariaLabel,
    action: descriptor.action,
    emphasis: isPendingOperator ? 'ring' : 'none',
  };
}
