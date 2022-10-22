import axios from "axios";
import { URL } from "../constants";
import { getToken } from "../store/store";
import { authHeader } from "../utils/General";

// get all foods
const getFoods = async () => {
  console.log(`foodsService | getFoods`);
  const token = getToken();
  if (token) {
    try {
      let foodResponse = await axios.get(
        `${URL.BACKEND_API.BASE_API_URL}${URL.BACKEND_API.FOOD}`,
        // `http://192.168.4.89:8080/api/restaurant`,
        {
          headers: authHeader(token),
        }
      );

      if (foodResponse?.status === 200) {
        return {
          status: true,
          message: `Food data fetched`,
          data: foodResponse?.data?.data,
        };
      } else {
        return {
          status: false,
          message: `Food data not found`,
        };
      }
    } catch (error) {
      return {
        status: false,
        message: `Food data not found`,
      };
    }
  } else {
    return {
      status: false,
      message: `Token not found`,
    };
  }
};

// get one food item
const getOneFoodById = async (foodId: any) => {
  console.log(`foodsService | getOneFoodById`);
  const token = getToken();
  if (token) {
    try {
      let foodResponse = await axios.get(
        `${URL.BACKEND_API.BASE_API_URL}${URL.BACKEND_API.FOOD}/${foodId}`,
        {
          headers: authHeader(token),
        }
      );

      if (foodResponse?.status === 200) {
        return {
          status: true,
          message: `Food data fetched`,
          data: foodResponse?.data?.data,
        };
      } else {
        return {
          status: false,
          message: `Food data not found`,
        };
      }
    } catch (error) {
      return {
        status: false,
        message: `Food data not found`,
      };
    }
  } else {
    return {
      status: false,
      message: `Token not found`,
    };
  }
};

export default { getFoods, getOneFoodById };
