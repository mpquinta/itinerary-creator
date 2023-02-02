'use strict';

// function that creates container for search results
const createCardAndAddToContainer = (id, title, category, photo_url, yelp_url) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("col");
    cardElement.innerHTML = `
        <div class="card shadow-sm">
            <img src="${photo_url}" class="bd-placeholder-img card-img-top" width="100%" height="228">
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
    // const category = document.querySelector('#category').value;    

    const url = `/search?search-bar=${location}`
    console.log(url)

    fetch(url)
    .then((response) => response.json())
    .then((all_listings) => {
        let searchResults = document.querySelector('#search-results');
        searchResults.innerHTML = "";
        for (const listing of all_listings) {
            console.log(listing["name"])
            searchResults.insertAdjacentElement('beforeend', createCardAndAddToContainer(listing["id"], listing["name"], listing["categories"][0]["title"], listing["image_url"], listing["url"]))
            // searchResults.insertAdjacentHTML('beforeend', `<li><a href="/listing/${listing["id"]}">${listing["name"]}</a></li>`);
        }
    });
}
searchBtn.addEventListener('click', displayResults);
