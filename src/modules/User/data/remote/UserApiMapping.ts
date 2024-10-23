import type { User } from "../../domain/model/UserModel"
import type { UserFromApi } from "../model/UserApiModel"

export const mapUserFromApi = (apiResponse: { user: UserFromApi }): User => {
  return {
    username: apiResponse.user.user_name,
    status: apiResponse.user.user_status,
    uuid: apiResponse.user.user_uuid,
    email: apiResponse.user.user_email,
  }
}
