import { Actions } from "@utils/actions"
import { ContextBuilder } from "@utils/contexts"
import {
  ExecContextPlugin,
  InputContextPlugin,
  LogContextPlugin,
} from "@utils/contexts/plugins"

export const context = ContextBuilder.builder("example-ts", "v0.1.0-dev")
  .addPlugin(new InputContextPlugin())
  .addPlugin(new LogContextPlugin())
  .addPlugin(new ExecContextPlugin())
  .build()

export default Actions.builder(context, context_ => {
  return {
    name: context_.use("input").optionalString("name") ?? "example",
  }
})
