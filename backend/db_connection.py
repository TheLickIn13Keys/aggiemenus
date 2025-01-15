import os
import json
import time
import threading
from dotenv import load_dotenv
from openai import OpenAI
import supabase
from flask_cors import CORS

import dc_data_scraper
import all_dcs

# -- Flask Imports --
from flask import Flask, request, jsonify

# -- Scheduling library --
import schedule

app = Flask(__name__)
CORS(app, resources={r"*": {"origins": "*"}})

menu_data = {}


def get_embedding(text, model="text-embedding-3-small"):
    text = text.replace("\n", " ")
    client_oa = OpenAI(api_key=os.environ.get("OPEN_AI_KEY"))
    response = client_oa.embeddings.create(
        input=text,
        model="text-embedding-ada-002",
    )
    return response.data[0].embedding


def find_or_create_common_items(item):
    """Finds item in the common_items table, or creates a new item, and returns the id."""
    try:
        # Check if the item exists in the common_items table
        res = (
            client.table("common_items")
            .select("id", "name")
            .eq("name", item["name"])
            .execute()
        )

        if len(res.data) == 0:
            # If the item does not exist, insert it
            item_string = json.dumps(item)
            embedding_data = get_embedding(item_string)
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
                "embedding": embedding_data,
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


def update_current_menu(dc, menu):
    """Updates the 'current_menu' table for a specific DC in Supabase."""
    try:
        # First, delete existing menu items for this DC
        client.table("current_menu").delete().eq("dc", dc).execute()

        # Make sure no leftover 'id' fields cause conflicts
        for item in menu:
            item.pop("id", None)

        # Insert the new menu items
        insert_result = client.table("current_menu").insert(menu).execute()
        print(f"Inserted {len(menu)} items for {dc}")
        return True

    except Exception as e:
        print(f"Error updating menu for {dc}: {str(e)}")
        raise


def scrape_and_load():
    print("Starting daily scrape_and_load() ...")
    # Clear old in-memory data to avoid duplication
    menu_data.clear()

    for dc, parser in all_dcs.all_parsers:
        print(f"\nProcessing {dc}...")
        menu = []

        # Run the existing scraper
        for common_item_info, current_menu_info in dc_data_scraper.scrape_data(
            dc=dc, parser=parser
        ):
            # Create/find corresponding common_item row
            common_item_id = find_or_create_common_items(item=common_item_info)
            if common_item_id:
                # Link the new row to the current_menu item
                current_menu_info["item_id"] = common_item_id
                current_menu_info["common_items"] = common_item_info
                menu.append(current_menu_info)
                # print(current_menu_info)

        # Remove 'common_items' from each dict before passing to update_current_menu
        sanitized_menu = []
        for menu_item in menu:
            # Make a shallow copy to avoid mutating the original
            menu_item_copy = dict(menu_item)
            menu_item_copy.pop("common_items", None)
            sanitized_menu.append(menu_item_copy)

        # Update the menu in Supabase for this DC
        if sanitized_menu:
            print(f"Updating menu for {dc} with {len(sanitized_menu)} items")
            update_current_menu(dc=dc, menu=sanitized_menu)
        else:
            print(f"No menu items found for {dc}")

        # ALSO store everything in our in-memory dictionary
        for item in menu:
            key = (item["dc"], item["day"], item["meal"])
            menu_data.setdefault(key, []).append(item)


print("Finished daily scrape_and_load().")


@app.route("/api/menu", methods=["GET"])
def get_menu():
    """
    Usage: GET /api/menu?dc=Segundo&day=2&meal=Lunch
    Returns the list of items from our in-memory store without hitting Supabase
    """
    dc = request.args.get("dc")
    day_str = request.args.get("day")
    meal = request.args.get("meal")

    if not dc or day_str is None or not meal:
        return jsonify({"error": "Please specify dc, day, and meal"}), 400

    try:
        day = int(day_str)
    except ValueError:
        return jsonify({"error": f"Invalid day: {day_str}"}), 400

    key = (dc, day, meal)
    items = menu_data.get(key, [])
    return jsonify(items), 200


def run_scheduler():
    """
    Runs the schedule.run_pending() loop in a background thread so that
    it doesn't block the Flask server.
    """
    while True:
        schedule.run_pending()
        time.sleep(60)  # Check tasks once per minute


if __name__ == "__main__":
    load_dotenv()

    # Get Supabase URL and key
    url = os.environ.get("SUPABASE_URL")
    s_key = os.environ.get("SUPABASE_SERVICE_KEY")
    print(f"Using Supabase URL: {url}")
    print(f"Using key ending in: {s_key[-4:] if s_key else 'None'}")

    global client
    client = supabase.create_client(url if url else " ", s_key if s_key else " ")

    # 1) Initial scrape when starting up
    scrape_and_load()

    schedule.every().day.at("04:00").do(scrape_and_load)
    # schedule.every().hour.do(scrape_and_load)

    # 3) Start the scheduler in a background thread
    scheduler_thread = threading.Thread(target=run_scheduler, daemon=True)
    scheduler_thread.start()

    # 4) Start Flask
    #    The app will keep running, and the scheduler thread will do the daily job.
    app.run(host="0.0.0.0", port=5231)
