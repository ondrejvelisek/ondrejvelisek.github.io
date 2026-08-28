import type {
  BinaryOperatorDescriptor,
  BinaryOperatorId,
  OperatorAssociativity,
  OperatorPrecedence,
} from '../types/operator.types';
import type { NonEmptyArray } from '../types/primitives.types';

export interface BinaryOperatorDescriptorInput {
  readonly id: BinaryOperatorId;
  readonly symbol: string;
  readonly ariaLabel: string;
  readonly precedence: OperatorPrecedence;
  readonly evaluate: (left: number, right: number) => number;
  readonly associativity?: OperatorAssociativity;
  readonly guards?: NonEmptyArray<(left: number, right: number) => boolean>;
}

const ALWAYS_PERMITTED: NonEmptyArray<(left: number, right: number) => boolean> = [() => true];

export function createBinaryOperatorDescriptor(
  input: BinaryOperatorDescriptorInput,
): BinaryOperatorDescriptor {
  return {
    id: input.id,
    arity: 2,
    symbol: input.symbol,
    ariaLabel: input.ariaLabel,
    precedence: input.precedence,
    associativity: input.associativity ?? 'left',
    evaluate: input.evaluate,
    guards: input.guards ?? ALWAYS_PERMITTED,
  };
}
