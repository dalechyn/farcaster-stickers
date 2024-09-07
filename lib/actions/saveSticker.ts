import { redis } from "../db/redis";

export type SaveStickerParameters = {
	key: string | number;
	stickerUrl: string;
	emojis: string[];
};
export type SaveStickerErrorType = Error;
export async function saveSticker(parameters: SaveStickerParameters) {
	await redis.lpush(`stickers:${parameters.key}`, parameters.stickerUrl);
	await Promise.all(
		parameters.emojis.map(async (emoji) => {
			await redis.lpush(`stickers:emojis:${parameters.stickerUrl}`, emoji);
		}),
	);
}
