import { AppRunner } from "@kcws/github-actions"

import app from "../app"

const runner: AppRunner<typeof app> = (data, context) => {
  if (data.input.cache.enabled) {
    context.use("log").info("Downloading cache at {0}", data.input.asdfDir)
    context.use("cache").restore(
      {
        system: true,
        custom: [data.input.cache.key],
      },
      data.input.asdfDir
    )
  } else {
    context.use("log").info("Disabled caching via user config")
  }
}

export default runner
