import React, { useState } from "react";
import { Card, Button, Form, Input, message } from "antd";
import { apiKey } from "../key/key.js";
import WeatherInfo from "./WeatherInfo.js";
import "../style/style.css";
import cloudyBG from "../img/cloudy.webp";
import rainyBG from "../img/rainy.webp";
import sunnyBG from "../img/sunny.webp";
/**
 * This is the component of the weather card.
 * Including WeatherInfo component,and form input of the weather.
 * Weather data is from openweathermap api.
 * If weatherData is null, the info page will not shown.
 * If user submit wrong city name, an error message will be shown.
 * Once submit right city, different weather will show different background.
 * City name will also be shown by camel case.
 * UI is done by antd. Humidity and windSpeed icon are from React-Icon.
 */
export default function WeatherCard() {
  const [weatherData, setWeatherData] = useState(null);
  const [cardBG, setCardBG] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [cityName, setCityName] = useState(null);
  const bgObj = { Clouds: cloudyBG, Rain: rainyBG, Clear: sunnyBG };
  const errorShow = () => {
    messageApi.open({
      type: "error",
      content: "Please input the correct city name.",
    });
  };
  const getWeather = async (cityname) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) {
        throw new Error("response fail!");
      }

      const data = await response.json();
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
      const { main, description, icon } = data.weather[0];
      setWeatherData({ temp, humidity, speed, main, description, icon });
      setCardBG(main);
      //setCityName as camel case
      setCityName(
        cityname.charAt(0).toUpperCase() + cityname.slice(1).toLowerCase()
      );
    } catch (error) {
      errorShow();
    }
  };

  const onFinish = (values) => {
    const { cityname } = values;
    getWeather(cityname);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      {contextHolder}
      <Card
        title={
          <span style={{ color: cardBG === "Rain" ? "white" : "black" }}>
            Weather App
          </span>
        }
        style={{
          width: 400,
          marginTop: 100,
          textAlign: "center",
          backgroundImage: `url(${bgObj[cardBG]})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          color: cardBG === "Rain" ? "white" : "black",
        }}
        className="weatherCard"
      >
        {weatherData ? (
          <WeatherInfo weatherData={weatherData} cityName={cityName} />
        ) : null}
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label={
              <span style={{ color: cardBG === "Rain" ? "white" : "black" }}>
                CityName
              </span>
            }
            name="cityname"
            rules={[{ required: true, message: "Please input the city name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
