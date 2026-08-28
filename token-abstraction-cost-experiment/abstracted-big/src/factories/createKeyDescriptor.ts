import type { CalculatorAction } from '../types/action.types';
import type {
  KeyDescriptor,
  KeypadColumnSpan,
  KeySize,
  KeyTone,
  SecondaryKeyBinding,
} from '../types/ui.types';

export interface KeyDescriptorInput<TAction extends CalculatorAction> {
  readonly id: string;
  readonly label: string;
  readonly action: TAction;
  readonly tone?: KeyTone;
  readonly size?: KeySize;
  readonly ariaLabel?: string;
  readonly description?: string;
  readonly secondary?: SecondaryKeyBinding | null;
  readonly keyboardBindings?: readonly string[];
  readonly columnSpan?: KeypadColumnSpan;
  readonly isToggle?: boolean;
}

export function createKeyDescriptor<TAction extends CalculatorAction>(
  input: KeyDescriptorInput<TAction>,
): KeyDescriptor<TAction> {
  return {
    id: input.id,
    label: input.label,
    ariaLabel: input.ariaLabel ?? input.label,
    description: input.description ?? input.ariaLabel ?? input.label,
    tone: input.tone ?? 'digit',
    size: input.size ?? 'md',
    action: input.action,
    secondary: input.secondary ?? null,
    keyboardBindings: input.keyboardBindings ?? [],
    columnSpan: input.columnSpan ?? 1,
    isToggle: input.isToggle ?? false,
  };
}

export function createSecondaryBinding(
  label: string,
  action: CalculatorAction,
  ariaLabel?: string,
): SecondaryKeyBinding {
  return { label, action, ariaLabel: ariaLabel ?? label };
}
