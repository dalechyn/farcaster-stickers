"use server";
import { getCast } from "./getCast";
import { getStickerUrlsOfCollection } from "./getStickerUrlsOfCollection";

export type GetCastoorsOfCollectionParameters = { key: string };
export async function getCastoorsOfCollection(
	parameters: GetCastoorsOfCollectionParameters,
) {
	const stickerUrls = await getStickerUrlsOfCollection(parameters);
	const castsHashes = stickerUrls.map((stickerUrl) => {
		const split = stickerUrl.split("/");
		return split[split.length - 1];
	});
	const casts = await Promise.all(
		castsHashes.map((castHash) => getCast(castHash)),
	);
	const authors = casts.map((cast) => cast.author);
	return authors.filter(
		(author, i) =>
			authors.findIndex((authorLookup) => authorLookup.fid === author.fid) ===
			i,
	);
}
