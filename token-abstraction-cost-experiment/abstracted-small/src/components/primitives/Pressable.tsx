import type { ButtonHTMLAttributes, ReactNode } from 'react';

export interface PressableProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'type' | 'aria-label'> {
  readonly accessibleName: string;
  readonly onPress: () => void;
  readonly isPressed?: boolean;
  readonly children?: ReactNode;
}

export function Pressable({
  accessibleName,
  onPress,
  isPressed,
  children,
  ...rest
}: PressableProps) {
  return (
    <button
      type="button"
      aria-label={accessibleName}
      aria-pressed={isPressed}
      onClick={onPress}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Pressable;
