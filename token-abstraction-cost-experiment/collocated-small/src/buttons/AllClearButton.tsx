import { Button } from '../Button';
import { useCalculator } from '../CalculatorContext';

/** Wipes the calculation but keeps memory, history and the angle mode. */
export function AllClearButton() {
  const { update } = useCalculator();

  return (
    <Button
      label="AC"
      tooltip="Clear everything except memory and history"
      keys={['Escape']}
      hint="esc"
      ariaLabel="All clear"
      className="bg-rose-200 text-rose-800 hover:bg-rose-300 active:bg-rose-300
        dark:bg-rose-900/50 dark:text-rose-200 dark:hover:bg-rose-800/60 dark:active:bg-rose-800"
      onPress={() =>
        update({
          display: '0',
          accumulator: null,
          pendingOp: null,
          expression: '',
          typing: false,
          error: false,
          secondMode: false,
        })
      }
    />
  );
}
