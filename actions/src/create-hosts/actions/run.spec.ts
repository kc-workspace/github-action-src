import { getInput } from "@actions/core"
import { exec } from "@actions/exec"
import { asMock } from "@utils/mocks"

import app from "../app"
import run from "./run"

jest.mock("@actions/core")
jest.mock("@actions/exec")

describe("action runner", () => {
  test("default config", async () => {
    asMock(getInput).mockReturnValue("example")

    await app.exec(run)

    expect(exec).toHaveBeenCalledTimes(1)
  })
  test("custom config", async () => {
    await app.exec(run, { domains: ["hello", "world"] })

    // Expected rules
    expect(exec).toHaveBeenCalledTimes(1)
  })
})
