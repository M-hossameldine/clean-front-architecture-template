import type { ApiParams } from "../../../../common/data/remote/ApiModels"
import type { USER_STATUS } from "../../domain/model/UserModel"

export type UserFromApi = {
  user_name: string
  user_status: USER_STATUS
  user_uuid: string
  user_email: string
}

export type ToggleUserStatusRequestPayload = {
  status: USER_STATUS
}
export type ToggleUserStatusRequestParams = {
  userId: string
}
export type ToggleUserStatusRequestApiParams = ApiParams<
  ToggleUserStatusRequestPayload,
  ToggleUserStatusRequestParams
>
