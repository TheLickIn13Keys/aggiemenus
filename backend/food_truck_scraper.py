from bs4 import BeautifulSoup
import requests

urls = 'https://housing.ucdavis.edu/dining/food-trucks/'

'''
start at this div
<div class="food_trucks_schedule">

scrape everything in here
// Date
<h3>Monday,&nbsp; February 03,2025</h3>
// Location
	<h4>Quad</h4>
		// Actual place to eat
		<p>
			<strong> Quickly's</strong>
			// Followed by time
			"11 a.m. to 3 p.m."
		</p>
'''
# store everything in a list/hashmap? 
res = []

def scrape_food_trucks():

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    
    response = requests.get(urls, headers=headers)

    
    soup = BeautifulSoup(response.text, "html.parser")
    
    schedules = soup.find_all("div", class_="food_trucks_schedule")
    
    if schedules:
        schedule_div = schedules[0] 
        dates = schedule_div.find_all("h3")
        
        for date in dates:
            location = date.find_next("h4")
            place_time = location.find_next("p") if location else None
            
            if all([date, location, place_time]):
                place = place_time.find("strong")
                date_text = date.text.strip()
                location_text = location.text.strip()
                place_text = place.text.strip() if place else ""
                time_text = place_time.text.replace(place_text, "").strip().strip('"')
                
                res.append({
                    "date": date_text,
                    "location": location_text,
                    "place": place_text,
                    "time": time_text
                })

scrape_food_trucks()
print("\nResults:")
for item in res:
    print(f"\nDate: {item['date']}")
    print(f"Location: {item['location']}")
    print(f"Place: {item['place']}")
    print(f"Time: {item['time']}")