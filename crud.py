"""CRUD operations."""

import os
import json
import requests
from model import db, User, Listing, Entry, Itinerary, connect_to_db

API_KEY = os.environ["YELP_API_KEY"]
HEADERS = {"Authorization": f"Bearer {API_KEY}"}

def create_user(fname, lname, email, username, password):
    new_user = User(
        fname=fname,
        lname=lname,
        email=email,
        username=username,
        password=password
    )

    return new_user

def user_exists(email):
    user_email = User.query.filter_by(email=email).all()
    if user_email:
        return True
    else:
        return False

def login_info_matches(username, password):
    login_info = User.query.filter_by(username=username).one()
    if login_info.password == password:
        
        return True
    else:
        return False

def create_listing(yelp_id, title, city, state, zipcode, photo_url, yelp_url):
    new_listing = Listing(yelp_id=yelp_id, title=title, city=city, state=state, zipcode=zipcode, photo_url=photo_url, yelp_url=yelp_url)

    return new_listing

def create_entry(itinerary_id, listing_id, scheduled_day):
    new_entry = Entry(itinerary_id=itinerary_id, listing_id=listing_id, scheduled_day=scheduled_day)

    return new_entry

def create_itinerary(user_id, name):
    new_itinerary = Itinerary(user_id=user_id, name=name)

    return new_itinerary

def return_all_listings():

    return Listing.query.all()

def request_listing_info(yelp_id):
    ENDPOINT = f"https://api.yelp.com/v3/businesses/{yelp_id}"

    response = requests.get(url=ENDPOINT, headers=HEADERS)

    yelp_data = response.json()

    return yelp_data

def request_location_info(location, category):

    ENDPOINT = "https://api.yelp.com/v3/businesses/search"
    # CATEGORIES = ["food", "local flavor", "tours", "shopping", "parks"]
    params = {
        "location": location,
        "category": category,
        "radius": 500, 
        "limit": 50
    }
    response = requests.get(url=ENDPOINT, headers=HEADERS, params=params)
    yelp_data = response.json()

    return yelp_data

def get_user(username):

    user = User.query.filter_by(username=username).first()
    return user

def get_itinerary(user_id):
    
    itineraries = Itinerary.query.filter_by(user_id=user_id).all()
    return itineraries

def get_itinerary_details(itinerary_id):
    
    query_entries = Entry.query.filter_by(itinerary_id=itinerary_id).order_by(Entry.scheduled_day).all()
    print(query_entries)
    entries = {}
    for i in range(len(query_entries)):
        entries[i] = {
            "title": query_entries[i].listing.title,
            "id": query_entries[i].itinerary_entry_id,
            "datetime": query_entries[i].scheduled_day
        }
    
    return entries

def update_entry_time(entry_id, new_datetime):
    
    entry = Entry.query.filter_by(itinerary_entry_id=entry_id).first()
    entry.scheduled_day = new_datetime

    return entry

def delete_entry(entry_id):
    
    Entry.query.filter_by(itinerary_entry_id=entry_id).delete()

if __name__ == '__main__':
    from server import app
    connect_to_db(app)