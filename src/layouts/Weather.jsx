import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchWeatherThunk } from "../store/weather";
import WeatherDescription from "../components/WeatherDescription/WeatherDescription";
import WetherLayout from "../components/WetherLayout/WetherLayout";

function Weather() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWeatherThunk("Tashkent"));
  }, [dispatch]);

  return (
    <div className="weather_layout">
      <div className="container">
        <div className="weather_wrapper">
          <WetherLayout />
          <WeatherDescription />
        </div>
      </div>
    </div>
  );
}

export default Weather;
