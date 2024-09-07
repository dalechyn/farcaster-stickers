import { resolveData } from "../_db/resolveData";
import { neynarClient } from "../_neynar/neynarClient";

export async function resolveCast(castHash: string) {
  return resolveData(`cache:cast:${castHash}`, async () => {
    const fetchBulkCastsResponse = await neynarClient.fetchBulkCasts([castHash])
    return fetchBulkCastsResponse.result.casts[0]
  }, 86400 * 7)
}
