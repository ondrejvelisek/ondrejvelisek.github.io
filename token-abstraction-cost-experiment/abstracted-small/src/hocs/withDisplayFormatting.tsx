import type { ComponentType } from 'react';

import { useFormattedDisplay } from '../hooks/useFormattedDisplay';
import type { DisplayViewModel } from '../types/state.types';

export interface DisplayFormattingInjectedProps {
  readonly view: DisplayViewModel;
}

export function withDisplayFormatting<TProps extends DisplayFormattingInjectedProps>(
  WrappedComponent: ComponentType<TProps>,
): ComponentType<Omit<TProps, keyof DisplayFormattingInjectedProps>> {
  function WithDisplayFormatting(props: Omit<TProps, keyof DisplayFormattingInjectedProps>) {
    const view = useFormattedDisplay();
    return <WrappedComponent {...(props as TProps)} view={view} />;
  }

  WithDisplayFormatting.displayName = `withDisplayFormatting(${
    WrappedComponent.displayName ?? WrappedComponent.name ?? 'Component'
  })`;

  return WithDisplayFormatting;
}
