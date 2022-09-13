'use strict';

let offset = 0;

// List search results
const searchBtn = document.querySelector('#search');
function displayResults(evt, offset) {
    evt.preventDefault();

    const location = document.querySelector('#search-bar').value;
    // const category = document.querySelector('#category').value;    

    const url = `/search?search-bar=${location}&offset=${offset}`
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
        searchResults.insertAdjacentHTML('beforeend',
            `<button type="submit" id="next">>></button>`)
    });
}
searchBtn.addEventListener('click', displayResults);

// next button
const nextBtn = document.querySelector("#next");

// if nextBtn return true - proceed with function
if (nextBtn) {
    offset = offset + 50;
    nextBtn.addEventListener('click', displayResults)
// make event listener that will make a fetch, get request 
// will access "search" endpoint but pass a offset of + 50
// call back function will empty searchResults.innerHTML and replace it with new search results