"use strict";

//eventlyssnare för login och register knappar
document.querySelector("#submit-button-login").addEventListener("click", loginUser);

//funktion för login, validera input och skicka till funktion som anropar webbtjänst
function loginUser() {
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    const errorsEl = document.querySelector("#errors");

    errorsEl.innerHTML = "";

    const errors = [];

    //kontrollera att både användarnamn och lösenord är ifyllt
    if (!username || !password) {
        errors.push(`<li>Du måste fylla i både användarnamn och lösenord</li>`);
    }

    //Skriv ut eventuella felmeddelanden
    if (errors.length !== 0) {
        errors.forEach(error => {
            errorsEl.innerHTML += error;
        })
    } else {
        requestLogin(username, password);
    }
}

//funktion för loginförsök till webbtjänst, sparar token vid lyckat login, skickar användare till admin.html
async function requestLogin(username, password) {
    try {
        const res = await fetch("http://localhost:5000/api/login", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                email: username,
                password: password
            })
        })

        if (!res.ok) {
            throw new Error("Misslyckades att logga in");
        } else {
            const data = await res.json();
            localStorage.setItem("admin_token", data.token);
            window.location.href = "./admin.html";
        }
    } catch (error) {
        console.error(`Något gick fel: ${error}`);
    };
}