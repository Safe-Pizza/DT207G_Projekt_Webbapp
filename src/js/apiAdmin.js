"use strict";

//Kontrollera token i localStorage och hämta användare om token finns
if (localStorage.getItem("admin_token")) {
    document.querySelector("#admin-show-menu").addEventListener("click", fetchMenu);
    document.querySelector("#admin-add").addEventListener("click", toggleAddForm);
}


//funktion för att hämta användare från webbtjänst
async function fetchMenu() {
    try {
        const response = await fetch("http://localhost:5000/api/menu");
        const data = await response.json();

        if (response.ok) {
            writeMealsOfMenu(data);
        } else return document.getElementById("admin-result").innerHTML = "";
    } catch (error) {
        console.error(`Felmeddelande ${error}`);
    }
}

//skriv ut användare till DOM
function writeMealsOfMenu(meals) {
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
        <h3 class="small-h3">${meal.title.toUpperCase()}</h3><span class="admin-price">${meal.price}</span>
        <p>${meal.description}</p>
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
            console.log(`Delete id: ${meal.id}`)
        });

        //eventlyssnare för ändra
        aEl.addEventListener("click", () => {
            console.log(`Ändra id: ${meal.id}`);
        })
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