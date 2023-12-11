export interface SystemCacheKeyOption {
  platform?: boolean
  arch?: boolean
}

/** A options to how cache key will be built */
export interface CacheKeyOption {
  /** @default true */
  actionName?: boolean
  system?: boolean | SystemCacheKeyOption
  custom?: string[] | null
}
