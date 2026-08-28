import { Button } from '../Button';
import { useCalculator } from '../CalculatorContext';

export function EulerButton() {
  const { setValue } = useCalculator();

  return (
    <Button
      label="e"
      tooltip="The base of the natural logarithm"
      keys={['e']}
      hint="e"
      ariaLabel="Euler's number"
      className="bg-slate-100 text-cyan-700 hover:bg-slate-200 active:bg-slate-200
        dark:bg-slate-800/70 dark:text-cyan-200 dark:hover:bg-slate-700/80 dark:active:bg-slate-700"
      onPress={() => setValue(Math.E)}
    />
  );
}
