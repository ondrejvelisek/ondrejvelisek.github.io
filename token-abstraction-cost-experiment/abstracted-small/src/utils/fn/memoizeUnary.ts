export function memoizeUnary<TArgument, TResult>(
  compute: (argument: TArgument) => TResult,
  options: { readonly maxEntries?: number } = {},
): (argument: TArgument) => TResult {
  const { maxEntries = 128 } = options;
  const cache = new Map<TArgument, TResult>();

  return (argument: TArgument): TResult => {
    const cached = cache.get(argument);
    if (cached !== undefined || cache.has(argument)) return cached as TResult;

    const computed = compute(argument);
    if (cache.size >= maxEntries) {
      const oldestKey = cache.keys().next().value;
      if (oldestKey !== undefined) cache.delete(oldestKey);
    }
    cache.set(argument, computed);
    return computed;
  };
}
