import dc_data_scraper
import all_dcs
import supabase
import json
from dotenv import load_dotenv
import os
from openai import OpenAI

def get_embedding(text, model="text-embedding-3-small"):
    text = text.replace("\n", " ")
    client = OpenAI(
        api_key = os.environ.get("OPEN_AI_KEY")
    )
    response = client.embeddings.create(
        input=text,
        model="text-embedding-ada-002"
    )
    return response.data[0].embedding

def find_or_create_common_items(item):
    """Finds item in common_items table, or creates a new item, and returns the id"""
    try:
        # Check if the item exists in the common_items table
        res = client.table('common_items').select('id', 'name').eq('name', item['name']).execute()
        # print(f"Search result for {item['name']}: {res.data}")

        if len(res.data) == 0:
            # If the item does not exist, insert it
            item_string = json.dumps(item)
            embedding_data = get_embedding(item_string)
            item_without_id = {
                'name': item['name'],
                'description': item['description'],
                'serving_size': item['serving_size'],
                'calories': item['calories'],
                'fat': item['fat'],
                'carbs': item['carbs'],
                'protein': item['protein'],
                'allergens': item['allergens'],
                'halal': item['halal'],
                'vegan': item['vegan'],
                'vegetarian': item['vegetarian'],
                'pescetarian': item['pescetarian'],
                'dairyFree': item['dairyFree'],
                'glutenFree': item['glutenFree'],
                'embedding': embedding_data,
            }
            # print(f"Inserting new item: {item['name']}")
            result = client.table('common_items').insert(item_without_id).execute()
            return result.data[0]['id'] if result.data else None
        elif len(res.data) == 1:
            print(f"Found existing item: {item['name']}")
            return res.data[0]['id']
        else:
            raise ValueError(f'More than one item found with name {item["name"]}')
    except Exception as e:
        print(f"Error processing item {item['name']}: {str(e)}")
        raise

def update_current_menu(dc, menu):
    """Update the DB menu that corresponds to the selected DC"""
    try:
        # First, delete existing menu items for this DC
        delete_result = client.table("current_menu").delete().eq("dc", dc).execute()
        # print(f"Deleted existing menu items for {dc}")
        
        # Add IDs to each menu item before inserting
        for item in menu:
            if 'id' in item:
                del item['id']
        
        # Insert the new menu items
        insert_result = client.table("current_menu").insert(menu).execute()
        print(f"Inserted {len(menu)} items for {dc}")
        
        return True
    except Exception as e:
        print(f"Error updating menu for {dc}: {str(e)}")
        raise
    
# def delete_all_data(): used for testing to delete all data from both tables in the database, basically dont use this unless you know what you are doing
#     """Delete all data from both tables in the database"""
#     try:
#         # Delete all items from current_menu first (due to foreign key constraints)
#         delete_menu_result = client.table("current_menu").delete().neq("id", 0).execute()
#         print(f"Deleted all items from current_menu: {delete_menu_result.data}")
        
#         # Delete all items from common_items
#         delete_items_result = client.table("common_items").delete().neq("id", 0).execute()
#         print(f"Deleted all items from common_items: {delete_items_result.data}")
        
#         return True
#     except Exception as e:
#         print(f"Error in delete_all_data: {str(e)}")
#         raise

if __name__ == '__main__':
    # Load variables from .env file
    load_dotenv()

    # Get supabase url and key from .env
    url = os.environ.get("SUPABASE_URL")
    key = os.environ.get("SUPABASE_SERVICE_KEY")

    print(f"Using Supabase URL: {url}")
    print(f"Using key ending in: {key[-4:] if key else 'None'}")

    # Create supabase client
    client = supabase.create_client(url, key)

    # Process each DC
    for dc, parser in all_dcs.all_parsers:
        print(f"\nProcessing {dc}...")
        menu = []
        for common_item_info, current_menu_info in dc_data_scraper.scrape_data(dc=dc, parser=parser):
            # Find or create a common item and store its primary key
            common_item_id = find_or_create_common_items(item=common_item_info)
            if common_item_id:
                # The common item's primary key will be used as a foreign key in the current menu
                current_menu_info['item_id'] = common_item_id
                menu.append(current_menu_info)

        # Update the menu for the current DC
        if menu:
            print(f"Updating menu for {dc} with {len(menu)} items")
            update_current_menu(dc=dc, menu=menu)
        else:
            print(f"No menu items found for {dc}")

    #    delete_all_data() yeah its in the name
