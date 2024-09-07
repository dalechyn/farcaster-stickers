import { getCollectionsOfUser } from "@/lib/actions/getCollectionsOfUser";
import { getStickerUrlsOfCollection } from "@/lib/actions/getStickerUrlsOfCollection";
import { getUser } from "@/lib/actions/getUser";
import { CastButton } from "./_components/CastButton";

export default async function ComposeForm({
	params,
	searchParams,
}: { params: { fid: string }; searchParams: { text: string } }) {
	const fid = Number(params.fid);
	const [user, collections] = await Promise.all([
		getUser(Number(params.fid)),
		(async () => {
			const collectionKeys = await getCollectionsOfUser({ fid });
			const collectionStickers = await Promise.all(
				collectionKeys.map(async (key) => ({
					key,
					stickerUrls: await getStickerUrlsOfCollection({ key }),
				})),
			);
			return collectionStickers;
		})(),
	]);

	const personalCollection = collections[0];
	const otherCollections = await Promise.all(
		collections.slice(1).map(async (collection) => {
			// @NOTE: assuming that collection=fid but this may change
			const user = await getUser(Number(collection.key));
			return { ...collection, user };
		}),
	);

	return (
		<div>
			<h1 className="text-xl font-bold">{user.display_name}'s collection:</h1>
			{personalCollection && (
				<div className="flex flex-wrap gap-2">
					{personalCollection.stickerUrls.map((stickerUrl, i) => {
						return (
							<div
								className="border border-border/50 max-w-[60vw]"
								key={`${stickerUrl}-${
									// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
									i
								}`}
							>
								<CastButton
									text={searchParams.text}
									stickerImageSrc={stickerUrl}
								/>
							</div>
						);
					})}
				</div>
			)}
			{otherCollections.map((otherCollection) => {
				return (
					<>
						<h1>{otherCollection.user.display_name}'s collection:</h1>
						<div
							key={otherCollection.key}
							style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}
						>
							{otherCollection.stickerUrls.map((stickerUrl, i) => {
								return (
									<div
										key={`${stickerUrl}-${
											// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
											i
										}`}
										style={{
											display: "flex",
											flexDirection: "column",
											gap: "4px",
										}}
									>
										<img
											src={stickerUrl}
											alt="Sticker"
											height={157}
											width={300}
										/>
										<CastButton
											text={searchParams.text}
											stickerImageSrc={stickerUrl}
										/>
									</div>
								);
							})}
						</div>
					</>
				);
			})}
		</div>
	);
}
