import { Button } from '../Button';
import { useCalculator } from '../CalculatorContext';

/** 170! is the largest factorial representable as a double. */
const MAX_INPUT = 170;

export function FactorialButton() {
  const { applyFunction } = useCalculator();

  const factorial = (value: number) => {
    if (!Number.isInteger(value) || value < 0 || value > MAX_INPUT) return NaN;
    let result = 1;
    for (let index = 2; index <= value; index += 1) result *= index;
    return result;
  };

  return (
    <Button
      label="n!"
      tooltip="Product of every whole number up to this one"
      keys={['!']}
      hint="!"
      className="bg-slate-100 text-cyan-700 hover:bg-slate-200 active:bg-slate-200
        dark:bg-slate-800/70 dark:text-cyan-200 dark:hover:bg-slate-700/80 dark:active:bg-slate-700"
      onPress={() => applyFunction('fact', factorial)}
    />
  );
}
