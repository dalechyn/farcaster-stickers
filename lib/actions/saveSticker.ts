"use server";
import { redis } from "../db/redis";

export type SaveStickerParameters = {
	key: string | number;
	stickerUrl: string;
};
export type SaveStickerErrorType = Error;
export async function saveSticker(parameters: SaveStickerParameters) {
	await redis.lpush(`stickers:${parameters.key}`, parameters.stickerUrl);
}
