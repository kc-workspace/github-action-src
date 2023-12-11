import type { BaseContext, ContextPlugin } from ".."

import { restoreCache, saveCache } from "@actions/cache"
import {
  type CacheKeyOption,
  getRestoreCacheKeys,
  getSaveCacheKey,
} from "@utils/caches"

export class CacheContextPlugin implements ContextPlugin<"cache"> {
  readonly name = "cache"

  private actionName = ""

  init(context: BaseContext) {
    this.actionName = context.name
  }

  async restore(option: CacheKeyOption, ...paths: string[]) {
    await restoreCache(
      paths,
      getSaveCacheKey(option, this.actionName),
      getRestoreCacheKeys(option, this.actionName)
    )
  }

  async save(option: CacheKeyOption, ...paths: string[]) {
    await saveCache(paths, getSaveCacheKey(option, this.actionName))
  }
}
