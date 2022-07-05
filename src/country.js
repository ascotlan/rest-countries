import { initializeDetailPage } from "./views.js";

//grab recipe id from url
const countryId = location.hash.substring(1);
initializeDetailPage(countryId); //render edit page

const backBtnEl = document.querySelector(".back");
const borderBtnEl = document.querySelector(".border-country");

backBtnEl.addEventListener("click", (e) => {
  location.assign("/index.html");
});

borderBtnEl.addEventListener("click", (e) => {
  ///problem to solve
});
