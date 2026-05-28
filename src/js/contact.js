"use strict";

document.querySelector("#button-contact-form").addEventListener("click", toggleContactForm);
const buttonSubmitContact = document.querySelector("#button-submit-contact");
if (buttonSubmitContact) {
    buttonSubmitContact.addEventListener("click", submitContactForm);
}

function submitContactForm() {
    const messageEl = document.querySelector("#contact-message");
    const contactFormDivEl = document.querySelector("#contact-form");

    messageEl.innerHTML = ""; // Rensa tidigare meddelanden

    messageEl.innerHTML = "<p>Tack för ditt meddelande! Vi återkommer till dig inom kort.</p>";

    contactFormDivEl.style.display = "none";

}

//togglefunktion för kontaktformulär
function toggleContactForm() {
    const contactFormDivEl = document.querySelector("#contact-form");

    if (contactFormDivEl.style.display === "block") {
        contactFormDivEl.style.display = "none";
    } else {
        contactFormDivEl.style.display = "block";
    }
}