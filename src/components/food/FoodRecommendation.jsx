import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChefHat, Heart } from 'lucide-react';

/**
 * @param {{ foodItems: any[] }} props
 */
const FoodRecommendations = ({ foodItems }) => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const toggleFavorite = (id, e) => {
    e.preventDefault();
    const newFavorites = favorites.includes(id)
      ? favorites.filter(favId => favId !== id)
      : [...favorites, id];

    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  // Debug logging
  useEffect(() => {
    console.log('FoodRecommendations received foodItems:', foodItems);
  }, [foodItems]);

  // If loading or invalid
  if (!Array.isArray(foodItems)) {
    return (
      <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl">
        <p className="text-lg text-gray-600 dark:text-gray-300 font-medium">Loading recommendations...</p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">Please wait while we fetch the data.</p>
      </div>
    );
  }

  // If empty
  if (foodItems.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl">
        <ChefHat className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500" />
        <h3 className="mt-4 text-xl font-medium text-gray-900 dark:text-white">No recommendations available</h3>
        <p className="mt-2 text-gray-500 dark:text-gray-400">Try searching for a different location or check back later.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {foodItems.map((food, index) => (
        <motion.div
          key={food._id || food.id || index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ y: -5 }}
        >
          <Link to={`/food/${food._id || food.id}`} className="block h-full">
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
              <div className="relative h-48">
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={(e) => toggleFavorite(food._id || food.id, e)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 transition-colors"
                  aria-label={favorites.includes(food._id || food.id) ? "Remove from favorites" : "Add to favorites"}
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favorites.includes(food._id || food.id)
                        ? 'text-red-500 fill-red-500'
                        : 'text-gray-400 dark:text-gray-300'
                    }`}
                  />
                </button>
              </div>

              <div className="p-4 flex-grow">
                <div className="flex flex-wrap gap-2 mb-2">
                  {Array.isArray(food.tags) &&
                    food.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-xs rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300"
                      >
                        {tag}
                      </span>
                    ))}
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{food.name}</h3>

                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-4">
                  {food.description}
                </p>

                {food.recipe && (
                  <div className="mt-auto">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {food.recipe.difficulty} • {food.recipe.prepTime} prep
                    </p>
                  </div>
                )}
              </div>

              {Array.isArray(food.weatherConditions) && (
                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-3 text-center">
                  <p className="text-sm font-medium text-indigo-800 dark:text-indigo-300">
                    Perfect for {food.weatherConditions.slice(0, 2).join('/')} weather
                  </p>
                </div>
              )}
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default FoodRecommendations;
