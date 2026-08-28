import { DECIMAL_SEPARATOR, ZERO_ENTRY } from '../../constants/numeric.constants';

export function groupThousands(rawEntry: string): string {
  const [integerPart = ZERO_ENTRY, ...fractionParts] = rawEntry.split(DECIMAL_SEPARATOR);
  const grouped = Number(integerPart).toLocaleString('en-US', { maximumFractionDigits: 0 });

  if (fractionParts.length === 0) return grouped;
  return `${grouped}${DECIMAL_SEPARATOR}${fractionParts.join(DECIMAL_SEPARATOR)}`;
}
