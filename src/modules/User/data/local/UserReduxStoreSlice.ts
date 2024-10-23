import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import type { RootState } from "../../../../app/store"
import type { User } from "../../domain/model/UserModel"
import type { LocalCacheRecord } from "../../../../common/data/local/LocalCacheModels"

type UserState = {
  user: User | null
}

// todo: add cached at and expiry date to each data item
// todo: add isValid flag (would be useful for cache invalidation)

const initialState: UserState = {
  user: null,
}

export const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    setUserData: (
      state,
      action: PayloadAction<LocalCacheRecord<UserState["user"]>>,
    ) => {
      state.user = action.payload.data
    },
  },
})

export const { setUserData } = userSlice.actions

export const userSelector = (state: RootState) => state.user.user

export const userActions = userSlice.actions
export default userSlice.reducer
