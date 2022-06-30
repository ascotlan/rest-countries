import getCountries from './requests'
import {
  setFilters,
  getFilters
} from './filters'

let data

const getData = async () => {
  data = await getCountries()
  renderCountries()
}

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

  return countryEl
}

const renderCountries = () => {

  const containerEl = document.querySelector('.country-info')

  const searchText = getFilters().searchText
  const regionText = getFilters().sortBy

  const filteredData = data.filter((country) => {
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

document.querySelector('.country-search').addEventListener('input', (e) => {
  setFilters({
    searchText: e.target.value
  })
  renderCountries()
})

document.querySelector('.country-filter').addEventListener('change', (e) => {
  setFilters({
    sortBy: e.target.value
  })
  renderCountries()
})

getData()
