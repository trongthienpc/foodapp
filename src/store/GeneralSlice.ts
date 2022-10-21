import { createSlice } from "@reduxjs/toolkit";
import GeneralReducer from "../old-store/reducers/GeneralReducer";

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
      console.log(`generalSlice.setAppToken: ` + state.token);
      state.token = action.payload;
    },
    // TODO: set first time use state
    setFirstTimeUse: (state, action) => {
      state.isFirstTimeUse = action.payload;
    },
    // TODO: set user data
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    // TODO: reset user data
    resetUserData: (state) => {
      state.userData = {};
      state.token = "";
    },
  },
});
export const { setAppLoading, setAppToken, setFirstTimeUse, setUserData } =
  generalSlice.actions;
export default generalSlice.reducer;
