import type { ExecOptions } from "@actions/exec"
import type { AppRunner } from "@utils/actions"
import type App from "../app"

const action: AppRunner<typeof App> = async (data, context) => {
  let lookupTable = ""
  for (const domain of data.input.domains) {
    const row = `${data.input.ip}   ${domain}`
    lookupTable += "\n" + row
  }

  const exec = context.use("exec")
  const options = {
    input: Buffer.from(lookupTable, "utf8"),
  } satisfies ExecOptions

  await exec.withOptions(options).run("sudo", "tee", "-a", data.input.tableFile)
}

export default action
