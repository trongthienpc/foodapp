import { useAppDispatch } from "./../store/hooks";
import { AuthenticationService, StorageService } from "../services";
import {
  setAppLoading,
  setAppToken,
  setFirstTimeUse,
  setUserData,
} from "../store/generalSlice";
import UserService from "../services/UserService";

export const FirstTimeUse = (dispatch: any) => {
  StorageService.getFirstTimeUse().then((isFirstTimeUse) => {
    console.log(isFirstTimeUse);
    if (isFirstTimeUse) dispatch(setFirstTimeUse(false));
    else dispatch(setFirstTimeUse(true));
  });
};

export const GetAppToken = (dispatch: any) => {
  StorageService.getToken().then((token) => {
    if (token) {
      dispatch(setAppToken(token));
      UserService.getUserData(token).then((userResponse) => {
        if (userResponse.status) {
          dispatch(setUserData(userResponse.data));
          dispatch(setAppLoading(false));
        } else if (userResponse.message === "TokenExpiredError") {
          AuthenticationService.refreshToken().then((tokenResponse) => {
            if (tokenResponse.status) {
              dispatch(setAppToken(tokenResponse.data));
              UserService.getUserData(tokenResponse.data).then(
                (userResponse) => {
                  if (userResponse.status) {
                    dispatch(setUserData(userResponse.data));
                    dispatch(setAppLoading(false));
                  }
                }
              );
            } else {
              dispatch(setAppToken(""));
              dispatch(setAppLoading(false));
            }
          });
        }
      });
    }
    dispatch(setAppLoading(false));
  });
};
