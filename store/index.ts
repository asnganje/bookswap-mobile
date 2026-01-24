import {configureStore} from "@reduxjs/toolkit"
import booksReducer from "./slices/bookSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    books: booksReducer,
    auth: authReducer
  }
})

export default store;