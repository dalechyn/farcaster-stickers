import { resolveData } from "../_db/resolveData";
import { neynarClient } from "../_neynar/neynarClient";

export async function resolveUser(fid: number) {
  return resolveData(`cache:user:${fid}`, async () => {
    const fetchBulkUsersResponse = await neynarClient.fetchBulkUsers([fid])
    return fetchBulkUsersResponse.users[0]
  }, 86400 * 7)
}
