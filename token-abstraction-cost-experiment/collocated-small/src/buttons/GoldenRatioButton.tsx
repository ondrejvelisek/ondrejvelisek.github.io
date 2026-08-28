import { Button } from '../Button';
import { useCalculator } from '../CalculatorContext';

const PHI = (1 + Math.sqrt(5)) / 2;

export function GoldenRatioButton() {
  const { setValue } = useCalculator();

  return (
    <Button
      label="φ"
      tooltip="The golden ratio, one plus root five over two"
      ariaLabel="Golden ratio"
      className="bg-slate-100 text-cyan-700 hover:bg-slate-200 active:bg-slate-200
        dark:bg-slate-800/70 dark:text-cyan-200 dark:hover:bg-slate-700/80 dark:active:bg-slate-700"
      onPress={() => setValue(PHI)}
    />
  );
}
