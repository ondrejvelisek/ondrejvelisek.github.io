import { Button } from '../Button';
import { useCalculator } from '../CalculatorContext';

export function EqualsButton() {
  const { evaluate } = useCalculator();

  return (
    <Button
      label="="
      tooltip="Finish the calculation and show the result"
      keys={['Enter', '=']}
      hint="⏎"
      ariaLabel="Equals"
      className="bg-cyan-600 font-semibold text-white hover:bg-cyan-500 active:bg-cyan-400
        dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400 dark:active:bg-cyan-300"
      onPress={evaluate}
    />
  );
}
