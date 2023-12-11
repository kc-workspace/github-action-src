export type PrimitiveType = string | number | boolean

export interface BaseContext {
  readonly name: string
  readonly version: string
}

export interface ContextPlugin<NAME extends string> {
  readonly name: NAME

  init: (context: BaseContext) => void
}

export type Plugins = Record<string, ContextPlugin<string>>
