import { CalculatorStoreProvider } from '../../context/CalculatorStoreContext';
import { withErrorBoundary } from '../../hocs/withErrorBoundary';
import { useKeyboardBindings } from '../../hooks/useKeyboardBindings';
import type { CalculatorShellSlotName, CalculatorSlotContext, WithSlots } from '../../types/ui.types';
import { Display } from '../display/Display';
import { HistoryPanel } from '../history/HistoryPanel';
import { Keypad } from '../keypad/Keypad';
import { ModeKey } from '../keypad/ModeKey';
import { ThemeKey } from '../keypad/ThemeKey';
import { CalculatorShell } from './CalculatorShell';
import { SettingsRow } from './SettingsRow';

function KeyboardBridge({ isEnabled }: { readonly isEnabled: boolean }) {
  useKeyboardBindings(isEnabled);
  return null;
}

export interface CalculatorRootProps
  extends WithSlots<CalculatorShellSlotName, CalculatorSlotContext> {
  readonly enableKeyboard?: boolean;
  readonly className?: string;
}

function CalculatorRoot({ slots, enableKeyboard = true, className }: CalculatorRootProps) {
  return (
    <CalculatorStoreProvider>
      <KeyboardBridge isEnabled={enableKeyboard} />
      <CalculatorShell slots={slots} className={className} />
    </CalculatorStoreProvider>
  );
}

const GuardedCalculatorRoot = withErrorBoundary(CalculatorRoot);

export const Calculator = Object.assign(GuardedCalculatorRoot, {
  Root: GuardedCalculatorRoot,
  Display,
  Keypad,
  History: HistoryPanel,
  ThemeKey,
  ModeKey,
  Settings: SettingsRow,
});

export default Calculator;
