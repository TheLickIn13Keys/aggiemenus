// For individual menu items
interface FoodItem {
  id: string;
  dc: string; // Segundo, Tercero, Cuarto, Latitude
  description: string;
  name: string;
  section: string; // Depends on DC, but Tomato Grill, Bistro, etc
  day: string;
  serving_size: string;
  calories: string;
  fat: string;
  protein: string;
  carbs: string;
  allergens: string[];
  vegetarian: boolean;
  vegan: boolean;
  halal: boolean;
}

export default FoodItem;
