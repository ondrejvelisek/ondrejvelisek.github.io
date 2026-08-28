import { GRID_COLUMN_CLASSES, LAYOUT_CLASSES } from '../../constants/class-names.constants';
import type { KeypadColumnCount } from '../../types/ui.types';
import { joinClassNames } from '../../utils/string/joinClassNames';
import type { BoxProps } from '../primitives/Box';
import { Box } from '../primitives/Box';

export interface BaseGridProps extends BoxProps {
  readonly columns: KeypadColumnCount;
}

export function BaseGrid({ columns, className, ...rest }: BaseGridProps) {
  return (
    <Box
      className={joinClassNames(LAYOUT_CLASSES.keyGrid, GRID_COLUMN_CLASSES[columns], className)}
      {...rest}
    />
  );
}

export default BaseGrid;
