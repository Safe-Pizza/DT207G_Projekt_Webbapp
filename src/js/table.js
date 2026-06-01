//lyssnare för knapp bokning av bord
document.querySelector("#button-submit-table").addEventListener("click", submitTable);

//funktion för att visa meddelande när bokning av bord skickas in
function submitTable() {
   const email = document.querySelector("#table-email").value;
   const containerMessageDivEl = document.querySelector("#table-message");
   const containerFormEl = document.querySelector("#table-form");
   const tableTextEl = document.querySelector("#table-p");

   containerMessageDivEl.innerHTML = ""; // Rensa tidigare meddelanden

   if (!email) {
      let pEl = document.createElement("p")
      pEl.innerHTML = "Tack för din bokning! Vi återkommer till dig med en bokningsbekräftelse inom kort.";
      containerMessageDivEl.appendChild(pEl);
      containerFormEl.style.display = "none"; // Göm formuläret
      tableTextEl.style.display = "none"; // Göm den inledande texten
   } else {
      let pEl = document.createElement("p")
      pEl.innerHTML = `Tack för din bokning! Vi återkommer inom kort med en bokningsbekräftelse på mailadress: ${email}.`;
      containerMessageDivEl.appendChild(pEl);
      containerFormEl.style.display = "none"; // Göm formuläret
      tableTextEl.style.display = "none"; // Göm den inledande texten
   }
}