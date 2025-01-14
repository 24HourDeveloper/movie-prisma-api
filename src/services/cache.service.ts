import { redisClient } from "../config/redis.config"

export async function getCachedData(key: string): Promise<string | null> {
    return redisClient.get(key)
}

export async function setCacheData(key: string, value: string, expiration: number): Promise<void> {
    await redisClient.set(key, value, { EX: expiration })
}