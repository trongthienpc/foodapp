import axios from "axios";
import URL from "../constants/URL";
import { getToken } from "../store/Store";
import { authHeader, returnObject } from "../utils/General";

interface User {
  username: string;
  password: string;
}

interface UserRegister extends User {
  email: string;
}

// authRequest
const AuthRequest = axios.create({
  baseURL: URL.BACKEND_API.BASE_API_URL,
});

// register
const register = async (user: UserRegister) => {
  if (!user.email || !user.password || !user.username) {
    return returnObject(false, "Please fill up all fields!");
  }

  try {
    let requestBody: UserRegister = user;

    let registerResponse = await AuthRequest.post(
      URL.BACKEND_API.REGISTER,
      requestBody
    );

    return registerResponse?.data;
  } catch (error: any) {
    console.log(error);
    return returnObject(false, "Oops! Something went wrong!");
  }
};

// login
const login = async (user: User) => {
  if (!user.username || !user.password) {
    return returnObject(false, "Please fill up all fields");
  }

  try {
    let requestBody: User = user;
    let loginResponse = await AuthRequest.post(
      URL.BACKEND_API.LOGIN,
      requestBody
    );

    return loginResponse?.data;
  } catch (errors: any) {
    console.log(errors);
    return returnObject(false, "Oops! Something went wrong!");
  }
};

// check user exist
const checkUserExist = async (type: string, value: string) => {
  try {
    let params = { [type]: value };
    let userCheckResponse = await AuthRequest.get(URL.BACKEND_API.USER_EXIST, {
      params,
    });
    return userCheckResponse?.data;
  } catch (errors: any) {
    console.log(errors);
    return returnObject(false, "Oops! Something went wrong!");
  }
};

// refresh token
const refreshToken = async () => {
  try {
    let tokenResponse = await AuthRequest.post(URL.BACKEND_API.REFRESH_TOKEN, {
      headers: authHeader(getToken()),
    });
    if (tokenResponse.status === 200) {
      return returnObject(true, "", tokenResponse?.data);
    } else {
      return returnObject(false);
    }
  } catch (errors: any) {
    console.log(errors);
    return returnObject(false, "Oops! Something went wrong!");
  }
};

export default { register, login, checkUserExist, refreshToken };
