// import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import Reducers from "./reducers";

const Store = configureStore({
  reducer: Reducers,
});

const getToken = () => Store.getState().generalState?.token;
export type AppDispatch = typeof Store.dispatch;
export { Store, getToken };
