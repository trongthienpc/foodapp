import { AuthenticationService, StorageService } from "../../services";
import UserService from "../../services/UserService";

const types = {
  SET_IS_APP_LOADING: "SET_IS_APP_LOADING",
  SET_TOKEN: "SET_TOKEN",
  SET_FIRST_TIME_USE: "SET_FIRST_TIME_USE",
  SET_USER_DATA: "SET_USER_DATA",
};

const actionObject = (type?: string, payload?: any) => {
  return { type, payload };
};

const setIsAppLoading = (isAppLoading: any) => {
  return actionObject(types.SET_IS_APP_LOADING, isAppLoading);
};

const setToken = (token: any) => {
  return actionObject(types.SET_TOKEN, token);
};

const setIsFirstTimeUse = () => {
  return actionObject(types.SET_FIRST_TIME_USE, false);
};

const setUserData = (userData: any) => {
  return actionObject(types.SET_USER_DATA, userData);
};

const appStart = () => {
  return (dispatch?: any, getState?: any) => {
    StorageService.getFirstTimeUse().then((isFirstTimeUse) =>
      dispatch(
        actionObject(types.SET_FIRST_TIME_USE, isFirstTimeUse ? false : true)
      )
    );
    StorageService.getToken().then((token) => {
      if (token) {
        dispatch(actionObject(types.SET_TOKEN, token));
        UserService.getUserData().then((userResponse) => {
          if (userResponse?.status) {
            dispatch(actionObject(types.SET_USER_DATA, userResponse.data));
            dispatch(actionObject(types.SET_IS_APP_LOADING, false));
          } else if (userResponse.message === "TokenExpiredError") {
            AuthenticationService.refreshToken().then((tokenResponse) => {
              if (tokenResponse.status) {
                dispatch(actionObject(types.SET_TOKEN, tokenResponse?.data));
                UserService.getUserData().then((userResponse) => {
                  if (userResponse.status) {
                    dispatch(
                      actionObject(types.SET_USER_DATA, userResponse?.data)
                    );
                    dispatch(actionObject(types.SET_IS_APP_LOADING, false));
                  }
                });
              } else {
                dispatch(actionObject(types.SET_TOKEN, ""));
                dispatch(actionObject(types.SET_IS_APP_LOADING, false));
              }
            });
          }
        });
      }
      dispatch(actionObject(types.SET_IS_APP_LOADING, false));
    });
  };
};

export default {
  setIsAppLoading,
  setToken,
  appStart,
  setIsFirstTimeUse,
  setUserData,
  types,
};
