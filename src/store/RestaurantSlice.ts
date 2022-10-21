import { createSlice } from "@reduxjs/toolkit";

type SliceState = {
  restaurants: any[];
  restaurant: any;
  isLoading: boolean;
};

const initialState: SliceState = {
  restaurants: [],
  restaurant: {},
  isLoading: false,
};
const RestaurantSlice = createSlice({
  name: "Restaurant",
  initialState,
  reducers: {
    // TODO: get list of restaurant
    getRestaurantsStarted: (state) => {
      state.isLoading = true;
    },
    getRestaurantsSuccess: (state, action) => {
      state.isLoading = false;
      state.restaurants = action.payload;
    },
    getRestaurantsFailure: (state) => {
      state.isLoading = false;
      state.restaurants = [];
    },

    // TODO: get a restaurant
    getRestaurantStarted: (state) => {
      state.isLoading = true;
    },
    getRestaurantSuccess: (state, action) => {
      state.isLoading = false;
      state.restaurant = action.payload;
    },
    getRestaurantFailure: (state) => {
      state.isLoading = false;
      state.restaurant = {};
    },
  },
});

export const {
  getRestaurantsFailure,
  getRestaurantsStarted,
  getRestaurantsSuccess,
  getRestaurantFailure,
  getRestaurantStarted,
  getRestaurantSuccess,
} = RestaurantSlice.actions;
export default RestaurantSlice.reducer;
