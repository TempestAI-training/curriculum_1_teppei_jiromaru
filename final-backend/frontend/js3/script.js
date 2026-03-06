"use strict";

const API =
  "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo&forecast_days=1";

const getWeatherData = async () => {
  try {
    const response = await fetch(API);
    const data = await response.json();
    console.log(data.daily);
    return data;
  } catch (error) {
    console.log("Error:", error);
    throw error;
  }
};

const printData = async () => {
  try {
    const data = await getWeatherData();

    const title = document.getElementById("title");
    title.textContent = data.daily.time + "の東京の気温";

    const min = document.getElementById("min_temp");
    min.textContent = "最低気温：" + data.daily.temperature_2m_min[0] + "度";
    const max = document.getElementById("max_temp");
    max.textContent = "最高気温：" + data.daily.temperature_2m_max[0] + "度";
  } catch (error) {
    console.log("error", error.message);
  }
};

printData();
