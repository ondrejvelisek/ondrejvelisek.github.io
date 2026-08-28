import type { ReactNode } from 'react';

import type { Slot, SlotMap, SlotRenderProp } from '../types/ui.types';

export function isSlotRenderProp<TProps>(slot: Slot<TProps>): slot is SlotRenderProp<TProps> {
  return typeof slot === 'function';
}

export function renderSlot<TProps>(
  slot: Slot<TProps> | undefined,
  props: TProps,
  fallback: ReactNode = null,
): ReactNode {
  if (slot === undefined || slot === null) return fallback;
  return isSlotRenderProp(slot) ? slot(props) : slot;
}

export function createSlotRenderer<TSlotName extends string, TProps>(
  slots: SlotMap<TSlotName, TProps> | undefined,
  props: TProps,
): (name: TSlotName, fallback?: ReactNode) => ReactNode {
  return (name, fallback = null) => renderSlot(slots?.[name], props, fallback);
}
