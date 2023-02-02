'use strict';

// retrieve itinerary entry data
function getItineraryData() {
    fetch('/itineraries/edit')
        .then((response) => response.json())
        .then((data) => {
            
            for (const current_entry in response) {
                const id = data[current_entry]["id"];
                const title = data[current_entry]["title"];
                const datetime = data[current_entry]["datetime"];
            }
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

const createDropDownFields = (response) => {

    // create drop down fields
    let dropDownMenu = document.createElement("select");
    dropDownMenu.setAttribute("id", "selected-entry");

    for (const current_entry in response) {
        let option = document.createElement("option");
        option.setAttribute("value", response[current_entry]["id"]);
        const fieldInput = response[current_entry]["title"] + " on " + response[current_entry]["datetime"];
        option.innerHTML = fieldInput;
        dropDownMenu.append(option);
    }

    // create field for datetime
    let dateTime = document.createElement("input");
    dateTime.setAttribute("type", "datetime-local");
    dateTime.setAttribute("id", "new-datetime");

    // create update button
    const updateBtn = document.createElement("button");
    updateBtn.setAttribute("type", "submit");
    updateBtn.innerHTML = "Update";

    //create delete button
    const delBtn = document.createElement("button");
    delBtn.setAttribute("type", "submit");
    delBtn.setAttribute("id", "delete");
    delBtn.innerHTML = "Delete";

    // add drop-down fields and buttons to page
    const fieldContainers = document.querySelector("#edit-fields");
    fieldContainers.append(dropDownMenu, dateTime, updateBtn, delBtn);

    // create event listener for update button
    function updateEntry(evt) {
        evt.preventDefault();
        // select values from fields
        const selectedEntry = document.querySelector("#selected-entry").value;
        const newDateTime = document.querySelector("#new-datetime").value;

        // send to server
        fetch("/itineraries/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({selectedEntry, newDateTime}),
        })
            .then((response) => response.json())
            .then((jsonResponse) => {
                getItineraryData()
            });
        
        fieldContainers.innerHTML = "";
        editBtn.disabled = false;
    }

    // create event listener for the delete button
    function deleteEntry(evt) {
        evt.preventDefault();

        const selectedEntry = document.querySelector("#selected-entry").value;

        // send to server
        fetch("/itineraries/delete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({selectedEntry}),
        })
            .then((response) => response.json())
            .then((jsonResponse) => {
                getItineraryData()
            });

        fieldContainers.innerHTML = "";
        editBtn.disabled = false;
    }

    updateBtn.addEventListener("click", updateEntry);
    delBtn.addEventListener("click", deleteEntry);
    

}

// click this button to show fields to make changes to the listings
const editBtn = document.getElementById('edit')
function editItinerary(evt) {
    evt.preventDefault();
    // gray out the edit button until editing is over
    editBtn.disabled = true;

    // create drop down menu with all the user's itineraries
    fetch('/itineraries/edit')
        .then((response) => response.json())
        .then((data) => {
            createDropDownFields(data)
        });
    // getItineraryData () => returns itinerary data
    
    
}
editBtn.addEventListener('click', editItinerary);

// event listener for the like button
const likeBtn = document.querySelector('#like');
function increaseLikeCount(evt) {
    evt.preventDefault();
    
    // send request to server to update itinerary's like count (send over itinerary id)
    fetch('/increase_likes')
        .then((response) => response.json())
        .then((data) => {
            const totalLikesContainer = document.querySelector("#total-likes");
            totalLikesContainer.innerHTML = `${data} likes`;
        })
    // response will be updating the like counter on the page
}

likeBtn.addEventListener("click", increaseLikeCount);

// call function as soon as page runs
getItineraryData();
