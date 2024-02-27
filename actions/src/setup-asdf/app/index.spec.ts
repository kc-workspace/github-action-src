import { getInput, setFailed } from "@actions/core"
import { asMock, mockRunner } from "@utils/mocks"

import app, { context } from "."

jest.mock("@actions/core")

describe("action application", () => {
  test("require field", async () => {
    expect(app).toBeDefined()

    const function_ = mockRunner(app)
    await app.exec(function_)

    expect(setFailed).toHaveBeenCalledTimes(1)
  })

  test("contains export default", async () => {
    expect(app).toBeDefined()

    asMock(getInput).mockImplementationOnce(name =>
      name === "ref" ? "dev" : ""
    )

    const function_ = mockRunner(app)
    await app.exec(function_)

    expect(setFailed).not.toHaveBeenCalled()
    expect(function_).toHaveBeenCalledTimes(1)
    expect(function_).toHaveBeenCalledWith(
      {
        input: {
          cache: {
            key: undefined,
          },
          ref: "dev",
        },
      },
      context
    )
  })

  test("executes default config", async () => {
    asMock(getInput).mockReturnValue("example")

    const function_ = mockRunner(app)
    await app.exec(function_)

    expect(setFailed).not.toHaveBeenCalled()
    expect(function_).toHaveBeenCalledTimes(1)
    expect(function_).toHaveBeenCalledWith(
      {
        input: {
          cache: {
            key: "example",
          },
          ref: "example",
        },
      },
      context
    )
  })
})
