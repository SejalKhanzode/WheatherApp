import "./App.css";
import { useState } from "react";
import {BsSearch} from "react-icons/bs";
import wind from "./assets/wind.png"
import cloud from "./assets/cloud.png"
import humidity from "./assets/humidity.png"

const api = {
  key: "da48e2c493d2681071063271b26af68a",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});

  /*
    Search button is pressed. Make a fetch call to the Open Weather Map API.
  */
  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
      });
  };

  return (
    <div className="wrapper">
      <header className="App-header">
        {/* HEADER  */}
        <h1>Weather App</h1>

        <div class="tab-container">
            
            <p class="tab" data-searchWeather>Search Weather</p>
        </div>
        {/* Search Box - Input + Button  */}
        <div className="form-container">
          <input
            type="text"
            placeholder="Search for City..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={searchPressed} className="btn">
            <BsSearch/>
          </button>
        </div>

        {/* If weather is not undefined display results from API */}
        {typeof weather.main !== "undefined" ? (
          <div className="name">
            {/* Location  */}
            <p className="sub-container ">{weather.name}</p>

            {/* Temperature Celsius  */}
            <p className="sub-container">{weather.main.temp}°C</p>

            {/* Condition (Sunny ) */}
            <p className="sub-container">{weather.weather[0].main}</p>
            <p className="sub-container">({weather.weather[0].description})</p>


            <div class="parameter-container">
                    <div class="parameter">
                        <img src={wind} />
                        <p>windspeed</p>
                        <p>{weather.wind.speed}</p>
                    </div>

                    <div class="parameter">
                        <img src={humidity} />
                        <p>humidity</p>
                        <p>{weather.main.humidity}</p>
                    </div>

                    <div class="parameter">
                        <img src={cloud} />
                        <p>Clouds</p>
                        <p>{weather.clouds.all}</p>
                    </div>

                </div>
            </div>
          
        ) : (
          ""
        )}
      </header>
    </div>
  );
}

export default App;