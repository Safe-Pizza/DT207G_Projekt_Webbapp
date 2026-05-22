"use strict";

document.addEventListener("DOMContentLoaded", () => {

    //Eventlyssnare för hamburgermeny
    document.querySelector(".container-navbar").addEventListener("click", toggleMenu);
});

//togglefunktion för hamburgermeny
function toggleMenu() {
    const mainNavEl = document.querySelector(".main-nav");
    const hamMenuEl = document.querySelector("#hamburger-menu");

    if (mainNavEl.style.display === "block") {
        mainNavEl.style.display = "none";
        mainNavEl.style.height = "0%";
    } else {
        mainNavEl.style.display = "block";
        mainNavEl.style.height = "100%";
    }
}