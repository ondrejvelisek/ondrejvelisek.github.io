import { Button } from '../Button';
import { useCalculator } from '../CalculatorContext';

export function DecimalButton() {
  const { typeDecimal } = useCalculator();

  return (
    <Button
      label="."
      tooltip="Start the fractional part of the number"
      keys={['.', ',']}
      hint="."
      ariaLabel="Decimal point"
      className="bg-slate-200 text-slate-900 hover:bg-slate-300 active:bg-slate-300
        dark:bg-slate-700/60 dark:text-slate-50 dark:hover:bg-slate-600/70 dark:active:bg-slate-600"
      onPress={typeDecimal}
    />
  );
}
