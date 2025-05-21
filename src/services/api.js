const BASE_URL = 'http://localhost:5000/api';

export const fetchFoodById = async (id) => {
  const res = await fetch(`${BASE_URL}/foods/${id}`);
  if (!res.ok) throw new Error('Failed to fetch food');
  return res.json();
};

export const fetchAllFoods = async () => {
  const res = await fetch(`${BASE_URL}/foods`);
  if (!res.ok) throw new Error('Failed to fetch foods');
  return res.json();
};
