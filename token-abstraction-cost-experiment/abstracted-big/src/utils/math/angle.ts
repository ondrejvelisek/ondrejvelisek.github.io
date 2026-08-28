import type { AngleConverter } from '../../types/angle.types';
import { fromRadians } from './fromRadians';
import { toRadians } from './toRadians';

/** Bundled so descriptors depend on the interface rather than the functions. */
export const angleConverter: AngleConverter = {
  toRadians,
  fromRadians,
};
