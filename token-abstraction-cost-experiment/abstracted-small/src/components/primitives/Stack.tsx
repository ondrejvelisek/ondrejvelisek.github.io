import { joinClassNames } from '../../utils/string/joinClassNames';
import type { BoxProps } from './Box';
import { Box } from './Box';

export type StackDirection = 'row' | 'column';
export type StackGap = 'none' | 'tight' | 'cosy' | 'roomy';
export type StackAlign = 'start' | 'center' | 'between' | 'end' | 'stretch';

/** Literal class names — Tailwind's scanner needs to see them in source. */
const DIRECTION_CLASSES: Record<StackDirection, string> = {
  row: 'flex flex-row',
  column: 'flex flex-col',
};

const GAP_CLASSES: Record<StackGap, string> = {
  none: 'gap-0',
  tight: 'gap-1',
  cosy: 'gap-2',
  roomy: 'gap-4',
};

const ALIGN_CLASSES: Record<StackAlign, string> = {
  start: 'items-start justify-start',
  center: 'items-center justify-center',
  between: 'items-center justify-between',
  end: 'items-end justify-end',
  stretch: 'items-stretch justify-start',
};

export interface StackProps extends Omit<BoxProps, 'as'> {
  readonly as?: BoxProps['as'];
  readonly direction?: StackDirection;
  readonly gap?: StackGap;
  readonly align?: StackAlign;
}

export function Stack({
  direction = 'column',
  gap = 'cosy',
  align = 'start',
  className,
  ...rest
}: StackProps) {
  return (
    <Box
      className={joinClassNames(
        DIRECTION_CLASSES[direction],
        GAP_CLASSES[gap],
        ALIGN_CLASSES[align],
        className,
      )}
      {...rest}
    />
  );
}

export default Stack;
