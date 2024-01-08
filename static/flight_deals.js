'user strict';

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
        });
}
searchBtn.addEventListener('click', displayResults);