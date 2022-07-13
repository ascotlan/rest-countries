import { initializeDetailPage } from "./views.js";

//grab recipe id from url
const countryId = location.hash.substring(1);
const classList = initializeDetailPage(countryId); //render edit page

const backBtnEl = document.querySelector(".back");

classList.forEach((a) => {
  document.querySelector(`.${a}`).addEventListener("click", (e) => {
    const state = { id: e.target.name };
    history.pushState(state, "", `/country.html#${e.target.name}`);
    location.reload();
  });
});

backBtnEl.addEventListener("click", (e) => {
  history.back();
});

window.addEventListener("popstate", (e) => {
  location.reload();
});

const btn = document.querySelector(".dark-mode");
const theme = document.querySelector(".theme-link");
const currentTheme = localStorage.getItem("theme");

if (currentTheme === "dark") {
  theme.href = "/styles/dark-theme.css";
}

btn.addEventListener("click", (e) => {
  let themeSelection;
  if (theme.getAttribute("href") === "/styles/styles.css") {
    theme.href = "/styles/dark-theme.css";
    themeSelection = "dark";
  } else {
    theme.href = "/styles/styles.css";
    themeSelection = "light";
  }

  localStorage.setItem("theme", themeSelection);
});
