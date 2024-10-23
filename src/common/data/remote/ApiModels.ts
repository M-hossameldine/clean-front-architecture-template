export type ApiParams<PAYLOAD = void, PARAMS = void> = PAYLOAD extends void
  ? PARAMS extends void
    ? never // If both PAYLOAD and PARAMS are void, disallow usage
    : PARAMS // If only PAYLOAD is void, allow PARAMS only
  : PARAMS & { payload: { payload: PAYLOAD } }; // If PAYLOAD is provided, allow PARAMS and PAYLOAD

export type UseDataSourceQueryEndpointParams<PARAMS = void> =
  PARAMS extends void
    ? never // If both PAYLOAD and PARAMS are void, disallow usage
    : { apiParams: PARAMS }; // If only PAYLOAD is void, allow PARAMS only

export type UseDataSourceMutationEndpointParams<
  PAYLOAD = void,
  PARAMS = void,
> = PAYLOAD extends void
  ? PARAMS extends void
    ? never // If both PAYLOAD and PARAMS are void, disallow usage
    : { apiParams: PARAMS } // If only PAYLOAD is void, allow PARAMS only
  : PARAMS extends void
    ? { payload: PAYLOAD } // If only PARAMS is void, allow PAYLOAD only
    : { apiParams: PARAMS } & { payload: PAYLOAD }; // If PAYLOAD is provided, allow PARAMS and PAYLOAD
