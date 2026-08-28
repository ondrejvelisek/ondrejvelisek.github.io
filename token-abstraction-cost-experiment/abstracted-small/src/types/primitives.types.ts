export type Prettify<T> = { [K in keyof T]: T[K] } & {};

export type ValueOf<T> = T[keyof T];

export type NonEmptyArray<T> = readonly [T, ...T[]];

export type Brand<TValue, TBrand extends string> = TValue & {
  readonly __brand: TBrand;
};

export type DeepReadonly<T> = T extends (infer TItem)[]
  ? readonly DeepReadonly<TItem>[]
  : T extends object
    ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
    : T;

export type Entries<T> = ReadonlyArray<readonly [keyof T, ValueOf<T>]>;

export type AtLeastOne<T, TKeys extends keyof T = keyof T> = Partial<T> &
  ValueOf<{ [K in TKeys]: Required<Pick<T, K>> }>;

export type NumericString = Brand<string, 'NumericString'>;

export function toNumericString(value: string): NumericString {
  return value as NumericString;
}
