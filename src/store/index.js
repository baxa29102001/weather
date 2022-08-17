import { configureStore } from "@reduxjs/toolkit";
import weather from "./weather";

const store = configureStore({
  reducer: {
    weather: weather.reducer,
  },
});

export default store;
