interface FoodItem {
  id: string;
  dc: string; // Segundo, Tercero, Cuarto, Latitude
  section: string; // Depends on DC, but Tomato Grill, Bistro, etc
  day: string;
  meal: string;
  common_items: {
    name: string;
    description: string;
    serving_size: string;
    calories: string;
    fat: string;
    protein: string;
    carbs: string;
    allergens: string[];
    vegetarian: boolean;
    vegan: boolean;
    halal: boolean;
    pescetarian: boolean;
    dairyFree: boolean;
    glutenFree: boolean;
    embedding: number[];
  };
}

export default FoodItem;
