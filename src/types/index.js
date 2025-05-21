/**
 * @typedef {Object} Coordinates
 * @property {number} lat
 * @property {number} lon
 * @property {string} city
 */

/**
 * @typedef {Object} WeatherData
 * @property {string} city
 * @property {string} country
 * @property {number} temp
 * @property {number} feelsLike
 * @property {string} condition
 * @property {string} description
 * @property {string} icon
 * @property {number} humidity
 * @property {number} windSpeed
 * @property {number} dt // Date time in unix timestamp
 */

/**
 * @typedef {Object} FoodItem
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {string} image
 * @property {string[]} weatherConditions
 * @property {{ min: number, max: number }} temperature
 * @property {boolean} seasonal
 * @property {string[]} ingredients
 * @property {{ prepTime: string, cookTime: string, difficulty: ('Easy'|'Medium'|'Hard'), steps: string[] }} recipe
 * @property {{ calories: number, protein: number, carbs: number, fat: number, fiber: number }} nutrients
 * @property {{ name: string, location: string, rating: number, priceRange: string }[]=} restaurants
 * @property {string[]} tags
 */

/**
 * @typedef {Object} Restaurant
 * @property {string} id
 * @property {string} name
 * @property {string} address
 * @property {string} city
 * @property {number} rating
 * @property {string} priceRange
 * @property {string[]} foodItems
 * @property {string=} phone
 * @property {string=} website
 * @property {string=} openHours
 * @property {string=} image
 */