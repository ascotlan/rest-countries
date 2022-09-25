import { initializeDetailPage } from "./views.js";

const toggle = document.querySelector(".dark-mode");
const page = document.querySelector(".page");
let currentTheme = localStorage.getItem("theme");

//grab recipe id from url
const countryId = location.hash.substring(1);
const classList = initializeDetailPage(countryId); //render edit page

const backBtnEl = document.querySelector(".back");

classList.forEach((a) => {
  document.querySelector(`.${a}`).addEventListener("click", (e) => {
    const state = { id: e.target.name };
    location.assign(`/country.html#${e.target.name}`);
  });
});

backBtnEl.addEventListener("click", (e) => {
  location.assign("/index.html");
});

window.addEventListener("popstate", (e) => {
  location.reload();
});

if (currentTheme === "dark") {
  page.classList.replace("light", "dark");
}

toggle.addEventListener("click", (e) => {
  currentTheme = localStorage.getItem("theme");
  let themeSelection;
  if (currentTheme === "dark") {
    page.classList.replace("dark", "light");
    themeSelection = "light";
  } else {
    page.classList.replace("light", "dark");
    themeSelection = "dark";
  }
  localStorage.setItem("theme", themeSelection);
});

//how to prevent back/fwd button page load from cache
window.onpageshow = (e) => {
  if (e.persisted) {
    window.location.reload();
  }
};
