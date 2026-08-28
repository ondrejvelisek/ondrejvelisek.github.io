import { useState } from 'react';

/** Consumption and economy are reciprocal, so this cannot be a factor table either. */
const MEASURES = ['l100km', 'mpgUs', 'mpgUk', 'kml'] as const;

type Measure = (typeof MEASURES)[number];

const LABELS: Record<Measure, string> = {
  l100km: 'L/100 km',
  mpgUs: 'mpg (US)',
  mpgUk: 'mpg (UK)',
  kml: 'km/L',
};

const MPG_US_PER_L100KM = 235.214583;
const MPG_UK_PER_L100KM = 282.480936;

function toL100km(value: number, measure: Measure): number {
  if (value === 0) return NaN;
  switch (measure) {
    case 'l100km':
      return value;
    case 'mpgUs':
      return MPG_US_PER_L100KM / value;
    case 'mpgUk':
      return MPG_UK_PER_L100KM / value;
    case 'kml':
      return 100 / value;
  }
}

function fromL100km(l100km: number, measure: Measure): number {
  if (l100km === 0) return NaN;
  switch (measure) {
    case 'l100km':
      return l100km;
    case 'mpgUs':
      return MPG_US_PER_L100KM / l100km;
    case 'mpgUk':
      return MPG_UK_PER_L100KM / l100km;
    case 'kml':
      return 100 / l100km;
  }
}

export function FuelConverter() {
  const [entry, setEntry] = useState('7');
  const [from, setFrom] = useState<Measure>('l100km');
  const [to, setTo] = useState<Measure>('mpgUs');

  const value = Number(entry);
  const result = fromL100km(toL100km(value, from), to);
  const converted =
    !Number.isFinite(value) || !Number.isFinite(result)
      ? '—'
      : String(Number(result.toPrecision(12)));

  return (
    <section className="flex flex-col gap-2 rounded-2xl bg-white p-4 ring-1 ring-slate-300
      dark:bg-slate-900/60 dark:ring-slate-700/60">
      <h3 className="text-xs font-semibold tracking-wide text-yellow-700 uppercase dark:text-yellow-300">Fuel economy</h3>

      <div className="flex items-center gap-2">
        <input
          value={entry}
          onChange={(event) => setEntry(event.target.value)}
          aria-label="Fuel economy value"
          className="w-24 rounded-lg bg-slate-100 px-2 py-1 text-right text-sm tabular-nums text-slate-900 ring-1 ring-slate-300 dark:bg-slate-950/70 dark:text-slate-50 dark:ring-slate-700/60"
        />
        <select
          value={from}
          onChange={(event) => setFrom(event.target.value as Measure)}
          aria-label="Fuel economy from measure"
          className="flex-1 rounded-lg bg-slate-100 px-2 py-1 text-xs text-slate-700 ring-1 ring-slate-300 dark:bg-slate-800/70 dark:text-slate-200 dark:ring-slate-700/60"
        >
          {MEASURES.map((measure) => (
            <option key={measure} value={measure}>
              {LABELS[measure]}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <output className="w-24 truncate rounded-lg bg-slate-100 px-2 py-1 text-right text-sm tabular-nums text-yellow-700 ring-1 ring-slate-300 dark:bg-slate-950/70 dark:text-yellow-200 dark:ring-slate-700/60">
          {converted}
        </output>
        <select
          value={to}
          onChange={(event) => setTo(event.target.value as Measure)}
          aria-label="Fuel economy to measure"
          className="flex-1 rounded-lg bg-slate-100 px-2 py-1 text-xs text-slate-700 ring-1 ring-slate-300 dark:bg-slate-800/70 dark:text-slate-200 dark:ring-slate-700/60"
        >
          {MEASURES.map((measure) => (
            <option key={measure} value={measure}>
              {LABELS[measure]}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}
