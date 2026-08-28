import type { CalculatorAction, CalculatorDispatch } from './action.types';
import type { AngleMode } from './angle.types';
import type { BinaryOperatorId } from './operator.types';
import type { DeepReadonly, NumericString, Prettify } from './primitives.types';

export interface HistoryRecord {
  readonly id: number;
  readonly expression: string;
  readonly result: string;
}

export interface PendingOperation {
  readonly operator: BinaryOperatorId;
  readonly accumulator: number;
}

/** How the result line should be rendered. */
export interface DisplaySettingsShape {
  readonly precision: number;
  readonly grouping: boolean;
  readonly keepExpression: boolean;
}

export type DisplaySettings = Prettify<DisplaySettingsShape>;

export interface CalculatorStateShape {
  readonly entry: NumericString;
  readonly pending: PendingOperation | null;
  readonly expression: string;
  readonly isEntering: boolean;
  readonly hasError: boolean;
  readonly angleMode: AngleMode;
  readonly isSecondMode: boolean;
  readonly memory: number;
  readonly history: readonly HistoryRecord[];
  readonly nextHistoryId: number;
  readonly settings: DisplaySettings;
}

export type CalculatorState = Prettify<CalculatorStateShape>;

export type CalculatorSnapshot = DeepReadonly<CalculatorState>;

export type CalculatorSelector<TResult> = (state: CalculatorState) => TResult;

export interface CalculatorStoreValue {
  readonly state: CalculatorState;
  readonly dispatch: CalculatorDispatch;
}

export type CalculatorReducer = (state: CalculatorState, action: CalculatorAction) => CalculatorState;

export type DisplayViewModel = Prettify<
  Pick<CalculatorState, 'expression' | 'hasError' | 'angleMode' | 'isSecondMode' | 'settings'> & {
    readonly formattedEntry: string;
    readonly hasMemory: boolean;
  }
>;
