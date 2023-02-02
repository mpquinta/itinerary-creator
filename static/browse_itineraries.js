'user strict';

// function that creates div for each itinerary
const createCardAndAddToContainer = (id, title, author, likes) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.innerHTML = `
        <h2><a href="/itineraries/${title}_${id}">${title}</a></h2>
        ${author}<br>
        Total likes: ${likes}
    `;
    return cardElement
};

// fetch popular itineraries data
fetch('/popular_itineraries')
    .then((response) => response.json())
    .then((popularItineraries) => {
        console.log(popularItineraries)
        // call back function - update webpage with top five itineraries
        popularItinerariesContainer = document.querySelector("#popular-itineraries");
        popularItinerariesContainer.innerHTML = "";

        for (const itinerary in popularItineraries) {
            cardElement = createCardAndAddToContainer(
                popularItineraries[itinerary].itinerary_id, 
                popularItineraries[itinerary].name, 
                popularItineraries[itinerary].username, 
                popularItineraries[itinerary].likes
            )
            document.querySelector("#popular-itineraries").append(cardElement);
        }
    })
    

// event listener for the submit search button
const searchBtn = document.querySelector("#search");
function displayResults(evt) {
    evt.preventDefault();

    // get value from form
    const location = document.querySelector("#search-location").value;
    
    // call a fetch, get request to server
    const url = `/search-itineraries?search-location=${location}`
    
    fetch(url)
    // server will make a call to API => itinerary > itinerary_entry > city or zipcode
        .then((response) => response.json())
        .then((data) => {
            // display listings on webpage
            const searchContainer = document.querySelector("#search-results");
            searchContainer.innerHTML = "";
             
            // loop over data - display itinerary title, author, likes, associated cities, and zipcode
            for (const itinerary in data) {
                cardElement = createCardAndAddToContainer(
                    data[itinerary].itinerary_id,
                    data[itinerary].name, 
                    data[itinerary].username, 
                    data[itinerary].likes
                )
                document.querySelector("#search-results").append(cardElement);
            }
        })
} 
searchBtn.addEventListener("click", displayResults);