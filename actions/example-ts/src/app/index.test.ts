import actions, { context } from "."

describe("app", () => {
  it("should executes runner", async () => {
    const runner = jest.fn()
    await actions.exec(runner)
    expect(runner).toHaveBeenCalledTimes(1)
  })
})

describe("app.context", () => {
  it("should contains metadata", () => {
    expect(context.name).not.toBe("")
    expect(context.version).not.toBe("")
  })

  it("should contains plugins", () => {
    expect(context.use("input")).not.toBeFalsy()
    expect(context.use("log")).not.toBeFalsy()
  })
})
