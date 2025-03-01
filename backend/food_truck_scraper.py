from bs4 import BeautifulSoup
import requests
import json
import time
import threading
import schedule

url = 'https://housing.ucdavis.edu/dining/food-trucks/'

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

'''
issue: not recurisvely going through each date, skips everything after the first truck
'''
res = []

def scrape_food_trucks():
    res = []
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    
    try:
        response = requests.get(url, headers=headers)
        soup = BeautifulSoup(response.text, "html.parser")
        schedules = soup.find_all("div", class_="food_trucks_schedule")
        if schedules:
            schedule_div = schedules[0]
            dates = schedule_div.find_all("h3")
            for date in dates:
                date_text = date.text.strip()
                current = date.next_sibling
                
                while current and current.name != "h3":
                    if current.name == "h4":  # This is a location
                        location_text = current.text.strip()
                        loc_current = current.next_sibling
                        
                        while loc_current and loc_current.name != "h4" and loc_current.name != "h3":
                            if loc_current.name == "p":  # This is a truck
                                place = loc_current.find("strong")
                                place_text = place.text.strip() if place else ""
                                time_text = loc_current.text.replace(place_text, "").strip().strip('"')
                                
                                res.append({
                                    "date": date_text,
                                    "location": location_text,
                                    "place": place_text,
                                    "time": time_text
                                })
                            loc_current = loc_current.next_sibling
                    current = current.next_sibling

        # Save to JSON file
        with open('food_truck_data.json', 'w') as f:
            json.dump({"food_trucks": res}, f, indent=2)

        print("Food truck data saved successfully")

    except Exception as e:
        print(f"Error scraping food truck data: {str(e)}")

def run_scheduler():
    """Runs the schedule.run_pending() loop in a background thread."""
    while True:
        schedule.run_pending()
        time.sleep(60)  # Check tasks once per minute

if __name__ == "__main__":
    # Initial scrape
    scrape_food_trucks()
    
    # Schedule daily scrape
    schedule.every().day.at("04:00").do(scrape_food_trucks)
    
    # Start scheduler in background thread
    scheduler_thread = threading.Thread(target=run_scheduler, daemon=True)
    scheduler_thread.start()
    
    # Keep main thread alive
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("Shutting down...")
