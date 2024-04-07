#import openai
import os
from dotenv import load_dotenv
from openai import OpenAI

# Load variables from .env file
load_dotenv()

client = OpenAI(
    api_key = os.environ.get("OPEN_API_KEY")
)

response = client.embeddings.create(
  input="Educative answers section is helpful",
  model="text-embedding-ada-002"
)

print(response)
