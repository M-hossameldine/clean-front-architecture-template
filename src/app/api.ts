import { createApi } from "@reduxjs/toolkit/query/react"

import { baseQueryWithTransform } from "../common/data/remote/helpers/customReduxBaseQuery"

export const appApi = createApi({
  reducerPath: "appApiState",
  baseQuery: baseQueryWithTransform,
  endpoints: builder => ({}),
})
