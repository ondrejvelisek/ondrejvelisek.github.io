import type { CalculatorAction } from '../types/action.types';
import type { KeyDescriptor, KeypadColumnSpan, KeySize, KeyTone } from '../types/ui.types';

export interface KeyDescriptorInput<TAction extends CalculatorAction> {
  readonly id: string;
  readonly label: string;
  readonly action: TAction;
  readonly tone?: KeyTone;
  readonly size?: KeySize;
  readonly ariaLabel?: string;
  readonly keyboardBindings?: readonly string[];
  readonly columnSpan?: KeypadColumnSpan;
}

export function createKeyDescriptor<TAction extends CalculatorAction>(
  input: KeyDescriptorInput<TAction>,
): KeyDescriptor<TAction> {
  return {
    id: input.id,
    label: input.label,
    ariaLabel: input.ariaLabel ?? input.label,
    tone: input.tone ?? 'digit',
    size: input.size ?? 'md',
    action: input.action,
    keyboardBindings: input.keyboardBindings ?? [],
    columnSpan: input.columnSpan ?? 1,
  };
}
