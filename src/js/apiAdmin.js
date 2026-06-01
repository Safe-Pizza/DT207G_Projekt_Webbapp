"use strict";

//Kontrollera token i localStorage, om token finns lägg till eventlyssnare på knappar
if (localStorage.getItem("admin_token")) {
    document.querySelector("#admin-show-menu").addEventListener("click", fetchMenuAdmin);
    document.querySelector("#admin-add").addEventListener("click", toggleAddForm);
    document.querySelector("#add-form").addEventListener("submit", addMeal);
    document.querySelector("#admin-logout").addEventListener("click", () => {
        localStorage.removeItem("admin_token");
        window.location.href = "login.html";
    })
}

//funktion för att hämta meny från webbtjänst
async function fetchMenuAdmin() {
    document.querySelector(".loader").classList.remove("hidden");
    try {
        const response = await fetch(`https://dt207g-back.onrender.com/api/menu`);
        const data = await response.json();

        if (response.ok) {
            document.querySelector(".loader").style.display = "none";
            writeMealsOfMenuAdmin(data);
        } else return document.getElementById("admin-result").innerHTML = "";
    } catch (error) {
        console.error(`Felmeddelande ${error}`);
    }
}

//funktion för POST i API, lägg till rätt i meny
async function createMeal(mealData) {
    try {
        const res = await fetch(`https://dt207g-back.onrender.com/api/menu`, {
            method: "POST",
            body: mealData,
            headers: {
                "authorization": `Bearer ${localStorage.getItem("admin_token")}`
            }
        })
        console.log(res);
        if (res.ok) {
            fetchMenuAdmin();
        }
    } catch (err) {
        console.log("Error: ", err);
    }
}

//funktion för DELETE i API, ta bort rätt i meny
async function deleteMeal(id) {
    try {
        const res = await fetch(`https://dt207g-back.onrender.com/api/menu/${id}`, {
            method: "DELETE",
            headers: {
                "authorization": `Bearer ${localStorage.getItem("admin_token")}`
            }
        });

        const data = await res.json();
        fetchMenuAdmin();
    } catch (error) {
        console.error(`Felmeddelande ${error}`);
    }
}

//funktion för PUT i API, ändra befintlig rätt i meny
async function updateMeal(id, changedMealData) {
    try {
        const res = await fetch(`https://dt207g-back.onrender.com/api/menu/${id}`, {
            method: "PUT",
            body: changedMealData,
            headers: {
                "authorization": `Bearer ${localStorage.getItem("admin_token")}`
            }
        })
        console.log("Result: " + res);
        if (res.ok) {
            fetchMenuAdmin();
        }
    } catch (err) {
        console.log("Error: ", err);
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
        let content = "";

        if (meal.image) {

            content = `
        <h3 class="small-h3">${meal.title.toUpperCase()}</h3><span class="admin-price">${meal.price}:-</span>
        <p class="admin-description"><strong>Beskrivning:</strong> <br>${meal.description}</p>
        <p class="admin-category"><strong>Kategori:</strong>    ${meal.category}</p>
        <p class="admin-allergy"><strong>Allergener:</strong> ${meal.allergy}</p>
        <img src="${meal.image}" alt="${meal.title}">
       `;
        } else {
            content = `
        <h3 class="small-h3">${meal.title.toUpperCase()}</h3><span class="admin-price">${meal.price}:-</span>
        <p class="admin-description"><strong>Beskrivning:</strong> <br>${meal.description}</p>
        <p class="admin-category"><strong>Kategori:</strong>    ${meal.category}</p>
        <p class="admin-allergy"><strong>Allergener:</strong> ${meal.allergy}</p>
       `;
        }

        //lägg till attribut och text
        aEl.href = `#admin-change-form`;
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
    let changeFormDivEl = document.getElementById("admin-change-form");
    changeFormDivEl.classList.remove("hidden");

    let changeFormEl = document.getElementById("change-form");

    // Om det redan finns en ändra-knapp, ta bort den innan en ny skapas
    const oldButton = changeFormEl.querySelector(".change-submit-btn");
    if (oldButton) oldButton.remove();

    //skapa knapp för ändring
    let changeButtonEl = document.createElement("button");
    changeButtonEl.classList.add("button-red");
    changeButtonEl.classList.add("change-submit-btn");
    changeButtonEl.innerHTML = "ÄNDRA";
    changeButtonEl.type = "button"; // Förhindra att knappen triggar form submit

    //lägg till knapp i DOM
    changeFormEl.appendChild(changeButtonEl);

    //Formulärdata
    let title = document.forms["change-form"]["change-title"];
    let description = document.forms["change-form"]["change-description"];
    let price = document.forms["change-form"]["change-price"];
    let category = document.forms["change-form"]["change-category"];
    let allergy = document.forms["change-form"]["change-allergy"];

    //fyll i data från API
    title.value = mealChange.title;
    description.value = mealChange.description;
    price.value = mealChange.price;
    category.value = mealChange.category;
    allergy.value = mealChange.allergy;

    // Lyssnare för ändra-knapp, validera input och skicka till API
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
        if (price.value === "") {
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
        } else { //vid inga felmeddelanden, skapa formData och skicka till API
            const formData = new FormData(changeFormEl);

            //ta bort knapp och återställ formulär och göm formulär
            changeButtonEl.remove();
            changeFormEl.reset();
            changeFormDivEl.classList.add("hidden");

            //skicka till API
            updateMeal(mealChange.id, formData);
        }
    });
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