"use server";
import { redis } from "../db/redis";

export type GetStickerUrlsOfCollectionParameters = { key: string };
export async function getStickerUrlsOfCollection(
	parameters: GetStickerUrlsOfCollectionParameters,
) {
	const key = `stickers:${parameters.key}`;
	const length = await redis.llen(key);
	const stickerUrls = await redis.lrange(key, 0, length);
	return stickerUrls;
}
