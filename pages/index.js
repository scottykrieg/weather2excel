import React, { useState } from "react";
import axios from "axios";
import moment from "moment";
import WeatherForm from "../components/WeatherForm";
import WeatherData from "../components/WeatherData";
import { Workbook } from "exceljs";
import Footer from "@/components/Footer";
import ModeToggle from "@/components/ModeToggle";

const IndexPage = () => {
  const [data, setData] = useState([]);
  const [cityName, setCityName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [mode, setMode] = useState("light");

  const handleModeToggle = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    document.documentElement.setAttribute("data-theme", newMode);
  };

  const handleSubmit = async (zipCode) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`
      );
      const weatherData = response.data.list.map((item) => {
        const temperatureF = item.main.temp * 1.8 + 32;
        const precipitationInches =
          (item.rain?.["3h"] || item.snow?.["3h"] || 0) / 25.4;
        const windSpeedMPH = item.wind.speed * 2.237;
        const windGustMPH = (item.wind.gust || 0) * 2.237;
        const [date, time] = moment(item.dt_txt)
          .format("YYYY-MM-DD, HH:mm:ss")
          .split(", ");

        return {
          date,
          time,
          temperature: temperatureF.toFixed(2),
          precipitation: precipitationInches.toFixed(2),
          windSpeed: windSpeedMPH.toFixed(2),
          windGust: windGustMPH.toFixed(2),
        };
      });

      weatherData.unshift({
        date: "",
        temperature: "",
        precipitation: "",
        windSpeed: "",
        windGust: "",
      });
      setData(weatherData);
      setCityName(response.data.city.name);
      setCountryName(response.data.city.country);
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet("Weather Data");
      worksheet.columns = [
        { header: "Date", key: "date", width: 18 },
        { header: "Time", key: "time", width: 18 },
        { header: "Temperature (°F)", key: "temperature", width: 18 },
        { header: "Precipitation (in)", key: "precipitation", width: 18 },
        { header: "Wind Speed (mph)", key: "windSpeed", width: 18 },
        { header: "Wind Gusts (mph)", key: "windGust", width: 18 },
      ];

      worksheet.addRows(
        weatherData.map(
          ({
            date,
            time,
            temperature,
            precipitation,
            windSpeed,
            windGust,
          }) => ({
            date,
            time,
            temperature,
            precipitation,
            windSpeed,
            windGust,
          })
        )
      );
      worksheet.getRow(1).font = { bold: true };
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      const currentDate = moment().format("YYYY-MM-DD");

      link.href = url;
      link.download = `${zipCode}-${response.data.city.name}-Weather-Data-${currentDate}.xlsx`;
      link.click();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1 style={{ fontSize: "65px" }}>Weather2Excel</h1>
      <WeatherForm onSubmit={handleSubmit} />
      {data.length > 0 && (
        <>
          <h1>
            {cityName}, {countryName}
          </h1>
          <WeatherData data={data} />
        </>
      )}
      <Footer />
    </>
  );
};

export default IndexPage;
