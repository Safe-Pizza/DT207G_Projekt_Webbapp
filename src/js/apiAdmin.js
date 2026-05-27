"use strict";

//Kontrollera token i localStorage, om token finns lägg till eventlyssnare på knappar
if (localStorage.getItem("admin_token")) {
    document.querySelector("#admin-show-menu").addEventListener("click", fetchMenuAdmin);
    document.querySelector("#admin-add").addEventListener("click", toggleAddForm);
    document.querySelector("#add-form").addEventListener("submit", addMeal);
}


//funktion för att hämta meny från webbtjänst
async function fetchMenuAdmin() {
    try {
        const response = await fetch(`http://localhost:5000/api/menu`);
        const data = await response.json();

        if (response.ok) {
            writeMealsOfMenuAdmin(data);
        } else return document.getElementById("admin-result").innerHTML = "";
    } catch (error) {
        console.error(`Felmeddelande ${error}`);
    }
}

//funktion för POST i API, lägg till rätt i meny
async function createMeal(mealData) {
    try {
        const res = await fetch(`http://localhost:5000/api/menu`, {
            method: "POST",
            body: mealData,
            headers: {
                "authorization": `Bearer ${localStorage.getItem("admin_token")}`
            }
        })

        if (res.ok) {
            fetchMenu();

        }
    } catch (err) {
        console.log("Något blev fel");
    }
}

//funktion för DELETE i API, ta bort rätt i meny
async function deleteMeal(id) {
    try {
        const res = await fetch(`http://localhost:5000/api/menu/${id}`, {
            method: "DELETE",
            headers: {
                "authorization": `Bearer ${localStorage.getItem("admin_token")}`
            }
        });

        const data = await res.json();
        fetchMenu();
    } catch (error) {
        console.error(`Felmeddelande ${error}`);
    }
}

//skriv ut meny med rätter till DOM
function writeMealsOfMenuAdmin(meals) {
    let resultEl = document.getElementById("admin-result");

    resultEl.innerHTML = "";

    //loop för utskrift
    meals.forEach(meal => {
        //skapa element
        let articleEl = document.createElement("article");
        let divEl = document.createElement("div");
        let deleteButtonEl = document.createElement("button");
        let aEl = document.createElement("a");

        let content = `
        <h3 class="small-h3">${meal.title.toUpperCase()}</h3><span class="admin-price">${meal.price}:-</span>
        <p class="admin-description"><strong>Beskrivning:</strong> <br>${meal.description}</p>
        <p class="admin-category"><strong>Kategori:</strong>    ${meal.category}</p>
        <p class="admin-allergy"><strong>Allergener:</strong> ${meal.allergy}</p>
        <img src="${meal.image}" alt="${meal.title}">
       `;

        //lägg till attribut och text
        aEl.href = `#form-change`;
        aEl.classList.add("button-black");
        aEl.classList.add("a-button");
        aEl.innerHTML = "ÄNDRA";
        deleteButtonEl.classList.add("button-red");
        deleteButtonEl.innerHTML = "TA BORT";
        divEl.appendChild(deleteButtonEl, aEl);
        divEl.appendChild(aEl);
        articleEl.innerHTML = content;
        articleEl.appendChild(divEl);

        //skriv ut till DOM
        resultEl.appendChild(articleEl);

        //eventlyssnare för delete-knapp
        deleteButtonEl.addEventListener("click", () => {
            deleteMeal(meal.id)
        });

        //eventlyssnare för ändra knapp
        aEl.addEventListener("click", () => {
            changeMeal(meal);
        })
    })
}

//hämta och validera formulärdata, vid inga felmeddelanden skicka till API
async function addMeal(e) {
    e.preventDefault();
    //Formulärdata
    let title = document.forms["add-form"]["title"];
    let description = document.forms["add-form"]["description"];
    let price = document.forms["add-form"]["price"].value;
    let category = document.forms["add-form"]["category"];

    //Varibel för errors-element DOM
    let errorsEl = document.getElementById("errors");
    errorsEl.innerHTML = "";

    //Array för felhantering
    let errors = [];

    //Validering av formulärdata, kontroll ej tom
    if (title.value === "") {
        errors.push("<li>Du måste fylla i titel</li>");
    }

    if (description.value === "") {
        errors.push("<li>Du måste fylla i beskrivning</li>");
    }
    if (price.length < 1) {
        errors.push("<li>Du måste fylla i pris</li>");
    }
    if (category.value === "") {
        errors.push("<li>Du måste fylla i kategori</li>");
    }

    //Skriv ut eventuella felmeddelanden
    if (errors.length !== 0) {
        errors.forEach(error => {
            errorsEl.innerHTML += error;
        })
    } else { //Vid inga felmeddelanden lägg till i API
        const formData = new FormData(e.target);
        document.querySelector("#add-form").reset();
        document.querySelector("#admin-add-form").style.display = "none";
        createMeal(formData);
    }
}

async function changeMeal(mealChange) {
    let changeFormEl = document.getElementById("admin-change-form");
    changeFormEl.classList.remove("hidden");

    //skapa knapp för ändring
    let changeButtonEl = document.createElement("button");
    changeButtonEl.innerHTML = "Ändra";

    //lägg till knapp i DOM
    changeFormEl.appendChild(changeButtonEl);

    //Formulärdata
    let title = document.getElementById("change-title");
    let description = document.getElementById("change-description");
    let price = document.getElementById("change-price");
    let category = document.getElementById("change-category");
    let allergy = document.getElementById("change-allergy");

    //fyll i data från API
    title.value = mealChange.title;
    description.value = mealChange.description;
    price.value = mealChange.price;
    category.value = mealChange.category;
    allergy.value = mealChange.allergy;

    changeButtonEl.addEventListener("click", () => {
        //Varibel för errors-element DOM
        let errorsEl = document.getElementById("errors-change");
        errorsEl.innerHTML = "";

        //Array för felhantering
        let errors = [];

    //Validering av formulärdata, kontroll ej tom
    if (title.value === "") {
        errors.push("<li>Du måste fylla i titel</li>");
    }

    if (description.value === "") {
        errors.push("<li>Du måste fylla i beskrivning</li>");
    }
    if (price.length < 1) {
        errors.push("<li>Du måste fylla i pris</li>");
    }
    if (category.value === "") {
        errors.push("<li>Du måste fylla i kategori</li>");
    }

        //Skriv ut eventuella felmeddelanden
        if (errors.length !== 0) {
            errors.forEach(error => {
                errorsEl.innerHTML += error;
            })
        } else { //Vid inga felmeddelanden ändra i API

            //göm formulär
            changeFormEl.classList.add("hidden");
            //ta bort knapp
            changeButtonEl.remove();

            //skapa job-objekt
            let changedMeal = {
                title: title.value,
                description: description.value,
                price: price.value,
                category: category.value,
                allergy: allergy.value,
                image: image.value
            }

            //kör funktion för ändring, skicka med id och jobb-objekt
            //changeJob(meal.id, changedMeal);
            console.log(changedMeal);
        }
    })
}

//togglefunktion för lägg till formulär
function toggleAddForm() {
    const addFormDivEl = document.querySelector("#admin-add-form");

    if (addFormDivEl.style.display === "block") {
        addFormDivEl.style.display = "none";
    } else {
        addFormDivEl.style.display = "block";
    }
}