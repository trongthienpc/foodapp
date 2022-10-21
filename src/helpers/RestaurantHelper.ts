import axios from "axios";
import { URL } from "../constants";
import RestaurantService from "../services/RestaurantService";
import {
  getRestaurantFailure,
  getRestaurantsFailure,
  getRestaurantsStarted,
  getRestaurantsSuccess,
  getRestaurantStarted,
  getRestaurantSuccess,
} from "../store/RestaurantSlice";

// get all restaurants
export const getRestaurantsHelper = async (dispatch: any) => {
  console.log(`RestaurantHelper.getRestaurants`);
  dispatch(getRestaurantsStarted);
  try {
    // call restaurant service
    const response = await RestaurantService.getRestaurants();
    console.log(response.data.length);
    if (response.status) {
      dispatch(getRestaurantsSuccess(response.data));
    } else {
      dispatch(getRestaurantsFailure());
    }
  } catch (error: any) {
    console.log(error?.message);
  }
};

// get a restaurant
export const getRestaurantHelper = async ({ dispatch, restaurantId }: any) => {
  console.log(`RestaurantHelper.getRestaurant`);
  dispatch(getRestaurantStarted);
  try {
    // call restaurant service
    const response = await RestaurantService.getOneRestaurantById(restaurantId);
    if (response.status) {
      dispatch(getRestaurantSuccess(response.data));
    } else {
      dispatch(getRestaurantFailure());
    }
  } catch (error: any) {
    console.log(error?.message);
  }
};
