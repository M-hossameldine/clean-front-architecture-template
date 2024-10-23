import type { LocalCacheRecord, LocalCacheKey } from "./LocalCacheModels";

export interface CreateLocalDataSourceProps<DATA> {
  selector: (state: any) => DATA | null;
  setDataAction: (cacheData: LocalCacheRecord<DATA | null>) => any; // Redux action to set data
  cacheKey: LocalCacheKey;
}

export interface CreateLocalDataSourceReturn<DATA> {
  getData: () => DATA | null;
  setData: (data: DATA) => void;
  invalidateCache: () => void;
  isValidCache: () => boolean;
  clearData: () => void;
}

export type CreateLocalDataSource = <DATA>(
  props: CreateLocalDataSourceProps<DATA>,
) => CreateLocalDataSourceReturn<DATA>;
