import { redis } from "./redis";

export async function resolveData<T extends any>(key: string, retrieveFn: () => T | Promise<T>, seconds: number): Promise<T> {
  const cachedResult = await redis.get(key)
  if (cachedResult) return JSON.parse(cachedResult) as T

  const data = (await retrieveFn())
  await redis.set(key, JSON.stringify(data), 'EX', seconds)
  return data
}
