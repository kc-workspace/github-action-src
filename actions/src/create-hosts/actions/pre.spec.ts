import { getInput } from "@actions/core"
import { exec } from "@actions/exec"
import { asMock } from "@utils/mocks"

import app from "../app"
import run from "./pre"

jest.mock("@actions/core")
jest.mock("@actions/exec")

describe("action pre runner", () => {
  test("default config", async () => {
    asMock(getInput).mockReturnValue("example")

    await app.exec(run)

    // Expected rules
    expect(exec).toHaveBeenCalledTimes(1)
    expect(exec).toHaveBeenCalledWith(
      "sudo",
      ["cp", "/etc/hosts", "/etc/hosts.tmp"],
      undefined
    )
  })
  test("custom config", async () => {
    asMock(getInput).mockReturnValue("example")

    await app.exec(run, { cacheFile: "/tmp/cache", tableFile: "/tmp/table" })

    // Expected rules
    expect(exec).toHaveBeenCalledTimes(1)
    expect(exec).toHaveBeenCalledWith(
      "sudo",
      ["cp", "/tmp/table", "/tmp/cache"],
      undefined
    )
  })
})
