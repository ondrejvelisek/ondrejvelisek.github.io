import type { ANGLE_MODES } from '../constants/angle.constants';

export type AngleMode = (typeof ANGLE_MODES)[number];

export type AngleModeMap<TValue> = Record<AngleMode, TValue>;

export interface AngleConverter {
  readonly toRadians: (value: number, mode: AngleMode) => number;
  readonly fromRadians: (value: number, mode: AngleMode) => number;
}
