import type { AppRunner } from '@kcws/github-actions'
import type app from '../app'

import { join } from 'node:path'
import { existsSync } from 'node:fs'

import { asdfPluginAdd, asdfPluginList, asdfToolInstall, asdfToolList } from '../apis/asdf'

const runner: AppRunner<typeof app> = async (data, context) => {
  await asdfSetup(data, context)

  const path = await context.use('io').which('asdf', false)
  if (path === undefined || path === null || path === '') {
    await asdfInstall(data, context)
  }

  if (data.input.tool) {
    await asdfInstallPlugins(data, context)
    await asdfInstallTools(data, context)
  }
}

const asdfSetup: AppRunner<typeof app> = async (data, context) => {
  return context.use('helper').group('Set up asdf', async () => {
    context.use('log').debug('Setting up system for asdf')

    context.use('system').setEnvVar('ASDF_DIR', data.input.asdfDir)
    context.use('system').addPaths(join(data.input.asdfDir, 'bin'), join(data.input.asdfDir, 'shims'))
  })
}

const asdfInstall: AppRunner<typeof app> = async (data, context) => {
  const executor = context.use('exec')
  const logger = context.use('log')
  return context.use('helper').group('Install asdf', async () => {
    if (existsSync(data.input.asdfDir)) {
      logger.info("Updating asdf to version '{0}' on (ASDF_DIR={1})", data.input.ref, data.input.asdfDir)

      executor.withOptions({ cwd: data.input.asdfDir })
      await executor.rerun('git', 'remote', 'set-branches', 'origin', data.input.ref)
      await executor.rerun('git', 'fetch', '--depth', '1', 'origin', data.input.ref)
      await executor.rerun('git', 'checkout', '-B', data.input.ref, 'origin')
    } else {
      logger.info("Installing asdf version '{0}' on (ASDF_DIR={1})", data.input.ref, data.input.asdfDir)

      await executor.rerun(
        'git',
        'clone',
        '--depth',
        '1',
        '--branch',
        data.input.ref,
        '--single-branch',
        'https://github.com/asdf-vm/asdf.git',
        data.input.asdfDir
      )
    }
  })
}

const asdfInstallPlugins: AppRunner<typeof app> = (data, context) => {
  return context.use('helper').group('Install asdf plugins', async () => {
    const installed = await asdfPluginList(context)
    const toolVersion = await asdfToolList(context, data.input.toolFile)
    await Promise.all(
      toolVersion.map(async ({ name }) => {
        if (!installed.includes(name)) {
          await asdfPluginAdd(context, name)
        }
      })
    )
  })
}

const asdfInstallTools: AppRunner<typeof app> = (data, context) => {
  return context.use('helper').group('Install asdf tools', () => {
    return asdfToolInstall(context, data.input.workDir)
  })
}

export default runner
