'user strict';

// function that creats a container for all flights saved
const createCardAndAddToContainer = (city_from, city_to, carrier, price) => {
    const cardElement = document.createElement("li");
    cardElement.setAttribute("class", "list-group-item d-flex justify-content-between align-items-center");
    cardElement.innerHTML = `
        ${city_from} to ${city_to} with ${carrier}
        <span class="badge bg-primary rounded-pill">$${price}</span>
    `;
    return cardElement
};

// get info from all saved flights from the server and add to HTML page
const flightsContainer = document.querySelector('#saved_flights_container')
function displayFlights() {
    fetch('/get_saved_flights_info')
        .then((response) => response.json())
        .then((all_flights) => {
            console.log(all_flights)
        })
}

displayFlights();