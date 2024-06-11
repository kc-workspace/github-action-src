import {
  ContextBuilder,
  InputContextPlugin,
  LogContextPlugin,
  Actions,
  ExecContextPlugin,
} from "@kcws/github-actions"

export const context = ContextBuilder.builder()
  .setName("example-ts")
  .setVersion("v1.0.0")
  .addPlugin(new LogContextPlugin())
  .addPlugin(new InputContextPlugin())
  .addPlugin(new ExecContextPlugin())
  .build()

export default Actions.builder(context, context => {
  return {
    name: context.use("input").optionalString("name") ?? "world",
  }
})
