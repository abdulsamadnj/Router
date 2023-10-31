import React from "react";
import './MainPage.css';
import { Link } from "react-router-dom";


const MainPage = () => {
  return (
    <div className="mainPage"><p>
     <Link to='/calculator' >calculator</Link></p>
    <p> <Link to='/weatherapp'  > WeatherApp</Link></p>
    </div>
  );
};

export default MainPage;
