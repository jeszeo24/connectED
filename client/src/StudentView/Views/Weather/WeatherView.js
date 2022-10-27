import React, {useState} from 'react'
import "./WeatherView.css"

let WEATHER_URL =
  "https://api.openweathermap.org/data/2.5/weather?appid=93ae7f6100d821e042d321ce66fcb8a6&units=metric&q=";

function WeatherView() {
    const [location, setLocation] = useState(''); 
    const [weather, setWeather] = useState({});

    const handleChange = e => {
        setLocation(e.target.value);
      };
    
      const handleSubmit = e => {
        e.preventDefault();
        getWeather(location);
        setLocation(''); 
      };

      async function getWeather() {

        let url = `${WEATHER_URL}${location}`;
        try {
          let response = await fetch(url);
          if (response.ok) {
            let data = await response.json();
            setWeather(data);
          } else {
            console.log(`Server error: ${response.status} ${response.statusText}`);
          }
        } catch (err) {
          console.log(`Network error: ${err.message}`);
        }
       }

  return (
    <div className='WeatherView'>
        <form onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              placeholder="Enter location"
              value={location}
              onChange={handleChange}
            />
          </label>
          <button type="submit">
            Search
          </button>
        </form>

        <div className='container'>
            <div className='top'>
        <div className='location'> 
        <p>{weather.name}</p>
    </div>
      <div className='temp'>
    {weather.main? <h3>{weather.main.temp}°C</h3> : null}
    </div>
      <div className='description'>
        {weather.weather ?<p>{weather.weather[0].main}</p>: null}
    </div>
    </div>
      <div className='bottom'>
      <div className='humidity'>
        {weather.main? <p>{weather.main.humidity}%</p> : null}
    </div>
      <div className='wind'>
        {weather.wind? <p>{weather.wind.speed}mph</p> : null }
      </div>
     </div>
    </div>
   </div>
  )
}

export default WeatherView