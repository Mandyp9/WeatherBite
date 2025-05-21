import { motion } from 'framer-motion';
import { Cloud, Thermometer, Utensils, MapPin } from 'lucide-react';

const About = () => {
  return (
    <div id="about" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            How It Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            <span>
            <span className="text-indigo-600 dark:text-indigo-400">Weather</span>
            <span className="text-white dark:text-white">Bite</span>
          </span> recommends the perfect Nepalese dishes based on your local weather conditions,
            helping you enjoy meals that complement your climate.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <MapPin className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />,
              title: "Share Your Location",
              description: "Allow us to detect your location or search for a specific city to get accurate weather data."
            },
            {
              icon: <Cloud className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />,
              title: "Check Weather",
              description: "We analyze current weather conditions including temperature, humidity, and forecast."
            },
            {
              icon: <Utensils className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />,
              title: "Get Recommendations",
              description: "Receive personalized food suggestions that are perfect for the current weather."
            },
            {
              icon: <Thermometer className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />,
              title: "Enjoy Perfect Meals",
              description: "Discover recipes, nutritional information, and nearby restaurants serving these dishes."
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-sm"
            >
              <div className="bg-indigo-50 dark:bg-indigo-900/30 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-4">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-20">
          <div className="bg-white dark:bg-gray-700 rounded-xl shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img 
                  src="/thakali.png" 
                  alt="Traditional Nepalese cuisine" 
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-8 md:w-1/2">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
                    Why Weather Affects Our Food Choices
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Our bodies naturally crave different foods based on the climate. In cold weather, 
                    we tend to want warming, hearty dishes that raise our body temperature, while hot 
                    weather calls for cooling, lighter meals that help us stay refreshed.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Nepalese cuisine, with its diverse regional climates from the Himalayan mountains 
                    to tropical valleys, has developed perfect dishes for every weather condition. 
                    From warming thukpa in winter to cooling lassi in summer, we'll help you discover 
                    the ideal meal for today's forecast.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Our recommendations are based on traditional wisdom, nutritional science, and 
                    the rich culinary heritage of Nepal.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;