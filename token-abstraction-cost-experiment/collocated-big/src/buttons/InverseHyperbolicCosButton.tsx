import { Button } from '../Button';
import { useCalculator } from '../CalculatorContext';

export function InverseHyperbolicCosButton() {
  const { applyFunction } = useCalculator();

  return (
    <Button
      label="cosh⁻¹"
      tooltip="Inverse hyperbolic cosine, defined from one upwards"
      ariaLabel="Inverse hyperbolic cosine"
      className="bg-slate-100 text-cyan-700 hover:bg-slate-200 active:bg-slate-200
        dark:bg-slate-800/70 dark:text-cyan-200 dark:hover:bg-slate-700/80 dark:active:bg-slate-700"
      onPress={() => applyFunction('acosh', (value) => value < 1 ? NaN : Math.acosh(value))}
    />
  );
}
