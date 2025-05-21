import { useState, useEffect } from 'react';
import { useWeather } from '../contexts/WeatherContext';
import { getFoodRecommendations } from '../services/foodService';
// import { FoodItem } from '../types';
import LocationSearch from '../components/weather/LocationSearch';
import WeatherDisplay from '../components/weather/WeatherDisplay';
import FoodRecommendations from '../components/food/FoodRecommendation';
import Hero from '../components/section/Hero';
import About from '../components/section/About';
import { motion } from 'framer-motion';

const HomePage = () => {
  const { weatherData, loading, error } = useWeather();
  const [recommendations, setRecommendations] = useState([]);
  const [locationGranted, setLocationGranted] = useState(null);


  useEffect(() => {
    // Try to get user's location when component mounts
    if (navigator.geolocation && locationGranted === null) {
      navigator.permissions
        .query({ name: 'geolocation' })
        .then(result => {
          if (result.state === 'granted') {
            setLocationGranted(true);
          } else if (result.state === 'prompt') {
            // Will ask user when we attempt to use geolocation
            setLocationGranted(null);
          } else {
            setLocationGranted(false);
          }
        });
    }
  }, [locationGranted]);

  useEffect(() => {
    if (weatherData) {
      const foodRecs = getFoodRecommendations(weatherData);
      setRecommendations(foodRecs);
    }
  }, [weatherData]);

  return (
    <div className="pt-16">
      <Hero />
      
      <div className="container mx-auto px-4 py-8">
        <LocationSearch setLocationGranted={setLocationGranted} />
        
        {loading && (
          <div className="text-center my-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600 dark:border-indigo-400"></div>
            <p className="mt-2 text-gray-600 dark:text-gray-300">Loading weather data...</p>
          </div>
        )}
        
        {error && (
          <div className="text-center my-8 text-red-500 dark:text-red-400 p-4 rounded-lg bg-red-50 dark:bg-red-900/20">
            <p>{error}</p>
            <p className="mt-2 text-sm">Please try searching for a different location.</p>
          </div>
        )}
        
        {weatherData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <WeatherDisplay weather={weatherData} />
            
            <div className="my-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                Recommended Foods for {weatherData.condition} Weather
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Based on the current temperature of {Math.round(weatherData.temp)}°C and {weatherData.condition.toLowerCase()} conditions, 
                here are some foods that would be perfect right now:
              </p>
              
              <FoodRecommendations foodItems={recommendations} />
            </div>
          </motion.div>
        )}
      </div>
      
      <About />
    </div>
  );
};

export default HomePage;