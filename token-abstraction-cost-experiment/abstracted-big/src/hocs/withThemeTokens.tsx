import type { ComponentType, CSSProperties } from 'react';

import { themeVar } from '../constants/theme.constants';

export interface ThemeTokensInjectedProps {
  readonly themeStyle: CSSProperties;
}

const ROOT_THEME_STYLE: CSSProperties = {
  backgroundColor: themeVar('surfaceShell'),
  color: themeVar('textPrimary'),
};

export function withThemeTokens<TProps extends ThemeTokensInjectedProps>(
  WrappedComponent: ComponentType<TProps>,
  themeStyle: CSSProperties = ROOT_THEME_STYLE,
): ComponentType<Omit<TProps, keyof ThemeTokensInjectedProps>> {
  function WithThemeTokens(props: Omit<TProps, keyof ThemeTokensInjectedProps>) {
    return <WrappedComponent {...(props as TProps)} themeStyle={themeStyle} />;
  }

  WithThemeTokens.displayName = `withThemeTokens(${
    WrappedComponent.displayName ?? WrappedComponent.name ?? 'Component'
  })`;

  return WithThemeTokens;
}
