const axios = require('axios')

async function buscaClima(city){
    const apiKey = process.env.API_KEY
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&key=${apiKey}&contentType=json`

    const response = await axios.get(url) // axios.get(url e parametro indicando a cidade)
    return response.data
}

module.exports = buscaClima