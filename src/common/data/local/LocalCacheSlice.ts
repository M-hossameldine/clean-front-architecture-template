import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

// Slice to manage cache timestamps and cache state
const initialState = {
  cache: {} as Record<string, { timestamp: number }>,
};

export const cacheSlice = createSlice({
  name: "cache",
  initialState,
  reducers: {
    setCacheTimestamp: (
      state,
      action: PayloadAction<{ key: string; timestamp: number }>,
    ) => {
      state.cache[action.payload.key] = { timestamp: action.payload.timestamp };
    },
    invalidateCachedData: (state, action: PayloadAction<string>) => {
      delete state.cache[action.payload]; // Remove cache by key
    },
  },
});

export const { setCacheTimestamp, invalidateCachedData } = cacheSlice.actions;
export default cacheSlice.reducer;
