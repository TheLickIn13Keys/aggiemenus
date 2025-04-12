import json
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"*": {"origins": "*"}})


def load_menu_data():
    """Load menu data from JSON file."""
    try:
        with open("/app/shared_data/menu_data.json", "r") as f:
            return json.load(f)
    except FileNotFoundError:
        print("Warning: menu_data.json not found")
        return {}
    except json.JSONDecodeError:
        print("Error: Invalid JSON in menu_data.json")
        return {}

def load_food_truck_data():
    """Load food truck data from JSON file."""
    try:
        with open("food_truck_data.json", "r") as f:
            return json.load(f)
    except FileNotFoundError:
        print("Warning: food_truck_data.json not found")
        return {"food_trucks": []}
    except json.JSONDecodeError:
        print("Error: Invalid JSON in food_truck_data.json")
        return {"food_trucks": []}


@app.route("/api/food-trucks", methods=["GET"])
def get_food_trucks():
    """
    Returns food truck schedule data from the JSON file
    """
    food_truck_data = load_food_truck_data()
    return jsonify(food_truck_data), 200

@app.route("/api/menu", methods=["GET"])
def get_menu():
    """
    Usage: GET /api/menu?dc=Segundo&day=2&meal=Lunch
    Returns menu items from the JSON file
    """
    dc = request.args.get("dc")
    day_str = request.args.get("day")
    meal = request.args.get("meal")

    menu_data = load_menu_data()

    if not dc or day_str is None or not meal:
        # Return the entire menu data when no parameters are specified
        return jsonify(menu_data), 200

    try:
        day = int(day_str)
    except ValueError:
        return jsonify({"error": f"Invalid day: {day_str}"}), 400

    # Load latest menu data
    menu_data = load_menu_data()

    # Create key in same format as JSON file
    key = f"{dc}_{day}_{meal}"

    items = menu_data.get(key, [])
    return jsonify(items), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
