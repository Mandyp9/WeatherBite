import { useState, useEffect } from 'react';
// import { WeatherData } from '../../types';
import { motion } from 'framer-motion';
import { Droplets, Wind, Clock } from 'lucide-react';


const getWeatherIcon = (condition, isDay) => {
  const timeOfDay = isDay ? 'day' : 'night';
  
  switch (condition.toLowerCase()) {
    case 'clear':
      return isDay ? '☀️' : '🌙';
    case 'clouds':
      return '☁️';
    case 'rain':
      return '🌧️';
    case 'drizzle':
      return '🌦️';
    case 'thunderstorm':
      return '⛈️';
    case 'snow':
      return '❄️';
    case 'mist':
    case 'fog':
      return '🌫️';
    default:
      return '🌤️';
  }
};

const getWeatherGradient = (condition, temp) => {
  if (temp < 5) {
    return 'from-blue-500 to-indigo-600'; // Cold
  } else if (temp >= 5 && temp < 15) {
    return 'from-blue-400 to-indigo-500'; // Cool
  } else if (temp >= 15 && temp < 25) {
    return 'from-teal-400 to-blue-500'; // Mild
  } else if (temp >= 25 && temp < 32) {
    return 'from-orange-400 to-amber-500'; // Warm
  } else {
    return 'from-red-400 to-orange-500'; // Hot
  }
  
  // Additional conditions
  if (condition.toLowerCase().includes('rain') || condition.toLowerCase().includes('drizzle')) {
    return 'from-blue-400 to-gray-600';
  } else if (condition.toLowerCase().includes('snow')) {
    return 'from-blue-100 to-blue-300';
  } else if (condition.toLowerCase().includes('thunder')) {
    return 'from-indigo-700 to-gray-800';
  }
};

const WeatherDisplay = ({ weather }) => {
  const [isDay, setIsDay] = useState(true);
  
  useEffect(() => {
    // Simple check if it's day or night - assuming 6am to 6pm is day
    const now = new Date();
    const hours = now.getHours();
    setIsDay(hours >= 6 && hours < 18);
  }, []);

  const weatherGradient = getWeatherGradient(weather.condition, weather.temp);
  const weatherIcon = getWeatherIcon(weather.condition, isDay);
  const date = new Date(weather.dt * 1000);
  const formattedDate = date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`rounded-xl overflow-hidden shadow-lg`}
    >
      <div className={`bg-gradient-to-r ${weatherGradient} p-6 text-white`}>
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center">
              <h2 className="text-3xl font-bold">{weather.city}</h2>
              <span className="ml-2 text-sm bg-white/20 px-2 py-0.5 rounded">
                {weather.country}
              </span>
            </div>
            
            <div className="flex items-baseline mt-1">
              <span className="text-5xl font-bold">{Math.round(weather.temp)}°C</span>
              <span className="ml-2 text-sm opacity-80">
                Feels like {Math.round(weather.feelsLike)}°C
              </span>
            </div>
            
            <p className="mt-2 text-lg capitalize">{weather.description}</p>
          </div>
          
          <div className="text-6xl">{weatherIcon}</div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-6 bg-white/10 rounded-lg p-4">
          <div className="flex items-center">
            <Droplets className="w-5 h-5 mr-2" />
            <div>
              <p className="text-xs opacity-80">Humidity</p>
              <p className="font-medium">{weather.humidity}%</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Wind className="w-5 h-5 mr-2" />
            <div>
              <p className="text-xs opacity-80">Wind</p>
              <p className="font-medium">{weather.windSpeed} m/s</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            <div>
              <p className="text-xs opacity-80">Updated</p>
              <p className="font-medium">{formattedTime}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-4">
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          {formattedDate}
        </p>
      </div>
    </motion.div>
  );
};

export default WeatherDisplay;