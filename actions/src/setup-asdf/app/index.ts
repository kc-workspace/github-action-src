import { Actions } from "@utils/actions"
import { ContextBuilder } from "@utils/contexts"
import {
  CacheContextPlugin,
  ExecContextPlugin,
  InputContextPlugin,
  LogContextPlugin,
} from "@utils/contexts/plugins"

export const context = ContextBuilder.builder("setup-asdf", "v0.1.0-dev")
  .addPlugin(new CacheContextPlugin())
  .addPlugin(new InputContextPlugin())
  .addPlugin(new LogContextPlugin())
  .addPlugin(new ExecContextPlugin())
  .build()

export default Actions.builder(context, context => {
  const inputs = context.use("input")

  const reference = inputs.requiredString("ref")
  const key = inputs.optionalString("cache-key")
  return {
    ref: reference,
    cache: {
      key,
    },
  }
})
