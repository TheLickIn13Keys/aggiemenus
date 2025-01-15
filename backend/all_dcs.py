from bs4 import BeautifulSoup
import requests

all_dcs = ["Segundo", "Tercero", "Cuarto", "Latitude"]

target_urls = [(dc, f"https://housing.ucdavis.edu/dining/menus/dining-commons/{dc.lower()}/") for dc in all_dcs]

all_parsers = []

for dc, url in target_urls:
    all_parsers.append((dc, BeautifulSoup(requests.get(url).content, "html.parser")))
