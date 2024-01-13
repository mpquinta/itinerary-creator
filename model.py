"""Models for itinerary app"""

from email.policy import default
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

# instatiate database from SQLAlchemy
db = SQLAlchemy()

class User(db.Model):
    """A user."""

    __tablename__ = "users"

    user_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    fname = db.Column(db.String, nullable=False)
    lname = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True)
    username = db.Column(db.String, unique=True)
    password = db.Column(db.String, nullable=False)
    # itinerary_entries = a list of Entry objects

    def __repr__(self):
        return f'<name: {self.fname} {self.lname} | email={self.email}> | username: {self.username} | user_id={self.user_id}>'

class Listing(db.Model):
    """An event listing"""

    __tablename__ = "listings"

    listing_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    yelp_id = db.Column(db.String, nullable=False)
    title = db.Column(db.String, nullable=False)
    city = db.Column(db.String, nullable=False)
    state = db.Column(db.String, nullable=False)
    zipcode = db.Column(db.Integer, nullable=False)
    photo_url = db.Column(db.String, nullable=False)
    yelp_url = db.Column(db.String, nullable=False)
    # itinerary_entries = a list of Entry objects

    def __repr__(self):
        return f'<{self.title} listing_id={self.listing_id} yelp_id={self.yelp_id}>'

class Entry(db.Model):
    """An itinerary entry"""

    __tablename__ = "itinerary_entries"

    itinerary_entry_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    itinerary_id = db.Column(db.Integer, db.ForeignKey("itinerary.itinerary_id"))
    listing_id = db.Column(db.Integer, db.ForeignKey("listings.listing_id"))
    scheduled_day = db.Column(db.DateTime, default=datetime.now().strftime("%x"))
    itinerary = db.relationship("Itinerary", backref="itinerary_entries")
    listing = db.relationship("Listing", backref="itinerary_entries")

    def __repr__(self):
        return f'<date={self.scheduled_day} itinerary_entry_id={self.itinerary_entry_id}>'

class Itinerary(db.Model):
    """An itinerary"""

    __tablename__ = "itinerary"

    itinerary_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    name = db.Column(db.String, default="My Itinerary")
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"))
    likes = db.Column(db.Integer, default=0)
    # entry_id = db.Column(db.Integer, db.ForeignKey("itinerary_entries.itinerary_entry_id"))

    user = db.relationship("User", backref="itinerary")
    # entry = db.relationship("Entry", backref="itinerary")

    def __repr__(self):
        return f'<author={self.user_id} | itinerary_id={self.itinerary_id}>'

class Deal(db.Model):
    """Stores origin city, destination city, and the desired price for flight"""

    __tablename__ = "flight_deals"

    flight_deal_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"))
    city_fr = db.Column(db.String)
    city_to = db.Column(db.String)
    flight_price = db.Column(db.Integer)
    departure_date = db.Column(db.DateTime)
    return_date = db.Column(db.DateTime)
    carrier = db.Column(db.String)

    user = db.relationship("User", backref="flight_deals")

    def __repr__(self):
        return f'<author={self.user_id} | flight from={self.city_fr}> | flight to={self.city_to} | flight price={self.flight_price}'

def connect_to_db(flask_app, db_uri="postgresql:///itineraries", echo=True):
    flask_app.config["SQLALCHEMY_DATABASE_URI"] = db_uri
    flask_app.config["SQLALCHEMY_ECHO"] = echo
    flask_app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.app = flask_app
    db.init_app(flask_app)

    print("Connected to the db!")


if __name__ == "__main__":
    from server import app

    connect_to_db(app)

