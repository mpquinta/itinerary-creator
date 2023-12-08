"""Server for itinerary app."""

from crypt import methods
import json
from unicodedata import category
from flask import (Flask, render_template, request, flash, session, redirect, jsonify)
from model import connect_to_db, db
import crud
from jinja2 import StrictUndefined
from datetime import datetime

# creates a server
app = Flask(__name__)
app.secret_key = "rabbits"
# Not sure what this does lol
app.jinja_env.undefined = StrictUndefined

# define routes
@app.route('/')
def homepage():
    """View homepage"""

    if session.get("logged_in_user"):
        return redirect(f'/{session.get("logged_in_user")}/homepage')

    return render_template('homepage.html')

@app.route('/user_login', methods=["POST"])
def user_login():
    """Allow users to login to their account"""

    # GET method to retrieve values from username and password forms?
    username = request.form.get("username")
    password = request.form.get("password")
    # Call db to make sure username and password matches what's in db?
    if crud.login_info_matches(username, password):
        flash("You've successfully signed in!")
        session["logged_in_user"] = username
        return redirect(f'/{username}/homepage')
    # Conditional statement - if matches, redirect to homepage and flash success message
    # Conditional statement - else, flash message "Username and/or password didn't match"
    else: 
        flash("Your username and/or password didn't match. Please try again.")
        return redirect('/')

@app.route('/logout')
def logout():
    del session["logged_in_user"]

    return redirect("/")

@app.route('/create_user', methods=['POST'])
def create_acc():
    """User can create an account"""

    # POST method to save user info by creating new record in User table in db
    fname = request.form.get("fname")
    lname = request.form.get("lname")
    email = request.form.get("email")
    username = request.form.get("username")
    password = request.form.get("password")
    
    # Conditional statement - if username and/or email matches a record in the db, throw error
    if crud.user_exists(email):
        flash("Sorry, a user with that email already exists.")
        return redirect('/signup')
    else:
        new_user = crud.create_user(fname, lname, email, username, password)
        db.session.add(new_user)
        db.session.commit()
        new_itinerary = crud.create_itinerary(new_user.user_id, "Favorites")
        db.session.add(new_itinerary)
        db.session.commit()
        flash("Account was successfully made! Try loggin in.")
        return redirect('/')
    # Conditional statement - else, redirect user to homepage and flash success message

@app.route('/signup')
def signup():
    """Displays page to signup for an account."""
    return render_template('create_user.html')

@app.route('/<username>/homepage')
def signedin_homepage(username):

    return render_template('portal.html', username=username)

# @app.route('/search', methods=['POST'])
# def results():
#     """Display results page for a user's search"""

#     # call a request to the Yelp API depending on keywords, filters, etc.
#     search = request.form.get("search-bar")
#     category = request.form.get("category")
#     print(category)
#     listings = crud.request_location_info(search, category)
#     all_listings = listings.get("businesses")
#     print(all_listings)
    
#     return render_template('listings.html', all_listings=all_listings)

@app.route('/search')
def results():
    """Display results page for a user's search"""

    # call a request to the Yelp API depending on keywords, filters, etc.
    search = request.args.get("search-bar")
    category_choice = request.args.get("category")
    if category_choice == "activities":
        category = "local flavor"
    else:
        category = "food"
    listings = crud.request_location_info(search, category)
    all_listings = listings.get("businesses")

    return jsonify(all_listings)

# dynamic page - depending on listing!
@app.route('/listing/<yelp_id>')
def listing_page(yelp_id):
    """Displays a listing"""

    # displays a listing's specific information (hours of operation, etc)
    listing_info = crud.request_listing_info(yelp_id)
    user = crud.get_user(session.get("logged_in_user"))
    itineraries = crud.get_itinerary(user.user_id)

    hours = {}
    if "hours" in listing_info:
        for day in listing_info["hours"][0]["open"]:
            hours[day["day"]] = {
                "start": datetime.strptime(day["start"], "%H%M").strftime("%I:%M%p"),
                "end": datetime.strptime(day["end"], "%H%M").strftime("%I:%M%p")
            }

    return render_template('listing_details.html', listing_info=listing_info, itineraries=itineraries, hours=hours)

@app.route('/create_itinerary')
def create_itinerary_page():
    """View form to create a new itinerary"""

    return render_template('create_itinerary.html')

@app.route('/new_itinerary', methods=['POST'])
def new_itinerary():
    name = request.form.get("title")
    user = crud.get_user(session.get("logged_in_user"))
    new_itinerary = crud.create_itinerary(user.user_id, name)
    db.session.add(new_itinerary)
    db.session.commit()

    flash(f"Sucessfully created an itinerary: {name}! Time to add to it!")

    return redirect(f'/{session.get("logged_in_user")}/homepage')

