export type GetRepositoryDataParams<Result, Params = any> = {
  apiEndpoint: any;
  apiParams?: Params;
  dataMapper?: (data: any) => Result;
};

export type GetRepositoryData = <Result = any, Params = any>(
  params: GetRepositoryDataParams<Result, Params>,
) => Promise<Result | null>;

export type SetRepositoryDataParams<
  Result = void,
  Payload = any,
  Params = any,
> = {
  apiEndpoint: any;
  apiParams?: Params;
  payload?: Payload;
  dataMapper?: (data: any) => Result;
};

export type SetRepositoryData = <Result = void, Payload = any, Params = any>(
  params: SetRepositoryDataParams<Result, Payload, Params>,
) => Promise<void>;

export type Repository = {
  getData: GetRepositoryData; // todo check the promise could resolve to any
  setData: SetRepositoryData;
  clearData: () => void;
};
