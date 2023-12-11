import type { BaseContext, Plugins } from "./types"

// eslint-disable-next-line @typescript-eslint/ban-types
export class DefaultContext<PLUGINS extends Plugins = {}>
  implements BaseContext
{
  constructor(
    readonly name: string,
    readonly version: string,
    private readonly plugins: PLUGINS
  ) {
    // Initiate plugins
    for (const key of Object.keys(plugins)) plugins[key].init(this)
  }

  use<N extends keyof PLUGINS>(name: N): PLUGINS[N] {
    return this.plugins[name]
  }
}
