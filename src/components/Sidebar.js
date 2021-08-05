import '../App.css';
import React from 'react';
import { useEffect,useState } from 'react';
import axios from 'axios';
import ReactAnimatedWeather from 'react-animated-weather';
import Clock from 'react-live-clock'
const Sidebar = ()=>

{   const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [weather, setWeather] = useState("");
    const [temperature, setTemperature] = useState(0);
    const [city, setCity] = useState("");
    const [humidity,setHumidity]=useState(0);
    const [country,setCountry]=useState("");
    const [id,setID]=useState("");
    const [windspeed, setWindspeed] = useState(0);
    const [feels,setFeels]=useState(0);
    const [visibility,setVisibilty]=useState(0);
    const [maxtemp,setMaxtemp]=useState(0);

    const savePositionToState = (position) =>{
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    };
    const fetchWeather = async() => {
     try {
       
       await window.navigator.geolocation.getCurrentPosition(savePositionToState);
       const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=9a596c5a40ab8f52b100da0e8d676a48&units=metric`)
      
       setTemperature(res.data.main.temp);
       setCity(res.data.name);
       setWeather(res.data.weather[0].main);
       setHumidity(res.data.main.humidity);
       setCountry(res.data.sys.country);
       setID(res.data.weather[0].id);
       setFeels(res.data.main.feels_like);
       setMaxtemp(res.data.main.temp_max);
       setWindspeed(res.data.wind.speed);
       setVisibilty(res.data.visibility);
       
       console.log(res.data);
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

      var icon="";
      
      if(id>=200 && id<300)
           icon='PARTLY_CLOUDY_DAY';
      if(id>770 && id<800)
          icon = 'WIND';
      else if(id>=300 && id<400)
          icon = 'SLEET';
      else if(id>=500 && id<600)
           icon='RAIN';
      else if(id>=600 && id<700)
           icon='SNOW';
      else if(id>800)
           icon="CLOUDY"
      else if(id===800)
           icon='CLEAR_DAY';
      else if(id>=700 && id<750)
           icon='FOG';
      else
           icon='CLEAR_DAY';   
  
  
    return(
      <div>
        <div className=" mx-2 row justify-content-center">
        <div className="sidebar col-lg-8 col-md-7  col-sm-12 mt-2 ">
        <div className="city">{city}</div>
        <div className="country">{country}</div>
        <div className="icon text-center">
           <ReactAnimatedWeather
           icon={icon}
           color={defaults.color}
           size={defaults.size}
           animate={defaults.animate}
           />
            <div className="weather">{weather.charAt(0).toUpperCase()+weather.slice(1)}</div>
            <div className="temperature mx-auto px-auto"><p className="mb-1 px-auto">{temperature.toFixed(1)}<sup style={{fontFamily:"cursive"}}>°C </sup></p></div>
            
        </div>
        <div className="row time justify-content-xm-center">
          <h2 className=" h1 col-sm"><p></p>
            <Clock className="tick" format={'HH:mm:ss'} ticking={true} />
            </h2>
          <p className=" h2 col-sm col-lg  col-md date">
        <p><Clock
          date={''}
          format={'dddd'} /></p>
          <Clock
          date={''}
          format={'MMMM DD, YYYY'} /></p>
        </div>
        </div>
        <div className="col-sm-12 col-lg col-md rside mt-2 ">

        <div className="text-light text-center d-flex justify-content-around">
          <p className="weatherheading">Weather Info</p>
          </div>
        <div className="row weatherinfo  justify-content-around">
          <p className="col-6 ">Humidity</p>
          <p className="col-4">{humidity}%</p>   
        </div>

        <div className="row weatherinfo  justify-content-around">
          <p className="col-6 ">Wind Speed</p>
          <p className="col-5 ">{windspeed.toFixed(1)}&nbsp;<span className="units">Km/hr</span></p>
        </div>

        <div className="row weatherinfo  justify-content-around">
          <p className="col-6">Max Temp.</p>
          <p className="col-4">{maxtemp.toFixed(1)}<span className="units">&nbsp;°C</span></p>
        </div>

        <div className="row weatherinfo  justify-content-around">
          <p className="col-6 ">Feels Like</p>
          <p className="col-4">{feels.toFixed(1)}<span className="units">&nbsp;°C</span></p>
        </div>

        <div className="row weatherinfo  justify-content-around">
        <p className="col-6 ">Visibility</p>
        <p className="col-4">{visibility}<span className="">&nbsp;mi</span></p>
          
        </div>

        
        
        
         
                
        </div>
        </div>
        </div>
        
    );
}
export default Sidebar;