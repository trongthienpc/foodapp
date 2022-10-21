import { combineReducers } from "redux";
import generalSlice from "./GeneralSlice";
import bookmarkSlice from "./BookmarkSlice";

const rootReducer = combineReducers({
  general: generalSlice,
  bookmark: bookmarkSlice,
});

export default rootReducer;
