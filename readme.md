# Biyahe (Trip)

Biyahe is a tool that helps users plan for their next trip! The app uses Yelp as its search engine, which returns restaurants, parks, and local attractions based on user's location input. Users can create and add places they want to visit to their itineraries. Through the browsing function, users can search up other user's existing itineraries and upvote on their favorite ones! The most popular itineraries will be showcased for all to see. 

# Table of Contents
 - [Technologies Used](#technologies-used)
 - [Features](#features)
 - [Installation](#installation)
 - [Structure](#structure)
 - [Preview](#preview)
 - Improvement

 # Technologies Used
- Python
- Flask
- PostgreSQL/SQLAlchemy
- JavaScript
- AJAX/JSON
- Jinja2
- HTML
- CSS
- Bootstrap
- Yelp API

(Dependencies are listed in requirements.txt)

# Features
 - User account creation
 - User login
 - Search restaurant and activities by location
 - Create an itinerary
 - Add restaurant and activities to itinerary by appointment
 - Edit date and time of given activity within an itinerary
 - View top-rated itineraries

# Installation
1. Get a free API Key at https://fusion.yelp.com/
2. Clone the repo `git clone https://github.com/mpquinta/itinerary-creator.git`
3. Create a virtual environment `virtualenv env`
4. Activate your virtual environment `source env/bin/activate`
5. Install dependencies `pip3 install -r requirements.txt`
6. Create and add API key to secrets.sh file `export YELP_API_KEY=[API KEY]`
7. Run secrets.sh file `source secrets.sh`

# Improvements
I plan on continuing to customize the application to include more features that will further streamline trip planning. 

Weather forecasting - Include weather information for selected date. This information can dictate what the user would like to do for the day - for example, if it was raining on a particular day, the user might decide to save outside activities for another day.

# Screenshots
[![user-homepage.png](https://i.postimg.cc/hvjMKCGT/user-homepage.png)](https://postimg.cc/1nkDHrw3)
[![listing-page.png](https://i.postimg.cc/0jBnjp63/listing-page.png)](https://postimg.cc/K3tBs3Dr)
[![edit-itinerary.png](https://i.postimg.cc/vBX3FRGG/edit-itinerary.png)](https://postimg.cc/wyyhLGtr)
[![browse-existing-itineraries.png](https://i.postimg.cc/ZqmSNYnF/browse-existing-itineraries.png)](https://postimg.cc/68MgJXdy)