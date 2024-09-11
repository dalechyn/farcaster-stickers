"use server";
import { redis } from "../db/redis";

export async function resolveCache<T>(
	key: string,
	getter: () => T | Promise<T>,
	seconds: number,
): Promise<T> {
	const cachedResult = await redis.get(`cache:${key}`);
	if (cachedResult) return JSON.parse(cachedResult) as T;

	const data = await getter();
	await redis.set(key, JSON.stringify(data), "EX", seconds);
	return data;
}
