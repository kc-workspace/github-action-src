import { getInput, info } from "@actions/core"
import { asMock } from "@utils/mocks"

import app from "../app"
import run from "./pre"

jest.mock("@actions/core")

describe("action pre runner", () => {
  test("default config", async () => {
    asMock(getInput).mockReturnValue("example")

    await app.exec(run)

    // Expected rules
    expect(info).toHaveBeenCalledTimes(1)
    expect(info).toHaveBeenCalledWith("hello pre example")
  })
  test("custom config", async () => {
    await app.exec(run, { ref: "dev" })

    // Expected rules
    expect(info).toHaveBeenCalledTimes(1)
    expect(info).toHaveBeenCalledWith("hello pre dev")
  })
})
