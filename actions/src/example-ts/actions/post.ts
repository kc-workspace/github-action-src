import type { AppRunner } from "@utils/actions"
import type App from "../app"

const action: AppRunner<typeof App> = (data, context) => {
  context.use("log").info("hello post {0}", data.input.name)
}

export default action
