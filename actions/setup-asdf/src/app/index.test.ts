// eslint-disable-next-line import/no-namespace
import * as core from "@actions/core"
import { ContextBuilder } from "@kcws/github-actions"

import app, { context } from "."

describe("app", () => {
  it("should fail when no required input", async () => {
    jest.spyOn(core, "setFailed")

    const runner = jest.fn()
    await app.exec(runner)

    expect(core.setFailed).toHaveBeenCalled()
    expect(core.setFailed).toHaveBeenCalledWith(
      new Error("Input required and not supplied: ref")
    )
  })

  it("should success", async () => {
    jest.spyOn(core, "getInput").mockImplementation(name => {
      switch (name) {
        case "ref":
          return "master"
        case "install-tools":
          return "true"
        case "cache-enabled":
          return "true"
        case "cache-key":
          return ""
        default:
          return ""
      }
    })

    const runner = jest.fn()
    await app.exec(runner)

    expect(runner).toHaveBeenCalledTimes(1)
  })
})

describe("app.context", () => {
  it("should contains metadata", () => {
    // By default package.json should not found on source code
    // because package.json is NOT on the same directory as source code
    expect(context.name).toBe("")
    expect(context.version).toBe("")

    ContextBuilder.fromContext(context)
  })

  it("should contains plugins", () => {
    expect(context.use("input")).not.toBeFalsy()
    expect(context.use("cache")).not.toBeFalsy()
    expect(context.use("log")).not.toBeFalsy()
    expect(context.use("exec")).not.toBeFalsy()
    expect(context.use("io")).not.toBeFalsy()
    expect(context.use("system")).not.toBeFalsy()
  })
})
