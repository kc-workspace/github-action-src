import { homedir } from 'node:os'
import { join } from 'node:path'
import { existsSync } from 'node:fs'
import {
  ContextBuilder,
  InputContextPlugin,
  LogContextPlugin,
  Actions,
  ExecContextPlugin,
  CacheContextPlugin,
  toBool,
  SystemContextPlugin,
  IOContextPlugin,
  HelperContextPlugin,
} from '@kcws/github-actions'

export const context = ContextBuilder.fromPackageJson()
  .addPlugin(new LogContextPlugin())
  .addPlugin(new HelperContextPlugin())
  .addPlugin(new CacheContextPlugin())
  .addPlugin(new InputContextPlugin())
  .addPlugin(new ExecContextPlugin())
  .addPlugin(new SystemContextPlugin())
  .addPlugin(new IOContextPlugin())
  .build()

export default Actions.builder(context, context => {
  const inputs = context.use('input')

  const cwd = inputs.optionalString('workdir') ?? process.cwd()
  const toolFile = join(cwd, '.tool-versions')
  let toolInstall = inputs.required('install-tools', toBool)

  if (toolInstall && !existsSync(toolFile)) {
    context.use('log').warn('cannot install tools because file is missing', {
      title: '.tool-versions file is missing',
      file: toolFile,
    })

    // Force tool install to be disabled because no tool-versions found
    toolInstall = false
  }

  return {
    ref: inputs.requiredString('ref'),
    tool: toolInstall,
    cache: {
      enabled: inputs.required('cache-enabled', toBool),
      keys: inputs.optionalString('cache-key') ?? '',
    },
    asdfDir: inputs.optionalString('asdfdir') ?? join(homedir(), '.asdf'),
    toolFile: toolFile,
    workDir: cwd,
  }
})
