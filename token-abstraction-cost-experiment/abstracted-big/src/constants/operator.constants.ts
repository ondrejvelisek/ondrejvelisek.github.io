import { createBinaryOperatorDescriptor } from '../factories/createBinaryOperatorDescriptor';
import type { BinaryOperatorRegistry, OperatorSymbolMap } from '../types/operator.types';
import { safeDivide } from '../utils/math/safeDivide';
import { safeModulo } from '../utils/math/safeModulo';

export const BINARY_OPERATOR_REGISTRY: BinaryOperatorRegistry = {
  add: createBinaryOperatorDescriptor({
    id: 'add',
    symbol: '+',
    ariaLabel: 'Add',
    precedence: 1,
    evaluate: (left, right) => left + right,
  }),
  subtract: createBinaryOperatorDescriptor({
    id: 'subtract',
    symbol: '−',
    ariaLabel: 'Subtract',
    precedence: 1,
    evaluate: (left, right) => left - right,
  }),
  multiply: createBinaryOperatorDescriptor({
    id: 'multiply',
    symbol: '×',
    ariaLabel: 'Multiply',
    precedence: 2,
    evaluate: (left, right) => left * right,
  }),
  divide: createBinaryOperatorDescriptor({
    id: 'divide',
    symbol: '÷',
    ariaLabel: 'Divide',
    precedence: 2,
    evaluate: safeDivide,
    guards: [(_left, right) => right !== 0],
  }),
  power: createBinaryOperatorDescriptor({
    id: 'power',
    symbol: '^',
    ariaLabel: 'Raise to the power of',
    precedence: 3,
    associativity: 'right',
    evaluate: (left, right) => left ** right,
  }),
  modulo: createBinaryOperatorDescriptor({
    id: 'modulo',
    symbol: 'mod',
    ariaLabel: 'Modulo',
    precedence: 2,
    evaluate: safeModulo,
    guards: [(_left, right) => right !== 0],
  }),
};

export const OPERATOR_SYMBOLS = Object.fromEntries(
  Object.entries(BINARY_OPERATOR_REGISTRY).map(([id, descriptor]) => [id, descriptor.symbol]),
) as OperatorSymbolMap;
