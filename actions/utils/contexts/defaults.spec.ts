import { type ContextPlugin, DefaultContext } from "."

describe("utils.context.defaults", () => {
  test("create empty context", () => {
    const context = new DefaultContext("", "v0.0.0", {})

    expect(context.name).toEqual("")
    expect(context.version).toEqual("v0.0.0")
  })

  test("create with plugin", () => {
    const context = new DefaultContext("", "v0.0.0", {
      test: new (class TestContextPlugin implements ContextPlugin<"test"> {
        readonly name = "test"

        // eslint-disable-next-line @typescript-eslint/no-empty-function
        init() {}
      })(),
    })

    expect(context.use("test").name).toEqual("test")
  })
})
