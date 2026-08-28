import { GRID_SPAN_CLASSES } from '../../constants/class-names.constants';
import { useCalculatorState } from '../../hooks/useCalculatorSelector';
import { useDispatchKeyDescriptor } from '../../hooks/useDispatchKeyDescriptor';
import type { KeyDescriptor } from '../../types/ui.types';
import { resolveKeyBinding } from '../../utils/keypad/resolveKeyBinding';
import { joinClassNames } from '../../utils/string/joinClassNames';
import { BaseButton } from '../base/BaseButton';

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
      onPress={() => dispatchKey(descriptor)}
      tone={descriptor.tone}
      size={descriptor.size}
      emphasis={binding.emphasis}
      className={joinClassNames(GRID_SPAN_CLASSES[descriptor.columnSpan], className)}
    >
      {binding.label}
    </BaseButton>
  );
}

export default KeypadKey;
