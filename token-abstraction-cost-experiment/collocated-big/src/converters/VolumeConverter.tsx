import { useState } from 'react';

const UNITS = [
  { id: 'l', label: 'litre', toBase: 1 },
  { id: 'ml', label: 'millilitre', toBase: 0.001 },
  { id: 'm3', label: 'cubic metre', toBase: 1000 },
  { id: 'gal', label: 'US gallon', toBase: 3.785411784 },
  { id: 'qt', label: 'US quart', toBase: 0.946352946 },
  { id: 'pt', label: 'US pint', toBase: 0.473176473 },
  { id: 'cup', label: 'US cup', toBase: 0.2365882365 },
  { id: 'floz', label: 'US fluid ounce', toBase: 0.0295735295625 },
] as const;

type UnitId = (typeof UNITS)[number]['id'];

function unit(id: UnitId) {
  return UNITS.find((candidate) => candidate.id === id);
}

export function VolumeConverter() {
  const [entry, setEntry] = useState('1');
  const [from, setFrom] = useState<UnitId>('l');
  const [to, setTo] = useState<UnitId>('gal');

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
      <h3 className="text-xs font-semibold tracking-wide text-sky-700 uppercase dark:text-sky-300">Volume</h3>

      <div className="flex items-center gap-2">
        <input
          value={entry}
          onChange={(event) => setEntry(event.target.value)}
          aria-label="Volume value"
          className="w-24 rounded-lg bg-slate-100 px-2 py-1 text-right text-sm tabular-nums text-slate-900 ring-1 ring-slate-300 dark:bg-slate-950/70 dark:text-slate-50 dark:ring-slate-700/60"
        />
        <select
          value={from}
          onChange={(event) => setFrom(event.target.value as UnitId)}
          aria-label="Volume from unit"
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
        <output className="w-24 truncate rounded-lg bg-slate-100 px-2 py-1 text-right text-sm tabular-nums text-sky-700 ring-1 ring-slate-300 dark:bg-slate-950/70 dark:text-sky-200 dark:ring-slate-700/60">
          {converted}
        </output>
        <select
          value={to}
          onChange={(event) => setTo(event.target.value as UnitId)}
          aria-label="Volume to unit"
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
