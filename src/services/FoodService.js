// import { FoodItem, WeatherData } from '../types';
import { foodDatabase } from '../data/FoodData';

export const getFoodRecommendations = (weather) => {
  const { temp, condition } = weather;
  
  // Filter foods by weather condition and temperature range
  let recommendations = foodDatabase.filter(food => {
    const matchesCondition = food.weatherConditions.some(
      wc => wc.toLowerCase() === condition.toLowerCase()
    );
    
    const matchesTemp = 
      temp >= food.temperature.min && 
      temp <= food.temperature.max;
    
    return matchesCondition && matchesTemp;
  });
  
  // If no recommendations, provide general options based on temperature
  if (recommendations.length === 0) {
    if (temp < 15) {
      // Cold weather foods
      recommendations = foodDatabase.filter(food => food.temperature.max < 25);
    } else if (temp > 25) {
      // Hot weather foods
      recommendations = foodDatabase.filter(food => food.temperature.min > 15);
    } else {
      // Moderate weather - show a mix
      recommendations = foodDatabase.slice(0, 6);
    }
  }
  
  // Limit to 6 recommendations
  return recommendations.slice(0, 6);
};

export const getFoodById = (id) => {
  return foodDatabase.find(food => food.id === id);
};

export const getNearbyRestaurants = (foodItem, city) => {
  // In a real app, this would call a maps API to find nearby restaurants
  // For now, return the mock restaurants from the food item if they exist
  return foodItem.restaurants || [];
};