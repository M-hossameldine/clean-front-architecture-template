import { useDataSourceQuery } from "../../../../../common/presentation/hooks/useDataSourceQuery"
import type { UseDataSourceOptions } from "../../../../../common/presentation/hooks/useDataSourceQuery"

import type { User } from "../../../domain/model/UserModel"
import { getUser } from "../../../data/remote/UserReduxApis"
import { UserRepo } from "../UserRepositories"
import { mapUserFromApi } from "../../../data/remote/UserApiMapping"

const fetchDataProps = {
  repositoryMethod: UserRepo.getUser,
  apiEndpoint: getUser,
  dataMapper: mapUserFromApi,
}

export const useGetUser = (callbacks?: UseDataSourceOptions<User>) => {
  return useDataSourceQuery<User>(fetchDataProps, callbacks)
}
