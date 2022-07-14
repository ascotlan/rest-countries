import { renderCountries } from "./views";
import { getData } from "./rest-countries";
import { setFilters } from "./filters.js";

const toggle = document.querySelector(".dark-mode");
const page = document.querySelector(".page");
let currentTheme = localStorage.getItem("theme");

getData();

document.querySelector(".country-search").addEventListener("input", (e) => {
  setFilters({
    searchText: e.target.value,
  });
  renderCountries();
});

document.querySelector(".country-filter").addEventListener("change", (e) => {
  setFilters({
    sortBy: e.target.value,
  });
  renderCountries();
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
