from bs4 import BeautifulSoup
import requests
import json
import schedule
import time
import threading

url = 'https://housing.ucdavis.edu/dining/food-trucks/'

def scrape_food_trucks():
    print("Starting food truck scrape...")
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
