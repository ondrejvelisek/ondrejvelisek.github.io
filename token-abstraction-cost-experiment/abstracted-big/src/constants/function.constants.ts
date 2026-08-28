import { createScientificFunctionDescriptor } from '../factories/createScientificFunctionDescriptor';
import type {
  MathConstantId,
  ScientificFunctionId,
  ScientificFunctionRegistry,
} from '../types/function.types';
import { factorial, isFactorialDefined } from '../utils/math/factorial';
import { fromRadians } from '../utils/math/fromRadians';
import { toRadians } from '../utils/math/toRadians';
import { PERCENT_DIVISOR } from './numeric.constants';

const isWithinUnitInterval = (operand: number): boolean => operand >= -1 && operand <= 1;
const isStrictlyPositive = (operand: number): boolean => operand > 0;

export const SCIENTIFIC_FUNCTION_REGISTRY: ScientificFunctionRegistry = {
  sinh: createScientificFunctionDescriptor({
    id: 'sinh',
    family: 'hyperbolic',
    label: 'sinh',
    ariaLabel: 'Hyperbolic sine',
    evaluate: (operand) => Math.sinh(operand),
  }),
  cosh: createScientificFunctionDescriptor({
    id: 'cosh',
    family: 'hyperbolic',
    label: 'cosh',
    ariaLabel: 'Hyperbolic cosine',
    evaluate: (operand) => Math.cosh(operand),
  }),
  tanh: createScientificFunctionDescriptor({
    id: 'tanh',
    family: 'hyperbolic',
    label: 'tanh',
    ariaLabel: 'Hyperbolic tangent',
    evaluate: (operand) => Math.tanh(operand),
  }),
  asinh: createScientificFunctionDescriptor({
    id: 'asinh',
    family: 'inverse-hyperbolic',
    label: 'sinh⁻¹',
    ariaLabel: 'Inverse hyperbolic sine',
    evaluate: (operand) => Math.asinh(operand),
  }),
  acosh: createScientificFunctionDescriptor({
    id: 'acosh',
    family: 'inverse-hyperbolic',
    label: 'cosh⁻¹',
    ariaLabel: 'Inverse hyperbolic cosine',
    isInDomain: (operand) => operand >= 1,
    evaluate: (operand) => Math.acosh(operand),
  }),
  atanh: createScientificFunctionDescriptor({
    id: 'atanh',
    family: 'inverse-hyperbolic',
    label: 'tanh⁻¹',
    ariaLabel: 'Inverse hyperbolic tangent',
    isInDomain: (operand) => operand > -1 && operand < 1,
    evaluate: (operand) => Math.atanh(operand),
  }),
  log2: createScientificFunctionDescriptor({
    id: 'log2',
    family: 'logarithmic',
    label: 'log₂',
    ariaLabel: 'Binary logarithm',
    isInDomain: isStrictlyPositive,
    evaluate: (operand) => Math.log2(operand),
  }),
  exp2: createScientificFunctionDescriptor({
    id: 'exp2',
    family: 'exponential',
    label: '2ˣ',
    ariaLabel: 'Two to the power of x',
    evaluate: (operand) => 2 ** operand,
  }),
  floor: createScientificFunctionDescriptor({
    id: 'floor',
    family: 'algebraic',
    label: '⌊x⌋',
    ariaLabel: 'Floor',
    evaluate: (operand) => Math.floor(operand),
  }),
  ceil: createScientificFunctionDescriptor({
    id: 'ceil',
    family: 'algebraic',
    label: '⌈x⌉',
    ariaLabel: 'Ceiling',
    evaluate: (operand) => Math.ceil(operand),
  }),
  round: createScientificFunctionDescriptor({
    id: 'round',
    family: 'algebraic',
    label: 'rnd',
    ariaLabel: 'Round to nearest integer',
    evaluate: (operand) => Math.round(operand),
  }),
  sign: createScientificFunctionDescriptor({
    id: 'sign',
    family: 'algebraic',
    label: 'sgn',
    ariaLabel: 'Sign',
    evaluate: (operand) => Math.sign(operand),
  }),
  sin: createScientificFunctionDescriptor({
    id: 'sin',
    family: 'trigonometric',
    label: 'sin',
    ariaLabel: 'Sine',
    evaluate: (operand, context) => Math.sin(toRadians(operand, context.angleMode)),
  }),
  cos: createScientificFunctionDescriptor({
    id: 'cos',
    family: 'trigonometric',
    label: 'cos',
    ariaLabel: 'Cosine',
    evaluate: (operand, context) => Math.cos(toRadians(operand, context.angleMode)),
  }),
  tan: createScientificFunctionDescriptor({
    id: 'tan',
    family: 'trigonometric',
    label: 'tan',
    ariaLabel: 'Tangent',
    evaluate: (operand, context) => Math.tan(toRadians(operand, context.angleMode)),
  }),
  asin: createScientificFunctionDescriptor({
    id: 'asin',
    family: 'inverse-trigonometric',
    label: 'sin⁻¹',
    ariaLabel: 'Inverse sine',
    isInDomain: isWithinUnitInterval,
    evaluate: (operand, context) => fromRadians(Math.asin(operand), context.angleMode),
  }),
  acos: createScientificFunctionDescriptor({
    id: 'acos',
    family: 'inverse-trigonometric',
    label: 'cos⁻¹',
    ariaLabel: 'Inverse cosine',
    isInDomain: isWithinUnitInterval,
    evaluate: (operand, context) => fromRadians(Math.acos(operand), context.angleMode),
  }),
  atan: createScientificFunctionDescriptor({
    id: 'atan',
    family: 'inverse-trigonometric',
    label: 'tan⁻¹',
    ariaLabel: 'Inverse tangent',
    evaluate: (operand, context) => fromRadians(Math.atan(operand), context.angleMode),
  }),
  ln: createScientificFunctionDescriptor({
    id: 'ln',
    family: 'logarithmic',
    label: 'ln',
    ariaLabel: 'Natural logarithm',
    isInDomain: isStrictlyPositive,
    evaluate: (operand) => Math.log(operand),
  }),
  log10: createScientificFunctionDescriptor({
    id: 'log10',
    family: 'logarithmic',
    label: 'log',
    ariaLabel: 'Base ten logarithm',
    isInDomain: isStrictlyPositive,
    evaluate: (operand) => Math.log10(operand),
  }),
  exp: createScientificFunctionDescriptor({
    id: 'exp',
    family: 'exponential',
    label: 'eˣ',
    ariaLabel: 'e raised to the power of',
    notation: (operand) => `e^(${operand})`,
    evaluate: (operand) => Math.exp(operand),
  }),
  pow10: createScientificFunctionDescriptor({
    id: 'pow10',
    family: 'exponential',
    label: '10ˣ',
    ariaLabel: 'Ten raised to the power of',
    notation: (operand) => `10^(${operand})`,
    evaluate: (operand) => 10 ** operand,
  }),
  sqrt: createScientificFunctionDescriptor({
    id: 'sqrt',
    family: 'root',
    label: '√',
    ariaLabel: 'Square root',
    notation: (operand) => `√(${operand})`,
    isInDomain: (operand) => operand >= 0,
    evaluate: (operand) => Math.sqrt(operand),
  }),
  cbrt: createScientificFunctionDescriptor({
    id: 'cbrt',
    family: 'root',
    label: '∛',
    ariaLabel: 'Cube root',
    notation: (operand) => `∛(${operand})`,
    evaluate: (operand) => Math.cbrt(operand),
  }),
  square: createScientificFunctionDescriptor({
    id: 'square',
    family: 'algebraic',
    label: 'x²',
    ariaLabel: 'Square',
    notation: (operand) => `(${operand})²`,
    evaluate: (operand) => operand * operand,
  }),
  reciprocal: createScientificFunctionDescriptor({
    id: 'reciprocal',
    family: 'algebraic',
    label: '1/x',
    ariaLabel: 'Reciprocal',
    notation: (operand) => `1/(${operand})`,
    isInDomain: (operand) => operand !== 0,
    evaluate: (operand) => 1 / operand,
  }),
  factorial: createScientificFunctionDescriptor({
    id: 'factorial',
    family: 'algebraic',
    label: 'n!',
    ariaLabel: 'Factorial',
    notation: (operand) => `(${operand})!`,
    isInDomain: isFactorialDefined,
    evaluate: (operand) => factorial(operand),
  }),
  absolute: createScientificFunctionDescriptor({
    id: 'absolute',
    family: 'algebraic',
    label: '|x|',
    ariaLabel: 'Absolute value',
    notation: (operand) => `|${operand}|`,
    evaluate: (operand) => Math.abs(operand),
  }),
  negate: createScientificFunctionDescriptor({
    id: 'negate',
    family: 'entry-transform',
    label: '±',
    ariaLabel: 'Toggle sign',
    notation: (operand) => `-(${operand})`,
    recordsHistory: false,
    evaluate: (operand) => -operand,
  }),
  percent: createScientificFunctionDescriptor({
    id: 'percent',
    family: 'entry-transform',
    label: '%',
    ariaLabel: 'Percent',
    notation: (operand) => `${operand}%`,
    recordsHistory: false,
    evaluate: (operand) => operand / PERCENT_DIVISOR,
  }),
};

export const ANGLE_SENSITIVE_FUNCTION_IDS: readonly ScientificFunctionId[] = Object.values(
  SCIENTIFIC_FUNCTION_REGISTRY,
)
  .filter(
    (descriptor) =>
      descriptor.family === 'trigonometric' || descriptor.family === 'inverse-trigonometric',
  )
  .map((descriptor) => descriptor.id);

export const MATH_CONSTANT_REGISTRY: Record<
  MathConstantId,
  { readonly label: string; readonly ariaLabel: string; readonly value: number }
> = {
  pi: { label: 'π', ariaLabel: 'Pi', value: Math.PI },
  euler: { label: 'e', ariaLabel: "Euler's number", value: Math.E },
  phi: { label: 'φ', ariaLabel: 'Golden ratio', value: (1 + Math.sqrt(5)) / 2 },
  root2: { label: '√2', ariaLabel: 'Square root of two', value: Math.SQRT2 },
};
