import { Button } from '../Button';
import { useCalculator } from '../CalculatorContext';

export function HyperbolicTanButton() {
  const { applyFunction } = useCalculator();

  return (
    <Button
      label="tanh"
      tooltip="Hyperbolic tangent"
      ariaLabel="Hyperbolic tangent"
      className="bg-slate-100 text-cyan-700 hover:bg-slate-200 active:bg-slate-200
        dark:bg-slate-800/70 dark:text-cyan-200 dark:hover:bg-slate-700/80 dark:active:bg-slate-700"
      onPress={() => applyFunction('tanh', (value) => Math.tanh(value))}
    />
  );
}
