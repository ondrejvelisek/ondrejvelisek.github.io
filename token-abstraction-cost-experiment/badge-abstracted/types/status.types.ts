/**
 * Shared status domain types.
 *
 * These live apart from the components that render them so that any future
 * consumer (tables, filters, notification centre, admin tooling) can depend on
 * the vocabulary without pulling in React.
 */

export type UserStatus = 'active' | 'inactive' | 'pending' | 'banned';

export type BadgeSize = 'sm' | 'md' | 'lg';

export type BadgeVariant = 'solid' | 'subtle' | 'outline';

/**
 * Presentation contract for the generic badge primitive.
 */
export interface BadgeProps {
  label: string;
  className: string;
  size?: BadgeSize;
  variant?: BadgeVariant;
  role?: string;
  'aria-label'?: string;
  'aria-live'?: 'off' | 'polite' | 'assertive';
  'data-status'?: string;
  children?: React.ReactNode;
}

/**
 * A single entry of the status lookup table.
 */
export interface StatusConfig {
  label: string;
  className: string;
  variant: BadgeVariant;
  ariaLabel: string;
  ariaLive: 'off' | 'polite' | 'assertive';
}

/**
 * The full lookup table, exhaustive over UserStatus.
 */
export type StatusConfigMap = Record<UserStatus, StatusConfig>;

export interface UserStatusBadgeProps {
  status: UserStatus;
  size?: BadgeSize;
  className?: string;
}
