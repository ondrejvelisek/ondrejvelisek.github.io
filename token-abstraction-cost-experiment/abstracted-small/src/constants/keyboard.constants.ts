import type { KeyDescriptor } from '../types/ui.types';
import { ALL_KEY_DESCRIPTORS } from './keypad.constants';

export const KEYBOARD_BINDING_MAP: Readonly<Record<string, KeyDescriptor>> = Object.fromEntries(
  ALL_KEY_DESCRIPTORS.flatMap((descriptor) =>
    descriptor.keyboardBindings.map((binding) => [binding, descriptor] as const),
  ),
);

/** Never intercepted, so browser shortcuts keep working. */
export const IGNORED_MODIFIER_KEYS = ['metaKey', 'ctrlKey', 'altKey'] as const;

export type IgnoredModifierKey = (typeof IGNORED_MODIFIER_KEYS)[number];

export function hasIgnoredModifier(event: KeyboardEvent): boolean {
  return IGNORED_MODIFIER_KEYS.some((modifier) => event[modifier]);
}
