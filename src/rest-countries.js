import getCountries from './requests'
import {renderCountries} from './views'

let data

const getData = async () => {
  data = await getCountries()
  renderCountries()
  save()
}

const save = () => {
  localStorage.setItem('rest-countries', JSON.stringify(data))
}

const loadData = () => {
  const countryJSON = localStorage.getItem('rest-countries')

  try {
    data = countryJSON ? JSON.parse(countryJSON) : []
  } catch (e) {
    data = []
  }
}

const getCountryData = () => data

loadData()

export {getCountryData, getData, loadData}
