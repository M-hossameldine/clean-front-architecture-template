import { appApi } from "../../../../app/api"

import type { ToggleUserStatusRequestApiParams } from "../model/UserApiModel"

export const UserAPI = appApi.injectEndpoints({
  endpoints: builder => ({
    getUser: builder.query({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
    }),

    toggleUserStatus: builder.mutation({
      query: ({ payload, userId }: ToggleUserStatusRequestApiParams) => ({
        url: `/user/${userId}`,
        method: "PUT",
        body: payload,
      }),
    }),
  }),
})

export const { getUser, toggleUserStatus } = UserAPI.endpoints
export const { useGetUserQuery, useToggleUserStatusMutation } = UserAPI // * we won't be using these hooks
