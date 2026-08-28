import { useCalculatorDispatch, useCalculatorState } from '../../hooks/useCalculatorSelector';
import type { DisplaySettings } from '../../types/state.types';
import { Stack } from '../primitives/Stack';
import { Text } from '../primitives/Text';

const PRECISION_OPTIONS = [6, 8, 10, 12, 14] as const;

const FIELD_CLASS_NAME =
  'rounded-[var(--calc-key-radius)] bg-[var(--calc-surface-raised)] px-1 py-0.5 ' +
  'text-[var(--calc-text-primary)] ring-1 ring-[var(--calc-border-subtle)]';

/** Display preferences, dispatched like every other change. */
export function SettingsRow() {
  const state = useCalculatorState();
  const dispatch = useCalculatorDispatch();

  const update = (patch: Partial<DisplaySettings>) =>
    dispatch({ type: 'updateSettings', patch });

  return (
    <Stack direction="row" gap="cosy" align="center" className="w-full">
      <Text scale="indicator" tone="faint">
        Precision
      </Text>
      <select
        value={state.settings.precision}
        onChange={(event) => update({ precision: Number(event.target.value) })}
        aria-label="Significant digits"
        className={FIELD_CLASS_NAME}
      >
        {PRECISION_OPTIONS.map((digits) => (
          <option key={digits} value={digits}>
            {digits}
          </option>
        ))}
      </select>

      <label className="flex items-center gap-1">
        <input
          type="checkbox"
          checked={state.settings.grouping}
          onChange={(event) => update({ grouping: event.target.checked })}
          aria-label="Group thousands"
        />
        <Text scale="indicator" tone="faint">
          Thousands
        </Text>
      </label>

      <label className="flex items-center gap-1">
        <input
          type="checkbox"
          checked={state.settings.keepExpression}
          onChange={(event) => update({ keepExpression: event.target.checked })}
          aria-label="Keep the expression line"
        />
        <Text scale="indicator" tone="faint">
          Expression
        </Text>
      </label>
    </Stack>
  );
}

export default SettingsRow;
