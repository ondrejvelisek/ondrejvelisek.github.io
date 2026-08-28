export function pipe<A, B>(value: A, ab: (input: A) => B): B;
export function pipe<A, B, C>(value: A, ab: (input: A) => B, bc: (input: B) => C): C;
export function pipe<A, B, C, D>(
  value: A,
  ab: (input: A) => B,
  bc: (input: B) => C,
  cd: (input: C) => D,
): D;
export function pipe<A, B, C, D, E>(
  value: A,
  ab: (input: A) => B,
  bc: (input: B) => C,
  cd: (input: C) => D,
  de: (input: D) => E,
): E;
export function pipe(value: unknown, ...steps: readonly ((input: unknown) => unknown)[]): unknown {
  return steps.reduce((accumulated, step) => step(accumulated), value);
}
