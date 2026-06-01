"use strict";

fetchMenu();

//funktion för att hämta meny från webbtjänst
async function fetchMenu() {
    try {
        const response = await fetch(`https://dt207g-back.onrender.com/api/menu`);
        const data = await response.json();

        if (response.ok) {
            writeMealsOfMenu(data);
            document.querySelector(".loader").style.display = "none";
        } else return document.getElementById("menu-result").innerHTML = "";
    } catch (error) {
        console.error(`Felmeddelande ${error}`);
    }
}

//skriv ut meny med rätter till DOM
function writeMealsOfMenu(meals) {
    let resultEl = document.getElementById("menu-result");

    resultEl.innerHTML = "";

    //loop för utskrift
    meals.forEach(meal => {
        //skapa element
        let articleEl = document.createElement("article");

        let content = `
        <h3 class="small-h3">${meal.title.toUpperCase()}</h3><span class="price">${meal.price}:-</span>
        <p class="menu-description">${meal.description}</p>
        <p class="menu-allergy"><strong>Allergener:</strong> ${meal.allergy}</p>
       `;

        //lägg till attribut och text
        articleEl.innerHTML = content;

        //skriv ut till DOM
        resultEl.appendChild(articleEl);
    })
}