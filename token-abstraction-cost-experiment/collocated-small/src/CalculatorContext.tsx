import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

export type AngleMode = 'deg' | 'rad';

export interface PendingOperation {
  symbol: string;
  apply: (left: number, right: number) => number;
}

export interface HistoryEntry {
  id: number;
  expression: string;
  result: string;
}

/** How the result line should be rendered. */
export interface DisplaySettings {
  /** Significant digits kept when rounding a computed result. */
  precision: number;
  /** Thousands separators on the result line. */
  grouping: boolean;
  /** Keep the expression line visible after a result settles. */
  keepExpression: boolean;
}

export interface CalculatorState {
  display: string;
  accumulator: number | null;
  pendingOp: PendingOperation | null;
  expression: string;
  typing: boolean;
  error: boolean;
  angleMode: AngleMode;
  secondMode: boolean;
  memory: number;
  history: HistoryEntry[];
  nextHistoryId: number;
  settings: DisplaySettings;
}

const MAX_ENTRY_LENGTH = 16;
const MAX_HISTORY_ENTRIES = 20;
const SIGNIFICANT_DIGITS = 12;

const initialState: CalculatorState = {
  display: '0',
  accumulator: null,
  pendingOp: null,
  expression: '',
  typing: false,
  error: false,
  angleMode: 'deg',
  secondMode: false,
  memory: 0,
  history: [],
  nextHistoryId: 1,
  settings: { precision: 12, grouping: true, keepExpression: true },
};

export function roundFloat(value: number): number {
  if (!Number.isFinite(value)) return value;
  return Number(value.toPrecision(SIGNIFICANT_DIGITS));
}

function toEntry(value: number): string {
  return String(roundFloat(value));
}

export function formatNumber(raw: string, grouping = true): string {
  const value = Number(raw);
  if (!Number.isFinite(value)) return 'Error';

  const magnitude = Math.abs(value);
  if (magnitude !== 0 && (magnitude >= 1e12 || magnitude < 1e-9)) {
    return value.toExponential(9).replace(/e([+-])(\d)$/, 'e$10$2');
  }

  // Preserve a trailing "." or "0" the user is still typing.
  const [integerPart = '0', fractionPart] = raw.split('.');
  const grouped = grouping
    ? Number(integerPart).toLocaleString('en-US', { maximumFractionDigits: 0 })
    : integerPart;
  if (fractionPart === undefined) return raw.endsWith('.') ? `${grouped}.` : grouped;
  return `${grouped}.${fractionPart}`;
}

function settle(
  state: CalculatorState,
  value: number,
  patch: Partial<CalculatorState> = {},
): CalculatorState {
  if (!Number.isFinite(value)) {
    return { ...state, ...patch, display: '0', error: true, typing: false };
  }
  return { ...state, ...patch, display: toEntry(value), typing: false, error: false };
}

function record(
  state: CalculatorState,
  expression: string,
  result: number,
): Pick<CalculatorState, 'history' | 'nextHistoryId'> {
  const entry: HistoryEntry = {
    id: state.nextHistoryId,
    expression,
    result: Number.isFinite(result) ? formatNumber(toEntry(result)) : 'Error',
  };
  return {
    history: [entry, ...state.history].slice(0, MAX_HISTORY_ENTRIES),
    nextHistoryId: state.nextHistoryId + 1,
  };
}

function recoverFromError(state: CalculatorState): CalculatorState {
  if (!state.error) return state;
  return {
    ...state,
    display: '0',
    accumulator: null,
    pendingOp: null,
    expression: '',
    typing: false,
    error: false,
    secondMode: false,
  };
}

export interface Calculator {
  state: CalculatorState;
  update: (patch: Partial<CalculatorState>) => void;
  typeDigit: (digit: string) => void;
  typeDecimal: () => void;
  pushOperator: (symbol: string, apply: (left: number, right: number) => number) => void;
  applyFunction: (
    label: string,
    compute: (value: number, angleMode: AngleMode) => number,
  ) => void;
  setValue: (value: number) => void;
  evaluate: () => void;
  /** Change one display setting, leaving the calculation alone. */
  updateSettings: (patch: Partial<DisplaySettings>) => void;
  /** Put a past result back on the result line. */
  recallHistoryEntry: (id: number) => void;
}

