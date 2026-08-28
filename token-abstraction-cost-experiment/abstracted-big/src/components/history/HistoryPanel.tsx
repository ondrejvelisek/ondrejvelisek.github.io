import type { ReactNode } from 'react';

import {
  ARIA_LABELS,
  HISTORY_CLEAR_LABEL,
  HISTORY_EMPTY_TEXT,
  HISTORY_TITLE,
} from '../../constants/aria.constants';
import { LAYOUT_CLASSES } from '../../constants/class-names.constants';
import { createSlotRenderer } from '../../factories/createSlotRenderer';
import { useCalculatorDispatch, useCalculatorState } from '../../hooks/useCalculatorSelector';
import type { HistoryRecord } from '../../types/state.types';
import type { CalculatorSlotContext, WithSlots } from '../../types/ui.types';
import { joinClassNames } from '../../utils/string/joinClassNames';
import { BasePanel } from '../base/BasePanel';
import { Box } from '../primitives/Box';
import { Stack } from '../primitives/Stack';
import { Pressable } from '../primitives/Pressable';
import { Text } from '../primitives/Text';

export type HistoryPanelSlotName = 'header' | 'empty';

export interface HistoryPanelProps
  extends WithSlots<HistoryPanelSlotName, CalculatorSlotContext> {
  readonly children?: (record: HistoryRecord) => ReactNode;
  readonly className?: string;
}

function DefaultHistoryRecord({ record }: { readonly record: HistoryRecord }) {
  const dispatch = useCalculatorDispatch();

  return (
    <Box as="li" className="w-full border-b border-[var(--calc-border-subtle)] pb-2 last:border-0">
      <Pressable
        accessibleName={`Recall ${record.result}`}
        tooltip="Put this result back on the display"
        onPress={() => dispatch({ type: 'recallHistoryRecord', id: record.id })}
        className="w-full"
      >
        <Text as="div" scale="caption" tone="faint" alignment="end" className="w-full truncate">
          {record.expression}
        </Text>
        <Text as="div" scale="body" tone="primary" alignment="end" className="w-full truncate tabular-nums">
          {record.result}
        </Text>
      </Pressable>
    </Box>
  );
}

export function HistoryPanel({ slots, children, className }: HistoryPanelProps) {
  const state = useCalculatorState();
  const dispatch = useCalculatorDispatch();
  const renderSlotByName = createSlotRenderer(slots, { state });

  const header = renderSlotByName(
    'header',
    <Stack direction="row" align="between" className="w-full">
      <Text scale="indicator" tone="muted">
        {HISTORY_TITLE}
      </Text>
      <button
        type="button"
        onClick={() => dispatch({ type: 'clearHistory' })}
        disabled={state.history.length === 0}
        aria-label={ARIA_LABELS.clearHistory}
        className="text-xs text-[var(--calc-text-faint)] transition-colors hover:text-[var(--calc-text-danger)] disabled:opacity-40"
      >
        {HISTORY_CLEAR_LABEL}
      </button>
    </Stack>,
  );

  const emptyState = renderSlotByName(
    'empty',
    <Text scale="caption" tone="faint" className="mt-4">
      {HISTORY_EMPTY_TEXT}
    </Text>,
  );

  return (
    <BasePanel
      as="aside"
      surface="panel"
      radius="panel"
      padding="cosy"
      aria-label={ARIA_LABELS.history}
      className={joinClassNames(LAYOUT_CLASSES.aside, className)}
    >
      {header}
      {state.history.length === 0 ? (
        emptyState
      ) : (
        <Stack
          as="ol"
          direction="column"
          gap="cosy"
          align="stretch"
          className="mt-3 w-full overflow-y-auto"
        >
          {state.history.map((record) =>
            children ? (
              children(record)
            ) : (
              <DefaultHistoryRecord key={record.id} record={record} />
            ),
          )}
        </Stack>
      )}
    </BasePanel>
  );
}

export default HistoryPanel;
