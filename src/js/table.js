document.querySelector("#button-submit-table").addEventListener("click", submitTable);

function submitTable() {
    const email = document.querySelector("#table-email").value;
    const containerDivEl = document.querySelector("#table-message");

    containerDivEl.innerHTML = ""; // Rensa tidigare meddelanden

    if(!email) {
       let pEl = document.createElement("p")
       pEl.innerHTML = "Tack för din bokning! Vi återkommer till dig med en bokningsbekräftelse inom kort.";
       containerDivEl.appendChild(pEl);
    } else {
       let pEl = document.createElement("p")
       pEl.innerHTML = `Tack för din bokning! Vi återkommer inom kort med en bokningsbekräftelse på mailadress: ${email}.`;
       containerDivEl.appendChild(pEl);
    }
}