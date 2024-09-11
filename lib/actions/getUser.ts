"use server";
import { neynarClient } from "../neynar/neynarClient";
import { resolveCache } from "./resolveCache";

export async function getUser(fid: number) {
	return resolveCache(
		`cache:user:${fid}`,
		async () => {
			const fetchBulkUsersResponse = await neynarClient.fetchBulkUsers([fid]);
			return fetchBulkUsersResponse.users[0];
		},
		86400 * 7,
	);
}
