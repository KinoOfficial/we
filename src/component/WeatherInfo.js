import React from "react";
import "../style/style.css";
import { FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
/**
 *
 * @param {*} props
 * including weatherData:{description:str,humidity:number,icon:str,main:str,speed:number,temp:number}
 * including cityName:str
 * icon is the icon of the weather from openweathermap api and differnt weather will show different icon
 * @returns
 */
export default function WeatherInfo(props) {
  const { description, humidity, temp, speed, main, icon } = props.weatherData;
  return (
    <div>
      <h1>{props.cityName}</h1>
      <div className="weatherInfo">
        <div className="info1">
          <span className="temp">{Math.round(temp)}°</span>
          <img
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt="weather icon"
          />
        </div>
        <div className="info2">
          <div className="spaceB">
            <FaWind />
            {`${speed}m/s`}
          </div>
          <div className="spaceB">
            <WiHumidity />
            {`${humidity}%`}
          </div>
        </div>
      </div>
      <div className="weatherDesciption">{`${main},${description}`}</div>
    </div>
  );
}
