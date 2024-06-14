import { homedir } from "node:os"
import { join } from "node:path"
import {
  ContextBuilder,
  InputContextPlugin,
  LogContextPlugin,
  Actions,
  ExecContextPlugin,
  CacheContextPlugin,
  toBool,
} from "@kcws/github-actions"

export const context = ContextBuilder.fromPackageJson()
  .addPlugin(new LogContextPlugin())
  .addPlugin(new CacheContextPlugin())
  .addPlugin(new InputContextPlugin())
  .addPlugin(new ExecContextPlugin())
  .build()

export default Actions.builder(context, context => {
  const inputs = context.use("input")

  return {
    ref: inputs.requiredString("ref"),
    tool: inputs.required("install-tools", toBool),
    cache: {
      enabled: inputs.required("cache-enabled", toBool),
      key: inputs.optionalString("cache-key") ?? "",
    },
    asdfDir: inputs.optionalString("asdfdir") ?? join(homedir(), ".asdf"),
    workDir: inputs.optionalString("workdir") ?? process.cwd(),
  }
})