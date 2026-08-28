import { GRID_SPAN_CLASSES } from '../../constants/class-names.constants';
import { useCalculatorState } from '../../hooks/useCalculatorSelector';
import { useDispatchKeyDescriptor } from '../../hooks/useDispatchKeyDescriptor';
import type { KeyDescriptor } from '../../types/ui.types';
import { resolveKeyBinding } from '../../utils/keypad/resolveKeyBinding';
import { joinClassNames } from '../../utils/string/joinClassNames';
import { BaseButton } from '../base/BaseButton';
import { Text } from '../primitives/Text';

export interface KeypadKeyProps {
  readonly descriptor: KeyDescriptor;
  readonly className?: string;
}

export function KeypadKey({ descriptor, className }: KeypadKeyProps) {
  const state = useCalculatorState();
  const dispatchKey = useDispatchKeyDescriptor();
  const binding = resolveKeyBinding(descriptor, state);

  return (
    <BaseButton
      accessibleName={binding.ariaLabel}
      tooltip={binding.description}
      onPress={() => dispatchKey(descriptor)}
      tone={descriptor.tone}
      size={descriptor.size}
      emphasis={binding.emphasis}
      isPressed={descriptor.isToggle ? binding.emphasis === 'ring' : undefined}
      className={joinClassNames(GRID_SPAN_CLASSES[descriptor.columnSpan], className)}
    >
      {binding.label}
      {binding.hint !== null && (
        <Text scale="hint" tone="faint" className="absolute top-0.5 right-1" aria-hidden="true">
          {binding.hint}
        </Text>
      )}
    </BaseButton>
  );
}

export default KeypadKey;
