import { useState, useEffect, useCallback } from "react";
import type {
  GetRepositoryData,
  GetRepositoryDataParams,
} from "src/common/domain/repository/RepositoryModel";

type UseDataSourceFetchCallbackProps<RESULT, PARAMS> = {
  repositoryMethod: GetRepositoryData;
} & GetRepositoryDataParams<RESULT, PARAMS>;

export interface UseDataSourceOptions<RESULT> {
  onSuccess?: (data: RESULT | null) => void;
  onError?: (error: string) => void;
  onSettled?: () => void;
}

interface UseDataSourceState<RESULT> {
  data: RESULT | null;
  isLoading: boolean;
  error: string | null;
}

export const useDataSourceQuery = <RESULT, PARAMS = any>(
  fetchDataCallbackProps: UseDataSourceFetchCallbackProps<RESULT, PARAMS>,
  { onSuccess, onError, onSettled }: UseDataSourceOptions<RESULT> = {}, // * callbacks must be memoized with useCallback to avoid infinite loops
) => {
  const [state, setState] = useState<UseDataSourceState<RESULT>>({
    data: null,
    isLoading: true,
    error: null,
  });

  const fetchData = useCallback(() => {
    return fetchDataCallbackProps.repositoryMethod({
      apiEndpoint: fetchDataCallbackProps.apiEndpoint,
      apiParams: fetchDataCallbackProps.apiParams,
      dataMapper: fetchDataCallbackProps.dataMapper,
    });
  }, [fetchDataCallbackProps]);

  useEffect(() => {
    let isMounted = true;

    const fetchDataResponseHandler = async () => {
      try {
        const result = await fetchData();

        if (isMounted) {
          setState({ data: result, isLoading: false, error: null });
          if (onSuccess) onSuccess(result);
        }
      } catch (error) {
        if (isMounted) {
          const errorMessage = "Something went wrong!";
          setState({ data: null, isLoading: false, error: errorMessage });
          if (onError) onError(errorMessage);
        }
      } finally {
        if (isMounted && onSettled) onSettled();
      }
    };

    fetchDataResponseHandler();

    return () => {
      isMounted = false;
    };
  }, [fetchData, onSuccess, onError, onSettled]);

  return state;
};
