import { redis } from "../db/redis";

export type SaveCollectionParameters = {
	fid: string | number;
	key: string | number;
};
export type SaveCollectionErrorType = Error;
export async function saveCollection(parameters: SaveCollectionParameters) {
	await redis.lpush(`collection:${parameters.fid}`, parameters.key);
}
