import type { BadgeSize, StatusConfigMap } from '../types/status.types';

/**
 * Single source of truth for how every UserStatus is presented.
 *
 * Keep this exhaustive: the StatusConfigMap type will fail the build if a new
 * status is added to UserStatus without a matching entry here.
 */
export const STATUS_CONFIG: StatusConfigMap = {
  active: {
    label: 'Active',
    className: 'bg-emerald-100 text-emerald-800 ring-1 ring-emerald-200',
    variant: 'subtle',
    ariaLabel: 'User is active',
    ariaLive: 'polite',
  },
  inactive: {
    label: 'Inactive',
    className: 'bg-slate-100 text-slate-700 ring-1 ring-slate-200',
    variant: 'subtle',
    ariaLabel: 'User is inactive',
    ariaLive: 'off',
  },
  pending: {
    label: 'Pending',
    className: 'bg-amber-100 text-amber-800 ring-1 ring-amber-200',
    variant: 'subtle',
    ariaLabel: 'User invitation is pending',
    ariaLive: 'polite',
  },
  banned: {
    label: 'Banned',
    className: 'bg-red-100 text-red-800 ring-1 ring-red-200',
    variant: 'solid',
    ariaLabel: 'User is banned',
    ariaLive: 'assertive',
  },
};

/**
 * Size scale shared by every badge in the design system.
 */
export const BADGE_SIZE_CLASSES: Record<BadgeSize, string> = {
  sm: 'text-xs px-1.5 py-0.5 gap-1',
  md: 'text-sm px-2 py-0.5 gap-1.5',
  lg: 'text-base px-3 py-1 gap-2',
};

export const BADGE_BASE_CLASSES =
  'inline-flex items-center rounded-full font-medium whitespace-nowrap';

export const DEFAULT_BADGE_SIZE: BadgeSize = 'md';
