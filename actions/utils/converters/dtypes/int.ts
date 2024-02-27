import { type BaseConverter, convert, convertToString } from ".."

type Converter = BaseConverter<unknown, number>
type Convert = Converter["convert"]

class IntConverter implements Converter {
  readonly inputType: string = "any"
  readonly targetType: string = "int"
  convert(value: unknown): number {
    const string_ = convertToString(value)
    const output = Number.parseInt(string_, 10)
    if (Number.isFinite(output)) return output

    throw new Error(`${string_} is not an integer`)
  }
}

export const toInt: Converter = new IntConverter()
export const convertToInt: Convert = input => convert(input, toInt)
