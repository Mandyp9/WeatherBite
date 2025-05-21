import { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { getWeatherData } from '../services/WeatherService';
// import { WeatherData, Coordinates } from '../types';

/**
 * @typedef {Object} WeatherContextType
 * @property {WeatherData|null} weatherData
 * @property {boolean} loading
 * @property {string|null} error
 * @property {(coords: Coordinates) => Promise<void>} fetchWeatherByCoords
 * @property {(city: string) => Promise<void>} fetchWeatherByCity
 */
const WeatherContext = createContext(undefined);


export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};

/**
 * @typedef {Object} WeatherProviderProps
 * @property {ReactNode} children
 */

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherByCoords = useCallback(async (coords) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getWeatherData(coords);
      setWeatherData(data);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchWeatherByCity = useCallback(async (city) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getWeatherData({ city });
      setWeatherData(data);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        loading,
        error,
        fetchWeatherByCoords,
        fetchWeatherByCity
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};