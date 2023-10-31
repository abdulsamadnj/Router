import React, { useEffect } from "react";
import "./WeatherApp.css";
import { useState } from "react";
import search_icon from "./Assets/search.png";
import clear_icon from "./Assets/clear.png";
import cloud_icon from "./Assets/cloud.png";
import drizzile_icon from "./Assets/drizzle.png";
import rain_icon from "./Assets/rain.png";
import snow_icon from "./Assets/snow.png";
import wind_icon from "./Assets/wind.png";
import humidity_icon from "./Assets/humidity.png";
import { Link } from "react-router-dom";

const dateBuilder = (d) => {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "Novenber",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
};

const WeatherApp = () => {
  let api_key = "c64e79c6ddf81f9eca2878bf926244c5";
  const [wicon, setWicon] = useState(cloud_icon);
  const [location, CurentLocation] = useState("");

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

    let responce = await fetch(url);
    let data = await responce.json();
    CurentLocation({
      humidity: data.main.humidity + "%",
      Wind: data.wind.speed + " km/h",
      temprature: data.main.temp + "c",
      location: data.name,
      locationSpecification: data.sys.country,
      latitude: data.coord.lat,
      longitude: data.coord.lon,
    });
    setWeatherIcon(data.weather[0].icon);
  };
  
  const setWeatherIcon = (iconId) => {
    if (iconId === "0ld" || iconId === "01n") {
      setWicon(clear_icon);
    } else if (iconId === "02d" || iconId === "02n") {
      setWicon(cloud_icon);
    } else if (iconId === "03d" || iconId === "03n") {
      setWicon(drizzile_icon);
    } else if (iconId === "04d" || iconId === "04n") {
      setWicon(drizzile_icon);
    } else if (iconId === "09d" || iconId === "09n") {
      setWicon(rain_icon);
    } else if (iconId === "10d" || iconId === "10n") {
      setWicon(rain_icon);
    } else if (iconId === "13d" || iconId === "13n") {
      setWicon(snow_icon);
    } else {
      setWicon(clear_icon);
    }
  };

  // const humidity = document.getElementsByClassName("humidity-percent");
  // const Wind = document.getElementsByClassName("Wind-rate");
  // const temprature = document.getElementsByClassName("Weather-temp");
  // const location = document.getElementsByClassName("Weather-location");
  // const locationSpecification =
  //   document.getElementsByClassName("speficlocatioin");
  // const lattitude = document.getElementsByClassName("lattitude");
  // const longitude = document.getElementsByClassName("longitude");

  // humidity[0].innerHTML = data.main.humidity + "%";
  // Wind[0].innerHTML = data.wind.speed + " km/h";
  // temprature[0].innerHTML = data.main.temp + "c";
  // location[0].innerHTML = data.name;
  // locationSpecification[0].innerHTML = data.sys.country;
  // lattitude[0].innerHTML = data.coord.lat;
  // longitude[0].innerHTML = data.coord.lon;
  const currentLocationreccur=async()=>{
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=Metric&appid=c64e79c6ddf81f9eca2878bf926244c5
        `;
        let responce = await fetch(url);
        let data = await responce.json();
        CurentLocation({
          humidity: data.main.humidity + "%",
          Wind: data.wind.speed + " km/h",
          temprature: data.main.temp + "°C",
          location: data.name,
          locationSpecification: data.sys.country,
          latitude: data.coord.lat,
          longitude: data.coord.lon,
        });
        setWeatherIcon(data.weather[0].icon);
      });
    }
  };
//  const whenempty = document.getElementsByClassName("cityInput") 
  useEffect(() => {

  currentLocationreccur();
  },[])

  return (
    <>
    <div className="btn">
           < Link  className="btn" to ='/' >back</Link>
            </div>
    <div className="container">
        
        
      <div className="top-bar">
        
        <input type="text" className="cityInput" placeholder="Search" />
        <div
          className="search-icon"
          onClick={() => {
            search().catch(() => {
              alert("Enter valid Name");
            });
          }
        }
        >
          <img src={search_icon} alt="" />
        </div>
      </div>
      <div className="Weather-image">
        <img src={wicon} alt="" />
      </div>
      <div className="Weather-temp"> {location.temprature} </div>
      <div className="Weather-location">{location.location}</div>
      <div className=" Weather-location speficlocatioin">
        {location.locationSpecification}
      </div>
      <div className="date Weather-location">{dateBuilder(new Date())}</div>
      <div className="Data-container">
        <div className="element">
          <img src={humidity_icon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percent">{location.humidity}</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="" className="icon" />
          <div className="data">
            <div className="Wind-rate">{location.speed}</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
        <div className="element">
          <div className="data">
            <div className="lattitude">{location.latitude}</div>
            <div className="longitude">{location.longitude}</div>
            <div className="text">co-ordinates</div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default WeatherApp;
