from datetime import datetime
import regex as re
from tqdm import tqdm


def scrape_data(dc, parser):
    for i in tqdm(range(1, 8), desc=f"Parsing data from {dc}"):
        day = parser.find(id=f"tab{i}content")
        if not day:
            continue
        
        date_str = day.find("h3").get_text()
        date = datetime.strptime(date_str, "%A, %B %d, %Y") # Date info
        
        meal_times = day.find_all("h4")

        for meal in meal_times:
            meal_name = meal.get_text() # Ex: Breakfast
            
            sections = meal.find_next_siblings("h5")
            for section in sections:
                section_name = section.get_text() # Ex: Tomato Street Grill

                food_choices = section.find_next_sibling("ul")
                if food_choices:
                    for food_choice in food_choices.find_all("li", class_="trigger"):
                        food_name = food_choice.find("span").get_text().strip() # Name of the food
                        
                        # Extract nutrition information
                        nutrition_info = food_choice.find("ul", class_="nutrition")
                        description = "None"  # Default value for description
                        serving_size = "N/A"
                        calories = "N/A"
                        fat = "N/A"
                        carbs = "N/A"
                        protein = "N/A"
                        allergens = "No major allergens" # Default value

                        if nutrition_info:
                            nutrition_list = nutrition_info.find_all("li")
                            
                            # Extract description if available
                            desc_p = nutrition_info.find("p")
                            if desc_p:
                                description = desc_p.get_text().strip()

                            for li in nutrition_list:
                                if "Serving Size" in li.text:
                                    serving_size = li.text.split(":")[1].strip()
                                elif "Calories" in li.text:
                                    calories = li.text.split(":")[1].strip()
                                elif "Fat" in li.text:
                                    fat = li.text.split(":")[1].strip()
                                elif "Carbohydrates" in li.text:
                                    carbs = li.text.split(":")[1].strip()
                                elif "Protein" in li.text:
                                    protein = li.text.split(":")[1].strip()
                                elif "Contains" in li.text:
                                    allergens = li.find_next("p").get_text().strip().upper()

                        # Determine dietary tags
                        filter_tags = food_choice.get('class')
                        halal, vegan, vegetarian = False, False, False
                        
                        if filter_tags:
                            if "filterHalal" in filter_tags:
                                halal = True
                            if "filterVegan" in filter_tags:
                                vegan = True
                                vegetarian = True
                            elif "filterVegetarian" in filter_tags:
                                vegetarian = True

                        allergens_lower = [allergen.strip().lower() for allergen in allergens.split(",")]

                        # Dairy-free if no dairy allergen
                        dairyFree = not any('dairy' in allergen for allergen in allergens_lower)

                        # Gluten-free if no wheat/gluten allergen
                        glutenFree = not any(('wheat' in allergen or 'gluten' in allergen) for allergen in allergens_lower)

                        # Pescetarian if vegetarian/vegan OR contains fish/shellfish
                        pescetarian = vegetarian or vegan or any(
                            ('fish' in allergen or 'shellfish' in allergen) for allergen in allergens_lower
                        )

                        common_item_info = {
                            "name": food_name,
                            "description": description,
                            "serving_size": serving_size,
                            "calories": calories,
                            "fat": fat,
                            "carbs": carbs,
                            "protein": protein,
                            "allergens": [word.strip().capitalize() for word in allergens.split(",")],
                            "halal": halal,
                            "vegan": vegan,
                            "vegetarian": vegetarian,
                           # "dairyFree": dairyFree,
                           # "glutenFree": glutenFree,
                           # "pescetarian": pescetarian
                        }

                        current_item_info = {
                            "dc": dc,
                            "day": date.weekday(), # Mon = 0, Sun = 6
                            "meal": meal_name,
                            "section": section_name, 
                        }

                        # Yield the scraped item to db_connection.py so we can insert the it into the DB
                        yield (common_item_info, current_item_info)    # Parsing logic
