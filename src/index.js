import { renderCountries } from "./views";
import { getData } from "./rest-countries";
import { setFilters } from "./filters.js";

const btn = document.querySelector(".dark-mode");
const theme = document.querySelector(".theme-link");
const currentTheme = localStorage.getItem("theme");

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
