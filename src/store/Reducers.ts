import { combineReducers } from "redux";
import generalSlice from "./GeneralSlice";
import bookmarkSlice from "./BookmarkSlice";
import RestaurantSlice from "./RestaurantSlice";

const rootReducer = combineReducers({
  general: generalSlice,
  bookmark: bookmarkSlice,
  restaurant: RestaurantSlice,
});

export default rootReducer;
