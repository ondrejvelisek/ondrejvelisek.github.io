import type { NonEmptyArray, Prettify } from './primitives.types';

export type BinaryOperatorId = 'add' | 'subtract' | 'multiply' | 'divide';

export type OperatorArity = 1 | 2;

export type OperatorPrecedence = 1 | 2 | 3;

export type OperatorAssociativity = 'left' | 'right';

export type OperatorEvaluator<TArity extends OperatorArity> = TArity extends 2
  ? (left: number, right: number) => number
  : (operand: number) => number;

export interface OperatorDescriptorShape<TArity extends OperatorArity> {
  readonly id: BinaryOperatorId;
  readonly arity: TArity;
  readonly symbol: string;
  readonly ariaLabel: string;
  /** Unused today; reserved for a future full-expression mode. */
  readonly precedence: OperatorPrecedence;
  readonly associativity: OperatorAssociativity;
  readonly evaluate: OperatorEvaluator<TArity>;
  readonly guards: NonEmptyArray<(left: number, right: number) => boolean>;
}

export type BinaryOperatorDescriptor = Prettify<OperatorDescriptorShape<2>>;

export type BinaryOperatorRegistry = {
  readonly [K in BinaryOperatorId]: BinaryOperatorDescriptor;
};

export type OperatorSymbolMap = {
  readonly [K in BinaryOperatorId]: BinaryOperatorRegistry[K]['symbol'];
};
