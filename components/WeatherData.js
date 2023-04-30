import React from "react";
import styles from "@/styles/weatherdata.module.sass";

const WeatherData = ({ data }) => {
  return (
    <div className={styles.weatherdata}>
      <table>
        <thead>
          <tr className={styles.header}>
            <th>Date (YYYY-MM-DD)</th>
            <th>Time (24:00)</th>
            <th>Temperature (°F)</th>
            <th>Precipitation (in)</th>
            <th>Wind Speed (mph)</th>
            <th>Wind Gusts (mph)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.date}>
              <td>{item.date.split(",")[0]}</td>
              <td>{item.time}</td>
              <td>{item.temperature}</td>
              <td>{item.precipitation}</td>
              <td>{item.windSpeed}</td>
              <td>{item.windGust}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeatherData;
