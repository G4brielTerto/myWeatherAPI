const redis = require('redis')
const client = redis.createClient({url: process.env.REDIS_URL})

client.on('error', err => console.error('deu pau no Redis:', err))
client.connect()

module.exports = client