import { useState } from 'react';

const UNITS = [
  { id: 'm', label: 'metre', toBase: 1 },
  { id: 'km', label: 'kilometre', toBase: 1000 },
  { id: 'cm', label: 'centimetre', toBase: 0.01 },
  { id: 'mm', label: 'millimetre', toBase: 0.001 },
  { id: 'mi', label: 'mile', toBase: 1609.344 },
  { id: 'yd', label: 'yard', toBase: 0.9144 },
  { id: 'ft', label: 'foot', toBase: 0.3048 },
  { id: 'in', label: 'inch', toBase: 0.0254 },
] as const;

type UnitId = (typeof UNITS)[number]['id'];

function unit(id: UnitId) {
  return UNITS.find((candidate) => candidate.id === id);
}

export function LengthConverter() {
  const [entry, setEntry] = useState('1');
  const [from, setFrom] = useState<UnitId>('m');
  const [to, setTo] = useState<UnitId>('ft');

  const value = Number(entry);
  const source = unit(from);
  const target = unit(to);

  const converted =
    !Number.isFinite(value) || !source || !target
      ? '—'
      : String(Number(((value * source.toBase) / target.toBase).toPrecision(12)));

  return (
    <section className="flex flex-col gap-2 rounded-2xl bg-white p-4 ring-1 ring-slate-300
      dark:bg-slate-900/60 dark:ring-slate-700/60">
      <h3 className="text-xs font-semibold tracking-wide text-cyan-700 uppercase dark:text-cyan-300">Length</h3>

      <div className="flex items-center gap-2">
        <input
          value={entry}
          onChange={(event) => setEntry(event.target.value)}
          aria-label="Length value"
          className="w-24 rounded-lg bg-slate-100 px-2 py-1 text-right text-sm tabular-nums text-slate-900 ring-1 ring-slate-300 dark:bg-slate-950/70 dark:text-slate-50 dark:ring-slate-700/60"
        />
        <select
          value={from}
          onChange={(event) => setFrom(event.target.value as UnitId)}
          aria-label="Length from unit"
          className="flex-1 rounded-lg bg-slate-100 px-2 py-1 text-xs text-slate-700 ring-1 ring-slate-300 dark:bg-slate-800/70 dark:text-slate-200 dark:ring-slate-700/60"
        >
          {UNITS.map((candidate) => (
            <option key={candidate.id} value={candidate.id}>
              {candidate.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <output className="w-24 truncate rounded-lg bg-slate-100 px-2 py-1 text-right text-sm tabular-nums text-cyan-700 ring-1 ring-slate-300 dark:bg-slate-950/70 dark:text-cyan-200 dark:ring-slate-700/60">
          {converted}
        </output>
        <select
          value={to}
          onChange={(event) => setTo(event.target.value as UnitId)}
          aria-label="Length to unit"
          className="flex-1 rounded-lg bg-slate-100 px-2 py-1 text-xs text-slate-700 ring-1 ring-slate-300 dark:bg-slate-800/70 dark:text-slate-200 dark:ring-slate-700/60"
        >
          {UNITS.map((candidate) => (
            <option key={candidate.id} value={candidate.id}>
              {candidate.label}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}
