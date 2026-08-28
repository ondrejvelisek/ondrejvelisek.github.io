import { KEY_VARIANT_SCHEMA } from '../../constants/class-names.constants';
import { createVariantResolver } from '../../factories/createVariantResolver';
import type { KeyVariantSelection } from '../../types/ui.types';
import type { PressableProps } from '../primitives/Pressable';
import { Pressable } from '../primitives/Pressable';

const resolveKeyClassName = createVariantResolver(KEY_VARIANT_SCHEMA);

export interface BaseButtonProps extends PressableProps {
  readonly tone?: KeyVariantSelection['tone'];
  readonly size?: KeyVariantSelection['size'];
  readonly emphasis?: KeyVariantSelection['emphasis'];
}

export function BaseButton({ tone, size, emphasis, className, ...rest }: BaseButtonProps) {
  return <Pressable className={resolveKeyClassName({ tone, size, emphasis }, className)} {...rest} />;
}

export default BaseButton;
