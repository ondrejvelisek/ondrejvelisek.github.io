import React from 'react';

type UserStatus = 'active' | 'inactive' | 'pending' | 'banned';
type BadgeSize = 'sm' | 'md' | 'lg';

const STATUS = {
  active: {
    label: 'Active',
    className: 'bg-emerald-100 text-emerald-800 ring-1 ring-emerald-200',
    ariaLabel: 'User is active',
    ariaLive: 'polite',
  },
  inactive: {
    label: 'Inactive',
    className: 'bg-slate-100 text-slate-700 ring-1 ring-slate-200',
    ariaLabel: 'User is inactive',
    ariaLive: 'off',
  },
  pending: {
    label: 'Pending',
    className: 'bg-amber-100 text-amber-800 ring-1 ring-amber-200',
    ariaLabel: 'User invitation is pending',
    ariaLive: 'polite',
  },
  banned: {
    label: 'Banned',
    className: 'bg-red-100 text-red-800 ring-1 ring-red-200',
    ariaLabel: 'User is banned',
    ariaLive: 'assertive',
  },
} as const;

const SIZES: Record<BadgeSize, string> = {
  sm: 'text-xs px-1.5 py-0.5 gap-1',
  md: 'text-sm px-2 py-0.5 gap-1.5',
  lg: 'text-base px-3 py-1 gap-2',
};

export function UserStatusBadge({
  status,
  size = 'md',
  className,
}: {
  status: UserStatus;
  size?: BadgeSize;
  className?: string;
}): React.ReactElement {
  const config = STATUS[status];

  return (
    <span
      className={[
        'inline-flex items-center rounded-full font-medium whitespace-nowrap',
        SIZES[size],
        config.className,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      role="status"
      aria-label={config.ariaLabel}
      aria-live={config.ariaLive}
      data-status={status}
    >
      <span className="truncate">{config.label}</span>
    </span>
  );
}

export default UserStatusBadge;
