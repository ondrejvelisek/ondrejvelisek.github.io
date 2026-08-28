/**
 * Class strings must stay literal — Tailwind's scanner only sees what is present
 * in source, so these can never be assembled at runtime.
 */
export const KEY_VARIANT_SCHEMA = {
  base:
    'inline-flex select-none items-center justify-center rounded-[var(--calc-key-radius)] ' +
    'tabular-nums transition-colors duration-100 ' +
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--calc-focus-ring)] ' +
    'disabled:cursor-not-allowed disabled:opacity-40',
  variants: {
    tone: {
      digit:
        'bg-[var(--calc-key-digit-bg)] text-[var(--calc-text-primary)] ' +
        'hover:bg-[var(--calc-key-digit-bg-hover)]',
      function:
        'bg-[var(--calc-key-function-bg)] text-[var(--calc-text-accent)] ' +
        'hover:bg-[var(--calc-key-function-bg-hover)]',
      operator:
        'bg-[var(--calc-key-operator-bg)] text-[var(--calc-text-operator)] ' +
        'hover:bg-[var(--calc-key-operator-bg-hover)]',
      accent:
        'bg-[var(--calc-key-accent-bg)] font-semibold text-[var(--calc-text-inverse)] ' +
        'hover:bg-[var(--calc-key-accent-bg-hover)]',
      danger:
        'bg-[var(--calc-key-danger-bg)] text-[var(--calc-text-danger)] ' +
        'hover:bg-[var(--calc-key-danger-bg-hover)]',
    },
    size: {
      sm: 'h-9 px-2 text-xs',
      md: 'h-12 px-2 text-sm',
      lg: 'h-14 px-3 text-base',
    },
    emphasis: {
      none: '',
      ring: 'ring-2 ring-[var(--calc-focus-ring)]',
    },
  },
  defaults: {
    tone: 'digit',
    size: 'md',
    emphasis: 'none',
  },
} as const;

export const PANEL_VARIANT_SCHEMA = {
  base: 'ring-1 ring-[var(--calc-border-subtle)]',
  variants: {
    surface: {
      shell: 'bg-[var(--calc-surface-shell)]',
      panel: 'bg-[var(--calc-surface-panel)]',
      display: 'bg-[var(--calc-surface-display)]',
      raised: 'bg-[var(--calc-surface-raised)]',
    },
    radius: {
      panel: 'rounded-[var(--calc-panel-radius)]',
      display: 'rounded-[var(--calc-display-radius)]',
      key: 'rounded-[var(--calc-key-radius)]',
    },
    padding: {
      none: '',
      tight: 'p-3',
      cosy: 'p-4',
      roomy: 'p-5',
    },
  },
  defaults: {
    surface: 'panel',
    radius: 'panel',
    padding: 'cosy',
  },
} as const;

export const TEXT_VARIANT_SCHEMA = {
  base: 'leading-tight',
  variants: {
    tone: {
      primary: 'text-[var(--calc-text-primary)]',
      muted: 'text-[var(--calc-text-muted)]',
      faint: 'text-[var(--calc-text-faint)]',
      accent: 'text-[var(--calc-text-accent)]',
      operator: 'text-[var(--calc-text-operator)]',
      danger: 'text-[var(--calc-text-danger)]',
    },
    scale: {
      indicator: 'text-[11px] font-medium tracking-wide uppercase',
      caption: 'text-xs',
      body: 'text-sm',
      result: 'text-4xl font-light',
    },
    alignment: {
      start: 'text-left',
      end: 'text-right',
    },
  },
  defaults: {
    tone: 'primary',
    scale: 'body',
    alignment: 'start',
  },
} as const;

export const GRID_COLUMN_CLASSES = {
  4: 'grid-cols-4',
  6: 'grid-cols-6',
} as const;

export const GRID_SPAN_CLASSES = {
  1: 'col-span-1',
  2: 'col-span-2',
} as const;

export const LAYOUT_CLASSES = {
  viewport: 'flex min-h-dvh items-center justify-center p-6',
  shell: 'flex w-full max-w-3xl flex-col gap-4 lg:flex-row',
  column: 'flex flex-1 flex-col gap-4',
  aside: 'flex w-full flex-col lg:w-64',
  keyGrid: 'grid gap-[var(--calc-key-gap)]',
} as const;
