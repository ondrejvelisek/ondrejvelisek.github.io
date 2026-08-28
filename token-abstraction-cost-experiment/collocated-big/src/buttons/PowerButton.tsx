import { Button } from '../Button';
import { useCalculator } from '../CalculatorContext';

export function PowerButton() {
  const { pushOperator } = useCalculator();

  return (
    <Button
      label="xʸ"
      tooltip="Raise this number to the power of the next one"
      keys={['^']}
      hint="^"
      ariaLabel="Raise to a power"
      className="bg-slate-100 text-cyan-700 hover:bg-slate-200 active:bg-slate-200
        dark:bg-slate-800/70 dark:text-cyan-200 dark:hover:bg-slate-700/80 dark:active:bg-slate-700"
      onPress={() => pushOperator('^', (left, right) => left ** right)}
    />
  );
}
