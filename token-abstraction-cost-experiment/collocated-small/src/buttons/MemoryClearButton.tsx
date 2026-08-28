import { Button } from '../Button';
import { useCalculator } from '../CalculatorContext';

export function MemoryClearButton() {
  const { update } = useCalculator();

  return (
    <Button
      label="MC"
      tooltip="Forget the value held in memory"
      ariaLabel="Memory clear"
      className="bg-slate-100 text-cyan-700 hover:bg-slate-200 active:bg-slate-200
        dark:bg-slate-800/70 dark:text-cyan-200 dark:hover:bg-slate-700/80 dark:active:bg-slate-700"
      onPress={() => update({ memory: 0 })}
    />
  );
}
