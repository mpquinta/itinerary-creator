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

# function that will call yelp API for different categories
categories = ["food", "local flavor", "tours", "shopping", "parks"]

def create_data_by_cat(category):

    ENDPOINT = "https://api.yelp.com/v3/businesses/search"
    PARAMETERS = {
        "location": "San Francisco", #how to get user's location?
        "term": category,
        "radius": 500,
        "limit": 5
    }

    response = requests.get(url=ENDPOINT, headers=crud.HEADERS, params=PARAMETERS)

    yelp_data = response.json()

    yelp_data_in_db = []
    for listing in yelp_data["businesses"]:
        yelp_id, title = (
            listing["id"],
            listing["name"]
        )

        db_listing = crud.create_listing(yelp_id, title)
        yelp_data_in_db.append(db_listing)

    model.db.session.add_all(yelp_data_in_db)
    model.db.session.commit()

for category in categories:
    create_data_by_cat(category) 

users_in_db = []
entries_in_db = []
itineraries_in_db =[]
for i in range(1, 4):
    fname = f"First {i}"
    lname = f"Last {i}"
    email = f"user{i}@test.com"
    username = f"user{i}"
    password = "test"

    new_user = crud.create_user(fname, lname, email, username, password)
    users_in_db.append(new_user)

    for j in range(1, 6):
        new_itinerary = crud.create_itinerary(i)
        itineraries_in_db.append(new_itinerary)

        new_itinerary_entry = crud.create_entry(j, randint(1, 25), f"2022-08-04 {j}:00")
        entries_in_db.append(new_itinerary_entry)

model.db.session.add_all(users_in_db)
model.db.session.add_all(entries_in_db)
model.db.session.add_all(itineraries_in_db)
model.db.session.commit()




