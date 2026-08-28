import { TEXT_VARIANT_SCHEMA } from '../../constants/class-names.constants';
import { createVariantResolver } from '../../factories/createVariantResolver';
import type { TextVariantSelection } from '../../types/ui.types';
import type { BoxProps } from './Box';
import { Box } from './Box';

const resolveTextClassName = createVariantResolver(TEXT_VARIANT_SCHEMA);

export interface TextProps extends Omit<BoxProps, 'as'> {
  readonly as?: BoxProps['as'];
  readonly tone?: TextVariantSelection['tone'];
  readonly scale?: TextVariantSelection['scale'];
  readonly alignment?: TextVariantSelection['alignment'];
}

export function Text({ as = 'span', tone, scale, alignment, className, ...rest }: TextProps) {
  return (
    <Box
      as={as}
      className={resolveTextClassName({ tone, scale, alignment }, className)}
      {...rest}
    />
  );
}

export default Text;
