import type { ReactNode } from 'react';

import type {
  KEY_VARIANT_SCHEMA,
  PANEL_VARIANT_SCHEMA,
  TEXT_VARIANT_SCHEMA,
} from '../constants/class-names.constants';
import type { THEME_TOKENS } from '../constants/theme.constants';
import type { CalculatorAction } from './action.types';
import type { NonEmptyArray, Prettify } from './primitives.types';
import type { CalculatorState } from './state.types';

export type ThemeTokenName = keyof typeof THEME_TOKENS;

export type VariantSchema = Readonly<Record<string, Readonly<Record<string, string>>>>;

export interface VariantConfig<TSchema extends VariantSchema> {
  readonly base: string;
  readonly variants: TSchema;
  readonly defaults: { readonly [K in keyof TSchema]: keyof TSchema[K] };
}

export type VariantSelection<TSchema extends VariantSchema> = {
  readonly [K in keyof TSchema]?: keyof TSchema[K];
};

export type VariantResolver<TSchema extends VariantSchema> = (
  selection?: VariantSelection<TSchema>,
  extraClassNames?: string,
) => string;

export type VariantPropsOf<TConfig> =
  TConfig extends VariantConfig<infer TSchema> ? VariantSelection<TSchema> : never;

export type KeyVariantSelection = VariantSelection<typeof KEY_VARIANT_SCHEMA.variants>;
export type PanelVariantSelection = VariantSelection<typeof PANEL_VARIANT_SCHEMA.variants>;
export type TextVariantSelection = VariantSelection<typeof TEXT_VARIANT_SCHEMA.variants>;

export type KeyTone = keyof typeof KEY_VARIANT_SCHEMA.variants.tone;
export type KeySize = keyof typeof KEY_VARIANT_SCHEMA.variants.size;
export type KeyEmphasis = keyof typeof KEY_VARIANT_SCHEMA.variants.emphasis;
export type PanelSurface = keyof typeof PANEL_VARIANT_SCHEMA.variants.surface;
export type TextTone = keyof typeof TEXT_VARIANT_SCHEMA.variants.tone;
export type TextScale = keyof typeof TEXT_VARIANT_SCHEMA.variants.scale;

export type SlotRenderProp<TProps> = (props: TProps) => ReactNode;

export type Slot<TProps> = ReactNode | SlotRenderProp<TProps>;

export type SlotMap<TSlotName extends string, TProps> = {
  readonly [K in TSlotName]?: Slot<TProps>;
};

export type WithSlots<TSlotName extends string, TProps> = {
  readonly slots?: SlotMap<TSlotName, TProps>;
};

export interface CalculatorSlotContext {
  readonly state: CalculatorState;
}

export type CalculatorShellSlotName = 'header' | 'display' | 'keypad' | 'aside' | 'footer';

export type KeypadSectionId = 'memory' | 'numeric';

export type KeypadColumnCount = 4;

export type KeypadColumnSpan = 1 | 2;

export interface KeyDescriptorShape<TAction extends CalculatorAction = CalculatorAction> {
  readonly id: string;
  readonly label: string;
  readonly ariaLabel: string;
  readonly tone: KeyTone;
  readonly size: KeySize;
  readonly action: TAction;
  readonly keyboardBindings: readonly string[];
  readonly columnSpan: KeypadColumnSpan;
}

export type KeyDescriptor<TAction extends CalculatorAction = CalculatorAction> = Prettify<
  KeyDescriptorShape<TAction>
>;

export interface KeypadSectionDescriptor {
  readonly id: KeypadSectionId;
  readonly title: string;
  readonly columns: KeypadColumnCount;
  readonly keys: NonEmptyArray<KeyDescriptor>;
}

export interface ResolvedKeyBinding {
  readonly label: string;
  readonly ariaLabel: string;
  readonly action: CalculatorAction;
  readonly emphasis: KeyEmphasis;
}
