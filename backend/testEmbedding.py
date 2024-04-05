#import openai
import os
from dotenv import dotenv_values
from openai import OpenAI

# Load variables from .env file
config = dotenv_values(".env")

client = OpenAI(
    api_key = config.get("SECRET_KEY")
)

response = client.embeddings.create(
  input="Educative answers section is helpful",
  model="text-embedding-ada-002"
)

print(response)
