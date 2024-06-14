import type { AppRunner } from "@kcws/github-actions"
import type app from "../app"

import { join } from "node:path"
import { existsSync } from "node:fs"
import { which } from "@actions/io"
import { addPath, exportVariable } from "@actions/core"

import {
  asdfPluginAdd,
  asdfPluginList,
  asdfToolInstall,
  asdfToolList,
} from "../apis/asdf"

const runner: AppRunner<typeof app> = async (data, context) => {
  await asdfSetup(data, context)

  const path = await which("asdf", false)
  if (path === undefined || path === null || path === "") {
    await asdfInstall(data, context)
  }

  if (data.input.tool) {
    await asdfInstallPlugins(data, context)
    await asdfInstallTools(data, context)
  }
}

const asdfSetup: AppRunner<typeof app> = async (data, context) => {
  context.use("log").debug("Setting up system for asdf")

  exportVariable("ASDF_DIR", data.input.asdfDir)
  addPath(join(data.input.asdfDir, "bin"))
  addPath(join(data.input.asdfDir, "shims"))
}

const asdfInstall: AppRunner<typeof app> = async (data, context) => {
  const executor = context.use("exec")
  const logger = context.use("log")
  if (existsSync(data.input.asdfDir)) {
    logger.info(
      "Updating asdf to version '{0}' on (ASDF_DIR={1})",
      data.input.ref,
      data.input.asdfDir
    )

    executor.withOptions({ cwd: data.input.asdfDir })
    executor.rerun("git", "remote", "set-branches", "origin", data.input.ref)
    executor.rerun("git", "fetch", "--depth", "1", "origin", data.input.ref)
    executor.rerun("git", "checkout", "-B", data.input.ref, "origin")
  } else {
    logger.info(
      "Installing asdf version '{0}' on (ASDF_DIR={1})",
      data.input.ref,
      data.input.asdfDir
    )

    executor.rerun(
      "git",
      "clone",
      "--depth",
      "1",
      "--branch",
      data.input.ref,
      "--single-branch",
      "https://github.com/asdf-vm/asdf.git",
      data.input.asdfDir
    )
  }
}

const asdfInstallPlugins: AppRunner<typeof app> = async (data, context) => {
  const installed = await asdfPluginList(context)
  const toolVersion = await asdfToolList(context, data.input.workDir)
  await Promise.all(
    toolVersion.map(async ({ name }) => {
      if (!installed.includes(name)) {
        await asdfPluginAdd(context, name)
      }
    })
  )
}

const asdfInstallTools: AppRunner<typeof app> = async (data, context) => {
  await asdfToolInstall(context, data.input.workDir)
}

export default runner
