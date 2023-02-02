'user strict';

// event listener for the submit search button
const searchBtn = document.querySelector("#search");
function displayResults(evt) {
    evt.preventDefault();

    // get value from form
    const location = document.querySelector("#search-location").value;
    
    const url = `/search-itineraries?search-location=${location}`

    // call a fetch, get request to server
    fetch(url)
    // server will make a call to API => itinerary > itinerary_entry > city or zipcode
        .then((response) => response.json())
        .then((data) => {
            // display listings on webpage
            console.log(data) 
            // loop over data - display itinerary title, author, likes, associated cities, and zipcode

        })

} 
searchBtn.addEventListener("click", displayResults);