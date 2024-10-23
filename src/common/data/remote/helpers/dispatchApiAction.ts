import { store } from "app/store"

type DispatchApiHelperParams = {
  dataMapper?: (data: any) => any
  apiEndpoint: any
  apiEndpointParams?: any
  payload?: any
}
type DispatchApiHelper = (params: DispatchApiHelperParams) => Promise<any>

export const dispatchApiAction: DispatchApiHelper = async ({
  apiEndpoint,
  apiEndpointParams,
  payload,
  dataMapper = (data: any) => data,
}) => {
  try {
    const { data }: any = await store.dispatch(
      (apiEndpoint as any)?.initiate?.({
        payload: {
          payload,
        },
        ...apiEndpointParams,
      }),
    )

    if (data && data?.data) {
      const mappedData = dataMapper(data?.data?.payload)
      return mappedData
    } else {
      throw new Error("Failed to fetch")
    }
  } catch (error) {
    console.error(error)
    return []
  }
}
