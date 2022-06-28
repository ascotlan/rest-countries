import getCountries from './requests'

getCountries().then((data) => {
  renderCountries(data, undefined)
}).catch((err) => {
  renderCountries(undefined, err)
})


const renderCountries = (data, err) => {
  const containerEl = document.querySelector('.country-info')

  if(data){
    data.forEach((country) => {
      const flagEl = document.createElement('img')
      const nameEl = document.createElement('h3')
      const popTextEl = document.createElement('span')
      const regionTextEl = document.createElement('span')
      const capTextEl = document.createElement('span')
      const popEl = document.createElement('p')
      const regionEl = document.createElement('p')
      const capitalEl = document.createElement('p')
      const countryEl = document.createElement('div')

      popEl.textContent = 'Population: '
      regionEl.textContent = 'Region: '
      capitalEl.textContent = 'Capital: '

      flagEl.setAttribute('src', country.flags.svg)
      nameEl.textContent = country.name.common

      countryEl.appendChild(flagEl)
      countryEl.appendChild(nameEl)

      popTextEl.textContent = country.population
      popEl.appendChild(popTextEl)
      countryEl.appendChild(popEl)

      regionTextEl.textContent = country.region
      regionEl.appendChild(regionTextEl)
      countryEl.appendChild(regionEl)

      capTextEl.textContent = country.capital ? country.capital : 'No known capital city'
      capitalEl.appendChild(capTextEl)
      countryEl.appendChild(capitalEl)

      containerEl.appendChild(countryEl)
    })
  }else{
    const errorMessageEl = document.createElement('p')
    errorMessageEl.textContent = err
    containerEl.appendChild(errorMessageEl)
  }
}
