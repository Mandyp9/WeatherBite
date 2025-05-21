import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      <div 
  className="absolute inset-0 bg-cover bg-center z-0" 
  style={{ 
    backgroundImage: `url('/FoodBG.png')`,
    backgroundPosition: 'center',
    filter: 'brightness(0.5)'
  }}
></div>

      
      <div className="relative z-10 container mx-auto px-4 py-24 md:py-36">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl text-center mx-auto"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            <span className="block mb-2">Weather-Inspired</span>
            <span className="text-indigo-300">Nepalese Cuisine</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            Discover the perfect foods for your local weather conditions.
            Let us recommend delicious Nepalese dishes that complement your climate.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="#about"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
            >
              Learn More
            </a>
            {/* <a 
              href="#LocationSearch"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-medium rounded-lg transition-colors"
            >
              Check Weather
            </a> */}
          </div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 dark:from-gray-900 to-transparent z-10"></div>
    </div>
  );
};

export default Hero;