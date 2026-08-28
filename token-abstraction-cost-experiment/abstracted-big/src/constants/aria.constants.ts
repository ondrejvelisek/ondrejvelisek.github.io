export const ERROR_DISPLAY_TEXT = 'Error';

export const ARIA_LABELS = {
  application: 'Scientific calculator',
  display: 'Calculator display',
  expression: 'Current expression',
  result: 'Result',
  indicators: 'Calculator mode indicators',
  functionsSection: 'Scientific functions',
  numericSection: 'Numbers and basic operators',
  history: 'Calculation history',
  clearHistory: 'Clear calculation history',
  memoryIndicator: 'A value is stored in memory',
  secondModeIndicator: 'Inverse functions active',
} as const;

export const ARIA_LIVE = {
  result: 'polite',
  error: 'assertive',
} as const;

export const HISTORY_EMPTY_TEXT = 'Nothing calculated yet.';

export const HISTORY_TITLE = 'History';

export const HISTORY_CLEAR_LABEL = 'Clear';
