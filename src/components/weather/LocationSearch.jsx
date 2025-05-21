  import { useState, useCallback } from 'react';
  import { Search, MapPin } from 'lucide-react';
  import { useWeather } from '../../contexts/WeatherContext';

  /**
   * @param {{ setLocationGranted: (granted: boolean) => void }} props
   */
  const LocationSearch = ({ setLocationGranted }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const { fetchWeatherByCity, fetchWeatherByCoords, loading } = useWeather();

    const handleSearch = (e) => {
      e.preventDefault();
      if (searchQuery.trim().length > 0) {
        fetchWeatherByCity(searchQuery);
      }
    };

    const handleGeolocation = useCallback(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocationGranted(true);
            fetchWeatherByCoords({
              lat: position.coords.latitude,
              lon: position.coords.longitude
            });
          },
          (error) => {
            console.error('Error getting location:', error);
            setLocationGranted(false);
          }
        );
      } else {
        alert('Geolocation is not supported by your browser');
      }
    }, [fetchWeatherByCoords, setLocationGranted]);

    return (
      <div className="max-w-md mx-auto my-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <form onSubmit={handleSearch} className="flex items-center">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-8 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter location..."
              className="block w-full pl-10 pr-3 py-3 border-0 focus:ring-0 dark:bg-gray-800 dark:text-white"
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-3 hover:bg-indigo-700 transition-colors"
            disabled={loading || searchQuery.trim().length === 0}
          >
            {loading ? 'Loading...' : 'Search'}
          </button>
          <button
            type="button"
            onClick={handleGeolocation}
            className="flex items-center justify-center px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            disabled={loading}
            aria-label="Use my location"
          >
            <MapPin className="h-5 w-5" />
          </button>
        </form>
      </div>
    );
  };

  export default LocationSearch;