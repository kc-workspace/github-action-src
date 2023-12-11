import type { CacheKeyOption } from "."

export const getSaveCacheKey = (option: CacheKeyOption, actionName: string) => {
  return getKeys(option, actionName).join("-")
}

export const getRestoreCacheKeys = (
  option: CacheKeyOption,
  actionName: string
) => {
  const keys = getKeys(option, actionName).slice(0, -1)
  return keys.map((_, index, keys) => {
    return keys
      .slice(0, keys.length - index)
      .join("-")
      .concat("-")
  })
}

const getKeys = (option: CacheKeyOption, actionName: string) => {
  const keys = []

  if (option.actionName !== false) keys.push(actionName)

  if (option.system === true) keys.push(process.platform, process.arch)
  else if (typeof option.system === "object") {
    if (option.system.platform !== false) keys.push(process.platform)
    if (option.system.arch !== false) keys.push(process.arch)
  }

  if (typeof option.custom === "object" && option.custom !== null)
    keys.push(...option.custom)

  return keys
}
