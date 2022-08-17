import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Weather from "./layouts/Weather";

function App() {
  const mainData = useSelector((state) => state.weather.weather_data);
  useEffect(() => {
    if (!mainData.weather) {
      document.body.style.backgroundColor = "#4a99d3";
      // document.body.style.background = "rgb(255, 255, 255)";
      // document.body.style.background =
      //   "linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, #4a99d3 26%)";
      return;
    }
    if (mainData?.weather?.code >= 800) {
      document.body.style.backgroundColor = "#4a99d3";
      // document.body.style.background = "rgb(255, 255, 255)";
      // document.body.style.background =
      //   "linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, #4a99d3 26%)";
    } else {
      document.body.style.backgroundColor = "#0d0d0d";
    }
  }, [mainData]);
  return (
    <div>
      <Weather />
    </div>
  );
}

export default App;
