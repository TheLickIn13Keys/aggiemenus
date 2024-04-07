import dc_data_scraper
import all_dcs
import supabase
import json
from dotenv import load_dotenv
import os
from dotenv import dotenv_values
from openai import OpenAI

# Load variables from .env file


def get_embedding(text, model="text-embedding-3-small"):
    text = text.replace("\n", " ")
    # config = dotenv_values(".env")

    client = OpenAI(
        api_key = os.environ.get("OPEN_API_KEY")
    )

    response = client.embeddings.create(
      input=text,
      model="text-embedding-ada-002"
    )

    return response.data[0].embedding

def find_or_create_common_items(item):
    """Finds item in common_items table, or creates a new item, and returns the id"""
    # Check if the item exists in the common_items table
    res = client.table('common_items').select('id', 'name').eq('name', item['name']).execute()

    if len(res.data) == 0:
        # If the item does not exist, insert it
        item_string = json.dumps(item)
        embedding_data = get_embedding(item_string)
        item['embedding'] = embedding_data
        client.table('common_items').insert(item).execute()

        # Fetch the data again and return the newly generated id
        new_res = client.table('common_items').select('id', 'name').eq('name', item['name']).execute()
        return new_res.data[0]['id']
    elif len(res.data) == 1:
        return res.data[0]['id']
    else:
        raise ValueError(f'More than one item should not be returned but found {len(res.data)}')
    
def update_current_menu(dc, menu):
    """Update the DB menu that corresponds to the selected DC"""
    client.table("current_menu").delete().eq("dc", dc).execute()
    client.table("current_menu").insert(menu).execute()

if __name__ == '__main__':
    # Load variables from .env file
    load_dotenv()

    # Get supabase url and key from .env
    url = os.environ.get("SUPABASE_URL")
    key = os.environ.get("SUPABASE_SERVICE_KEY")

    # Create supabase client
    client = supabase.create_client(url, key)

    for dc, parser in all_dcs.all_parsers:
        menu = []
        for common_item_info, current_menu_info in dc_data_scraper.scrape_data(dc=dc, parser=parser):
            # Find or create a common item and store its primary key
            common_item_id = find_or_create_common_items(item=common_item_info)

            # The common item's primary key will be used as a foreign key in the current menu
            current_menu_info['item_id'] = common_item_id

            # Append current item to menu
            menu.append(current_menu_info)

        # Update the menu for the current DC
        update_current_menu(dc=dc, menu=menu)
