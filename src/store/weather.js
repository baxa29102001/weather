import { createSlice } from "@reduxjs/toolkit";
import request from "../lib/request";

const initialState = {
  weather_data: {},
  details: {
    error: null,
    status: null,
  },
};

const weather = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setLoadData(state, { payload }) {
      state.weather_data = payload.weather_data;
      state.details.error = payload.details.error;
      state.details.status = payload.details.status;
    },
  },
});

export const weatherActions = weather.actions;

export default weather;

export const fetchWeatherThunk = (city) => {
  return (dispatch) => {
    dispatch(
      weatherActions.setLoadData({
        weather_data: {},
        details: {
          error: null,
          status: "pending",
        },
      })
    );

    request
      .get("", {
        params: {
          city,
        },
      })
      .then(({ data }) => {
        dispatch(
          weatherActions.setLoadData({
            weather_data: data.data[0] || {},
            details: {
              error: null,
              status: "success",
            },
          })
        );
      })
      .catch((error) => {
        dispatch(
          weatherActions.setLoadData({
            weather_data: {},
            details: {
              error: error,
              status: "error",
            },
          })
        );
      });
  };
};
