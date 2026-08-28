import { useState } from 'react';

/** Not a factor table: every scale has its own offset, so each pair is spelled out. */
const SCALES = ['celsius', 'fahrenheit', 'kelvin', 'rankine'] as const;

type Scale = (typeof SCALES)[number];

const LABELS: Record<Scale, string> = {
  celsius: 'Celsius',
  fahrenheit: 'Fahrenheit',
  kelvin: 'Kelvin',
  rankine: 'Rankine',
};

function toCelsius(value: number, scale: Scale): number {
  switch (scale) {
    case 'celsius':
      return value;
    case 'fahrenheit':
      return ((value - 32) * 5) / 9;
    case 'kelvin':
      return value - 273.15;
    case 'rankine':
      return ((value - 491.67) * 5) / 9;
  }
}

function fromCelsius(celsius: number, scale: Scale): number {
  switch (scale) {
    case 'celsius':
      return celsius;
    case 'fahrenheit':
      return (celsius * 9) / 5 + 32;
    case 'kelvin':
      return celsius + 273.15;
    case 'rankine':
      return ((celsius + 273.15) * 9) / 5;
  }
}

export function TemperatureConverter() {
  const [entry, setEntry] = useState('20');
  const [from, setFrom] = useState<Scale>('celsius');
  const [to, setTo] = useState<Scale>('fahrenheit');

  const value = Number(entry);
  const converted = !Number.isFinite(value)
    ? '—'
    : String(Number(fromCelsius(toCelsius(value, from), to).toPrecision(12)));

  return (
    <section className="flex flex-col gap-2 rounded-2xl bg-white p-4 ring-1 ring-slate-300
      dark:bg-slate-900/60 dark:ring-slate-700/60">
      <h3 className="text-xs font-semibold tracking-wide text-red-700 uppercase dark:text-red-300">Temperature</h3>

      <div className="flex items-center gap-2">
        <input
          value={entry}
          onChange={(event) => setEntry(event.target.value)}
          aria-label="Temperature value"
          className="w-24 rounded-lg bg-slate-100 px-2 py-1 text-right text-sm tabular-nums text-slate-900 ring-1 ring-slate-300 dark:bg-slate-950/70 dark:text-slate-50 dark:ring-slate-700/60"
        />
        <select
          value={from}
          onChange={(event) => setFrom(event.target.value as Scale)}
          aria-label="Temperature from scale"
          className="flex-1 rounded-lg bg-slate-100 px-2 py-1 text-xs text-slate-700 ring-1 ring-slate-300 dark:bg-slate-800/70 dark:text-slate-200 dark:ring-slate-700/60"
        >
          {SCALES.map((scale) => (
            <option key={scale} value={scale}>
              {LABELS[scale]}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <output className="w-24 truncate rounded-lg bg-slate-100 px-2 py-1 text-right text-sm tabular-nums text-red-700 ring-1 ring-slate-300 dark:bg-slate-950/70 dark:text-red-200 dark:ring-slate-700/60">
          {converted}
        </output>
        <select
          value={to}
          onChange={(event) => setTo(event.target.value as Scale)}
          aria-label="Temperature to scale"
          className="flex-1 rounded-lg bg-slate-100 px-2 py-1 text-xs text-slate-700 ring-1 ring-slate-300 dark:bg-slate-800/70 dark:text-slate-200 dark:ring-slate-700/60"
        >
          {SCALES.map((scale) => (
            <option key={scale} value={scale}>
              {LABELS[scale]}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}
