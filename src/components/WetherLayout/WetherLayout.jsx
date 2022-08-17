import React from "react";
import { useSelector } from "react-redux";
import classes from "./weatherLayout.module.css";
import ballon from "../../image/ballon-min.png";
import { formatDate } from "../../lib/day";

function WetherLayout() {
  const mainData = useSelector((state) => state.weather.weather_data);
  const weather_detail = useSelector((state) => state.weather.details);
  const { day, month, date_num, time, year } = formatDate(mainData.ob_time);
  return (
    <div
      className={
        mainData?.weather?.code >= 800 || !mainData.weather
          ? classes["layout_container"]
          : classes.layout_container_rainy_image
      }
    >
      <div
        className={
          mainData
            ? ""
            : mainData?.weather?.code >= 800
            ? ""
            : classes.bg_opacity
        }
      >
        <h2>the.weather</h2>
        <div className={classes.weather_image}>
          <img src={ballon} alt="Something" />
        </div>

        <div className={classes.weather_details}>
          <div className={classes.weather_degree}>
            {weather_detail.status === "pending" ? (
              <h1>--</h1>
            ) : (
              <h1>{mainData.temp}</h1>
            )}

            <div className={classes.weather_degree_dot}></div>
          </div>
          <div className={classes.weather_location_status_wrapper}>
            <div className={classes.weather_location}>
              {weather_detail.status === "pending" ? (
                <h3>Loading....</h3>
              ) : (
                <h3>{mainData.city_name}</h3>
              )}

              {weather_detail.status === "pending" ? (
                <div>
                  <span>10:36</span> <span>-</span>{" "}
                  <span>Sun, 2022 Oct 19</span>
                </div>
              ) : (
                <div>
                  <span>{time}</span> <span>-</span>{" "}
                  <span>
                    {day}, {year} {month} {date_num}
                  </span>
                </div>
              )}
            </div>
            <div className={classes.weather_status}>
              <img
                src={`https://www.weatherbit.io/static/img/icons/${mainData?.weather?.icon}.png`}
                alt="Sunny"
              />

              {weather_detail.status === "pending" ? (
                <h3>loading...</h3>
              ) : (
                <h3>{mainData?.weather?.description}</h3>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WetherLayout;
