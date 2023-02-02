'user strict';

// function that creates div for each itinerary
const createActiveCarouselItemAndAddToContainer = (id, title, author, likes) => {
    const cardElement = document.createElement("div");
    cardElement.setAttribute("class", "carousel-item active");
    let randomNum = Math.floor((Math.random() * 10) + 1);
    cardElement.innerHTML = `
        <img src="/static/img/${randomNum}.jpeg" class="d-block w-100" alt="travel">
        <div class="carousel-caption d-none d-md-block">
            <h1>${title}</h1>
            <p>${author} | Total likes: ${likes}</p>
            <form action="/itineraries/${title}_${id}">
                <button type="submit" class="btn btn-primary" value="Got to itinerary page">View</button>
            </form>
        </div>
    `;
    return cardElement
};

const createCardAndAddToContainer = (id, title, author, likes) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("carousel-item");
    let randomNum = Math.floor((Math.random() * 10) + 1);
    cardElement.innerHTML = `
        <img src="/static/img/${randomNum}.jpeg" class="d-block w-100" alt="travel">
        <div class="carousel-caption d-none d-md-block">
            <h1>${title}</h1>
            <p>${author} | Total likes: ${likes}</p>
            <form action="/itineraries/${title}_${id}">
                <button type="submit" class="btn btn-primary" value="Got to itinerary page">View</button>
            </form>
        </div>
    `;
    return cardElement
};

const createSearchResultsContainer = (id, title, author, likes) => {
    const cardElement = document.createElement("div");
    cardElement.setAttribute("class", "col-lg-4");
    cardElement.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h2 class="fw-normal">${title}</h2>
                <p>${author} | ${likes} likes</p>
                <p>
                    <a class="btn btn-secondary" href="/itineraries/${title}_${id}">View details</a>
                </p>
            </div>
        </div>
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

        for (itinerary in popularItineraries) {
            if (itinerary === "0") {
                cardElement = createActiveCarouselItemAndAddToContainer (
                    popularItineraries[itinerary].itinerary_id, 
                    popularItineraries[itinerary].name, 
                    popularItineraries[itinerary].username, 
                    popularItineraries[itinerary].likes
                )
                popularItinerariesContainer.append(cardElement);
            } else {
                cardElement = createCardAndAddToContainer(
                    popularItineraries[itinerary].itinerary_id, 
                    popularItineraries[itinerary].name, 
                    popularItineraries[itinerary].username, 
                    popularItineraries[itinerary].likes
                )
                popularItinerariesContainer.append(cardElement);  
            }
        }
    });
    

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
                cardElement = createSearchResultsContainer (
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