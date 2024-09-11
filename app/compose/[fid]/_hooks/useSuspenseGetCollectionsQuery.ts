import { getCollectionsOfUser } from "@/lib/actions/getCollectionsOfUser";
import { getStickerUrlsOfCollection } from "@/lib/actions/getStickerUrlsOfCollection";
import { getUser } from "@/lib/actions/getUser";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useSuspenseGetCollectionsQuery(parameters: { fid: number }) {
	return useSuspenseQuery({
		queryKey: ["getCollections", parameters.fid] as const,
		queryFn: async ({ queryKey: [_name, fid] }) => {
			const collectionKeys = await getCollectionsOfUser({ fid });
			const collectionStickers = await Promise.all(
				collectionKeys.map(async (key) => ({
					key,
					stickerUrls: await getStickerUrlsOfCollection({ key }),
				})),
			);

			const personalCollection = collectionStickers[0];
			const otherCollections = await Promise.all(
				collectionStickers.slice(1).map(async (collection) => {
					// @NOTE: assuming that collection=fid but this may change
					const user = await getUser(Number(collection.key));
					return { ...collection, user };
				}),
			);
			return { personalCollection, otherCollections } as const;
		},
	});
}
