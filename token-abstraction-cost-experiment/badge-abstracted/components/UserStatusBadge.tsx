import React from 'react';

import { useStatusBadge } from '../hooks/useStatusBadge';
import type { UserStatusBadgeProps } from '../types/status.types';
import { BaseBadge } from './base/BaseBadge';

/**
 * Feature-level badge for a user's account status.
 *
 * All presentation lives in STATUS_CONFIG, all class composition lives in
 * BaseBadge, and the mapping between them lives in useStatusBadge. This
 * component is only the wiring.
 */
export function UserStatusBadge({
  status,
  size,
  className,
}: UserStatusBadgeProps): React.ReactElement {
  const badgeProps = useStatusBadge(status, { size, className });

  return <BaseBadge {...badgeProps} />;
}

export default UserStatusBadge;
