import type { CalculatorAction, CalculatorDispatch } from './action.types';
import type { BinaryOperatorId } from './operator.types';
import type { DeepReadonly, NumericString, Prettify } from './primitives.types';

export interface PendingOperation {
  readonly operator: BinaryOperatorId;
  readonly accumulator: number;
}

export interface CalculatorStateShape {
  readonly entry: NumericString;
  readonly pending: PendingOperation | null;
  readonly expression: string;
  readonly isEntering: boolean;
  readonly hasError: boolean;
  readonly memory: number;
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
  Pick<CalculatorState, 'expression' | 'hasError'> & {
    readonly formattedEntry: string;
    readonly hasMemory: boolean;
  }
>;
