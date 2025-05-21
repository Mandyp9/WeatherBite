import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-inner mt-10">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              <span className='flex'>
                <span>
            <img src="/logo1.png" alt="Logo" className="h-10 w-10" />
          </span>
            <span className="text-indigo-600 dark:text-indigo-400">Weather</span>
            <span className="text-white dark:text-white">Bite</span>
          </span>
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Discover the perfect meal for any weather condition. We suggest delicious
              recipes suited to your local climate.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#" 
                  className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a 
                  href="#favorites" 
                  className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Favorites
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-4">
              Contact Us
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
               Kathmandu, Nepal
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              info@WeatherBite.com
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              +977 1234567890
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center text-gray-500 dark:text-gray-400">
          <p className="flex items-center justify-center">
            Made with <Heart className="w-4 h-4 mx-1 text-red-500 fill-current" /> by Mandeep
          </p>
          <p className="mt-2">
            &copy; {new Date().getFullYear()} <span>
            <span className="text-indigo-600 dark:text-indigo-400">Weather</span>
            <span className="text-white dark:text-white">Bite</span>
          </span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;