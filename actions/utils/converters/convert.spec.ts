import { convert, toString } from "."

describe("utils.converters.convert", () => {
  test.each([["hello", toString, "hello"]])(
    "convert(%p, %p) returns %p",
    (a, b, expected) => {
      const result = convert(a, b)
      expect(result).toEqual(expected)
    }
  )
})
