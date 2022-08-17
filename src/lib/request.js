import axios from "axios";

const request = axios.create({
  baseURL:
    "https://api.weatherbit.io/v2.0/current?key=0d73690ce1ce4aaeb8c0ffca3c7a9319",
  timeout: 10000,
});

export default request;
