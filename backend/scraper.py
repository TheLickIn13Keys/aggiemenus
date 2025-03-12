import os
import json
import time
import threading
from dotenv import load_dotenv
import supabase
import schedule

import dc_data_scraper
import all_dcs

# Initialize Supabase client
load_dotenv()
url = os.environ.get("SUPABASE_URL")
s_key = os.environ.get("SUPABASE_SERVICE_KEY")
client = None

if url and s_key:
    client = supabase.create_client(url, s_key)
    print(f"Using Supabase URL: {url}")
    print(f"Using key ending in: {s_key[-4:]}")
else:
    print("Warning: Supabase credentials not found in environment")

def find_or_create_common_items(item):
    """Finds item in the common_items table, or creates a new item, and returns the id."""
    if client is None:
        raise ValueError("Supabase client not initialized")
    try:
        res = (
            client.table("common_items")
            .select("id", "name")
            .eq("name", item["name"])
            .execute()
        )

        if len(res.data) == 0:
            # If the item does not exist, insert it
            item_without_id = {
                "name": item["name"],
                "description": item["description"],
                "serving_size": item["serving_size"],
                "calories": item["calories"],
                "fat": item["fat"],
                "carbs": item["carbs"],
                "protein": item["protein"],
                "allergens": item["allergens"],
                "halal": item["halal"],
                "vegan": item["vegan"],
                "vegetarian": item["vegetarian"],
                "pescetarian": item["pescetarian"],
                "dairyFree": item["dairyFree"],
                "glutenFree": item["glutenFree"],
            }
            result = client.table("common_items").insert(item_without_id).execute()
            return result.data[0]["id"] if result.data else None

        elif len(res.data) == 1:
            print(f"Found existing item: {item['name']}")
            return res.data[0]["id"]
        else:
            raise ValueError(f"More than one item found with name {item['name']}")

    except Exception as e:
        print(f"Error processing item {item['name']}: {str(e)}")
        raise

def scrape_and_save():
    print("Starting daily scrape_and_save()...")
    menu_data = {}

    for dc, parser in all_dcs.all_parsers:
        print(f"\nProcessing {dc}...")
        menu = []

        # Run the scraper
        for common_item_info, current_menu_info in dc_data_scraper.scrape_data(dc=dc, parser=parser):
            # Create/find corresponding common_item row
            common_item_id = find_or_create_common_items(item=common_item_info)
            if common_item_id:
                # Link the new row to the current_menu item
                current_menu_info["item_id"] = common_item_id
                current_menu_info["common_items"] = common_item_info
                menu.append(current_menu_info)

        # Store everything in our dictionary
        for item in menu:
            key = (item["dc"], item["day"], item["meal"])
            menu_data.setdefault(key, []).append(item)

    # Save to JSON file
    with open('menu_data.json', 'w') as f:
        # Convert tuple keys to strings for JSON serialization
        serializable_data = {
            f"{dc}_{day}_{meal}": items
            for (dc, day, meal), items in menu_data.items()
        }
        json.dump(serializable_data, f, indent=2)

    print("Finished daily scrape_and_save().")

def run_scheduler():
    """Runs the schedule.run_pending() loop in a background thread."""
    while True:
        schedule.run_pending()
        time.sleep(60)  # Check tasks once per minute

if __name__ == "__main__":
    if not client:
        print("Error: Supabase client not initialized")
        exit(1)

    # Initial scrape
    scrape_and_save()

    # Schedule daily scrape
    schedule.every().day.at("04:00").do(scrape_and_save)

    # Start scheduler in background thread
    scheduler_thread = threading.Thread(target=run_scheduler, daemon=True)
    scheduler_thread.start()

    # Keep main thread alive
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("Shutting down...")