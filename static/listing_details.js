'use strict';

const addEntry = document.querySelector('#add-entry');
function addItineraryEntry(evt){
    evt.preventDefault();

    // const newEntryInfo = {
    //     'yelpId': document.querySelector('#yelp-id').value,
    //     'yelpTitle': document.querySelector('#yelp-title').value,
    //     'itinerary': document.querySelector('#itinerary_select').value,
    //     'dateTime': document.querySelector('#datetime').value
    // }

    const yelpId = document.querySelector('#yelp-id').value;
    const yelpTitle = document.querySelector('#yelp-title').value;
    const itinerary = document.querySelector('#itinerary_select').value;
    const dateTime = document.querySelector('#datetime').value;
    

    fetch('/add_listing', {
        method: 'POST',
        body: JSON.stringify({yelpId, yelpTitle, itinerary, dateTime}),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then((response) => response.json())
    .then((responseData) => {
        console.log(responseData)
    })
}

addEntry.addEventListener('click', addItineraryEntry);