import { useCalculator } from './CalculatorContext';

export function History() {
  const { state, update, recallHistoryEntry } = useCalculator();
  const entries = state.history;

  return (
    <aside className="flex w-full flex-col rounded-2xl bg-white p-4 ring-1 ring-slate-300
      dark:bg-slate-900/60 dark:ring-slate-700/60 lg:w-64">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-400">History</h2>
        <button
          type="button"
          onClick={() => update({ history: [] })}
          disabled={entries.length === 0}
          className="text-xs text-slate-500 transition-colors hover:text-rose-600 disabled:opacity-40
            dark:hover:text-rose-300"
        >
          Clear
        </button>
      </div>
      {entries.length === 0 ? (
        <p className="mt-4 text-xs text-slate-500 dark:text-slate-600">Nothing calculated yet.</p>
      ) : (
        <ol className="mt-3 flex flex-col gap-2 overflow-y-auto text-right">
          {entries.map((entry) => (
            <li key={entry.id} className="border-b border-slate-200 pb-2 last:border-0 dark:border-slate-800">
              <button
                type="button"
                onClick={() => recallHistoryEntry(entry.id)}
                aria-label={`Recall ${entry.result}`}
                className="w-full text-right transition-colors hover:text-cyan-700 dark:hover:text-cyan-300"
              >
                <div className="truncate text-xs text-slate-500 dark:text-slate-500">
                  {entry.expression}
                </div>
                <div className="truncate text-sm tabular-nums text-slate-800 dark:text-slate-200">
                  {entry.result}
                </div>
              </button>
            </li>
          ))}
        </ol>
      )}
    </aside>
  );
}
