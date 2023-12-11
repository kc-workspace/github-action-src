import { type BaseContext, ContextBuilder } from "@utils/contexts"

import { Actions, type Runner } from "."

describe("utils.actions.action", () => {
  const mockRunner = <Input extends object, Context extends BaseContext>(
    _: Actions<Input, Context>
  ) => {
    return jest.fn<Promise<void>, Parameters<Runner<Input, Context>>>()
  }

  const context = ContextBuilder.builder("", "").build()
  const input = { a: "animal", b: "bee", c: 123, d: false }
  const action = Actions.builder(context, () => input)

  test("use default data from builder", async () => {
    const function_ = mockRunner(action)
    await action.exec(function_)

    expect(function_).toHaveBeenCalledTimes(1)
    expect(function_).toHaveBeenCalledWith({ input }, context)
  })

  test("use custom data", async () => {
    const function_ = mockRunner(action)
    await action.exec(function_, { c: 1234 })

    expect(function_).toHaveBeenCalledTimes(1)
    expect(function_).toHaveBeenCalledWith(
      {
        input: {
          a: "animal",
          b: "bee",
          c: 1234,
          d: false,
        },
      },
      context
    )
  })
})
