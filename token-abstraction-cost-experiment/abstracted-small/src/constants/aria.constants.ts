export const ERROR_DISPLAY_TEXT = 'Error';

export const ARIA_LABELS = {
  application: 'Calculator',
  display: 'Calculator display',
  expression: 'Current expression',
  result: 'Result',
  indicators: 'Calculator mode indicators',
  memorySection: 'Memory',
  numericSection: 'Numbers and basic operators',
  memoryIndicator: 'A value is stored in memory',
} as const;

export const ARIA_LIVE = {
  result: 'polite',
  error: 'assertive',
} as const;
