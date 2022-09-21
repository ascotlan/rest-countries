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
  flagEl.setAttribute("alt", `National flag of ${country.name.common}`);
  nameEl.textContent = country.name.common;
  nameEl.classList.add("country-name", "long-text-truncate");

  countryEl.appendChild(flagEl);
  countryTextEl.appendChild(nameEl);

  popTextEl.textContent = country.population.toLocaleString();
  popTextEl.classList.add("no-bold");
  popEl.appendChild(popTextEl);
  popEl.classList.add("long-text-truncate", "spacing");
  countryTextEl.appendChild(popEl);

  regionTextEl.textContent = country.region;
  regionTextEl.classList.add("no-bold");
  regionEl.appendChild(regionTextEl);
  regionEl.classList.add("long-text-truncate", "spacing");
  countryTextEl.appendChild(regionEl);

  capTextEl.textContent = country.capital ? country.capital : "No capital";
  capTextEl.classList.add("no-bold");
  capitalEl.appendChild(capTextEl);
  capitalEl.classList.add("long-text-truncate", "spacing");
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

  if (!country) {
    location.assign("/index.html");
  }

  //setup dom and initilize country details page
  flagEl.setAttribute("src", country.flags.svg);
  nameEl.textContent = country.name.common;
  nativeNameEl.classList.add("comma", "no-bold");

  for (const k in country.name.nativeName) {
    nativeNameEl.textContent = country.name.nativeName[k].common;
  }
  popEl.textContent = country.population.toLocaleString();
  popEl.classList.add("no-bold");
  regionEl.textContent = country.region;
  regionEl.classList.add("no-bold");
  subRegionEl.textContent = country.subregion;
  subRegionEl.classList.add("no-bold");
  capitalEl.textContent = country.capital;
  capitalEl.classList.add("no-bold");
  domainEl.textContent = country.tld;
  domainEl.classList.add("no-bold");

  currencyEl.classList.add("comma", "no-bold");

  for (const k in country.currencies) {
    currencyEl.textContent = country.currencies[k].name;
  }

  for (const k in country.languages) {
    const langRowEl = document.createElement("span");
    langRowEl.textContent = country.languages[k];
    langRowEl.classList.add("comma", "no-bold");
    langEl.appendChild(langRowEl);
  }

  let classList = [];

  if (country.borders) {
    country.borders.forEach((countryData) => {
      const buttonEl = document.createElement("button");

      const bordering = getCountryData().filter((item) => {
        return item.cca3 === countryData;
      });

      bordering.forEach((border) => {
        buttonEl.innerText = border.name.common;
      });

      buttonEl.name = `${countryData}`;
      buttonEl.classList.add("border-country");
      buttonEl.classList.add(`border-${countryData}`);
      borderEl.appendChild(buttonEl);

      classList.push(`border-${countryData}`);
    });
  } else {
    borderEl.textContent = "None";
    borderEl.classList.add("no-bold");
  }

  return classList;
};

export { initializeDetailPage, renderCountries };
