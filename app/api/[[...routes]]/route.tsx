/** @jsxImportSource frog/jsx */

import { getCast } from "@/lib/actions/getCast";
import { Frog } from "frog";
import { devtools } from "frog/dev";
// import { neynar } from 'frog/hubs'
import { handle } from "frog/next";
import { serveStatic } from "frog/serve-static";
import { Box, HStack, Image, Text, VStack, vars } from "./ui";
import { Background } from "./_components/Background";
import { collection } from "./collection";
import { collections } from "./collections";
import { sticker } from "./sticker";

const app = new Frog({
	assetsPath: "/",
	basePath: "/api",
	origin: process.env.APP_URL,
	ui: {
		vars,
	},
	imageAspectRatio: "1:1",
	// Supply a Hub to enable frame verification.
	// hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
	title: "Cast Stickers",
});

// Uncomment to use Edge Runtime
// export const runtime = 'edge'
//

app.composerAction(
	"/compose",
	(c) => {
		console.log(c.actionData);
		return c.res({
			title: "Cast Stickers",
			url: `${process.env.APP_URL}/compose/${c.actionData.fid}?text=${c.actionData.state.cast.text}`,
		});
	},
	{
		name: "Cast Stickers",
		description: "Save casts and use them as stickers",
		icon: "file",
		imageUrl: "",
	},
);

app.image("/cast/:hash/:size?", async (c) => {
	const size = c.req.param("size") ?? "normal";
	const cast = await getCast(c.req.param("hash"));
	const linesEstimate = (() => {
		const linesEstimateFromSymbols = Math.ceil(
			cast.text.length / (size === "small" ? 70 : 50),
		);
		const linesEstimateFromNewLines = cast.text.split("\n").length;
		return linesEstimateFromSymbols + linesEstimateFromNewLines;
	})();
	return c.res({
		image: (
			<Background>
				<VStack padding="16" borderRadius="8" gap="8">
					<HStack width="100%" gap="8" alignItems="center">
						<Box
							borderRadius="256"
							borderWidth="1"
							borderColor="muted"
							overflow="hidden"
							minHeight={{ custom: "64px" }}
							minWidth={{ custom: "64px" }}
							maxWidth={{ custom: "64px" }}
							maxHeight={{ custom: "64px" }}
						>
							<Image
								src={
									cast.author.pfp_url?.replaceAll("rectcrop", "squarecrop") ??
									"https://wrpcd.net/cdn-cgi/image/anim=false,fit=contain,f=auto,w=336/https%3A%2F%2Fi.imgur.com%2F7SIMuyb.jpg"
								}
							/>
						</Box>

						<VStack>
							<Text size={{ custom: "24px" }} weight="700">
								{cast.author.display_name}
							</Text>
							<Text size={{ custom: "24px" }} color="muted">
								@{cast.author.username}
							</Text>
						</VStack>
					</HStack>
					<Box overflow="hidden" grow lineClamp={1}>
						<Text size={{ custom: "24px" }}>
							{cast.text.split("\n").map((content) => (
								<>
									{content}
									<br />
								</>
							))}
						</Text>
					</Box>
				</VStack>
			</Background>
		),
		imageOptions: {
			height: (linesEstimate + 1) * (size === "small" ? 70 : 50),
			width: size === "small" ? 300 : 600,
		},
	});
});

app.route("/sticker", sticker);
app.route("/collection", collection);
app.route("/collections", collections);

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);

// NOTE: That if you are using the devtools and enable Edge Runtime, you will need to copy the devtools
// static assets to the public folder. You can do this by adding a script to your package.json:
// ```json
// {
//   scripts: {
//     "copy-static": "cp -r ./node_modules/frog/_lib/ui/.frog ./public/.frog"
//   }
// }
// ```
// Next, you'll want to set up the devtools to use the correct assets path:
// ```ts
// devtools(app, { assetsPath: '/.frog' })
// ```
