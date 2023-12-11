import type { BaseContext } from "@utils/contexts"
import type { InputBuilder, Runner } from "./types"

import { setFailed } from "@actions/core"
import { deepMerge } from "@utils/objects"

class Actions<Input extends object, Context extends BaseContext> {
  static builder<Input extends object, Context extends BaseContext>(
    context: Context,
    builder: InputBuilder<Input, Context>
  ) {
    return new Actions(context, builder)
  }

  private constructor(
    private readonly context: Context,
    private readonly builder: InputBuilder<Input, Context>
  ) {}

  async exec(runner: Runner<Input, Context>, input?: Partial<Input>) {
    try {
      const base = this.builder(this.context)
      const data = {
        input: deepMerge(base, input),
      }

      await runner(data, this.context)
    } catch (error) {
      setFailed(error as Error)
    }
  }
}

export { Actions }
