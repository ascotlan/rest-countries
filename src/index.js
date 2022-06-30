import {renderCountries} from './views'
import {getData} from './rest-countries'
import {setFilters} from './filters.js'

getData()

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
