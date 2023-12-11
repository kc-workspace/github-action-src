/* eslint-disable n/no-unpublished-import */

import type { RspackPluginInstance } from "@rspack/core"

import { existsSync } from "node:fs"
import { resolve } from "node:path"
import { Config } from "@internal/rspack"
import StatoscopePlugin from "@statoscope/webpack-plugin"

export const relative = (...paths: string[]): string => {
  // rspack config was not support module yet
  // eslint-disable-next-line unicorn/prefer-module
  return resolve(__dirname, ...paths)
}

const builder = Config.builder({
  // mode: "development",
  target: "node",
  output: {
    path: relative("..", ".cache"),
    filename: "[name].js",
  },
  externals: {
    encoding: "encoding",
  },
  resolve: {
    tsConfig: {
      configFile: relative("tsconfig.json"),
      references: "auto",
    },
  },
  // https://github.com/statoscope/statoscope/tree/master/packages/webpack-plugin#faq
  stats: {
    all: false, // disable all the stats
    // hash: true, // compilation hash
    // entrypoints: true, // entrypoints
    // chunks: true, // chunks
    // chunkModules: true, // modules
    // reasons: true, // modules reasons
    // ids: true, // IDs of modules and chunks (webpack 5)
    // chunkRelations: true, // chunk parents, children and siblings (webpack 5)
    // nestedModules: true, // concatenated modules
    assets: true, // assets
    // version: true, // webpack version
    builtAt: true, // build at time
    // timings: true, // modules timing information
    // logging: "none",
    // warningsCount: true,
    // errorsCount: true,
  },
  plugins: [
    new StatoscopePlugin({
      saveReportTo: "reports/[name].html",
      saveStatsTo: "reports/[name].json",
      normalizeStats: false,
      saveOnlyStats: false,
      disableReportCompression: false,
      watchMode: false,
      open: false,
      name: "actions-stats",
      compressor: "gzip",
    }) as unknown as RspackPluginInstance,
  ],
  experiments: {
    rspackFuture: {
      newResolver: true,
    },
  },
}).define<"module", [string]>("module", (config, name: string) => {
  const basepath = relative("src", name)
  const preScript = resolve(basepath, "pre.ts")
  const postScript = resolve(basepath, "post.ts")

  return config
    .addEntryByName(`${name}/index`, basepath)
    .addEntryByName(`${name}/pre`, preScript, () => existsSync(preScript))
    .addEntryByName(`${name}/post`, postScript, () => existsSync(postScript))
    .copy(name, basepath, "README.md")
    .copy(name, basepath, "action.yaml")
})

export default builder
  .use("module", "example-ts")
  .use("module", "create-hosts")
  .use("module", "setup-asdf")
  .build()
