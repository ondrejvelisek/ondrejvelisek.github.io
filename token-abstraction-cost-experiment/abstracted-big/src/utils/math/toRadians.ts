import { RADIANS_PER_UNIT } from '../../constants/angle.constants';
import type { AngleMode } from '../../types/angle.types';

/** Convert a value expressed in `mode` into radians. */
export function toRadians(value: number, mode: AngleMode): number {
  return value * RADIANS_PER_UNIT[mode];
}
