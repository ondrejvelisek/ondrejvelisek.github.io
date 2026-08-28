import { Button } from '../Button';
import { useCalculator } from '../CalculatorContext';

export function TanButton() {
  const { state, applyFunction, update } = useCalculator();
  const inverse = state.secondMode;

  const press = () => {
    if (inverse) {
      applyFunction('tan⁻¹', (value, angleMode) => {
        const radians = Math.atan(value);
        return angleMode === 'deg' ? (radians * 180) / Math.PI : radians;
      });
      update({ secondMode: false });
      return;
    }
    applyFunction('tan', (value, angleMode) =>
      Math.tan(angleMode === 'deg' ? (value * Math.PI) / 180 : value),
    );
  };

  return (
    <Button
      label={inverse ? 'tan⁻¹' : 'tan'}
      tooltip="Tangent of the angle on the display"
      keys={['t']}
      hint="t"
      className="bg-slate-100 text-cyan-700 hover:bg-slate-200 active:bg-slate-200
        dark:bg-slate-800/70 dark:text-cyan-200 dark:hover:bg-slate-700/80 dark:active:bg-slate-700"
      onPress={press}
    />
  );
}
