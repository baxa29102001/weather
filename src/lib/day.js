const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const formatDate = (server_date) => {
  const date = new Date(server_date);
  const day = days[date.getDay()];
  const month = months[date.getMonth()];
  const date_num = date.getDate();
  const time = date.getHours() + ":" + date.getSeconds();
  const year = date.getFullYear();

  return {
    day,
    month,
    date_num,
    time,
    year,
  };
};
