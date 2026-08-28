import type { AngleMode } from './angle.types';
import type { Prettify } from './primitives.types';

export type TrigonometricFunctionId = 'sin' | 'cos' | 'tan';

export type InverseTrigonometricFunctionId = 'asin' | 'acos' | 'atan';

export type LogarithmicFunctionId = 'ln' | 'log10' | 'log2';

export type ExponentialFunctionId = 'exp' | 'pow10' | 'exp2';

export type RootFunctionId = 'sqrt' | 'cbrt';

export type AlgebraicFunctionId =
  | 'square'
  | 'reciprocal'
  | 'factorial'
  | 'absolute'
  | 'floor'
  | 'ceil'
  | 'round'
  | 'sign';

export type EntryTransformFunctionId = 'negate' | 'percent';

export type HyperbolicFunctionId = 'sinh' | 'cosh' | 'tanh';

export type InverseHyperbolicFunctionId = 'asinh' | 'acosh' | 'atanh';

export type ScientificFunctionId =
  | TrigonometricFunctionId
  | HyperbolicFunctionId
  | InverseHyperbolicFunctionId
  | InverseTrigonometricFunctionId
  | LogarithmicFunctionId
  | ExponentialFunctionId
  | RootFunctionId
  | AlgebraicFunctionId
  | EntryTransformFunctionId;

export type ScientificFunctionFamily =
  | 'trigonometric'
  | 'inverse-trigonometric'
  | 'logarithmic'
  | 'exponential'
  | 'root'
  | 'algebraic'
  | 'entry-transform'
  | 'hyperbolic'
  | 'inverse-hyperbolic';

export interface ScientificFunctionContext {
  readonly angleMode: AngleMode;
}

export type ScientificFunctionEvaluator = (
  operand: number,
  context: ScientificFunctionContext,
) => number;

export interface ScientificFunctionDescriptorShape<TId extends ScientificFunctionId> {
  readonly id: TId;
  readonly family: ScientificFunctionFamily;
  readonly label: string;
  readonly ariaLabel: string;
  readonly notation: (operand: string) => string;
  readonly evaluate: ScientificFunctionEvaluator;
  readonly isInDomain: (operand: number) => boolean;
  readonly recordsHistory: boolean;
}

export type ScientificFunctionDescriptor<TId extends ScientificFunctionId = ScientificFunctionId> =
  Prettify<ScientificFunctionDescriptorShape<TId>>;

export type ScientificFunctionRegistry = {
  readonly [K in ScientificFunctionId]: ScientificFunctionDescriptor<K>;
};

export type FunctionIdsOfFamily<TFamily extends ScientificFunctionFamily> = {
  [K in ScientificFunctionId]: ScientificFunctionRegistry[K]['family'] extends TFamily ? K : never;
}[ScientificFunctionId];

export type MathConstantId = 'pi' | 'euler' | 'phi' | 'root2';
