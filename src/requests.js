const getCountries = async () => {
  const response = await fetch('https://restcountries.com/v3.1/all')

  if(response.status === 200){
    const data = await response.json()
    return data
  }else {
    throw new Error('Unable to fetch country data')
  }
}

export {getCountries as default}
