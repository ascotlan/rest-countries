import {getCountryData, loadData} from './rest-countries'
import {
  setFilters,
  getFilters
} from './filters'

const generateCountryDOM = (country) => {
  const flagEl = document.createElement('img')
  const nameEl = document.createElement('h3')
  const popTextEl = document.createElement('span')
  const regionTextEl = document.createElement('span')
  const capTextEl = document.createElement('span')
  const popEl = document.createElement('p')
  const regionEl = document.createElement('p')
  const capitalEl = document.createElement('p')
  const countryEl = document.createElement('div')
  const countryTextEl = document.createElement('div')

  popEl.textContent = 'Population: '
  regionEl.textContent = 'Region: '
  capitalEl.textContent = 'Capital: '

  flagEl.setAttribute('src', country.flags.png)
  flagEl.classList.add('flag-image')
  nameEl.textContent = country.name.common
  nameEl.classList.add('country-name')

  countryEl.appendChild(flagEl)
  countryTextEl.appendChild(nameEl)

  popTextEl.textContent = country.population
  popEl.appendChild(popTextEl)
  countryTextEl.appendChild(popEl)

  regionTextEl.textContent = country.region
  regionEl.appendChild(regionTextEl)
  countryTextEl.appendChild(regionEl)

  capTextEl.textContent = country.capital ? country.capital : 'No known capital city'
  capitalEl.appendChild(capTextEl)
  countryTextEl.appendChild(capitalEl)

  countryTextEl.classList.add('country-text')
  countryEl.classList.add('country-info-card')

  countryEl.appendChild(countryTextEl)

  countryEl.addEventListener('click', (e) => {
    const id = country.cca3
    location.assign(`/country.html#${id}`)
  })


  return countryEl
}

const renderCountries = () => {
  const containerEl = document.querySelector('.country-info')

  const searchText = getFilters().searchText
  const regionText = getFilters().sortBy

  const filteredData = getCountryData().filter((country) => {
    const countryTextMatch = country.name.common.toLowerCase().includes(searchText.toLowerCase())
    const regionTextMatch = country.region.includes(regionText)

    return countryTextMatch && regionTextMatch
  })

  containerEl.innerHTML = ''

  if (filteredData.length) {
    filteredData.forEach((country) => {
      containerEl.appendChild(generateCountryDOM(country))
    })
  } else {
    const errorMessageEl = document.createElement('p')
    errorMessageEl.textContent = 'There are no countries to show'
    containerEl.appendChild(errorMessageEl)
  }
}

const initializeEditPage = (countryId) => {
  loadData()
  const countryEl = document.querySelector('.country-info-details')

  const country = getCountryData().find((country) => countryId === country.cca3)
  console.log(country)

  //setup dom and initilize country details page
}

export {initializeEditPage, renderCountries}
