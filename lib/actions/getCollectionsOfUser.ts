import { redis } from "../db/redis";

export type GetCollectionsOfUserParameters = { fid: number };
export async function getCollectionsOfUser(
	parameters: GetCollectionsOfUserParameters,
) {
	const key = `collections:${parameters.fid}`;
	const length = await redis.llen(key);
	const collections = await redis.lrange(key, 0, length);
	return [
		// Personal collection
		parameters.fid.toString(),
		...collections,
	];
}
