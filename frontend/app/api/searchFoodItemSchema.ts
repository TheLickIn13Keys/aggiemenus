interface SearchFoodItem {
  id: number;
  dc: string;
  section: string;
  day: string;
  meal: string;
  item_id: number;
  name: string;
  description: string;
  serving_size: string;
  calories: string;
  fat: string;
  carbs: string;
  protein: string;
  allergens: string[];
  halal: boolean;
  vegan: boolean;
  vegetarian: boolean;
  similarity: number;
}

export default SearchFoodItem;
