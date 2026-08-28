import { useMemo } from 'react';

import { KEYPAD_SECTIONS } from '../constants/keypad.constants';
import type { KeypadSectionDescriptor, KeypadSectionId } from '../types/ui.types';

export function useKeypadSections(
  only?: readonly KeypadSectionId[],
): readonly KeypadSectionDescriptor[] {
  return useMemo(() => {
    if (!only) return KEYPAD_SECTIONS;
    return KEYPAD_SECTIONS.filter((section) => only.includes(section.id));
  }, [only]);
}

export function useKeypadSection(id: KeypadSectionId): KeypadSectionDescriptor | undefined {
  return useMemo(() => KEYPAD_SECTIONS.find((section) => section.id === id), [id]);
}
