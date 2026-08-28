import { Button } from '../Button';
import { useCalculator } from '../CalculatorContext';

export function SquareButton() {
  const { applyFunction } = useCalculator();

  return (
    <Button
      label="x²"
      tooltip="Multiply the number by itself"
      keys={['q']}
      hint="q"
      ariaLabel="Square"
      className="bg-slate-100 text-cyan-700 hover:bg-slate-200 active:bg-slate-200
        dark:bg-slate-800/70 dark:text-cyan-200 dark:hover:bg-slate-700/80 dark:active:bg-slate-700"
      onPress={() => applyFunction('sqr', (value) => value * value)}
    />
  );
}
