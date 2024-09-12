/** @jsxImportSource frog/jsx */

import { getUser } from "@/lib/actions/getUser";
import { Button, Frog } from "frog";
import { Background } from "./_components/Background";
import { Box, Image, Text, VStack } from "./ui";
import { getCastoorsOfCollection } from "@/lib/actions/getCastoorsOfCollection";

// basepath path param not supported by frog
export const collection = new Frog({ title: "Collection" });

collection
	.frame("/:key/showcase", (c) => {
		return c.res({
			image: `/${c.req.param("key")}/showcase/img`,
			intents: [
				<Button action={`~/collections/${c.req.param("key")}/save`}>
					Save
				</Button>,
			],
		});
	})
	.image("/:key/showcase/img", async (c) => {
		const [castoorsOfCollection, user] = await Promise.all([
			getCastoorsOfCollection({
				key: c.req.param("key"),
			}),
			getUser(Number(c.req.param("key"))),
		]);

		return c.res({
			image: (
				<Background justifyContent="flex-start">
					<VStack gap="16" grow>
						<Text size="32" weight="700">
							{user.display_name}'s collection
						</Text>
						{/* <Box padding="8" borderWidth="1" borderColor="border"> */}
						{/* 	<Text size="24">Used by ? farcastoors</Text> */}
						{/* </Box> */}
						<VStack gap="8" grow>
							<Text size="24">Saved stickers of:</Text>
							<Box flexWrap="wrap" flexDirection="row" gap="6">
								{castoorsOfCollection.map((castoor) =>
									castoor.pfp_url ? (
										<Image
											borderRadius="256"
											height="64"
											width="64"
											src={castoor.pfp_url}
										/>
									) : null,
								)}
							</Box>
						</VStack>
					</VStack>
				</Background>
			),
			imageOptions: {
				width: 1200,
				height: 630,
			},
		});
	});
