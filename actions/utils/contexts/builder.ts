import type { ContextPlugin, Plugins } from "./types"

import { DefaultContext } from "./defaults"

// eslint-disable-next-line @typescript-eslint/ban-types
export class ContextBuilder<PS extends Plugins = {}> {
  private plugins: PS

  static builder(name?: string, version?: string) {
    return new ContextBuilder(name ?? "", version ?? "v0.0.0-dev")
  }

  private constructor(
    private name: string,
    private version: string
  ) {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    this.plugins = {} as PS
  }

  setName(name: string): this {
    this.name = name
    return this
  }

  setVersion(version: string): this {
    this.version = version
    return this
  }

  addPlugin<P extends ContextPlugin<string>>(plugin: P) {
    this.plugins[plugin.name as keyof PS] = plugin as unknown as PS[P["name"]]
    return this as unknown as ContextBuilder<PS & Record<P["name"], P>>
  }

  build(): DefaultContext<PS> {
    return new DefaultContext(this.name, this.version, this.plugins)
  }
}
