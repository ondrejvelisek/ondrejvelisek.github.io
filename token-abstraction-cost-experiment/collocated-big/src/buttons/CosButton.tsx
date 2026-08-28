import { Button } from '../Button';
import { useCalculator } from '../CalculatorContext';

export function CosButton() {
  const { state, applyFunction, update } = useCalculator();
  const inverse = state.secondMode;

  const press = () => {
    if (inverse) {
      applyFunction('cos⁻¹', (value, angleMode) => {
        if (value < -1 || value > 1) return NaN;
        const radians = Math.acos(value);
        return angleMode === 'deg' ? (radians * 180) / Math.PI : radians;
      });
      update({ secondMode: false });
      return;
    }
    applyFunction('cos', (value, angleMode) =>
      Math.cos(angleMode === 'deg' ? (value * Math.PI) / 180 : value),
    );
  };

  return (
    <Button
      label={inverse ? 'cos⁻¹' : 'cos'}
      tooltip="Cosine of the angle on the display"
      keys={['c']}
      hint="c"
      className="bg-slate-100 text-cyan-700 hover:bg-slate-200 active:bg-slate-200
        dark:bg-slate-800/70 dark:text-cyan-200 dark:hover:bg-slate-700/80 dark:active:bg-slate-700"
      onPress={press}
    />
  );
}
