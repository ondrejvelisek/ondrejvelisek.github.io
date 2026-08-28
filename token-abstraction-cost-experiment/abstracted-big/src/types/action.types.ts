import type { MathConstantId, ScientificFunctionId } from './function.types';
import type { BinaryOperatorId } from './operator.types';
import type { Prettify, ValueOf } from './primitives.types';
import type { DisplaySettings } from './state.types';

export type DigitToken = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

export type MemoryOperationId = 'clear' | 'recall' | 'add' | 'subtract';

export interface CalculatorActionPayloadMap {
  appendDigit: { readonly digit: DigitToken };
  appendDecimalSeparator: {};
  applyBinaryOperator: { readonly operator: BinaryOperatorId };
  applyScientificFunction: { readonly function: ScientificFunctionId };
  insertConstant: { readonly constant: MathConstantId };
  evaluateExpression: {};
  clearEntry: {};
  clearAll: {};
  removeLastCharacter: {};
  toggleAngleMode: {};
  toggleSecondMode: {};
  applyMemoryOperation: { readonly operation: MemoryOperationId };
  clearHistory: {};
  updateSettings: { readonly patch: Partial<DisplaySettings> };
  recallHistoryRecord: { readonly id: number };
}

export type CalculatorActionType = keyof CalculatorActionPayloadMap;

export type CalculatorAction = ValueOf<{
  [K in CalculatorActionType]: Prettify<
    { readonly type: K } & CalculatorActionPayloadMap[K]
  >;
}>;

export type CalculatorActionOfType<TType extends CalculatorActionType> = Extract<
  CalculatorAction,
  { readonly type: TType }
>;

export type CalculatorDispatch = (action: CalculatorAction) => void;

export type CalculatorHandlerMap<TState> = {
  readonly [K in CalculatorActionType]: (
    state: TState,
    action: CalculatorActionOfType<K>,
  ) => TState;
};

export type CalculatorHandlerSlice<TState, TTypes extends CalculatorActionType> = {
  readonly [K in TTypes]: (state: TState, action: CalculatorActionOfType<K>) => TState;
};
