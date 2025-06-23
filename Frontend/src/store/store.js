import { configureStore } from "@reduxjs/toolkit";
import { authReducer, searchReducer } from "./slices";

const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
  },
});

export default store;
