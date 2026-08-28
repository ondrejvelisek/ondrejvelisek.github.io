import type { ButtonHTMLAttributes, ReactNode } from 'react';

export interface PressableProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'type' | 'aria-label' | 'title'> {
  readonly accessibleName: string;
  /** Hover explanation, surfaced as the native tooltip. */
  readonly tooltip?: string;
  readonly onPress: () => void;
  readonly isPressed?: boolean;
  readonly children?: ReactNode;
}

export function Pressable({
  accessibleName,
  tooltip,
  onPress,
  isPressed,
  children,
  ...rest
}: PressableProps) {
  return (
    <button
      type="button"
      aria-label={accessibleName}
      title={tooltip}
      aria-pressed={isPressed}
      onClick={onPress}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Pressable;
