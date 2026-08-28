import { Button } from '../Button';
import { useCalculator } from '../CalculatorContext';

export function ClearEntryButton() {
  const { update } = useCalculator();

  return (
    <Button
      label="C"
      tooltip="Clear the number being typed, keeping the pending operation"
      keys={['Delete']}
      hint="del"
      ariaLabel="Clear entry"
      className="bg-rose-200 text-rose-800 hover:bg-rose-300 active:bg-rose-300
        dark:bg-rose-900/50 dark:text-rose-200 dark:hover:bg-rose-800/60 dark:active:bg-rose-800"
      onPress={() => update({ display: '0', typing: false, error: false })}
    />
  );
}
