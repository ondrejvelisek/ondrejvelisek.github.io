import { useState } from 'react';

import { BasicKeypad } from './BasicKeypad';
import { CalculatorProvider, useCalculator } from './CalculatorContext';
import { Display } from './Display';
import { History } from './History';
import { ScientificFunctions } from './ScientificFunctions';
import { ModeToggleButton } from './buttons/ModeToggleButton';
import { ThemeToggleButton } from './buttons/ThemeToggleButton';

function SettingsRow() {
  const { state, updateSettings } = useCalculator();
  const { precision, grouping, keepExpression } = state.settings;

  return (
    <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400">
      <label className="flex items-center gap-1">
        Precision
        <select
          value={precision}
          onChange={(event) => updateSettings({ precision: Number(event.target.value) })}
          aria-label="Significant digits"
          className="rounded bg-slate-100 px-1 py-0.5 text-slate-700 ring-1 ring-slate-300
            dark:bg-slate-800/70 dark:text-slate-200 dark:ring-slate-700/60"
        >
          {[6, 8, 10, 12, 14].map((digits) => (
            <option key={digits} value={digits}>
              {digits}
            </option>
          ))}
        </select>
      </label>

      <label className="flex items-center gap-1">
        <input
          type="checkbox"
          checked={grouping}
          onChange={(event) => updateSettings({ grouping: event.target.checked })}
          aria-label="Group thousands"
        />
        Thousands
      </label>

      <label className="flex items-center gap-1">
        <input
          type="checkbox"
          checked={keepExpression}
          onChange={(event) => updateSettings({ keepExpression: event.target.checked })}
          aria-label="Keep the expression line"
        />
        Expression
      </label>
    </div>
  );
}

export function Calculator() {
  const [isScientific, setIsScientific] = useState(true);

  return (
    <CalculatorProvider>
      <main className="flex min-h-dvh items-center justify-center bg-slate-100 p-6 dark:bg-slate-950">
        <div className="flex w-full max-w-3xl flex-col gap-4 lg:flex-row">
          <section className="flex flex-1 flex-col gap-4 rounded-3xl bg-white p-5 ring-1 ring-slate-300 dark:bg-slate-900/80 dark:ring-slate-700/50">
            <Display />
            <div className="grid grid-cols-6 gap-2">
              <ModeToggleButton
                isScientific={isScientific}
                onToggle={() => setIsScientific((shown) => !shown)}
              />
              <ThemeToggleButton />
            </div>
            <SettingsRow />
            {isScientific && <ScientificFunctions />}
            <BasicKeypad />
          </section>
          <History />
        </div>
      </main>
    </CalculatorProvider>
  );
}

export default Calculator;
