import axios from "axios";
import { URL } from "../constants";
import { authHeader } from "../utils/General";

// get all restaurants
const getRestaurants = async () => {
  console.log(`RestaurantsService | getRestaurants`);
  try {
    let restaurantResponse = await axios.get(
      `${URL.BACKEND_API.BASE_API_URL}${URL.BACKEND_API.RESTAURANT}`,
      {
        headers: authHeader(""),
      }
    );
    if (restaurantResponse?.status === 200) {
      return {
        status: true,
        message: `Restaurant data fetched`,
        data: restaurantResponse?.data?.data,
      };
    } else {
      return {
        status: false,
        message: `Restaurant data not found`,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: `Restaurant data not found`,
    };
  }
};

// get a restaurant
const getOneRestaurantById = async (restaurantId: any) => {
  console.log(`RestaurantsService | getOneRestaurantById`);
  try {
    let restaurantResponse = await axios.get(
      `${URL.BACKEND_API.BASE_API_URL}${URL.BACKEND_API.RESTAURANT}/${restaurantId}`,
      {
        headers: authHeader(""),
      }
    );
    if (restaurantResponse?.status === 200) {
      return {
        status: true,
        message: `Restaurant data fetched`,
        data: restaurantResponse?.data?.data,
      };
    } else {
      return {
        status: false,
        message: `Restaurant data not found`,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: `Restaurant data not found`,
    };
  }
};

export default { getRestaurants, getOneRestaurantById };
