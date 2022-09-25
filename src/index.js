import { renderCountries, initializeDetailPage } from "./views";
import { setFilters } from "./filters.js";
import { getData, getCountryData } from "./rest-countries";

if (getCountryData().length > 0) renderCountries();
getData();

const toggle = document.querySelector(".dark-mode");
const page = document.querySelector(".page");
let currentTheme = localStorage.getItem("theme");

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
