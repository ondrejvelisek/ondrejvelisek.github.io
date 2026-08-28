import { Button } from '../Button';
import { useCalculator } from '../CalculatorContext';

export function BackspaceButton() {
  const { state, update } = useCalculator();

  const press = () => {
    if (state.error) {
      update({ display: '0', typing: false, error: false });
      return;
    }
    const trimmed = state.display.slice(0, -1);
    const next = trimmed === '' || trimmed === '-' ? '0' : trimmed;
    update({ display: next, typing: next !== '0' });
  };

  return (
    <Button
      label="⌫"
      tooltip="Delete the last digit typed"
      keys={['Backspace']}
      hint="⌫"
      ariaLabel="Backspace"
      className="bg-rose-200 text-rose-800 hover:bg-rose-300 active:bg-rose-300
        dark:bg-rose-900/50 dark:text-rose-200 dark:hover:bg-rose-800/60 dark:active:bg-rose-800"
      onPress={press}
    />
  );
}
