import React, { useState } from "react";

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
    <form onSubmit={handleSubmit}>
      <input type="text" value={city} onChange={handleCityChange} />
      <button type="submit">Download weather data</button>
    </form>
  );
};

export default WeatherForm;
