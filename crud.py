"""CRUD operations."""

from model import db, User, Listing, Entry, connect_to_db

def create_user(fname, lname, email, username, password):
    new_user = User(
        fname=fname,
        lname=lname,
        email=email,
        username=username,
        password=password
    )

    return new_user

def create_listing(yelp_id, title, activity_type):
    new_listing = Listing(yelp_id=yelp_id, title=title, activity_type=activity_type)

    return new_listing

def create_entry(user_id, listing_id, scheduled_day):
    new_entry = Entry(user_id=user_id, listing_id=listing_id, scheduled_day=scheduled_day)

    return new_entry

def get_listings():

    return Listing.query.limit(50)

#

if __name__ == '__main__':
    from server import app
    connect_to_db(app)