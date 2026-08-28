import { Button } from '../Button';
import { useCalculator } from '../CalculatorContext';

export function AngleModeButton() {
  const { state, update } = useCalculator();

  return (
    <Button
      label={state.angleMode.toUpperCase()}
      tooltip="Interpret angles as degrees or as radians"
      keys={['d']}
      hint="d"
      ariaLabel="Toggle degrees or radians"
      active={state.angleMode === 'rad'}
      className="bg-slate-100 text-cyan-700 hover:bg-slate-200 active:bg-slate-200
        dark:bg-slate-800/70 dark:text-cyan-200 dark:hover:bg-slate-700/80 dark:active:bg-slate-700"
      onPress={() => update({ angleMode: state.angleMode === 'deg' ? 'rad' : 'deg' })}
    />
  );
}
