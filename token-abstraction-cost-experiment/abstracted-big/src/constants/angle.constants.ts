export const ANGLE_MODES = ['deg', 'rad'] as const;

type AngleModeLiteral = (typeof ANGLE_MODES)[number];

export const DEFAULT_ANGLE_MODE: AngleModeLiteral = 'deg';

export const RADIANS_PER_UNIT: Record<AngleModeLiteral, number> = {
  deg: Math.PI / 180,
  rad: 1,
};

export const ANGLE_MODE_LABEL: Record<AngleModeLiteral, string> = {
  deg: 'DEG',
  rad: 'RAD',
};

export const NEXT_ANGLE_MODE: Record<AngleModeLiteral, AngleModeLiteral> = {
  deg: 'rad',
  rad: 'deg',
};
