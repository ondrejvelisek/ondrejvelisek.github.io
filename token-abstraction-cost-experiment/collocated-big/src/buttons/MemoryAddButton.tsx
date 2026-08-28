import { Button } from '../Button';
import { roundFloat, useCalculator } from '../CalculatorContext';

export function MemoryAddButton() {
  const { state, update } = useCalculator();

  return (
    <Button
      label="M+"
      tooltip="Add the displayed value to memory"
      ariaLabel="Memory add"
      className="bg-slate-100 text-cyan-700 hover:bg-slate-200 active:bg-slate-200
        dark:bg-slate-800/70 dark:text-cyan-200 dark:hover:bg-slate-700/80 dark:active:bg-slate-700"
      onPress={() =>
        update({ memory: roundFloat(state.memory + Number(state.display)), typing: false })
      }
    />
  );
}
