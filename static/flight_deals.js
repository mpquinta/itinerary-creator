'user strict';

// List search results
const searchBtn = document.querySelector('#search');
function displayResults(evt) {
    evt.preventDefault();

    // add a data validator?
    const city_from = document.querySelector('#city_from').value;
    const city_to = document.querySelector('#city_to').value;
    const desired_price = document.querySelector('#desired_price').value;   

    const url = `/flight_deals?city_from=${city_from}&city_to=${city_to}&desired_price=${desired_price}`

    fetch(url)
    .then((response) => response.json())
    .then((all_listings) => {
        let searchResults = document.querySelector('#search-results');
        let searchBtns = document.querySelector('#next_prev');
        searchResults.innerHTML = "";

        for (const listing of all_listings) {
            searchResults.insertAdjacentElement('beforeend', createCardAndAddToContainer(listing["id"], listing["name"], listing["categories"][0]["title"], listing["image_url"], listing["url"]))
            document.querySelector("#search-results-container").setAttribute("class", "album py-5 bg-light")
        }

        // add "next" button
        searchBtns.appendChild('beforeend', createBtn());
        

    });
}
searchBtn.addEventListener('click', displayResults);