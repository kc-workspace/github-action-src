import type { Configuration } from "@rspack/cli"
import type { Callback, Merge, OmitFirst } from "./models"

import { existsSync } from "node:fs"
import { resolve } from "node:path"

export class ConfigWrapper {
  constructor(private readonly base: Configuration) {}

  setEntry(
    input: Exclude<Configuration["entry"], undefined>,
    condition?: () => boolean
  ): this {
    if (condition === undefined || condition()) {
      this.base.entry = input
    }

    return this
  }

  addEntry(
    input: Exclude<Configuration["entry"], string | string[] | undefined>,
    condition?: () => boolean
  ): this {
    const entry = typeof this.base.entry === "object" ? this.base.entry : {}
    return this.setEntry(
      {
        ...entry,
        ...input,
      },
      condition
    )
  }

  addEntryByName(
    name: string,
    input: Exclude<
      Configuration["entry"],
      string | string[] | undefined
    >[string],
    condition?: () => boolean
  ): this {
    return this.addEntry(
      {
        [name]: input,
      },
      condition
    )
  }

  copy(name: string, basepath: string, ...paths: string[]): this {
    this.base.builtins = this.base.builtins ?? {}
    this.base.builtins.copy = this.base.builtins.copy ?? { patterns: [] }

    const patterns = this.base.builtins.copy.patterns
    const from = resolve(basepath, ...paths)
    if (existsSync(from)) {
      const to = resolve(this.base.output?.path ?? "", name, ...paths)
      patterns.push({
        from,
        to,
      })
    }

    this.base.builtins.copy.patterns = patterns
    return this
  }

  get config(): Configuration {
    return this.base
  }
}

export interface Settings {
  debug?: boolean
}

export class Config<
  CONFIG,
  Callbacks extends Record<
    string,
    Callback<unknown, unknown, unknown[]>
  > = NonNullable<unknown>,
> {
  static builder<CONFIG extends Configuration>(base: CONFIG): Config<CONFIG> {
    return new Config(new ConfigWrapper(base))
  }

  private callbacks: Record<string, Callback<unknown, unknown, unknown[]>>
  private constructor(private readonly base: ConfigWrapper) {
    this.callbacks = {}
  }

  define<
    Name extends string,
    ARGS extends unknown[],
    CB extends Callback<ConfigWrapper, ConfigWrapper, ARGS> = Callback<
      ConfigWrapper,
      ConfigWrapper,
      ARGS
    >,
  >(name: Name, callback: CB): Config<CONFIG, Merge<Callbacks, Name, CB>> {
    this.callbacks[name] = callback as unknown as Callbacks[Name]
    return this as unknown as Config<CONFIG, Merge<Callbacks, Name, CB>>
  }

  use<Name extends keyof Callbacks>(
    name: Name,
    ...arguments_: OmitFirst<Parameters<Callbacks[Name]>>
  ): Config<ReturnType<Callbacks[Name]>, Callbacks> {
    this.callbacks[name as string](this.base, ...arguments_) as ConfigWrapper
    return this as unknown as Config<ReturnType<Callbacks[Name]>, Callbacks>
  }

  build(setting?: Settings): CONFIG {
    if (setting?.debug === true)
      console.log(JSON.stringify(this.base.config, undefined, "  "))
    return this.base.config as CONFIG
  }
}
