const express = require('express')
const router = express.Router()
const redisClient = require('./redis')
const searcWheater = require('./service_weather')

const apiKey = process.env.API_KEY
console.log(apiKey)

router.get('/washington', async (req, res) =>{
    // const city = req.params.city
    // const city = 'washington'
    // const cacheK = `wheater: ${city}`
    const city = 'washington'
    const cacheK = `wheater:washigton`

    try {
        const cached = await redisClient.get(cacheK)
        if (cached) {
            return res.json({ source: 'cache', data: JSON.parse(cached) })
        }

        const weater = await searcWheater(city) // a chamada da função pode não ter nenhum parametro
        await redisClient.setEx(cacheK, 3600, JSON.stringify(weater))
        res.json({ source: 'api', data: weater })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'erro ao buscar dados refentes ao clima' })
    }
})

module.exports = router