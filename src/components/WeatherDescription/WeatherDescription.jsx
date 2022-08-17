import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeatherThunk } from "../../store/weather";
import { debounce } from "../../lib/debounce";
import classes from "./weatherdesc.module.css";

const cities_s = [
  "Qarshi",
  "Samarqand",
  "Guliston",
  "Buxoro",
  "Nukus",
  "Qo'qon",
  "Termiz",
];
const weather_details = [
  {
    name: "Cloudy",
    degree: "%",
    key: "clouds",
  },
  {
    name: "Humidity",
    degree: "%",
    key: "rh",
  },
  {
    name: "Wind",
    degree: "km/h",
    key: "wind_spd",
  },
  {
    name: "Rain",
    degree: "mm",
    key: "snow",
  },
];

function WeatherDescription() {
  const [cities, setCities] = useState(cities_s);
  const [height, setHeight] = useState(false);
  const inputRef = useRef();
  const mainData = useSelector((state) => state.weather.weather_data);
  const weather_detail = useSelector((state) => state.weather.details);
  const dispatch = useDispatch();

  const chooseCityHandler = (item) => {
    dispatch(fetchWeatherThunk(item));
    setCities((state) => {
      const newArr = state.filter((i) => i !== item);
      return [...newArr, item];
    });
  };

  const searchHandler = debounce((e) => {
    dispatch(fetchWeatherThunk(inputRef.current.value || "Tashkent"));
  }, 1000);
  const setHeightHandler = () => {
    setHeight(!height);
  };
  return (
    <div
      className={
        (mainData && mainData?.weather?.code >= 800) || !mainData.weather
          ? classes.weather_desc_layout
          : `${classes.weather_desc_layout} ${classes.weather_desc_layout_rainy}`
      }
    >
      <form className={classes.weather_search_form}>
        <input
          ref={inputRef}
          type="text"
          className={classes.weather_desc_input}
          placeholder="Another location"
          onChange={searchHandler}
        />
      </form>

      <ul className={classes.weather_cities}>
        {cities.slice(0, 4).map((item) => (
          <li key={item} onClick={chooseCityHandler.bind(undefined, item)}>
            {item}
          </li>
        ))}
      </ul>

      <hr />

      <div className={classes.weather_details}>
        <h2>Weather Details</h2>
        {weather_details.map((item, index) => (
          <div key={index} className={classes.weather_mini_detail}>
            <h3>{item.name}</h3>
            <p>
              {weather_detail.status === "pending" ? "-" : mainData[item.key]}
              {item.degree}
            </p>
          </div>
        ))}
      </div>
      <hr />

      <button
        type="button"
        onClick={searchHandler}
        className={classes.weather_search_icon}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="#fffff"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z" />
        </svg>
      </button>
    </div>
  );
}

export default WeatherDescription;
