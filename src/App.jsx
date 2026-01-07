import { useState } from "react";
import axios from 'axios';
import {Dot} from 'lucide-react'


function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const API_KEY = import.meta.env.VITE_API_KEY;
  const API = import.meta.env.VITE_API_URL;

  const getWeather = async()=> {
    try{
      const response = await axios.get(`${API}?q=${city}&appid=${API_KEY}&units=metric`);
      setWeather(response.data);
      console.log(response);
    }catch (err) {
      setError("City not found, please try again");
      setWeather(null);
      console.log(err);
    }
  }

  const handleKeyDown = (e)=> {
    if(e.key === "Enter"){
      getWeather();
    }
  }

  return (
    <>
      <div className="bg-white px-8 py-8 rounded-4xl">
        <h1 className="text-center text-5xl font-bold">Weather App</h1>
      <div className="my-5 space-x-4 flex justify-center">
        <input 
          className="border rounded-md px-3 py-2"
          type="text"
          placeholder="Enter city name"
          onChange={(e)=>setCity(e.target.value)}
          value={city}
          onKeyDown={handleKeyDown}
        />
        <button className="bg-blue-900 text-white px-3 py-2 rounded-md hover:bg-blue-600" onClick={getWeather}>Get weather</button>
      </div>
      {
        error && 
        <p className="text-red-600 text-xl">!!{error}</p>
      }

    {
      weather &&
      <div className='bg-blue-300 rounded-xl p-[2rem] min-w-[400px] shadow-md'>
        <div className='mb-5 flex flex-col items-center border-b-1 pb-5'>
          <h1 className='text-[2.5rem] font-medium text-center uppercase'>{weather.name}</h1>

          <p className='text-[3.5rem] font-bold text-center'>{weather.main.temp}&deg;C</p>

          <p className='w-fit text-[1.25rem] text-center bg-white pr-6 rounded-4xl flex items-center justify-center'><Dot size={55} color="#3F00FF" />{weather.weather[0].description}</p>
        </div>

        <div className='flex items-center space-x-2'>
          <div className="px-3 py-2 bg-gray-100 rounded-lg">
            <p>Humidity</p>
            <p className="text-center font-bold text-2xl">{weather.main.humidity}%</p>
          </div>
          
          <div className="px-3 py-2 bg-gray-100 rounded-lg">
            <p>Pressure</p>
            <p className="text-center font-bold text-2xl">{weather.main.pressure}</p>
          </div>

          <div className="px-3 py-2 bg-gray-100 rounded-lg">
            <p>Wind Speed</p>
            <p className="text-center font-bold text-2xl">{weather.wind.speed} mph</p>
          </div>
        </div>
      </div>
    }
    </div>
    </>
  )
}

export default App
