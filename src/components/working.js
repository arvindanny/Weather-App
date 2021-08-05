import '../App.css';
import React from 'react';
import { useEffect,useState } from 'react';
import axios from 'axios';
import ReactAnimatedWeather from 'react-animated-weather';
const Sidebar = ()=>

{ const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [weather, setWeather] = useState("");
    const [temperature, setTemperature] = useState(0);
    const [city, setCity] = useState("");
    const [humidity,setHumidity]=useState(0);
    const [country,setCountry]=useState("");
    const [ icon,setIcon]=useState("");

    const savePositionToState = (position) =>{
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    };
  //https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=
  
  //https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=9a596c5a40ab8f52b100da0e8d676a48&units=metric
    const fetchWeather = async() => {
     try {
       await window.navigator.geolocation.getCurrentPosition(savePositionToState);
       //const res1 = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=9a596c5a40ab8f52b100da0e8d676a48&units=metric`);
       const res2 = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=9a596c5a40ab8f52b100da0e8d676a48&units=metric`)
       /*setTemperature(res.data.current.temp);
       setCity(res.data.timezone);
       setWeather(res.data.current.weather[0].main);
       setHumidity(res.data.current.humidity);*/
  
       setTemperature(res2.data.main.temp);
       setCity(res2.data.name);
       setWeather(res2.data.weather[0].main);
       setHumidity(res2.data.main.humidity);
       setCountry(res2.data.sys.country);
       setIcon(res2.weather[0].icon);
       //console.log(res1.data);
       console.log(res2.data);
      } catch (error) {
       console.log(error.message);
     }
   }
  
   const defaults = {
     icon: 'CLEAR_DAY',
     color: 'white',
     size: 120,
     animate: true
    };
   
   
    useEffect(()=>{
      fetchWeather();
    },
    [latitude,longitude]);
  
    return(
        <div className="justify-content-between">
        <div className="sidebar col-lg-4 col-md-5 col-sm-12">
        <div className="icon">
           <ReactAnimatedWeather
           icon={defaults.icon}
           color={defaults.color}
           size={defaults.size}
           animate={defaults.animate}
           />
            <div className="temperature mx-auto px-auto"><p className="mb-1 px-auto">{temperature.toFixed(1)}<sup style={{fontFamily:"cursive"}}>°C </sup></p></div>
            <div className="weather container">{weather.charAt(0).toUpperCase()+weather.slice(1)}</div>
            <div className="city">{city},{country}</div>
            <div className="humidity">Humidity : {humidity}%</div>
        </div>
        </div>
        </div>
    );
}
export default Sidebar;