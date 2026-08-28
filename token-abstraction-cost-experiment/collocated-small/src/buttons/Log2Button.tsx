import { Button } from '../Button';
import { useCalculator } from '../CalculatorContext';

export function Log2Button() {
  const { applyFunction } = useCalculator();

  return (
    <Button
      label="log₂"
      tooltip="Logarithm base two"
      ariaLabel="Binary logarithm"
      className="bg-slate-100 text-cyan-700 hover:bg-slate-200 active:bg-slate-200
        dark:bg-slate-800/70 dark:text-cyan-200 dark:hover:bg-slate-700/80 dark:active:bg-slate-700"
      onPress={() => applyFunction('log2', (value) => value <= 0 ? NaN : Math.log2(value))}
    />
  );
}
