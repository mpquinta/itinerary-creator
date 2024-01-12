'user strict';
// create a like button to save the flight 
const createLikeButton = () => {
    const likeButton = document.createElement("button");
    likeButton.setAttribute("class", "btn btn-primary");
    likeButton.setAttribute("type", "button");
    likeButton.setAttribute("id", "save-flight");
    likeButton.innerHTML = "Save this flight";

    return likeButton
}

// listen for when user click the like button to save flight details onto the database
function saveFlight(event) {
    // evt.preventDefault();

    // retrieves flight data from displayResults
    
    flight_price = this["flight_price"]
    from_city = this["from_city"]
    to_city = this["to_city"]
    start_date = this["start_date"]
    end_date = this["end_date"]
    carrier = this["carrier_name"]

    fetch("/save_flight", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({flight_price, from_city, to_city, start_date, end_date, carrier}),
    })
        .then((response) => response.json())
        .then((jsonResponse) => {
            console.log("saved to the database!")
    })
}



// List search results
const searchBtn = document.querySelector('#search');
function displayResults(evt) {
    evt.preventDefault();

    // add a data validator?
    const city_from = document.querySelector('#city_from').value;
    const city_to = document.querySelector('#city_to').value;
    const desired_price = document.querySelector('#desired_price').value;   

    // send to server
    fetch("/track_flight", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({city_from, city_to, desired_price}),
    })
        .then((response) => response.json())
        .then((jsonResponse) => {
            // display results message on page or "Sorry, there are no flights right now that fit the criteria. We'll send you a message if one shows up!"
            console.log(jsonResponse)

            // Select div in flight_deals HTML so we can insert results we received from the server 
            flightSearchResults = document.querySelector("#flight_search_result")

            if(jsonResponse["success"] === false) {
                flightSearchResults.innerHTML = `Sorry, we couldn't find a round trip that was cheaper than the price you wanted. 
                The cheapest flight is $${jsonResponse["flight_price"]} to fly from ${jsonResponse["from_city"]} to 
                ${jsonResponse["to_city"]} from ${jsonResponse["start_date"]} to ${jsonResponse["end_date"]} with ${jsonResponse["carrier_name"]}.`;

                flightSearchResults.insertAdjacentElement("beforeend", createLikeButton())

                const saveFlightBtn = document.querySelector("#save-flight");
                saveFlightBtn.addEventListener('click', saveFlight.bind(jsonResponse));

            } else {
                flightSearchResults.innerHTML = `Low price alert! 
                    Only $${jsonResponse["flight_price"]} to fly from ${jsonResponse["from_city"]} to 
                    ${jsonResponse["to_city"]} from ${jsonResponse["start_date"]} to ${jsonResponse["end_date"]} with ${jsonResponse["carrier_name"]}.`;

                    flightSearchResults.insertAdjacentElement("beforeend", createLikeButton())

                    const saveFlightBtn = document.querySelector("#save-flight");
                    saveFlightBtn.addEventListener('click', saveFlight.bind(jsonResponse));
            }
        });
}
searchBtn.addEventListener('click', displayResults);



