import { createSlice } from "@reduxjs/toolkit";

const FoodSlice = createSlice({
  name: "food",
  initialState: {
    foods: [],
    food: {},
    isLoading: false,
    message: "",
  },
  reducers: {
    // TODO: get all food items
    getAllFoodItems: (state, action) => {
      state.foods = action.payload;
    },

    // TODO: get one food item by id
    getOneFoodItem: (state, action) => {
      state.food = action.payload;
    },
  },
});

export const { getAllFoodItems, getOneFoodItem } = FoodSlice.actions;
export default FoodSlice.reducer;
