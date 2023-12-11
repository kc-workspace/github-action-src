import type { BaseConverter } from "./types"

import { ConvertError } from "./errors"

export const convert = <Output, Input>(
  data: Input,
  converter: BaseConverter<Input, Output>
): Output => {
  try {
    return converter.convert(data)
  } catch (error) {
    throw new ConvertError(data, converter.targetType, error as Error)
  }
}
