import { Button } from '../Button';
import { useCalculator } from '../CalculatorContext';

export function InverseHyperbolicTanButton() {
  const { applyFunction } = useCalculator();

  return (
    <Button
      label="tanh⁻¹"
      tooltip="Inverse hyperbolic tangent, defined between minus one and one"
      ariaLabel="Inverse hyperbolic tangent"
      className="bg-slate-100 text-cyan-700 hover:bg-slate-200 active:bg-slate-200
        dark:bg-slate-800/70 dark:text-cyan-200 dark:hover:bg-slate-700/80 dark:active:bg-slate-700"
      onPress={() => applyFunction('atanh', (value) => value <= -1 || value >= 1 ? NaN : Math.atanh(value))}
    />
  );
}
