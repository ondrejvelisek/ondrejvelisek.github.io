import { Button } from '../Button';
import { useCalculator } from '../CalculatorContext';

export function Digit4Button() {
  const { typeDigit } = useCalculator();

  return (
    <Button
      label="4"
      tooltip="Enter the digit four"
      keys={['4']}
      hint="4"
      className="bg-slate-200 text-slate-900 hover:bg-slate-300 active:bg-slate-300
        dark:bg-slate-700/60 dark:text-slate-50 dark:hover:bg-slate-600/70 dark:active:bg-slate-600"
      onPress={() => typeDigit('4')}
    />
  );
}
