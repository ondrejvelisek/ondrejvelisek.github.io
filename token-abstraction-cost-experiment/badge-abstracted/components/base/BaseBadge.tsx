import React from 'react';

import {
  BADGE_BASE_CLASSES,
  BADGE_SIZE_CLASSES,
  DEFAULT_BADGE_SIZE,
} from '../../constants/status.constants';
import type { BadgeProps } from '../../types/status.types';

/**
 * Design-system badge primitive.
 *
 * Knows nothing about users or statuses — it only composes base classes, the
 * size scale and whatever the caller passes in. Feature components are expected
 * to derive their props from a hook and hand them over.
 */
export function BaseBadge({
  label,
  className,
  size = DEFAULT_BADGE_SIZE,
  variant = 'subtle',
  role = 'status',
  children,
  ...rest
}: BadgeProps): React.ReactElement {
  const sizeClasses = BADGE_SIZE_CLASSES[size];

  const composedClassName = [
    BADGE_BASE_CLASSES,
    sizeClasses,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span
      className={composedClassName}
      role={role}
      data-variant={variant}
      data-size={size}
      {...rest}
    >
      {children}
      <span className="truncate">{label}</span>
    </span>
  );
}

export default BaseBadge;
