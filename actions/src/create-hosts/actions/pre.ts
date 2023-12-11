import type { AppRunner } from "@utils/actions"
import type App from "../app"

const action: AppRunner<typeof App> = async (data, context) => {
  const exec = context.use("exec")
  await exec.run("sudo", "cp", data.input.tableFile, data.input.cacheFile)
}

export default action
