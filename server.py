"""Server for itinerary app."""

from flask import (Flask, render_template, request, flash, session, redirect)
from model import connect_to_db, db
# import crud
from jinja2 import StrictUndefined

# creates a server
app = Flask(__name__)
app.secret_key = "rabbits"
# Not sure what this does lol
app.jinja_env.undefined = StrictUndefined

# define routes
@app.route('/')
def homepage():
    """View homepage"""

    return render_template('homepage.html')

# # TODO
# @app.route()
# def user_login():
#     """Allow users to login to their account"""

#     # GET method to retrieve values from username and password forms?
#     # Call db to make sure username and password matches what's in db?
#     # Conditional statement - if matches, redirect to homepage and flash success message
#     # Conditional statement - else, flash message "Username and/or password didn't match"

#     pass

# @app.route()
# def create_acc():
#     """User can create an account"""

#     # POST method to save user info by creating new record in User table in db
#     # Conditional statement - if username and/or email matches a record in the db, throw error
#     # Conditional statement - else, redirect user to homepage and flash success message

#     pass

# @app.route()
# def create_itinerary():
#     """User can create a new itinerary"""

#     # POST method to save itinerary info to itinerary table in db

# @app.route()
# def results():
#     """Display results page for a user's search"""

#     # call a request to the Yelp API depending on keywords, filters, etc.

#     pass

# # dynamic page - depending on listing!
# @app.route()
# def listing_page():
#     """Displays a listing"""

#     # displays a listing's specific information (hours of operation, etc)

#     pass

# @app.route()
# def add_listing():
#     """Allows user to add a listing to their itinerary"""

#     # function will redirect back to listing/results page if successful
#     # if user tries to add to itinerary twice, flash an error message

#     pass

# @app.route()
# def itinerary_page():
#     """Displays a user's full itinerary"""

#     pass
