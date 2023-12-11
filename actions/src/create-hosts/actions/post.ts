import type { AppRunner } from "@utils/actions"
import type App from "../app"

const action: AppRunner<typeof App> = async (data, context) => {
  const exec = context.use("exec")
  await exec.run("sudo", "rm", "-f", data.input.tableFile)
}

export default action
