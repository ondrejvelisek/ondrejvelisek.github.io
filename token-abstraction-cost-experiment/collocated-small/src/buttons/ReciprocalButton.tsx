import { Button } from '../Button';
import { useCalculator } from '../CalculatorContext';

export function ReciprocalButton() {
  const { applyFunction } = useCalculator();

  return (
    <Button
      label="1/x"
      tooltip="One divided by this number"
      keys={['i']}
      hint="i"
      ariaLabel="Reciprocal"
      className="bg-slate-100 text-cyan-700 hover:bg-slate-200 active:bg-slate-200
        dark:bg-slate-800/70 dark:text-cyan-200 dark:hover:bg-slate-700/80 dark:active:bg-slate-700"
      onPress={() => applyFunction('1/x', (value) => (value === 0 ? NaN : 1 / value))}
    />
  );
}
