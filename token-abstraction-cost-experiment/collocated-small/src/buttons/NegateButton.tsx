import { Button } from '../Button';
import { useCalculator } from '../CalculatorContext';

export function NegateButton() {
  const { state, update, setValue } = useCalculator();

  const press = () => {
    // Mid-entry this is an edit of the digits, not a calculation.
    if (state.typing) {
      update({
        display: state.display.startsWith('-') ? state.display.slice(1) : `-${state.display}`,
      });
      return;
    }
    setValue(-Number(state.display));
  };

  return (
    <Button
      label="±"
      tooltip="Flip the sign of the current entry"
      keys={['_']}
      hint="_"
      ariaLabel="Toggle sign"
      className="bg-slate-200 text-slate-900 hover:bg-slate-300 active:bg-slate-300
        dark:bg-slate-700/60 dark:text-slate-50 dark:hover:bg-slate-600/70 dark:active:bg-slate-600"
      onPress={press}
    />
  );
}
