import dc_data_scraper
import all_dcs
import supabase
from dotenv import load_dotenv
import os

# Load variables from .env file
load_dotenv()

# Get supabase url and key from .env
url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")

# Create supabase client
client = supabase.create_client(url, key)

def fetch_db_dc_menu(dc):
    """Return the rows that correspond to the selected DC from the DB"""
    return client.table("food_items").select("*").eq("dc", dc).execute()

def update_db_dc_menu(dc, menu):
    """Update the DB menu that corresponds to the selected DC"""
    client.table("food_items").delete().eq("dc", dc).execute()
    client.table("food_items").insert(menu).execute()

for dc, parser in all_dcs.all_parsers:
    scraped_menu = dc_data_scraper.scrape_data(dc=dc, parser=parser)
    update_db_dc_menu(dc, scraped_menu)
    # dc_menu = fetch_db_dc_menu(dc)