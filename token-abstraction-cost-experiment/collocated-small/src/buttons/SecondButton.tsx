import { Button } from '../Button';
import { useCalculator } from '../CalculatorContext';

export function SecondButton() {
  const { state, update } = useCalculator();

  return (
    <Button
      label="2nd"
      tooltip="Turn sin, cos and tan into their inverses for one press"
      keys={['n']}
      hint="n"
      ariaLabel="Toggle inverse functions"
      active={state.secondMode}
      ariaPressed={state.secondMode}
      className="bg-slate-100 text-cyan-700 hover:bg-slate-200 active:bg-slate-200
        dark:bg-slate-800/70 dark:text-cyan-200 dark:hover:bg-slate-700/80 dark:active:bg-slate-700"
      onPress={() => update({ secondMode: !state.secondMode })}
    />
  );
}
