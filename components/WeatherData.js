import React from "react";
import styles from "@/styles/weatherdata.module.sass";

const WeatherData = ({ data }) => {
  return (
    <div className={styles.weatherdata}>
      <table>
        <thead>
          <tr>
            <th>Date/Time</th>
            <th>Temperature (°C)</th>
            <th>Precipitation (mm)</th>
            <th>Wind Speed (m/s)</th>
            <th>Wind Gusts (m/s)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.date}>
              <td>{item.date}</td>
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
