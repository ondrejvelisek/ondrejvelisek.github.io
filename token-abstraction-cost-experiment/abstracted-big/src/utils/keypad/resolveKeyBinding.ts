import { ANGLE_MODE_LABEL } from '../../constants/angle.constants';
import type { CalculatorState } from '../../types/state.types';
import type { KeyDescriptor, ResolvedKeyBinding } from '../../types/ui.types';

const ANGLE_MODE_KEY_ID = 'angle-mode';
const SECOND_MODE_KEY_ID = 'second-mode';

const HINT_LABELS: Readonly<Record<string, string>> = {
  Enter: '\u23ce',
  Escape: 'esc',
  Backspace: '\u232b',
  Delete: 'del',
};

/** The shortcut a user would press, taken from the descriptor's own bindings. */
function hintFor(descriptor: KeyDescriptor): string | null {
  const [first] = descriptor.keyboardBindings;
  if (first === undefined) return null;
  return HINT_LABELS[first] ?? first;
}

export function resolveKeyBinding(
  descriptor: KeyDescriptor,
  state: CalculatorState,
): ResolvedKeyBinding {
  const secondary = state.isSecondMode ? descriptor.secondary : null;
  const source = secondary ?? descriptor;

  const isActiveToggle =
    (descriptor.id === SECOND_MODE_KEY_ID && state.isSecondMode) ||
    (descriptor.id === ANGLE_MODE_KEY_ID && state.angleMode === 'rad');

  return {
    label: descriptor.id === ANGLE_MODE_KEY_ID ? ANGLE_MODE_LABEL[state.angleMode] : source.label,
    ariaLabel: source.ariaLabel,
    description: descriptor.description,
    hint: hintFor(descriptor),
    action: source.action,
    emphasis: isActiveToggle || secondary !== null ? 'ring' : 'none',
  };
}

export function consumesSecondMode(descriptor: KeyDescriptor): boolean {
  return descriptor.id !== SECOND_MODE_KEY_ID && descriptor.secondary !== null;
}
