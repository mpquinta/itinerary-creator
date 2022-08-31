'use strict';

// retrieve itinerary entry data
function getItineraryData() {
    fetch('/itineraries/edit')
        .then((response) => response.json())
        .then((data) => {
            
            // return data
            console.log(data)
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
    editBtn.disabled = true;

    // create drop down menu with all the user's itineraries
    fetch('/itineraries/edit')
        .then((response) => response.json())
        .then((data) => {
            createDropDownFields(data)
        });
    // create field so user can select a new datetime
    // create an update info
    // create cancel button
    // gray out the edit button until editing is over
}
editBtn.addEventListener('click', editItinerary);


// AJAX post request to change the selected entry's date time 


// event listener for the 'delete' button
// AJAX POST request to delete the row associated with the selected entry

// call function as soon as page runs
getItineraryData();
