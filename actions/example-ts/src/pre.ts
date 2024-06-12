import { AppRunner } from "@kcws/github-actions"

import actions from "./app"

const runner: AppRunner<typeof actions> = (data, context) => {
  context.use("log").info("hello pre {name}", data.input)
}

actions.exec(runner)

export default runner