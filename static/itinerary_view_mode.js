'use strict';

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

    const entryList = document.querySelector("#itinerary-list");
    entryList.innerHTML = "";

    for (const current_entry in response) {
        const entry = document.createElement("p");
        entry.setAttribute("id", response[current_entry]["id"])
        entry.append(response[current_entry]["title"], " on ", response[current_entry]["datetime"])
        entryList.append(entry)
    }
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
