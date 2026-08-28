import { useEffect } from 'react';
import type { ReactNode } from 'react';

export function Button({
  label,
  className,
  onPress,
  keys,
  hint,
  tooltip,
  ariaLabel,
  active = false,
  ariaPressed,
}: {
  label: ReactNode;
  className: string;
  onPress: () => void;
  keys?: string[];
  /** Keyboard shortcut shown in the corner of the key. */
  hint?: string;
  /** Hover explanation of what the key does. */
  tooltip?: string;
  ariaLabel?: string;
  active?: boolean;
  ariaPressed?: boolean;
}) {
  useEffect(() => {
    if (!keys) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (!keys.includes(event.key)) return;
      event.preventDefault();
      onPress();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
    // No dependency list: rebind every render so onPress sees the current state.
  });

  return (
    <button
      type="button"
      onClick={onPress}
      aria-label={ariaLabel}
      title={tooltip}
      aria-pressed={ariaPressed}
      className={[
        'relative flex h-12 items-center justify-center rounded-xl text-sm tabular-nums transition-colors',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 dark:focus-visible:outline-cyan-400',
        className,
        active ? 'ring-2 ring-cyan-600 dark:ring-cyan-400' : '',
      ].join(' ')}
    >
      {label}
      {hint && (
        <span
          aria-hidden="true"
          className="absolute top-0.5 right-1 text-[9px] text-slate-500 dark:text-slate-400"
        >
          {hint}
        </span>
      )}
    </button>
  );
}
