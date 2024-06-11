import {
  ContextBuilder,
  InputContextPlugin,
  LogContextPlugin,
} from "@kcws/github-actions"

export default ContextBuilder.builder()
  .setName("example-ts")
  .setVersion("v1.0.0")
  .addPlugin(new LogContextPlugin())
  .addPlugin(new InputContextPlugin())
  .build()
