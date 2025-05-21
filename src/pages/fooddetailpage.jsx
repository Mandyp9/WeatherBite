import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, ChefHat, Utensils } from 'lucide-react';
import { getFoodById, getNearbyRestaurants } from '../services/foodService';
import { useWeather } from '../contexts/WeatherContext';
import { motion } from 'framer-motion';

const FoodDetailPage = () => {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [activeTab, setActiveTab] = useState('recipe');
  const { weatherData } = useWeather();

  useEffect(() => {
    if (id) {
      const foodItem = getFoodById(id);
      if (foodItem) {
        setFood(foodItem);
      }
    }
  }, [id]);

  if (!food) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-300">Loading food details...</p>
      </div>
    );
  }

  const tabClasses = (tabName) =>
    `px-4 py-2 text-sm font-medium rounded-md ${
      activeTab === tabName
        ? 'bg-indigo-600 text-white'
        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
    } transition-colors`;

  return (
    <div className="container mx-auto px-4 py-24">
      <Link 
        to="/" 
        className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to recommendations
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="h-[300px] md:h-[400px] rounded-xl overflow-hidden"
        >
          <img 
            src={food.image} 
            alt={food.name} 
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-wrap gap-2 mb-4">
            {food.tags.map(tag => (
              <span 
                key={tag} 
                className="px-3 py-1 text-xs rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{food.name}</h1>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6">{food.description}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-2" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Prep Time</p>
                <p className="font-medium text-gray-900 dark:text-white">{food.recipe.prepTime}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Utensils className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-2" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Cook Time</p>
                <p className="font-medium text-gray-900 dark:text-white">{food.recipe.cookTime}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <ChefHat className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-2" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Difficulty</p>
                <p className="font-medium text-gray-900 dark:text-white">{food.recipe.difficulty}</p>
              </div>
            </div>
            
            {food.seasonal && (
              <div className="flex items-center">
                <span className="text-xl mr-2">🍂</span>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Seasonal</p>
                  <p className="font-medium text-gray-900 dark:text-white">Yes</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">Perfect for:</h3>
            <p className="text-gray-600 dark:text-gray-300">
              {food.weatherConditions.join(', ')} weather between {food.temperature.min}°C and {food.temperature.max}°C
            </p>
          </div>
        </motion.div>
      </div>
      
      <div className="mb-8">
        <div className="flex space-x-2 mb-6">
          <button 
            className={tabClasses('recipe')} 
            onClick={() => setActiveTab('recipe')}
          >
            Recipe
          </button>
          <button 
            className={tabClasses('nutrition')} 
            onClick={() => setActiveTab('nutrition')}
          >
            Nutrition
          </button>
          <button 
            className={tabClasses('restaurants')} 
            onClick={() => setActiveTab('restaurants')}
          >
            Where to Find
          </button>
        </div>
        
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
        >
          {activeTab === 'recipe' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recipe</h2>
              
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Ingredients:</h3>
                <ul className="space-y-2">
                  {food.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block w-2 h-2 rounded-full bg-indigo-500 mt-2 mr-2"></span>
                      <span className="text-gray-600 dark:text-gray-300">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Instructions:</h3>
                <ol className="space-y-4">
                  {food.recipe.steps.map((step, index) => (
                    <li key={index} className="flex">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300 flex items-center justify-center mr-3 mt-0.5 font-medium text-sm">
                        {index + 1}
                      </span>
                      <span className="text-gray-600 dark:text-gray-300">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          )}
          
          {activeTab === 'nutrition' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Nutritional Information</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Calories</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{food.nutrients.calories}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">kcal</p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Protein</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{food.nutrients.protein}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">g</p>
                </div>
                
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Carbs</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{food.nutrients.carbs}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">g</p>
                </div>
                
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Fat</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{food.nutrients.fat}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">g</p>
                </div>
                
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Fiber</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{food.nutrients.fiber}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">g</p>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="font-medium text-gray-900 dark:text-white mb-4">Health Benefits</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {food.name} is particularly suitable for {food.weatherConditions.join('/')} weather because it 
                  {food.temperature.min < 15 ? ' helps warm your body and provides comfort during cold temperatures.' : ''}
                  {food.temperature.min >= 15 && food.temperature.max <= 25 ? ' provides balanced nutrition without overheating or cooling your body too much.' : ''}
                  {food.temperature.max > 25 ? ' helps cool your body and keeps you hydrated during hot weather.' : ''}
                </p>
                
                <p className="text-gray-600 dark:text-gray-300">
                  The combination of {food.ingredients.slice(0, 3).join(', ')} and other ingredients makes this dish both 
                  nutritious and perfectly adapted to current weather conditions.
                </p>
              </div>
            </div>
          )}
          
          {activeTab === 'restaurants' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Where to Find {food.name}</h2>
              
              {food.restaurants && food.restaurants.length > 0 ? (
                <div className="space-y-4">
                  {food.restaurants.map((restaurant, index) => (
                    <div key={index} className="border dark:border-gray-700 rounded-lg p-4 hover:border-indigo-300 dark:hover:border-indigo-500 transition-colors">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-gray-900 dark:text-white">{restaurant.name}</h3>
                        <div className="flex items-center">
                          <span className="text-yellow-500">★</span>
                          <span className="ml-1 text-sm text-gray-600 dark:text-gray-300">{restaurant.rating}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-start mt-2">
                        <MapPin className="w-4 h-4 text-gray-400 mt-0.5 mr-1 flex-shrink-0" />
                        <p className="text-sm text-gray-600 dark:text-gray-300">{restaurant.location}</p>
                      </div>
                      
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        Price Range: {restaurant.priceRange}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    No restaurants found serving {food.name} in your current area.
                  </p>
                  
                  <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg inline-block">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">Try It at Home!</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Follow our detailed recipe to enjoy this delicious dish in the comfort of your home.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default FoodDetailPage;