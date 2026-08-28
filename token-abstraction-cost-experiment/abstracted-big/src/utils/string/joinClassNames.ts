export function joinClassNames(
  ...fragments: readonly (string | false | null | undefined)[]
): string {
  return fragments
    .filter((fragment): fragment is string => typeof fragment === 'string' && fragment.length > 0)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}
