import axios from "axios";
import { URL } from "../constants";
import FoodService from "../services/FoodService";
import { getAllFoodItems, getOneFoodItem } from "../store/FoodSlice";

// get all foods
export const getAllFoodItemsHelper = async ({ dispatch }: any) => {
  console.log(`FoodHelper.getAllFoodItemsHelper`);

  try {
    // call food service
    const response = await FoodService.getFoods();
    console.log(response.data.length);
    if (response.status) {
      dispatch(getAllFoodItems(response.data));
    } else {
      return {
        success: false,
        message: response?.message,
      };
    }
  } catch (error: any) {
    console.log(error?.message);
  }
};

// get a food
export const getOneFoodItemHelper = async ({ dispatch, foodId }: any) => {
  console.log(`FoodHelper.getOneFoodItemHelper`);

  try {
    // call food service
    const response = await FoodService.getOneFoodById(foodId);
    if (response.status) {
      dispatch(getOneFoodItem(response.data));
    } else {
      return {
        success: false,
        message: response?.message,
      };
    }
  } catch (error: any) {
    console.log(error?.message);
  }
};
