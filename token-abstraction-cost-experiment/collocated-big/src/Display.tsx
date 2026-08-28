import { formatNumber, useCalculator } from './CalculatorContext';

export function Display() {
  const { state } = useCalculator();
  const shown = state.error ? 'Error' : formatNumber(state.display, state.settings.grouping);

  return (
    <div className="rounded-2xl bg-slate-100 px-5 py-4 ring-1 ring-slate-300
      dark:bg-slate-950/70 dark:ring-slate-700/60">
      <div className="flex items-center gap-2 text-[11px] font-medium tracking-wide text-slate-500 uppercase dark:text-slate-400">
        <span className={state.angleMode === 'rad' ? 'text-cyan-700 dark:text-cyan-300' : ''}>{state.angleMode}</span>
        {state.secondMode && <span className="text-cyan-700 dark:text-cyan-300">2nd</span>}
        {state.memory !== 0 && <span className="text-amber-700 dark:text-amber-300">M</span>}
      </div>
      <div className="mt-1 h-5 truncate text-right text-sm text-slate-500 dark:text-slate-400" aria-hidden="true">
        {state.settings.keepExpression ? state.expression : ''}
      </div>
      <output
        aria-live="polite"
        className={[
          'block truncate text-right text-4xl font-light tabular-nums',
          state.error ? 'text-rose-600 dark:text-rose-400' : 'text-slate-900 dark:text-slate-50',
        ].join(' ')}
      >
        {shown}
      </output>
    </div>
  );
}
