"""Script to seed database."""

import os
import json
import requests
from random import choice, randint
from datetime import datetime

import crud
import model
import server

os.system('dropdb itineraries')
os.system('createdb itineraries')

model.connect_to_db(server.app)
model.db.create_all()

API_KEY = os.environ["YELP_API_KEY"]
ENDPOINT = "https://api.yelp.com/v3/businesses/search"
HEADERS = {"Authorization": f"Bearer {API_KEY}"}

# PARAMETERS = {
#     "location": "San Francisco", #how to get user's location?
#     "categories": "food, local flavor, tours, shopping, parks",
#     "radius": 500,
#     "limit": 50
# }

# response = requests.get(url=ENDPOINT, headers=HEADERS, params=PARAMETERS)

# yelp_data = response.json()
# print(type(yelp_data))

# function that will call yelp API for different categories
categories = ["food", "local flavor", "tours", "shopping", "parks"]

def create_params(category):

    PARAMETERS = {
        "location": "San Francisco", #how to get user's location?
        "term": category,
        "radius": 500,
        "limit": 5
    }

    response = requests.get(url=ENDPOINT, headers=HEADERS, params=PARAMETERS)

    yelp_data = response.json()

    yelp_data_in_db = []
    for listing in yelp_data["businesses"]:
        yelp_id, title, activity_type = (
            listing["id"],
            listing["name"],
            category
        )

        db_listing = crud.create_listing(yelp_id, title, activity_type)
        yelp_data_in_db.append(db_listing)

    model.db.session.add_all(yelp_data_in_db)
    model.db.session.commit()

for category in categories:
    create_params(category) 

