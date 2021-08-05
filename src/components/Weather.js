import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';

// const [latitude, setLatitude] = useState(0);
//   const [longitude, setLongitude] = useState(0);
//   const [weather, setWeather] = useState("");
//   const [temperature, setTemperature] = useState(0);
//   const [city, setCity] = useState("");
//   const [humidity,setHumidity]=useState(0);
//   const [country,setCountry]=useState("");

  class datails extends React.Component{
      state = 
      {
          latitude: 0,
          longitude:0,
          weather:"",
          temperature:0,
          city:"",
          humidity:0,
          country:"",
      }
    };
  const savePositionToState = (position) =>{
    this.state.latitude=(position.coords.latitude);
    this.state.longitude=(position.coords.longitude);
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

     datails.temperature=(res2.data.main.temp);
     console.log(temperature);
//      details.city=(res2.data.name);
//      details.weather=(res2.data.weather[0].main);
//      setHumidity(res2.data.main.humidity);
//      setCountry(res2.data.sys.country)
//      //console.log(res1.data);
//      console.log(res2.data);
//     } catch (error) {
//      console.log(error.message);
//    }
//  }

 
 
//   useEffect(()=>{
//     fetchWeather();
//   },
//   [latitude,longitude]);


const Weather =  () =>{
    return(
    <div className="container App">
    <div className="flex justify-content-around">   
    <div className="container col-lg-10 col-md-10 col-sm-12 bg">
        <div className="container text justify-content-center">
          <div className="col-lg-4 col-md-8 col-sm-12 col-xs-7 d-flex justify-content">{city},{country}</div>
          <div className=" col-lg-4 col-md-8 col-sm-4 d-flex justify-content temp">{temperature}ºC</div>
          <div className="col-lg-4 col-md-8 col-sm-12 col-xs-7 d-flex justify-content">{weather}</div>
          <div className="col-lg-4 col-md-8 col-sm-12 col-xs-7 d-flex justify-content">Humidity : {humidity} %</div>
          </div>
          </div>
          </div>
          </div>
    );

}

export default Weather;