@app.route('/add_listing', methods=['POST'])
def add_listing():
    """Allows user to add a listing to their itinerary"""

    yelp_id = request.form.get("yelp-id")
    title = request.form.get("yelp-title")
    city = request.form.get("city")
    state = request.form.get("state")
    zipcode = request.form.get("zip_code")
    photo_url = request.form.get("image_url")
    yelp_url = request.form.get("url")
    itinerary = request.form.get("itinerary_select")
    datetime = request.form.get("datetime")

    new_listing = crud.create_listing(yelp_id, title, city, state, zipcode, photo_url, yelp_url)
    db.session.add(new_listing)
    db.session.commit()
    new_entry = crud.create_entry(itinerary, new_listing.listing_id, datetime)
    db.session.add(new_entry)
    db.session.commit()
 
    # function will redirect back to listing/results page if successful
    # if user tries to add to itinerary twice, flash an error message

    flash(f"{title} successfully added to {new_entry.itinerary.name}!")

    return redirect(f'/listing/{yelp_id}')

@app.route('/itineraries')
def itineraries():
    """Displays a list of all itineraries made by a user."""

    user = crud.get_user(session.get("logged_in_user"))
    itineraries = crud.get_itinerary(user.user_id)

    return render_template("itineraries.html", user=user, itineraries=itineraries)

@app.route('/itineraries/<itinerary_name>_<itinerary_id>')
def itinerary_page(itinerary_name, itinerary_id):
    """Displays itinerary details."""

    session["current_itinerary"] = itinerary_id
    username = crud.get_user_by_itinerary_id(itinerary_id)

    return render_template("itinerary_details.html", itinerary_name=itinerary_name, username=username)
    

@app.route('/itineraries/edit')
def get_itinerary_info():
    """Returns a JSON response with all itinerary info"""

    return jsonify(crud.get_itinerary_details(session.get("current_itinerary")))

@app.route('/itineraries/update', methods=["POST"])
def update_entry_info():
    """Updates a entry record in the database."""

    entry_id = request.get_json().get("selectedEntry")
    new_datetime = request.get_json().get("newDateTime")
    updated_datetime = crud.update_entry_time(entry_id, new_datetime)
    db.session.add(updated_datetime)
    db.session.commit()

    return jsonify({"success": True})

@app.route('/itineraries/delete', methods=['POST'])
def delete_entry():
    """Deletes an entry record in the database."""

    entry_id = request.get_json().get("selectedEntry")
    del_entry = crud.delete_entry(entry_id)
    db.session.commit()

    return jsonify({"success": True})

# create an app that takes in itinerary id and updates the likes counter in db
@app.route('/increase_likes', methods=['POST'])
def increase_likes():
    """Increases like count for a particular itinerary."""

    # call crud function that increases like count
    new_num_likes = crud.increase_like_count(session.get("current_itinerary"))
    total_num_likes = new_num_likes.likes
    db.session.add(new_num_likes)
    db.session.commit()
    
    return jsonify(total_num_likes)

@app.route('/decrease_likes', methods=['POST'])
def decrease_likes():
    """Decreases like count for a particular itinerary."""

    # call crud function that increases like count
    new_num_likes = crud.decrease_like_count(session.get("current_itinerary"))
    total_num_likes = new_num_likes.likes
    db.session.add(new_num_likes)
    db.session.commit()
    
    return jsonify(total_num_likes)

@app.route('/browse_itineraries')
def display_all_itineraries():
    """Webpage that allows a user to see all itineraries on website."""

    return render_template('/browse_itineraries.html')

@app.route('/search-itineraries')
def db_itinerary_search():
    """Make a query to the database to return all itineraries that include the desired city or zipcode."""

    location = request.args.get("search-location")
    # itineraries = crud.get_itinerary_by_city_or_zipcode(city=location)
    # print(itineraries)
    if location.isdigit():
        itineraries = crud.get_itinerary_by_city_or_zipcode(zipcode=location)
    else:
        itineraries = crud.get_itinerary_by_city_or_zipcode(city=location.title())
    
    return jsonify(itineraries)

@app.route('/popular_itineraries')
def return_popular_itineraries():
    """Make a query to the database to return top five most popular itineraries."""

    return jsonify(crud.get_popular_itineraries())

if __name__ == '__main__':
    connect_to_db(app)
    app.run()