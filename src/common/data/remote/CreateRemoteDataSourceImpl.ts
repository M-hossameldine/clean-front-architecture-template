import type { CreateRemoteDataSource } from "./CreateRemoteDataSource"
import { dispatchApiAction } from "./helpers/dispatchApiAction"

// TODO: handle add and get action to be optional
export const createRemoteDataSource: CreateRemoteDataSource = () => ({
  getData: async ({ apiEndpoint, apiParams, dataMapper }) => {
    return await dispatchApiAction({
      apiEndpoint: apiEndpoint,
      ...(apiParams ? { apiEndpointParams: apiParams } : {}),
      ...(dataMapper ? { dataMapper } : {}),
    })
  },

  setData: async ({ apiEndpoint, payload, apiParams, dataMapper }) => {
    return await dispatchApiAction({
      apiEndpoint: apiEndpoint,
      ...(apiParams ? { apiEndpointParams: apiParams } : {}),
      ...(payload ? { payload } : {}),
      ...(dataMapper ? { dataMapper } : {}),
    })
  },
})