const CalculatorContext = createContext<Calculator | null>(null);

export function useCalculator(): Calculator {
  const calculator = useContext(CalculatorContext);
  if (!calculator) throw new Error('useCalculator must be used inside <CalculatorProvider>');
  return calculator;
}

export function CalculatorProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(initialState);

  const update = useCallback((patch: Partial<CalculatorState>) => {
    setState((previous) => ({ ...previous, ...patch }));
  }, []);

  const typeDigit = useCallback((digit: string) => {
    setState((previous) => {
      const base = recoverFromError(previous);
      if (!base.typing) return { ...base, display: digit, typing: true };
      if (base.display.replace(/[-.]/g, '').length >= MAX_ENTRY_LENGTH) return base;
      return { ...base, display: base.display === '0' ? digit : base.display + digit };
    });
  }, []);

  const typeDecimal = useCallback(() => {
    setState((previous) => {
      const base = recoverFromError(previous);
      if (!base.typing) return { ...base, display: '0.', typing: true };
      if (base.display.includes('.')) return base;
      return { ...base, display: `${base.display}.` };
    });
  }, []);

  const pushOperator = useCallback(
    (symbol: string, apply: (left: number, right: number) => number) => {
      setState((previous) => {
        if (previous.error) return previous;
        const pendingOp: PendingOperation = { symbol, apply };

        // Pressing another operator without typing a number just swaps the operator.
        if (!previous.typing && previous.pendingOp !== null && previous.accumulator !== null) {
          return {
            ...previous,
            pendingOp,
            expression: `${formatNumber(toEntry(previous.accumulator))} ${symbol}`,
          };
        }

        const value = Number(previous.display);
        const accumulator =
          previous.pendingOp !== null && previous.accumulator !== null
            ? previous.pendingOp.apply(previous.accumulator, value)
            : value;

        return settle(previous, accumulator, {
          accumulator: Number.isFinite(accumulator) ? accumulator : null,
          pendingOp,
          expression: `${formatNumber(toEntry(accumulator))} ${symbol}`,
        });
      });
    },
    [],
  );

  const applyFunction = useCallback(
    (label: string, compute: (value: number, angleMode: AngleMode) => number) => {
      setState((previous) => {
        if (previous.error) return previous;
        const result = compute(Number(previous.display), previous.angleMode);
        const expression = `${label}(${formatNumber(previous.display)})`;
        return settle(previous, result, {
          expression,
          ...record(previous, expression, result),
        });
      });
    },
    [],
  );

  const setValue = useCallback((value: number) => {
    setState((previous) => settle(previous, value));
  }, []);

  const evaluate = useCallback(() => {
    setState((previous) => {
      if (previous.error || previous.pendingOp === null || previous.accumulator === null) {
        return previous;
      }
      const value = Number(previous.display);
      const result = previous.pendingOp.apply(previous.accumulator, value);
      const expression =
        `${formatNumber(toEntry(previous.accumulator))} ${previous.pendingOp.symbol} ` +
        `${formatNumber(toEntry(value))}`;

      return settle(previous, result, {
        accumulator: null,
        pendingOp: null,
        expression: `${expression} =`,
        ...record(previous, expression, result),
      });
    });
  }, []);

  const updateSettings = useCallback((patch: Partial<DisplaySettings>) => {
    setState((previous) => ({ ...previous, settings: { ...previous.settings, ...patch } }));
  }, []);

  const recallHistoryEntry = useCallback((id: number) => {
    setState((previous) => {
      const entry = previous.history.find((candidate) => candidate.id === id);
      if (!entry) return previous;
      const value = Number(entry.result.replace(/,/g, ''));
      if (!Number.isFinite(value)) return previous;
      return settle(previous, value, { expression: entry.expression });
    });
  }, []);

  const calculator = useMemo(
    () => ({
      state,
      update,
      typeDigit,
      typeDecimal,
      pushOperator,
      applyFunction,
      setValue,
      evaluate,
      updateSettings,
      recallHistoryEntry,
    }),
    [
      state,
      update,
      typeDigit,
      typeDecimal,
      pushOperator,
      applyFunction,
      setValue,
      evaluate,
      updateSettings,
      recallHistoryEntry,
    ],
  );

  return <CalculatorContext.Provider value={calculator}>{children}</CalculatorContext.Provider>;
}
