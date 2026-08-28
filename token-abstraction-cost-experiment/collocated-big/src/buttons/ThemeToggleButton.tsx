import { useState } from 'react';

import { Button } from '../Button';

/**
 * Flips the `dark` class on <html>. No shared state: the class on the document
 * *is* the state, and every key names both palettes itself.
 */
export function ThemeToggleButton() {
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));

  const press = () => {
    const next = !isDark;
    document.documentElement.classList.toggle('dark', next);
    setIsDark(next);
  };

  return (
    <Button
      label={isDark ? '☾' : '☀'}
      tooltip="Switch between the light and dark palette"
      ariaLabel={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      ariaPressed={isDark}
      className="bg-slate-100 text-amber-600 hover:bg-slate-200 active:bg-slate-200
        dark:bg-slate-800/70 dark:text-amber-300 dark:hover:bg-slate-700/80 dark:active:bg-slate-700"
      onPress={press}
    />
  );
}
