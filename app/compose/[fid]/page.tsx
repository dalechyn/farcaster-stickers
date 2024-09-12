"use client";
import { CastButton } from "./_components/CastButton";
import { useGetUserQuery } from "./_hooks/useGetUserQuery";
import { useGetCollectionsQuery } from "./_hooks/useGetCollectionsQuery";

export default function ComposeForm({
	params,
	searchParams,
}: { params: { fid: string }; searchParams: { text: string } }) {
	const fid = Number(params.fid);
	const suspenseGetUserQuery = useGetUserQuery({ fid });
	const suspenseGetCollectionsQuery = useGetCollectionsQuery({ fid });

	if (!suspenseGetCollectionsQuery.isSuccess || !suspenseGetUserQuery.isSuccess)
		return <>Loading...</>;

	return (
		<div>
			<h1 className="text-xl font-bold">
				{suspenseGetUserQuery.data.display_name}'s collection:
			</h1>
			<div className="flex flex-wrap gap-2">
				{suspenseGetCollectionsQuery.data.personalCollection.stickerUrls.map(
					(stickerUrl, i) => {
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
					},
				)}
			</div>
			{suspenseGetCollectionsQuery.data.otherCollections.map(
				(otherCollection) => {
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
				},
			)}
		</div>
	);
}
