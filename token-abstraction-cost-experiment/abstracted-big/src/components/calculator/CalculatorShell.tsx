import { ARIA_LABELS } from '../../constants/aria.constants';
import { LAYOUT_CLASSES } from '../../constants/class-names.constants';
import { createSlotRenderer } from '../../factories/createSlotRenderer';
import type { ThemeTokensInjectedProps } from '../../hocs/withThemeTokens';
import { withThemeTokens } from '../../hocs/withThemeTokens';
import { useCalculatorState } from '../../hooks/useCalculatorSelector';
import type { CalculatorShellSlotName, CalculatorSlotContext, WithSlots } from '../../types/ui.types';
import { joinClassNames } from '../../utils/string/joinClassNames';
import { BasePanel } from '../base/BasePanel';
import { Box } from '../primitives/Box';

export interface CalculatorShellProps
  extends WithSlots<CalculatorShellSlotName, CalculatorSlotContext>,
    ThemeTokensInjectedProps {
  readonly className?: string;
}

function CalculatorShellBase({ slots, themeStyle, className }: CalculatorShellProps) {
  const state = useCalculatorState();
  const renderSlotByName = createSlotRenderer(slots, { state });

  return (
    <Box
      as="main"
      aria-label={ARIA_LABELS.application}
      style={themeStyle}
      className={joinClassNames(LAYOUT_CLASSES.viewport, className)}
    >
      <Box className={LAYOUT_CLASSES.shell}>
        <BasePanel
          as="section"
          surface="panel"
          radius="panel"
          padding="roomy"
          className={LAYOUT_CLASSES.column}
        >
          {renderSlotByName('header')}
          {renderSlotByName('display')}
          {renderSlotByName('keypad')}
          {renderSlotByName('footer')}
        </BasePanel>
        {renderSlotByName('aside')}
      </Box>
    </Box>
  );
}

export const CalculatorShell = withThemeTokens(CalculatorShellBase);

export default CalculatorShell;
