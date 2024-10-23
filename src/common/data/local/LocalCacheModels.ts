import type { User_LOCAL_CACHE_KEYS } from "../constants/CacheEnums"

export type LocalCacheKey = User_LOCAL_CACHE_KEYS

export interface LocalCacheRecord<DATA> {
  data: DATA
  timestamp: number // Cache timestamp
}
