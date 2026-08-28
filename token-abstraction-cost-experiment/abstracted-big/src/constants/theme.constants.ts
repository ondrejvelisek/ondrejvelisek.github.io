export const THEME_TOKENS = {
  surfaceShell: '--calc-surface-shell',
  surfacePanel: '--calc-surface-panel',
  surfaceDisplay: '--calc-surface-display',
  surfaceRaised: '--calc-surface-raised',
  borderSubtle: '--calc-border-subtle',
  borderStrong: '--calc-border-strong',
  textPrimary: '--calc-text-primary',
  textMuted: '--calc-text-muted',
  textFaint: '--calc-text-faint',
  textAccent: '--calc-text-accent',
  textOperator: '--calc-text-operator',
  textDanger: '--calc-text-danger',
  textInverse: '--calc-text-inverse',
  keyDigitBackground: '--calc-key-digit-bg',
  keyDigitBackgroundHover: '--calc-key-digit-bg-hover',
  keyFunctionBackground: '--calc-key-function-bg',
  keyFunctionBackgroundHover: '--calc-key-function-bg-hover',
  keyOperatorBackground: '--calc-key-operator-bg',
  keyOperatorBackgroundHover: '--calc-key-operator-bg-hover',
  keyAccentBackground: '--calc-key-accent-bg',
  keyAccentBackgroundHover: '--calc-key-accent-bg-hover',
  keyDangerBackground: '--calc-key-danger-bg',
  keyDangerBackgroundHover: '--calc-key-danger-bg-hover',
  keyRadius: '--calc-key-radius',
  panelRadius: '--calc-panel-radius',
  displayRadius: '--calc-display-radius',
  keyGap: '--calc-key-gap',
  focusRing: '--calc-focus-ring',
} as const;

type ThemeTokenKey = keyof typeof THEME_TOKENS;

export function themeVar(token: ThemeTokenKey): string {
  return `var(${THEME_TOKENS[token]})`;
}

export function themeStyle(
  assignments: Partial<Record<string, ThemeTokenKey>>,
): Record<string, string> {
  const style: Record<string, string> = {};
  for (const [property, token] of Object.entries(assignments)) {
    if (token) style[property] = themeVar(token);
  }
  return style;
}
