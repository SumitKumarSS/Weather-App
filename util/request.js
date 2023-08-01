import axios from 'react-native-axios'

const BASE_URL= "http://api.weatherapi.com/v1"
const API_KEY= '8f043df8cda44ea28a1175408232907'

let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();

today=yyyy+'-'+mm+'-'+dd


//current
const currentEndpoint=city=>`${BASE_URL}/current.json?key=${API_KEY}&q=${city}&aqi=no`
// http://api.weatherapi.com/v1/current.json?key=8f043df8cda44ea28a1175408232907&q=London&aqi=yes

//sunrsie
const astroEndpoint=city=>`${BASE_URL}/astronomy.json?key=${API_KEY}&q=${city}&dt=${today}`
// http://api.weatherapi.com/v1/astronomy.json?key=8f043df8cda44ea28a1175408232907&q=London&dt=2023-07-30

//forecast
const forecastEndpoint=(city,days)=>`${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=${days}&aqi=no&alerts=no`
// http://api.weatherapi.com/v1/forecast.json?key=8f043df8cda44ea28a1175408232907&q=London&days=7&aqi=no&alerts=yes

//search
const searchEndpoint=(city)=>`${BASE_URL}/search.json?key=${API_KEY}&q=${city}`
// http://api.weatherapi.com/v1/search.json?key=8f043df8cda44ea28a1175408232907&q=London

export const fetchDataFromApi = async (url, params) => {

    const options={
        method:'GET',
        url: url,
        params:params?params:{}
    }
    try{
        const response=await axios.request(options)
        return response.data
    }catch(error){
        console.log('error',error)
        return
    }
};

// export const current=(city)=>{
//     return fetchDataFromApi(currentEndpoint(city))
// }
// export const astro=(city)=>{
//     return fetchDataFromApi(astroEndpoint(city))
// }

export const foreCast=(city,days)=>{
    return fetchDataFromApi(forecastEndpoint(city,days))
}

export const Search=(city)=>{
    return fetchDataFromApi(searchEndpoint(city))
}
