type GetRemoteDataParams<Result = any, Params = any> = {
  apiEndpoint: any;
  apiParams?: Params;
  dataMapper?: (data: any) => Result;
};

type GetRemoteData = <Result = any, Params = any>(
  params: GetRemoteDataParams<Result, Params>,
) => Promise<Result>;

type SetRemoteDataParams<Data = any, Result = any, Params = any> = {
  apiEndpoint: any;
  apiParams?: Params;
  payload?: Data;
  dataMapper?: (data: any) => Result;
};

type SetRemoteData = <Data = any, Result = any, Params = any>(
  params: SetRemoteDataParams<Data, Params, Result>,
) => Promise<any>;

export interface CreateRemoteDataSourceReturn {
  getData: GetRemoteData;
  setData: SetRemoteData;
}

// TODO: check if we need to pass get data generics to remote data source directly or if we should pass it to the getData function instead
export type CreateRemoteDataSource = () => CreateRemoteDataSourceReturn;
