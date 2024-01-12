'user strict';
// create a like button 
const createLikeButton = () => {
    const likeButton = document.createElement("button");
    likeButton.setAttribute("class", "btn btn-primary");
    likeButton.setAttribute("type", "submit");
    likeButton.innerHTML = "Save this flight";

    return likeButton
}

// List search results
const searchBtn = document.querySelector('#search');
function displayResults(evt) {
    evt.preventDefault();

    // add a data validator?
    const city_from = document.querySelector('#city_from').value;
    const city_to = document.querySelector('#city_to').value;
    const desired_price = document.querySelector('#desired_price').value;   

    // const url = `/flight_deals?city_from=${city_from}&city_to=${city_to}&desired_price=${desired_price}`

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

            } else {
                flightSearchResults.innerHTML = `Low price alert! 
                    Only $${jsonResponse["flight_price"]} to fly from ${jsonResponse["from_city"]} to 
                    ${jsonResponse["to_city"]} from ${jsonResponse["start_date"]} to ${jsonResponse["end_date"]} with ${jsonResponse["carrier_name"]}.`;

                    flightSearchResults.insertAdjacentElement("beforeend", createLikeButton())
            }
        });
}
searchBtn.addEventListener('click', displayResults);