import { useState } from 'react';

const UNITS = [
  { id: 'deg', label: 'degree', toBase: 1 },
  { id: 'rad', label: 'radian', toBase: 57.29577951308232 },
  { id: 'grad', label: 'gradian', toBase: 0.9 },
  { id: 'turn', label: 'turn', toBase: 360 },
  { id: 'arcmin', label: 'arcminute', toBase: 0.0166666666667 },
  { id: 'arcsec', label: 'arcsecond', toBase: 0.000277777777778 },
] as const;

type UnitId = (typeof UNITS)[number]['id'];

function unit(id: UnitId) {
  return UNITS.find((candidate) => candidate.id === id);
}

export function AngleConverter() {
  const [entry, setEntry] = useState('1');
  const [from, setFrom] = useState<UnitId>('deg');
  const [to, setTo] = useState<UnitId>('rad');

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
      <h3 className="text-xs font-semibold tracking-wide text-lime-700 uppercase dark:text-lime-300">Angle</h3>

      <div className="flex items-center gap-2">
        <input
          value={entry}
          onChange={(event) => setEntry(event.target.value)}
          aria-label="Angle value"
          className="w-24 rounded-lg bg-slate-100 px-2 py-1 text-right text-sm tabular-nums text-slate-900 ring-1 ring-slate-300 dark:bg-slate-950/70 dark:text-slate-50 dark:ring-slate-700/60"
        />
        <select
          value={from}
          onChange={(event) => setFrom(event.target.value as UnitId)}
          aria-label="Angle from unit"
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
        <output className="w-24 truncate rounded-lg bg-slate-100 px-2 py-1 text-right text-sm tabular-nums text-lime-700 ring-1 ring-slate-300 dark:bg-slate-950/70 dark:text-lime-200 dark:ring-slate-700/60">
          {converted}
        </output>
        <select
          value={to}
          onChange={(event) => setTo(event.target.value as UnitId)}
          aria-label="Angle to unit"
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
