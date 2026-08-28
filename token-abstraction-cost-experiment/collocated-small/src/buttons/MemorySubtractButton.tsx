import { Button } from '../Button';
import { roundFloat, useCalculator } from '../CalculatorContext';

export function MemorySubtractButton() {
  const { state, update } = useCalculator();

  return (
    <Button
      label="M−"
      tooltip="Subtract the displayed value from memory"
      ariaLabel="Memory subtract"
      className="bg-slate-100 text-cyan-700 hover:bg-slate-200 active:bg-slate-200
        dark:bg-slate-800/70 dark:text-cyan-200 dark:hover:bg-slate-700/80 dark:active:bg-slate-700"
      onPress={() =>
        update({ memory: roundFloat(state.memory - Number(state.display)), typing: false })
      }
    />
  );
}
