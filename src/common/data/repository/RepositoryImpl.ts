import type { CreateRemoteDataSourceReturn } from "../remote/CreateRemoteDataSource"
import type { CreateLocalDataSourceReturn } from "../local/CreateLocalDataSource"
import type { Repository } from "../../domain/repository/RepositoryModel"

export const createRepository = <
  T,
  L extends CreateLocalDataSourceReturn<T>,
  R extends CreateRemoteDataSourceReturn,
>(
  localDataSource: L,
  remoteDataSource: R,
): Repository => ({
  getData: async <Result = T>({
    apiEndpoint,
    apiParams,
    dataMapper,
  }: {
    apiEndpoint: any
    apiParams?: any
    dataMapper?: (data: any) => Result
  }) => {
    if (!localDataSource.isValidCache()) {
      // TODO: pass remote data source generics
      const remoteData = await remoteDataSource.getData({
        apiEndpoint,
        apiParams,
        dataMapper,
      })

      if (remoteData) {
        localDataSource.clearData()

        localDataSource.setData(remoteData as T)
      }

      return localDataSource.getData() as Result
    }

    return null
  },

  setData: async ({ apiEndpoint, apiParams, payload }) => {
    // TODO: pass remote data source generics
    await remoteDataSource.setData({
      apiEndpoint,
      apiParams,
      payload,
    })

    localDataSource.invalidateCache()
  },

  clearData: () => {
    localDataSource.clearData()
  },
})
