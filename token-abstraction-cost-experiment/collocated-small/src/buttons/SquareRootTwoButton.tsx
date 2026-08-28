import { Button } from '../Button';
import { useCalculator } from '../CalculatorContext';

export function SquareRootTwoButton() {
  const { setValue } = useCalculator();

  return (
    <Button
      label="√2"
      tooltip="The square root of two"
      ariaLabel="Square root of two"
      className="bg-slate-100 text-cyan-700 hover:bg-slate-200 active:bg-slate-200
        dark:bg-slate-800/70 dark:text-cyan-200 dark:hover:bg-slate-700/80 dark:active:bg-slate-700"
      onPress={() => setValue(Math.SQRT2)}
    />
  );
}
