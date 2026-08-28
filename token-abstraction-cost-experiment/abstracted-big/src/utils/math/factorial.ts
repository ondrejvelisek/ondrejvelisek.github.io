import { MAX_FACTORIAL_INPUT } from '../../constants/numeric.constants';

export function isFactorialDefined(value: number): boolean {
  return Number.isInteger(value) && value >= 0 && value <= MAX_FACTORIAL_INPUT;
}

export function factorial(value: number): number {
  if (!isFactorialDefined(value)) return Number.NaN;

  let product = 1;
  for (let multiplier = 2; multiplier <= value; multiplier += 1) {
    product *= multiplier;
  }
  return product;
}
