'use strict';

// function that creates container for search results
const createCardAndAddToContainer = (id, title, category, photo_url, yelp_url) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("col");
    cardElement.innerHTML = `
        <div class="card shadow-sm">
            <img src="${photo_url}" class="bd-placeholder-img card-img-top" id="img-search-results">
                <div class="card-body">
                    <p class="card-text">
                        <h2><a href="/listing/${id}">${title}</a></h2>
                        ${category}
                    </p>
                </div>
            </div>
        </div>
    `;
    return cardElement
};

// List search results
const searchBtn = document.querySelector('#search');
function displayResults(evt) {
    evt.preventDefault();

    const location = document.querySelector('#search-bar').value;
    const category = document.querySelector('[name="category"]:checked').value;    

    const url = `/search?search-bar=${location}&category=${category}`

    fetch(url)
    .then((response) => response.json())
    .then((all_listings) => {
        let searchResults = document.querySelector('#search-results');
        searchResults.innerHTML = "";
        for (const listing of all_listings) {
            searchResults.insertAdjacentElement('beforeend', createCardAndAddToContainer(listing["id"], listing["name"], listing["categories"][0]["title"], listing["image_url"], listing["url"]))
            document.querySelector("#search-results-container").setAttribute("class", "album py-5 bg-light")
        }
    });
}
searchBtn.addEventListener('click', displayResults);
