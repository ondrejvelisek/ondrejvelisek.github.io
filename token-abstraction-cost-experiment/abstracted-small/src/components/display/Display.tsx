import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';

import { ARIA_LABELS, ARIA_LIVE } from '../../constants/aria.constants';
import type { DisplayFormattingInjectedProps } from '../../hocs/withDisplayFormatting';
import { withDisplayFormatting } from '../../hocs/withDisplayFormatting';
import type { DisplayViewModel } from '../../types/state.types';
import { BasePanel } from '../base/BasePanel';
import { Stack } from '../primitives/Stack';
import { Text } from '../primitives/Text';

const DisplayViewContext = createContext<DisplayViewModel | null>(null);

DisplayViewContext.displayName = 'DisplayView';

function useDisplayView(): DisplayViewModel {
  const view = useContext(DisplayViewContext);
  if (view === null) throw new Error('Display parts must be rendered inside <Display>.');
  return view;
}

export interface DisplayRootProps extends DisplayFormattingInjectedProps {
  readonly children?: ReactNode | ((view: DisplayViewModel) => ReactNode);
}

function DisplayRootBase({ view, children }: DisplayRootProps) {
  const content = typeof children === 'function' ? children(view) : children;

  return (
    <DisplayViewContext.Provider value={view}>
      <BasePanel
        surface="display"
        radius="display"
        padding="roomy"
        role="group"
        aria-label={ARIA_LABELS.display}
      >
        {content}
      </BasePanel>
    </DisplayViewContext.Provider>
  );
}

const DisplayRoot = withDisplayFormatting(DisplayRootBase);

function DisplayIndicators() {
  const view = useDisplayView();

  return (
    <Stack
      direction="row"
      gap="cosy"
      align="start"
      aria-label={ARIA_LABELS.indicators}
      className="w-full"
    >
      {view.hasMemory && (
        <Text scale="indicator" tone="operator" aria-label={ARIA_LABELS.memoryIndicator}>
          M
        </Text>
      )}
    </Stack>
  );
}

function DisplayExpression() {
  const view = useDisplayView();

  return (
    <Text
      as="div"
      scale="body"
      tone="muted"
      alignment="end"
      aria-label={ARIA_LABELS.expression}
      className="mt-1 h-5 w-full truncate"
    >
      {view.expression}
    </Text>
  );
}

function DisplayResult() {
  const view = useDisplayView();

  return (
    <output
      aria-live={view.hasError ? ARIA_LIVE.error : ARIA_LIVE.result}
      aria-label={ARIA_LABELS.result}
      className="block w-full truncate text-right text-4xl font-light tabular-nums"
      style={{ color: view.hasError ? 'var(--calc-text-danger)' : 'var(--calc-text-primary)' }}
    >
      {view.formattedEntry}
    </output>
  );
}

export const Display = Object.assign(DisplayRoot, {
  Root: DisplayRoot,
  Indicators: DisplayIndicators,
  Expression: DisplayExpression,
  Result: DisplayResult,
});

export default Display;
