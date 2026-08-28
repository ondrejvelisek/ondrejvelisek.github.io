import { Button } from '../Button';
import { useCalculator } from '../CalculatorContext';

export function SubtractButton() {
  const { pushOperator } = useCalculator();

  return (
    <Button
      label="−"
      tooltip="Subtract the next number from this one"
      keys={['-']}
      hint="-"
      ariaLabel="Subtract"
      className="bg-slate-300 text-amber-700 hover:bg-slate-400 active:bg-slate-400
        dark:bg-slate-600/70 dark:text-amber-200 dark:hover:bg-slate-500/70 dark:active:bg-slate-500"
      onPress={() => pushOperator('−', (left, right) => left - right)}
    />
  );
}
