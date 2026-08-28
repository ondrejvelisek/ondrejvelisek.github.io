import { RADIANS_PER_UNIT } from '../../constants/angle.constants';
import type { AngleMode } from '../../types/angle.types';

/** Convert radians back into `mode`. */
export function fromRadians(value: number, mode: AngleMode): number {
  return value / RADIANS_PER_UNIT[mode];
}
