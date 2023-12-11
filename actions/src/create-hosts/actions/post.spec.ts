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
    expect(exec).toHaveBeenCalledTimes(2)
    expect(exec).toHaveBeenNthCalledWith(
      1,
      "sudo",
      ["rm", "-f", "/etc/hosts"],
      // eslint-disable-next-line unicorn/no-useless-undefined
      undefined
    )
  })
  test("custom config", async () => {
    await app.exec(run, { tableFile: "/usr/etc/hosts" })

    // Expected rules
    expect(exec).toHaveBeenCalledTimes(2)
    expect(exec).toHaveBeenNthCalledWith(
      1,
      "sudo",
      ["rm", "-f", "/usr/etc/hosts"],
      // eslint-disable-next-line unicorn/no-useless-undefined
      undefined
    )
  })
})
