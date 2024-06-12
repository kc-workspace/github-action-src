import { AppRunner } from "@kcws/github-actions"

import actions from "./app"

const runner: AppRunner<typeof actions> = (data, context) => {
  const logger = context.use("log")

  logger.info("Use {0}: {1}", context.name, context.version)
  logger.info("hello {name}", data.input)
}

actions.exec(runner)

export default runner
