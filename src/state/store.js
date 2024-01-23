import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './slices'

// configure store automatically sets up thunk for us
export const store = configureStore({
  reducer: {
    counter: counterReducer
  }
})