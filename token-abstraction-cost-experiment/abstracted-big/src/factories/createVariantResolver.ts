import type { VariantConfig, VariantResolver, VariantSchema } from '../types/ui.types';
import { joinClassNames } from '../utils/string/joinClassNames';

export function createVariantResolver<TSchema extends VariantSchema>(
  config: VariantConfig<TSchema>,
): VariantResolver<TSchema> {
  const variantNames = Object.keys(config.variants) as readonly (keyof TSchema)[];

  return (selection, extraClassNames) => {
    const fragments: string[] = [config.base];

    for (const variantName of variantNames) {
      const chosen = selection?.[variantName] ?? config.defaults[variantName];
      const options = config.variants[variantName] as Readonly<Record<string, string>>;
      const fragment = options[chosen as string];
      if (fragment) fragments.push(fragment);
    }

    return joinClassNames(...fragments, extraClassNames);
  };
}
