import { store } from "app/store"
import type { CreateLocalDataSource } from "./CreateLocalDataSource"
import { setCacheTimestamp, invalidateCachedData } from "./LocalCacheSlice"
import type { LocalCacheRecord } from "./LocalCacheModels"
import { DEFAULT_CACHE_LIFETIME_MILLISECONDS } from "../../../constants/CachingPolicy"

export const createLocalDataSource: CreateLocalDataSource = ({
  selector,
  setDataAction,
  cacheKey,
}) => ({
  isValidCache: () => {
    const state = store.getState()
    const cachedData = selector(state)
    const cacheTimestamp = state.cache[cacheKey]?.timestamp // Retrieve timestamp from cache

    if (cachedData && cacheTimestamp) {
      const isCacheValid =
        Date.now() - cacheTimestamp < DEFAULT_CACHE_LIFETIME_MILLISECONDS

      if (isCacheValid) {
        return true
      }
    }

    return false // Return false if cache is invalid
  },

  getData: () => {
    const state = store.getState()
    const cachedData = selector(state)
    const cacheTimestamp = state.cache.cache[cacheKey]?.timestamp // Retrieve timestamp from cache

    if (cachedData && cacheTimestamp) {
      const isCacheValid =
        Date.now() - cacheTimestamp < DEFAULT_CACHE_LIFETIME_MILLISECONDS
      if (isCacheValid) {
        return cachedData
      }
    }

    return null // Return null if cache is invalid
  },

  setData: data => {
    type DATA = typeof data

    const cacheData: LocalCacheRecord<DATA> = {
      data,
      timestamp: Date.now(), // store the current timestamp
    }

    store.dispatch(setDataAction(cacheData))
    store.dispatch(
      setCacheTimestamp({ key: cacheKey, timestamp: cacheData.timestamp }),
    )
  },

  invalidateCache: () => {
    // Explicit cache invalidation logic
    store.dispatch(invalidateCachedData(cacheKey))
  },

  clearData: () => {
    // If needed, you can define a more complex clear logic
    store.dispatch(setDataAction({ data: null, timestamp: 0 }))
  },
})
