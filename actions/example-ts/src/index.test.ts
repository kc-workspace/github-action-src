import { greeting } from "./next"

describe("hello", () => {
  test("naming", () => {
    expect(greeting).toEqual("world")
  })
})
