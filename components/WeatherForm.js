import React, { useState } from "react";
import styles from "@/styles/weatherform.module.sass";

const WeatherForm = ({ onSubmit }) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(city);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <div className={styles.weatherForm}>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Search by Zip Code"
          type="text"
          value={city}
          onChange={handleCityChange}
        />
        <button type="submit">
          Download Excel File / Display Weather Data.{" "}
        </button>
      </form>
      <h3>Enter Zip Code above, data will appear below.</h3>
    </div>
  );
};

export default WeatherForm;
