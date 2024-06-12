jest.mock("@actions/core")

import { info } from "@actions/core"

import { context } from "./app"
import runner from "./index"

describe("application runner", () => {
  test("should print info logs", async () => {
    await runner({ input: { name: "name" } }, context)
    expect(info).toHaveBeenCalled()
    expect(info).toHaveBeenLastCalledWith("hello name")
  })
})
