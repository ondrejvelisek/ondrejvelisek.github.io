import { BaseButton } from '../base/BaseButton';

export interface ModeKeyProps {
  readonly isScientific: boolean;
  readonly onToggle: () => void;
}

/** Switches between the basic keypad and the full scientific one. */
export function ModeKey({ isScientific, onToggle }: ModeKeyProps) {
  return (
    <BaseButton
      accessibleName={isScientific ? 'Switch to basic mode' : 'Switch to scientific mode'}
      tooltip="Show or hide the scientific keys"
      tone="function"
      emphasis={isScientific ? 'ring' : 'none'}
      onPress={onToggle}
      isPressed={isScientific}
    >
      {isScientific ? 'SCI' : 'BASIC'}
    </BaseButton>
  );
}

export default ModeKey;
