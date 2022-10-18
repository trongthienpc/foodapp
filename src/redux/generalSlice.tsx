import { createSlice } from "@reduxjs/toolkit";

const generalSlice = createSlice({
  name: "general",
  initialState: {
    isAppLoading: true,
    token: "",
    isFirstTimeUse: true,
    userData: {},
  },
  reducers: {
    // TODO: set app loading state
    setAppLoading: (state, action) => {
      state.isAppLoading = action.payload;
    },
    // TODO: set token state
    setAppToken: (state, action) => {
      state.token = action.payload;
    },
    // TODO: set first time use state
    setFirstTimeUser: (state, action) => {
      state.isFirstTimeUse = action.payload;
    },
    // TODO: set user data
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export default generalSlice.reducer;
