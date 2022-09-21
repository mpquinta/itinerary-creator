'use strict';

// function that creates container for search results
const createCardAndAddToContainer = (title, date) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("row g-0");
    cardElement.innerHTML = `
        <div class="col-md-4">
            <img src="..." class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <p class="card-text"><small class="text-muted">${date}</small></p>
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
        const entry = document.createElement("p");
        entry.setAttribute("id", response[current_entry]["id"])
        entry.append(response[current_entry]["title"], " on ", response[current_entry]["datetime"])
        entryList.append(entry)
        // entryList.insertAdjacentElement('beforeend', createCardAndAddToContainer(response[current_entry]["title"], response[current_entry]["datetime"])
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
