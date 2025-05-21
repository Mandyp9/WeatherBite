import axios from 'axios';

const API_KEY = 'c5ec8bcad00ce452e041e2e2cfed353a';

export const getWeatherData = async (coords) => {
  try {
    let weatherUrl = '';
    let locationName = '';
    let lat, lon;

    if (coords.city) {
      weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${coords.city}&appid=${API_KEY}&units=metric`;
    } else if (coords.lat && coords.lon) {
      lat = coords.lat;
      lon = coords.lon;

      weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

      // Reverse geocoding to get more specific location name
      const reverseGeoUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${API_KEY}`;
      const geoResponse = await axios.get(reverseGeoUrl);

      const matchedLocation = geoResponse.data.find(
        (loc) => loc.name.toLowerCase() === 'khumaltar'
      );

      if (matchedLocation) {
        locationName = matchedLocation.name;
      } else if (geoResponse.data.length > 0) {
        locationName = geoResponse.data[0].name;
      }
    } else {
      throw new Error('Invalid coordinates');
    }

    const weatherResponse = await axios.get(weatherUrl);
    const data = weatherResponse.data;

    return {
      city: locationName || data.name,
      country: data.sys.country,
      temp: data.main.temp,
      feelsLike: data.main.feels_like,
      condition: data.weather[0].main,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      dt: data.dt,
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};
