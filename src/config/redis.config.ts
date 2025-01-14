import { createClient } from 'redis'

export const redisClient = createClient({
    url: `redis://localhost:6379`
})

redisClient.on('error', (err) => {
    console.error('Redis Client Error: ', err)
});

(async () => {
    try {
        await redisClient.connect()
        console.log('Redis is connected.')
    } catch (error) {
        console.error('Failed to connect to Redis.')
    }
})()