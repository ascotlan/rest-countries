import {initializeEditPage} from './views.js'

//grab recipe id from url
const countryId = location.hash.substring(1)
initializeEditPage(countryId) //render edit page
