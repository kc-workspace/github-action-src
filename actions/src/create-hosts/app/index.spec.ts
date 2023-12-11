import { getInput, setFailed } from "@actions/core"
import { asMock, mockRunner } from "@utils/mocks"

import app, { context } from "."

jest.mock("@actions/core")

describe("action application", () => {
  test("contains export default", async () => {
    expect(app).toBeDefined()

    const function_ = mockRunner(app)
    await app.exec(function_)

    const error = "Input required and not supplied: domains"
    expect(setFailed).toHaveBeenCalledTimes(1)
    expect(setFailed).toHaveBeenCalledWith(new Error(error))
    expect(function_).not.toHaveBeenCalled()
  })

  test("executes default config", async () => {
    asMock(getInput).mockReturnValue("example,hello")

    const function_ = mockRunner(app)
    await app.exec(function_)

    expect(setFailed).not.toHaveBeenCalled()
    expect(function_).toHaveBeenCalledTimes(1)
    expect(function_).toHaveBeenCalledWith(
      {
        input: {
          domains: ["example", "hello"],
          ip: "example,hello",
          tableFile: "/etc/hosts",
          cacheFile: "/etc/hosts.tmp",
        },
      },
      context
    )
  })
})
