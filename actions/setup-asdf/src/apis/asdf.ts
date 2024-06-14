import type { ToolVersion } from "./asdf.type"

import { join } from "node:path"
import { readFile } from "node:fs/promises"
import { AppContext } from "@kcws/github-actions"

import app from "../app"

export const asdfPluginList = async (context: AppContext<typeof app>) => {
  const executors = context.use("exec")

  const { code, stdout, stderr } = await executors.captureRun(
    "asdf",
    "plugin",
    "list"
  )
  if (code > 0) throw new Error(stderr?.toString() ?? "unknown error occurred")
  return stdout?.toString().split("\n") ?? []
}

export const asdfPluginAdd = async (
  context: AppContext<typeof app>,
  plugin: string,
  pluginUrl: string = "https://github.com/kc-workspace/asdf-{0}.git"
) => {
  const repo = context.use("log").format(pluginUrl, plugin)
  await context.use("exec").run("asdf", "plugin", "add", plugin, repo)
}

export const asdfToolList = async (
  _context: AppContext<typeof app>,
  cwd: string
): Promise<ToolVersion[]> => {
  const toolVersions = await readFile(join(cwd, ".tool-versions"), {
    encoding: "utf8",
  })

  return toolVersions
    .split("\n")
    .map(x => x.replace(/#.*/, "").trim())
    .filter(x => x.length > 0)
    .map(x => x.split(" "))
    .map(([name, version]) => ({ name, version }))
}

export const asdfToolInstall = async (
  context: AppContext<typeof app>,
  cwd: string
): Promise<void> => {
  const options = { cwd }
  await context.use("exec").withOptions(options).run("asdf", "install")
}
