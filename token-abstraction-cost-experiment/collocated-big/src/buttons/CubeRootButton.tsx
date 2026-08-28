import { Button } from '../Button';
import { useCalculator } from '../CalculatorContext';

export function CubeRootButton() {
  const { applyFunction } = useCalculator();

  return (
    <Button
      label="∛"
      tooltip="The number whose cube is this one"
      ariaLabel="Cube root"
      className="bg-slate-100 text-cyan-700 hover:bg-slate-200 active:bg-slate-200
        dark:bg-slate-800/70 dark:text-cyan-200 dark:hover:bg-slate-700/80 dark:active:bg-slate-700"
      onPress={() => applyFunction('∛', (value) => Math.cbrt(value))}
    />
  );
}
