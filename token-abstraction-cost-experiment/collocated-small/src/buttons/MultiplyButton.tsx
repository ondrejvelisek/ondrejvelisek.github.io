import { Button } from '../Button';
import { useCalculator } from '../CalculatorContext';

export function MultiplyButton() {
  const { pushOperator } = useCalculator();

  return (
    <Button
      label="×"
      tooltip="Multiply this number by the next one"
      keys={['*']}
      hint="*"
      ariaLabel="Multiply"
      className="bg-slate-300 text-amber-700 hover:bg-slate-400 active:bg-slate-400
        dark:bg-slate-600/70 dark:text-amber-200 dark:hover:bg-slate-500/70 dark:active:bg-slate-500"
      onPress={() => pushOperator('×', (left, right) => left * right)}
    />
  );
}
