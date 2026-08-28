import type { HTMLAttributes, ReactNode } from 'react';

import { joinClassNames } from '../../utils/string/joinClassNames';

export type BoxElement = 'div' | 'span' | 'section' | 'aside' | 'main' | 'header' | 'footer' | 'ol' | 'li';

export interface BoxProps extends HTMLAttributes<HTMLElement> {
  readonly as?: BoxElement;
  readonly children?: ReactNode;
}

export function Box({ as: Element = 'div', className, children, ...rest }: BoxProps) {
  return (
    <Element className={joinClassNames(className)} {...rest}>
      {children}
    </Element>
  );
}

export default Box;
