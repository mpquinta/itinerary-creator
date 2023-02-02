'use strict';

// List search results
const searchBtn = document.querySelector('#search');
function displayResults(evt) {
    evt.preventDefault();

    const location = document.querySelector('#search-bar').value;
    const category = document.querySelector('#category').value;    

    const url = `/search?search-bar=${location}&category=${category}`
    console.log(url)

    fetch(url)
    .then((response) => response.json())
    .then((all_listings) => {
        let searchResults = document.querySelector('#search-results');
        searchResults.innerHTML = "";
        for (const listing of all_listings) {
            // console.log(listing["name"])
            searchResults.insertAdjacentHTML('beforeend', `<li><a href="/listing/${listing["id"]}">${listing["name"]}</a></li>`);
        }
    });
}

searchBtn.addEventListener('click', displayResults);