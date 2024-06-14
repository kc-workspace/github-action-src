import { AppRunner } from "@kcws/github-actions"

import app from "../app"

const runner: AppRunner<typeof app> = (data, context) => {
  if (data.input.cache.enabled) {
    context.use("cache").restore(
      {
        system: true,
        custom: [data.input.cache.key],
      },
      data.input.asdfDir
    )
  }
}

export default runner
