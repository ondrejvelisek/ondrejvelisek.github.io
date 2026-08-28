import { useMemo } from 'react';

import { STATUS_CONFIG } from '../constants/status.constants';
import type { BadgeProps, BadgeSize, UserStatus } from '../types/status.types';

interface UseStatusBadgeOptions {
  size?: BadgeSize;
  className?: string;
}

/**
 * Maps a domain UserStatus onto the presentation props of the badge primitive.
 *
 * Kept as a hook (rather than a plain function) so that later it can subscribe
 * to theme context or a feature flag without touching any call site.
 */
export function useStatusBadge(
  status: UserStatus,
  options: UseStatusBadgeOptions = {},
): BadgeProps {
  const { size, className } = options;

  return useMemo(() => {
    const config = STATUS_CONFIG[status];

    return {
      label: config.label,
      className: [config.className, className].filter(Boolean).join(' '),
      size,
      variant: config.variant,
      role: 'status',
      'aria-label': config.ariaLabel,
      'aria-live': config.ariaLive,
      'data-status': status,
    };
  }, [status, size, className]);
}
