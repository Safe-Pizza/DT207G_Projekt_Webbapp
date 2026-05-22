"use strict";

//kontrollera token, finns ej skicka till login.html
if(!localStorage.getItem("admin_token")) {
  window.location.href = "./login";
}