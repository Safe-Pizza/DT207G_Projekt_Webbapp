"use strict";

fetchMenuOrder();

//funktion för att hämta meny från webbtjänst
async function fetchMenuOrder() {
    try {
        const response = await fetch(`http://localhost:5000/api/menu`);
        const data = await response.json();

        if (response.ok) {
            writeMealsOfMenuOrder(data);
        } else return document.getElementById("order-result").innerHTML = "";
    } catch (error) {
        console.error(`Felmeddelande ${error}`);
    }
}

//skriv ut meny med rätter till DOM
function writeMealsOfMenuOrder(meals) {
    let resultEl = document.getElementById("order-result");

    resultEl.innerHTML = "";

    //loop för utskrift
    meals.forEach(meal => {
        //skapa element
        let articleEl = document.createElement("article");

        let content = `
        <img src="${meal.image}" alt="${meal.title}">
        <h3 class="order-h3">${meal.title.toUpperCase()}</h3>
        <p class="order-p">${meal.description}</p>
        <span class="order-price">${meal.price}:-</span>
        <button class="button-black-add">+</button>
       `;

        //lägg till attribut och text
        articleEl.innerHTML = content;

        //skriv ut till DOM
        resultEl.appendChild(articleEl);
    })
}