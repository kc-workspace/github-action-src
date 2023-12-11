import { getInput } from "@actions/core"
import { exec } from "@actions/exec"
import { asMock } from "@utils/mocks"

import app from "../app"
import run from "./post"

jest.mock("@actions/core")
jest.mock("@actions/exec")

describe("action post runner", () => {
  test("default config", async () => {
    asMock(getInput).mockReturnValue("example")

    await app.exec(run)

    // Expected rules
    expect(exec).toHaveBeenCalledTimes(1)
    expect(exec).toHaveBeenCalledWith(
      "sudo",
      ["rm", "-f", "/etc/hosts"],
      undefined
    )
  })
  test("custom config", async () => {
    await app.exec(run, { tableFile: "/usr/etc/hosts" })

    // Expected rules
    expect(exec).toHaveBeenCalledTimes(1)
    expect(exec).toHaveBeenCalledWith(
      "sudo",
      ["rm", "-f", "/usr/etc/hosts"],
      undefined
    )
  })
})
