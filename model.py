"""Models for itinerary app"""

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
    activity_type = db.Column(db.String, nullable=False)
    # itinerary_entries = a list of Entry objects

    def __repr__(self):
        return f'<{self.title} category={self.activity_type} listing_id={self.listing_id} yelp_id={self.yelp_id}>'

class Entry(db.Model):
    """An itinerary entry"""

    __tablename__ = "itinerary_entries"

    itinerary_entry_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"))
    listing_id = db.Column(db.Integer, db.ForeignKey("listings.listing_id"))
    scheduled_day = db.Column(db.DateTime, default=datetime.now().strftime("%x"))
    # scheduled_time = db.Column(db.Integer) # use military time

    user = db.relationship("User", backref="itinerary_entries")
    listing = db.relationship("Listing", backref="itinerary_entries")

    def __repr__(self):
        return f'<author={self.user_id} date={self.scheduled_day} itinerary_entry_id={self.itinerary_entry_id}>'

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

