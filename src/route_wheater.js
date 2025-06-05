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

        const parsed = JSON.parse(cached)
        const climaPars = parsed.currentConditions

        const fahrenheit = climaPars.temp
        const celsius = ((fahrenheit - 32) * 5 / 9).toFixed(1)


        if (cached) {
            // return res.json({ source: 'cache', data: JSON.parse(cached) })


            return res.send(`
            <html>
                <head>
                    <title>Clima de Washington</title>
                </head>
                <body>
                    <h1>Você buscou o clima de Washington</h1>
                    <h2>temperatura: ${celsius}°C</h2>
                </body>
            </html>    
            `)
        }


        // SERVE PARA FAZER O CÓDIGO SER DINÂMICO
        // PERMITE BUSCAR O CLIMA DA CIDADE QUE QUISER(SÓ QUE ATUALMENTE 
        // SÓ ESTÁ BUSCANDO O CLIMA DE washington)
        const weater = await searcWheater(city) // a chamada da função pode não ter nenhum parametro
        await redisClient.setEx(cacheK, 3600, JSON.stringify(weater))
        

        const clima = weater.currentConditions


        //RETORNA O JSON COM AS INFORMAÇÕES DE CLIMA
        // res.json({ source: 'api', data: weater })

         res.send(`
            <html>
                <head>
                    <title>Clima de Washington</title>
                </head>
                <body>
                    <h1>Você buscou o clima de Washington</h1>
                    <h2>temperatura: ${clima.temp}</h2>
                </body>
            </html>    
            `)

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'erro ao buscar dados refentes ao clima' })
    }
})

module.exports = router