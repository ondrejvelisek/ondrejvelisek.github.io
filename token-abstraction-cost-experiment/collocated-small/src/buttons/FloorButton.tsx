import { Button } from '../Button';
import { useCalculator } from '../CalculatorContext';

export function FloorButton() {
  const { applyFunction } = useCalculator();

  return (
    <Button
      label="⌊x⌋"
      tooltip="Round down to the nearest whole number"
      ariaLabel="Floor"
      className="bg-slate-100 text-cyan-700 hover:bg-slate-200 active:bg-slate-200
        dark:bg-slate-800/70 dark:text-cyan-200 dark:hover:bg-slate-700/80 dark:active:bg-slate-700"
      onPress={() => applyFunction('floor', (value) => Math.floor(value))}
    />
  );
}
