import { Button } from '../Button';
import { useCalculator } from '../CalculatorContext';

export function LogButton() {
  const { applyFunction } = useCalculator();

  return (
    <Button
      label="log"
      tooltip="Common logarithm, base 10"
      keys={['g']}
      hint="g"
      className="bg-slate-100 text-cyan-700 hover:bg-slate-200 active:bg-slate-200
        dark:bg-slate-800/70 dark:text-cyan-200 dark:hover:bg-slate-700/80 dark:active:bg-slate-700"
      onPress={() => applyFunction('log', (value) => (value <= 0 ? NaN : Math.log10(value)))}
    />
  );
}
