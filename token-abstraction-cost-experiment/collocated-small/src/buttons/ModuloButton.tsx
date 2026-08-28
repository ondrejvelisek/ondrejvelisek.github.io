import { Button } from '../Button';
import { useCalculator } from '../CalculatorContext';

export function ModuloButton() {
  const { pushOperator } = useCalculator();

  return (
    <Button
      label="mod"
      tooltip="Remainder after dividing by the next number"
      ariaLabel="Modulo"
      className="bg-slate-100 text-cyan-700 hover:bg-slate-200 active:bg-slate-200
        dark:bg-slate-800/70 dark:text-cyan-200 dark:hover:bg-slate-700/80 dark:active:bg-slate-700"
      onPress={() => pushOperator('mod', (left, right) => (right === 0 ? NaN : left % right))}
    />
  );
}
