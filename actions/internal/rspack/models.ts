export type Callback<Config, NewConfig, T extends unknown[]> = (
  config: Config,
  ...arguments_: T
) => NewConfig
export type Merge<BaseObject, Key extends string, Value> = BaseObject & {
  [name in Key]: Value
}
export type OmitFirst<T extends unknown[]> = T extends [unknown, ...infer R]
  ? R
  : never
