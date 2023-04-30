import React, { useState } from "react";
import axios from "axios";
import moment from "moment";
import WeatherForm from "../components/WeatherForm";
import WeatherData from "../components/WeatherData";
import { Workbook } from "exceljs";

const IndexPage = () => {
  const [data, setData] = useState([]);
  const [cityName, setCityName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [zipCode, setZipCode] = useState("");

  const handleSubmit = async (zipCode) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`
      );
      const weatherData = response.data.list.map((item) => ({
        date: moment(item.dt_txt).format("YYYY-MM-DD HH:mm:ss"),
        temperature: item.main.temp,
        precipitation: item.rain?.["3h"] || item.snow?.["3h"] || 0,
        windSpeed: item.wind.speed,
        windGust: item.wind.gust || 0,
      }));
      weatherData.unshift({
        date: "",
        temperature: "",
        precipitation: "",
        windSpeed: "",
        windGust: "",
        city: `${response.data.city.name}, ${response.data.city.country} - ${zipCode}`,
      });
      setData(weatherData);
      setCityName(response.data.city.name);
      setCountryName(response.data.city.country);
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet("Weather Data");
      worksheet.columns = [
        { header: "", key: "city", width: 60 },
        { header: "Date/Time", key: "date", width: 18 },
        { header: "Temperature (°C)", key: "temperature", width: 18 },
        { header: "Precipitation (mm)", key: "precipitation", width: 18 },
        { header: "Wind Speed (m/s)", key: "windSpeed", width: 18 },
        { header: "Wind Gusts (m/s)", key: "windGust", width: 18 },
      ];
      worksheet.addRows(weatherData);
      worksheet.getRow(1).font = { bold: true };
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${zipCode}-${response.data.city.name}-Weather-Data.xlsx`;
      link.click();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <WeatherForm onSubmit={handleSubmit} />
      {data.length > 0 && (
        <>
          <h1>
            {cityName}, {countryName}
          </h1>
          <WeatherData data={data} />
        </>
      )}
    </>
  );
};

export default IndexPage;
