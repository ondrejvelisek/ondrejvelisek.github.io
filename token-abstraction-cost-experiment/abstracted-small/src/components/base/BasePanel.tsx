import { PANEL_VARIANT_SCHEMA } from '../../constants/class-names.constants';
import { createVariantResolver } from '../../factories/createVariantResolver';
import type { PanelVariantSelection } from '../../types/ui.types';
import type { BoxProps } from '../primitives/Box';
import { Box } from '../primitives/Box';

const resolvePanelClassName = createVariantResolver(PANEL_VARIANT_SCHEMA);

export interface BasePanelProps extends BoxProps {
  readonly surface?: PanelVariantSelection['surface'];
  readonly radius?: PanelVariantSelection['radius'];
  readonly padding?: PanelVariantSelection['padding'];
}

export function BasePanel({ surface, radius, padding, className, ...rest }: BasePanelProps) {
  return <Box className={resolvePanelClassName({ surface, radius, padding }, className)} {...rest} />;
}

export default BasePanel;
