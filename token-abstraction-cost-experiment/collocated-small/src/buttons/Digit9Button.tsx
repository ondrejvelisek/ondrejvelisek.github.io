import { Button } from '../Button';
import { useCalculator } from '../CalculatorContext';

export function Digit9Button() {
  const { typeDigit } = useCalculator();

  return (
    <Button
      label="9"
      tooltip="Enter the digit nine"
      keys={['9']}
      hint="9"
      className="bg-slate-200 text-slate-900 hover:bg-slate-300 active:bg-slate-300
        dark:bg-slate-700/60 dark:text-slate-50 dark:hover:bg-slate-600/70 dark:active:bg-slate-600"
      onPress={() => typeDigit('9')}
    />
  );
}
