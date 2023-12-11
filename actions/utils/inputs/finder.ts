import { getInput, type InputOptions } from "@actions/core"
import { type BaseConverter, convert } from "@utils/converters"
import { findEnvironment } from "@utils/environments"

export const findInputs = <Output>(
  key: string,
  name: string,
  converter: BaseConverter<string, Output>,
  options?: InputOptions
): Output | undefined => {
  const options_ = {
    required: false,
    trimWhitespace: true,
    ...options,
  }

  return parseInputs(key, name, getInput(name, options_), converter)
}

export const parseInputs = <Output>(
  key: string,
  name: string,
  data: string | undefined | null,
  converter: BaseConverter<string, Output>
) => {
  const environment = findEnvironment([key, name])
  const input = environment ?? data ?? ""
  return input === "" ? undefined : convert(input, converter)
}
