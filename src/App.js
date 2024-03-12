import logo from './logo.svg';
 import './App.css';
 import Axios from "axios";
import {useState, useEffect} from "react"
import weather1 from '../src/assets/weather1.jpg'


function App() {
   return (
     <div className="App">
      <Weather /> 
    
      
     </div>
   );
 }


 const API_KEY = '6fcf06eb6aaa10c76907b46c0aa151d1';

 const Weather = () =>{
  const [cityName,setCityName] = useState("");
  const[data,setData] = useState(null);

  const fetchWeatherData = async() =>{
    try{
    const response = await Axios.get (`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`);

    setData(response.data);

    } catch (error) {
      console.error('Error fetching weather data:', error);
      setData(null); // Clear previous data on error
  }

};
useEffect(()=>{
  if(cityName !== "") {
    fetchWeatherData();
  }
},[cityName]);

return(
  <div className='content'>
  <div className='weather-app'>
    <h1>Weather app</h1>
    <input value={cityName}
    type="text"
    placeholder='enter city name'
    onChange={(event)=>setCityName(event.target.value)} />

    <button onClick={fetchWeatherData}> search</button>

    <div>
      {data && (
        <div className='weather-info'>
        <h2>{data.name}</h2>
        <p>Temperature: {Math.round(data.main.temp)} C</p>
        <img src={weather1} alt=""></img>
        <p>langitude:{ data.coord.lat}</p>
        <p>Longitide:{data.coord.lon}</p>
         </div>
      )}
    </div>


</div>
  </div>
)


   
   
}












export default App;