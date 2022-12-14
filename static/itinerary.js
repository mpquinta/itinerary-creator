'use strict';

// // retrieve itinerary entry data
// function getItineraryData() {
//     fetch('/itineraries/edit')
//         .then((response) => response.json())
//         .then((data) => {
            
//             // return data
//             insertItineraryData(data)
//             // createDropDownFields(data)
//         });
// }

// // update div on webpage with form with all listings
// const insertItineraryData = (response) => {
//     // Once the data has been provided by the server,
//     // insert it into the page as an HTML string.

//     const entryList = document.querySelector("#itinerary-list");
//     entryList.innerHTML = "";

//     for (const current_entry in response) {
//         const entry = document.createElement("p");
//         entry.setAttribute("id", response[current_entry]["id"])
//         entry.append(response[current_entry]["title"], " on ", response[current_entry]["datetime"])
//         entryList.append(entry)
//     }
// }

const createDropDownFields = (response) => {

    // create drop down fields and label
    let dropDownMenu = document.createElement("select");
    dropDownMenu.setAttribute("id", "selected-entry");
    dropDownMenu.setAttribute("class", "form-select");

    for (const current_entry in response) {
        let option = document.createElement("option");
        option.setAttribute("value", response[current_entry]["id"]);
        const fieldInput = response[current_entry]["title"] + " on " + response[current_entry]["datetime"];
        option.innerHTML = fieldInput;
        dropDownMenu.append(option);
    }

    let dropDownMenuLabel = document.createElement("label")
    dropDownMenuLabel.innerHTML = "Select a listing you want to edit:"

    // create field for datetime and label
    let dateTime = document.createElement("input");
    dateTime.setAttribute("type", "datetime-local");
    dateTime.setAttribute("id", "new-datetime");
    dateTime.setAttribute("class", "form-select");

    let dateTimeLabel = document.createElement("label")
    dateTimeLabel.innerHTML = "Select a new date/time:"

    // create update button
    const updateBtn = document.createElement("button");
    updateBtn.setAttribute("type", "submit");
    updateBtn.setAttribute("class", "btn btn-primary");
    updateBtn.innerHTML = "Update";

    //create delete button
    const delBtn = document.createElement("button");
    delBtn.setAttribute("type", "submit");
    delBtn.setAttribute("id", "delete");
    delBtn.setAttribute("class", "btn btn-primary");
    delBtn.innerHTML = "Delete";

    //create close button
    const closeBtn = document.createElement("button");
    closeBtn.setAttribute("type", "button");
    closeBtn.setAttribute("id", "close");
    closeBtn.setAttribute("class", "btn btn-primary");
    closeBtn.setAttribute("data-bs-dismiss", "modal");
    closeBtn.innerHTML = "Close";

    // add drop-down fields and buttons to page
    const fieldContainers = document.querySelector("#edit-fields");
    fieldContainers.innerHTML = "";
    fieldContainers.append(updateBtn, delBtn, closeBtn);

    const listingDropdown = document.querySelector("#listing-dropdown");
    listingDropdown.innerHTML = "";
    listingDropdown.append(dropDownMenuLabel, dropDownMenu, dateTimeLabel, dateTime);


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

    // create drop down menu with all the user's itineraries
    fetch('/itineraries/edit')
        .then((response) => response.json())
        .then((data) => {
            createDropDownFields(data)
        });
    // getItineraryData () => returns itinerary data

    
}
editBtn.addEventListener('click', editItinerary);

// // event listener for the like button
// const likeBtn = document.querySelector('#like');
// function increaseLikeCount(evt) {
//     evt.preventDefault();
    
//     // send request to server to update itinerary's like count (send over itinerary id)
//     fetch('/increase_likes', {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         }
//     })
//         .then((response) => response.json())
//         .then((data) => {
//             console.log(data)
//             const totalLikesContainer = document.querySelector("#total-likes");
//             totalLikesContainer.innerHTML = `${data} likes`;
//         })
//     // response will be updating the like counter on the page
// }

// likeBtn.addEventListener("click", increaseLikeCount);

// // call function as soon as page runs
// // getItineraryData();
