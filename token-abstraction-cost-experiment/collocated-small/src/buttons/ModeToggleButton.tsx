import { Button } from '../Button';

/** Switches between the basic keypad and the full scientific one. */
export function ModeToggleButton({
  isScientific,
  onToggle,
}: {
  isScientific: boolean;
  onToggle: () => void;
}) {
  return (
    <Button
      label={isScientific ? 'SCI' : 'BASIC'}
      tooltip="Show or hide the scientific keys"
      ariaLabel={isScientific ? 'Switch to basic mode' : 'Switch to scientific mode'}
      ariaPressed={isScientific}
      active={isScientific}
      className="bg-slate-100 text-cyan-700 hover:bg-slate-200 active:bg-slate-200
        dark:bg-slate-800/70 dark:text-cyan-200 dark:hover:bg-slate-700/80 dark:active:bg-slate-700"
      onPress={onToggle}
    />
  );
}
