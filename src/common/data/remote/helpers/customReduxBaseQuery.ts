import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "app/store";

const baseUrl = import.meta.env.VITE_API_URL;

// 1. Create a custom baseQuery with a default transformResponse
const customBaseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    const lang = (getState() as RootState).ui.language;
    headers.set("Accept-language", lang);
    const partnerId = (getState() as RootState).info.urlInfo.partnerId;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    if (partnerId) {
      headers.set("X-Partner-Id", partnerId); // Todo: check with backend if "Partner-uuid" is the correct header name
    }

    return headers;
  },
});

// 3. Default transformation function that will be applied to all responses
const defaultTransform = (res: any) => {
  return res.data?.payload;
};

// 2. Wrap the baseQuery to apply the transformResponse globally
export const baseQueryWithTransform = async (
  args: any,
  api: any,
  extraOptions: any,
) => {
  // Todo: provide baseUrl as an argument, so that it can be used in the customBaseQuery for better unit testing
  const result = (await customBaseQuery(args, api, extraOptions)) as any;

  if (result.data?.payload) {
    // Apply a default transformation on the response data
    result.data = defaultTransform(result.data?.data?.payload); // ! this transformation is called but the api response is not transformed
  }

  return result;
};
