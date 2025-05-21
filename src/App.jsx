import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { WeatherProvider } from './contexts/WeatherContext';
import HomePage from './pages/HomePage';
import FoodDetailPage from './pages/FoodDetailPage';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-bounce mb-4 flex justify-center">
  <img src="/logo1.png" alt="Logo" className="h-90 w-90 mx-auto" />
</div>

          <h1 className=" animate-blink text-5xl font-bold text-gray-800 dark:text-white">
            <span>
            <span className="text-indigo-600 dark:text-indigo-400">Weather</span>
            <span className="text-white dark:text-white">Bite</span>
          </span>
          </h1>
          <p className="text-gray-600 text-xl dark:text-gray-300 mt-2">
            Loading foods according to weather outside ......
          </p>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <WeatherProvider>
        <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/food/:id" element={<FoodDetailPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </WeatherProvider>
    </ThemeProvider>
  );
}

export default App;