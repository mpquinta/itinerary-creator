'use strict';

// function that creates container for search results
const createCardAndAddToContainer = (title, date, photo_url, address, yelp_id) => {

    const cardElement = document.createElement("div");
    cardElement.setAttribute("class", "row g-0")
    cardElement.innerHTML = `
        <div class="col-md-4">
            <img src="${photo_url}" class="img-fluid rounded-start" id="img-search-results" alt="${title}">
        </div>
        <div class="col-md-4">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text"><small class="text-muted">${date}</small></p>
                <p class="card-text">
                ${address}<br>
                <img src="https://www.seekpng.com/png/detail/16-165938_png-file-web-site-icon-vector.png" alt="website icon" class="contact-icons"><a href="/listing/${yelp_id}"> Listing page</a><br>
                </p>
                
            </div>
        </div>
    `;
    return cardElement
};

// retrieve itinerary entry data
function getItineraryData() {
    fetch('/itineraries/edit')
        .then((response) => response.json())
        .then((data) => {
            
            // return data
            insertItineraryData(data)
            // createDropDownFields(data)
        });
}

// update div on webpage with form with all listings
const insertItineraryData = (response) => {
    // Once the data has been provided by the server,
    // insert it into the page as an HTML string.

    let entryList = document.querySelector("#itinerary-list");
    entryList.innerHTML = "";

    for (const current_entry in response) {
        const cardElement = createCardAndAddToContainer(response[current_entry]["title"], response[current_entry]["datetime"], response[current_entry]["photo_url"], response[current_entry]["address"], response[current_entry]["yelp_id"])
        entryList.append(cardElement)
    };
}
getItineraryData();

// event listener for the like button
const likeBtn = document.querySelector('#like');
function increaseLikeCount(evt) {
    evt.preventDefault();
    
    // if clicked again, should say "Unlike"
    if (likeBtn.innerHTML == "Like") {
        likeBtn.innerHTML = "Unlike";
        // send request to server to update itinerary's like count (send over itinerary id)
        fetch('/increase_likes', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((response) => response.json())
            .then((data) => {
                // response will be updating the like counter on the page
                
                const totalLikesContainer = document.querySelector("#total-likes");
                totalLikesContainer.innerHTML = `${data} likes`;
            })        
    } else {
        likeBtn.innerHTML = "Like";
        // send request to server to update itinerary's like count (send over itinerary id)
        fetch('/decrease_likes', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((response) => response.json())
            .then((data) => {
                // response will be updating the like counter on the page
                
                const totalLikesContainer = document.querySelector("#total-likes");
                totalLikesContainer.innerHTML = `${data} likes`;
            }) 
    }
}

likeBtn.addEventListener("click", increaseLikeCount);


