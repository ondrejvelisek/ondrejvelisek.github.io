import { Button } from '../Button';
import { useCalculator } from '../CalculatorContext';

export function SinButton() {
  const { state, applyFunction, update } = useCalculator();
  const inverse = state.secondMode;

  const press = () => {
    if (inverse) {
      applyFunction('sin⁻¹', (value, angleMode) => {
        if (value < -1 || value > 1) return NaN;
        const radians = Math.asin(value);
        return angleMode === 'deg' ? (radians * 180) / Math.PI : radians;
      });
      // The 2nd shift is one-shot, like on a physical calculator.
      update({ secondMode: false });
      return;
    }
    applyFunction('sin', (value, angleMode) =>
      Math.sin(angleMode === 'deg' ? (value * Math.PI) / 180 : value),
    );
  };

  return (
    <Button
      label={inverse ? 'sin⁻¹' : 'sin'}
      tooltip="Sine of the angle on the display"
      keys={['s']}
      hint="s"
      className="bg-slate-100 text-cyan-700 hover:bg-slate-200 active:bg-slate-200
        dark:bg-slate-800/70 dark:text-cyan-200 dark:hover:bg-slate-700/80 dark:active:bg-slate-700"
      onPress={press}
    />
  );
}
