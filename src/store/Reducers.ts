import { combineReducers } from "redux";
import generalSlice from "./GeneralSlice";
import bookmarkSlice from "./BookmarkSlice";
import RestaurantSlice from "./RestaurantSlice";
import FoodSlice from "./FoodSlice";

const rootReducer = combineReducers({
  general: generalSlice,
  bookmark: bookmarkSlice,
  restaurant: RestaurantSlice,
  food: FoodSlice,
});

export default rootReducer;
