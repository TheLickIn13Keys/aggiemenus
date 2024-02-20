from datetime import datetime
import regex as re
from tqdm import tqdm
import json
import calendar

def scrape_data(dc, parser):
    # List of items
    items = []

    # Parsing logic
    for i in tqdm(range(1, 8), desc=f"Parsing data from {dc}"):
        day = parser.find(id=f"tab{i}content")
        date = datetime.strptime(day.find("h3").get_text(), "%A, %B %d, %Y") # Date info
        meal_time = day.find_all("h4")
        is_closed = day.find_next_sibling("h4", string="Menu not scheduled for today.")

        # If the DC is closed, skip to the next day
        if is_closed:
            continue

        for meal in meal_time:
            meal_name = meal.get_text() # Ex: Breakfast

            for section in meal.find_next_siblings("h5"):
                section_name = section.get_text() # Ex: Tomato Grill
                for food_choices in section.find_next_sibling("ul").find_all("li", class_="trigger"):
                    food_name = food_choices.find("span").get_text() # Ex: Pancakes
                    # Amount of calories per meal
                    calories = food_choices.find_next("h6", string="Calories").find_next_sibling("p").get_text()
                    
                    # Amount of fat per meal
                    fat = food_choices.find_next("h6", string="Fat (g)").find_next_sibling("p").get_text()
                    
                    # Amount of carbs per meal
                    carbs = food_choices.find_next("h6", string="Carbohydrates (g)").find_next_sibling("p").get_text()
                    
                    # Amount of protein per meal
                    protein = food_choices.find_next("h6", string="Protein (g)").find_next_sibling("p").get_text()
                    
                    # Allergens per meal
                    allergens = "No major allergens"
                    allergens_tag = food_choices.find_next("h6", string="Allergens").find_next_sibling("p")
                    if allergens_tag and allergens_tag.get_text().isupper():
                        allergens = allergens_tag.get_text()

                    # List of filter tags
                    filter_tags = food_choices.get('class')

                    halal, vegan, vegetarian = False, False, False

                    # If there are filter tags
                    if filter_tags:
                        # Check if item is halal
                        if "filterHalal" in filter_tags: halal = True

                        # Check if item is vegan (NOTE: if something is vegan it must be vegetarian)
                        if "filterVegan" in filter_tags: vegan = True; vegetarian = True
                        
                        # Check if item is vegetarian 
                        if "filterVegetarian" in filter_tags: vegetarian = True 

                    # Create food item dictionary
                    item = {
                        "dc": dc,
                        "date": date.weekday(),
                        "meal": meal_name,
                        "section": section_name, 
                        "name": food_name,
                        "calories": re.sub("^:\s", "", calories),
                        "fat": re.sub("^:\s", "", fat),
                        "carbs": re.sub("^:\s", "", carbs),
                        "protein": re.sub("^:\s", "", protein),
                        "allergens": [word.strip().capitalize() for word in allergens.split(",")],
                        "halal": halal,
                        "vegan": vegan,
                        "vegetarian": vegetarian
                    }

                    if item not in items:
                        items.append(item)


    # with open(f"{dc}_data.json", "w") as file:
    #     json.dump(items, file)

    # Return dictionary of food items for the given DC
    return items
