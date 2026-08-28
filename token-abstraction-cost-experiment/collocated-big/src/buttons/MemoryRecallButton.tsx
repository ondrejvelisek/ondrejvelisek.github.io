import { Button } from '../Button';
import { useCalculator } from '../CalculatorContext';

export function MemoryRecallButton() {
  const { state, setValue } = useCalculator();

  return (
    <Button
      label="MR"
      tooltip="Put the value held in memory back on the display"
      ariaLabel="Memory recall"
      className="bg-slate-100 text-cyan-700 hover:bg-slate-200 active:bg-slate-200
        dark:bg-slate-800/70 dark:text-cyan-200 dark:hover:bg-slate-700/80 dark:active:bg-slate-700"
      onPress={() => setValue(state.memory)}
    />
  );
}
