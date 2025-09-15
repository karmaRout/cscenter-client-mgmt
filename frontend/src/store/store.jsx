import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../components/clientList/ClientListSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});