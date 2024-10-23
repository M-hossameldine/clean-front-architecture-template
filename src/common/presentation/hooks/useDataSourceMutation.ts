import { useState, useCallback } from "react";
import type {
  SetRepositoryData,
  SetRepositoryDataParams,
} from "src/common/domain/repository/RepositoryModel";
import type { UseDataSourceMutationEndpointParams } from "../../data/remote/ApiModels";
export interface UseDataSourceEndpointParams<Payload = any, Params = any> {
  payload?: Payload;
  apiParams?: Params;
}

type UseDataSourceFetchCallbackProps<
  RESULT = any,
  PAYLOAD = any,
  PARAMS = any,
> = {
  repositoryMethod: SetRepositoryData;
} & Omit<
  SetRepositoryDataParams<RESULT, PAYLOAD, PARAMS>,
  "apiParams" | "payload"
>;

type FetchCallbackProps<RESULT, PAYLOAD, PARAMS> = {
  repositoryMethod: SetRepositoryData;
} & SetRepositoryDataParams<RESULT, PAYLOAD, PARAMS>;

interface UseDataSourceState<DATA> {
  data: DATA | null;
  isLoading: boolean;
  error: string | null;
}

export interface UseDataSourceCallbackOptions<RESULT = any> {
  onSuccess?: () => void; // TODO: handle mutation onSuccess response data
  onError?: (error: string) => void;
  onSettled?: () => void;
}

export type UseDataSourceMutationReturn<
  RESULT = any,
  PAYLOAD = void,
  PARAMS = void,
> = [
  (
    params?: UseDataSourceMutationEndpointParams<PAYLOAD, PARAMS>,
  ) => Promise<void>,
  UseDataSourceState<RESULT>,
];

export const useDataSourceMutation = <
  RESULT = any,
  PAYLOAD = void,
  PARAMS = void,
>(
  fetchDataCallbackProps: UseDataSourceFetchCallbackProps<RESULT>,
  { onSuccess, onError, onSettled }: UseDataSourceCallbackOptions<RESULT> = {},
): UseDataSourceMutationReturn<RESULT, PAYLOAD, PARAMS> => {
  const [state, setState] = useState<UseDataSourceState<RESULT>>({
    data: null,
    isLoading: false,
    error: null,
  });

  const fetchData = useCallback(
    (props: FetchCallbackProps<RESULT, PAYLOAD, PARAMS>) => {
      const { repositoryMethod, apiEndpoint, apiParams, payload, dataMapper } =
        props;

      return repositoryMethod({
        apiEndpoint,
        apiParams,
        payload,
        dataMapper,
      });
    },
    [],
  );

  const mutation = useCallback(
    async (params?: UseDataSourceMutationEndpointParams<PAYLOAD, PARAMS>) => {
      setState({ data: null, isLoading: true, error: null });
      const hasPayload = params && "payload" in params;
      const hasApiParams = params && "apiParams" in params;
      try {
        await fetchData({
          repositoryMethod: fetchDataCallbackProps.repositoryMethod,
          apiEndpoint: fetchDataCallbackProps.apiEndpoint,
          dataMapper: fetchDataCallbackProps.dataMapper,
          ...(hasApiParams ? { apiParams: params?.apiParams } : {}),
          ...(hasPayload ? { payload: params?.payload } : {}),
        });

        setState({ data: null, isLoading: false, error: null });
        if (onSuccess) onSuccess();
      } catch (error) {
        const errorMessage = "Something went wrong!";
        setState({ data: null, isLoading: false, error: errorMessage });
        if (onError) onError(errorMessage);
      } finally {
        if (onSettled) onSettled();
      }
    },
    [fetchDataCallbackProps, fetchData, onSuccess, onError, onSettled],
  );

  return [mutation, state];
};
