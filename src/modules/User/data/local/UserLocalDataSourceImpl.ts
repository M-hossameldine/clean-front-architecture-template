import { createLocalDataSource } from "../../../../common/data/local/CreateLocalDataSourceImpl"
import { User_LOCAL_CACHE_KEYS } from "../constants/UserLocalCacheKeys"

import { setUserData, userSelector } from "./UserReduxStoreSlice"
import type { User } from "../../domain/model/UserModel"

export const UserLocalDataSourceImpl = () =>
  createLocalDataSource<User>({
    selector: userSelector,
    setDataAction: setUserData,
    cacheKey: User_LOCAL_CACHE_KEYS.User,
  })
