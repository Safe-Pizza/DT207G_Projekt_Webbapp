document.querySelector("#button-contact-form").addEventListener("click", toggleContactForm);

//togglefunktion för kontaktformulär
function toggleContactForm() {
    const contactFormDivEl = document.querySelector("#contact-form");

    if (contactFormDivEl.style.display === "block") {
        contactFormDivEl.style.display = "none";
    } else {
        contactFormDivEl.style.display = "block";
    }
}