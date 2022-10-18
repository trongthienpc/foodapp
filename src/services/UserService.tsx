import axios from "axios";
import URL from "../constants/URL";
import { getToken } from "../store/Store";
import { authHeader, returnObject } from "../utils/General";
//get user data
const getUserData = async () => {
  console.log("UserService: getUserData");

  try {
    let userResponse = await axios.get(
      `${URL.BACKEND_API.BASE_API_URL}${URL.BACKEND_API.USER}/get-user`,
      { headers: authHeader(getToken()) }
    );

    if (userResponse.status === 200) {
      return returnObject(
        true,
        "User data fetched successfully",
        userResponse?.data
      );
    } else {
      return returnObject(false, "User not found");
    }
  } catch (errors: any) {
    return returnObject(
      false,
      errors?.response?.data?.message
        ? errors?.response?.data?.message
        : "User data not found"
    );
  }
};

export default { getUserData };
