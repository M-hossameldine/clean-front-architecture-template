import { createRepository } from "../../../../common/data/repository/RepositoryImpl"
import { UserRemoteDataSourceImpl } from "../remote/UserRemoteDataSourceImpl"
import { UserLocalDataSourceImpl } from "../local/UserLocalDataSourceImpl"
import type { User } from "../../domain/model/UserModel"
import type { CreateLocalDataSourceReturn } from "../../../../common/data/local/CreateLocalDataSource"
import type { CreateRemoteDataSourceReturn } from "../../../../common/data/remote/CreateRemoteDataSource"

export const CreateUserRepo = () => {
  const baseRepo = createRepository<
    User,
    CreateLocalDataSourceReturn<User>,
    CreateRemoteDataSourceReturn
  >(UserLocalDataSourceImpl(), UserRemoteDataSourceImpl())

  return {
    getUser: baseRepo.getData,
    toggleUserStatus: baseRepo.setData,
    clearUser: baseRepo.clearData,
  }
}
