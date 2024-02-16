import dc_data_scraper
from supabase_py import create_client, Client
from dotenv import load_dotenv
import os

# Load variables from .env file
load_dotenv()

# Get supabase url and key from .env
url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")

# Create supabase client
supabase: Client = create_client(url, key)

# Insert items into the database
response = supabase.table("food_items").insert(dc_data_scraper.items).execute()

# Check the response
if response['staus_code'] != 201:
    print("An error as occured while attempting to insert data into the database")
else:
    print("Successfully inserted data into the database!")