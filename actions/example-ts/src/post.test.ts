jest.mock("@actions/core")

import { info } from "@actions/core"

import { context } from "./app"
import runner from "./post"

describe("[post-hook] application runner", () => {
  test("should print info logs", async () => {
    await runner({ input: { name: "name" } }, context)
    expect(info).toHaveBeenCalledTimes(1)
    expect(info).toHaveBeenCalledWith("hello post name")
  })
})
