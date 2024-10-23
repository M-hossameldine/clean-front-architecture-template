import { useDataSourceMutation } from "src/common/presentation/hooks/useDataSourceMutation"
import type {
  UseDataSourceMutationReturn,
  UseDataSourceCallbackOptions,
} from "src/common/presentation/hooks/useDataSourceMutation"
import type {
  ToggleUserStatusRequestPayload,
  ToggleUserStatusRequestParams,
} from "modules/User/data/model/UserApiModel"

import type { User } from "modules/User/domain/model/UserModel"
import { toggleUserStatus } from "../../../data/remote/UserReduxApis"
import { UserRepo } from "../UserRepositories"

const fetchDataProps = {
  repositoryMethod: UserRepo.toggleUserStatus,
  apiEndpoint: toggleUserStatus,
}

export const useToggleUserStatus = (
  callbacks?: UseDataSourceCallbackOptions,
): UseDataSourceMutationReturn<
  User | null,
  ToggleUserStatusRequestPayload,
  ToggleUserStatusRequestParams
> => {
  const [mutation, state] = useDataSourceMutation<
    User | null,
    ToggleUserStatusRequestPayload,
    ToggleUserStatusRequestParams
  >(fetchDataProps, callbacks)

  return [mutation, state]
}
