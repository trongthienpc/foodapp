import { combineReducers } from "redux";
import generalSlice from "./generalSlice";

const rootReducer = combineReducers({ general: generalSlice });

export default rootReducer;
