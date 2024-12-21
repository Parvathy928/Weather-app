import React, { useEffect, useRef, useState } from 'react'
import "./Weather.css"
import search_icon from "../assets/search.png"
import clear_icon from "../assets/clear.png"
import cloud_icon from "../assets/cloud.png"
import drizzle_icon from "../assets/drizzle.png"
import rain_icon from "../assets/rain.png"
import snow_icon from "../assets/snow.png"
import wind_icon from "../assets/wind.png"
import humidity_icon from "../assets/humidity.png"
import axios from 'axios'

function Weather() {
const [cityName,setCity]=useState("")

  const [weatherData,setWeatherData] =useState(false);
  const allIcons={

    "01d":clear_icon,
    "01n":clear_icon,
    "02d":cloud_icon,
    "02n":cloud_icon,
    "03d":cloud_icon,
    "03n":cloud_icon,
    "04d":cloud_icon,
    "04n":cloud_icon,
    "09d":rain_icon,
    "09n":rain_icon,
    "010d":rain_icon,
    "010n":rain_icon,
    "13d":snow_icon,
    "13n":snow_icon,
 }

 
 const search=(city)=>{
  if(city===""){
    alert("Enter the city Name")
    return;
   }
  axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`)
  .then((response)=>{
    console.log(response.data);
  
    const icon=allIcons[response.data.weather[0].icon || clear_icon]
    setWeatherData({
      humidity:response.data.main.humidity,
      WindSpeed:response.data.wind.speed,
      temperature:Math.floor(response.data.main.temp),
      location:response.data.name,
     icon:icon
    })
 setCity("")
  }).catch((error)=>{
    setWeatherData(false)
   if(error){
    alert(error.response.data.message)
   }
    
    
  })
 }
 


const changeData=(e)=>{
  setCity(e.target.value)
}

  return (
    <div className='weather'>
     <div className="search-bar">
      <input type="text" placeholder='search' value={cityName} onChange={changeData}/>
      <img src={search_icon}alt="" onClick={()=>search(cityName)}/>
      
     </div>
     {
      weatherData?<>
  <img src={
      weatherData.icon
     } alt="" className='weather-icon'/>
     <p className='temperature'>{weatherData.temperature}°c</p>
     <p className='location'>{weatherData.location}</p>
     <div className="weather-data">
      <div className="col">
        <img src={humidity_icon} alt="" />
        <div>
         <p>{weatherData.humidity}%</p> 
         <span>Humidity</span>
        </div>
      </div>
      <div className="col">
        <img src={wind_icon} alt="" />
        <div>
         <p>{weatherData.WindSpeed} Km/hr </p> 
         <span>Wind Speed</span>
        </div>
      </div>
     </div>
      </>:<></>
     }
   
    </div>
  )
}

export default Weather