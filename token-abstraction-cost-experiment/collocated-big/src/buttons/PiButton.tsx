import { Button } from '../Button';
import { useCalculator } from '../CalculatorContext';

export function PiButton() {
  const { setValue } = useCalculator();

  return (
    <Button
      label="π"
      tooltip="The ratio of a circle to its diameter"
      keys={['p']}
      hint="p"
      ariaLabel="Pi"
      className="bg-slate-100 text-cyan-700 hover:bg-slate-200 active:bg-slate-200
        dark:bg-slate-800/70 dark:text-cyan-200 dark:hover:bg-slate-700/80 dark:active:bg-slate-700"
      onPress={() => setValue(Math.PI)}
    />
  );
}
