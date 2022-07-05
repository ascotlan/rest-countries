import { getCountryData, loadData } from "./rest-countries";
import { getFilters } from "./filters";

const generateCountryDOM = (country) => {
  const flagEl = document.createElement("img");
  const nameEl = document.createElement("h3");
  const popTextEl = document.createElement("span");
  const regionTextEl = document.createElement("span");
  const capTextEl = document.createElement("span");
  const popEl = document.createElement("p");
  const regionEl = document.createElement("p");
  const capitalEl = document.createElement("p");
  const countryEl = document.createElement("div");
  const countryTextEl = document.createElement("div");

  popEl.textContent = "Population: ";
  regionEl.textContent = "Region: ";
  capitalEl.textContent = "Capital: ";

  flagEl.setAttribute("src", country.flags.png);
  flagEl.classList.add("flag-image");
  nameEl.textContent = country.name.common;
  nameEl.classList.add("country-name", "long-text-truncate");

  countryEl.appendChild(flagEl);
  countryTextEl.appendChild(nameEl);

  popTextEl.textContent = country.population;
  popEl.appendChild(popTextEl);
  popEl.classList.add("long-text-truncate");
  countryTextEl.appendChild(popEl);

  regionTextEl.textContent = country.region;
  regionEl.appendChild(regionTextEl);
  regionEl.classList.add("long-text-truncate");
  countryTextEl.appendChild(regionEl);

  capTextEl.textContent = country.capital
    ? country.capital
    : "No known capital city";
  capitalEl.appendChild(capTextEl);
  capitalEl.classList.add("long-text-truncate");
  countryTextEl.appendChild(capitalEl);

  countryTextEl.classList.add("country-text");
  countryEl.classList.add("country-info-card");

  countryEl.appendChild(countryTextEl);

  countryEl.addEventListener("click", (e) => {
    const id = country.cca3;
    location.assign(`/country.html#${id}`);
  });

  return countryEl;
};

const renderCountries = () => {
  const containerEl = document.querySelector(".country-info");

  const searchText = getFilters().searchText;
  const regionText = getFilters().sortBy;

  const filteredData = getCountryData().filter((country) => {
    const countryTextMatch = country.name.common
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const regionTextMatch = country.region.includes(regionText);

    return countryTextMatch && regionTextMatch;
  });

  containerEl.innerHTML = "";

  if (filteredData.length) {
    filteredData.forEach((country) => {
      containerEl.appendChild(generateCountryDOM(country));
    });
  } else {
    const errorMessageEl = document.createElement("p");
    errorMessageEl.textContent = "There are no countries to show";
    containerEl.appendChild(errorMessageEl);
  }
};

const initializeDetailPage = (countryId) => {
  loadData();
  const flagEl = document.querySelector(".large-flag");
  const nameEl = document.querySelector(".row1-col1");
  const nativeNameEl = document.querySelector(".value1");
  const popEl = document.querySelector(".value2");
  const regionEl = document.querySelector(".value3");
  const subRegionEl = document.querySelector(".value4");
  const capitalEl = document.querySelector(".value5");
  const domainEl = document.querySelector(".value6");
  const currencyEl = document.querySelector(".value7");
  const langEl = document.querySelector(".value8");
  const borderEl = document.querySelector(".value9");

  const country = getCountryData().find(
    (country) => countryId === country.cca3
  );

  //setup dom and initilize country details page
  flagEl.setAttribute("src", country.flags.svg);
  nameEl.textContent = country.name.common;

  for (const k in country.name.nativeName) {
    nativeNameEl.textContent = country.name.nativeName[k].common;
  }
  popEl.textContent = country.population;
  regionEl.textContent = country.region;
  subRegionEl.textContent = country.subregion;
  capitalEl.textContent = country.capital;
  domainEl.textContent = country.tld;

  for (const k in country.currencies) {
    currencyEl.textContent = country.currencies[k].name;
  }

  for (const k in country.languages) {
    const langRowEl = document.createElement("span");
    langRowEl.textContent = country.languages[k];
    langEl.appendChild(langRowEl);
  }

  if (country.borders) {
    country.borders.forEach((country) => {
      const buttonEl = document.createElement("button");
      buttonEl.innerText = `${country}`;
      buttonEl.name = `${country}`;
      buttonEl.classList.add("border-country");
      borderEl.appendChild(buttonEl);
    });
  } else {
    borderEl.textContent = "None";
  }
};

export { initializeDetailPage, renderCountries };
