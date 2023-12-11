import type { BaseContext, DefaultContext } from "@utils/contexts"
import type { Actions } from "."

export interface BaseData<Input> {
  input: Input
}

export type InputBuilder<
  Input,
  Context extends BaseContext = DefaultContext,
> = (context: Context) => Input

export type Runner<Input, Context extends BaseContext = DefaultContext> = (
  data: BaseData<Input>,
  context: Context
) => Promise<void> | void

export type AppRunner<App> = App extends Actions<infer I, infer C>
  ? Runner<I, C>
  : never
