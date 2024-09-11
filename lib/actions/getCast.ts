"use server";
import { neynarClient } from "../neynar/neynarClient";
import { resolveCache } from "./resolveCache";

export async function getCast(castHash: string) {
	return resolveCache(
		`cast:${castHash}`,
		async () => {
			const fetchBulkCastsResponse = await neynarClient.fetchBulkCasts([
				castHash,
			]);
			return fetchBulkCastsResponse.result.casts[0];
		},
		86400 * 7,
	);
}
