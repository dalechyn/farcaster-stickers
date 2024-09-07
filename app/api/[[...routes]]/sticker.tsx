/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput } from "frog";
import { Background } from "./_components/Background";
import { Text } from "./ui";
import { z } from "zod";
import { saveSticker } from "@/lib/actions/saveSticker";

export const sticker = new Frog({
	title: "Sticker",
	origin: process.env.APP_URL,
});

sticker
	.castAction(
		"/add/action",
		async (c) => {
			return c.frame({ path: "/add/frame" });
		},
		{
			name: "Cast Stickers Action",
			description: "You can save casts as stickers!",
			icon: "file",
		},
	)
	.frame("/add/frame", (c) => {
		return c.res({
			image: "/add/frame/img",
			intents: [<TextInput />, <Button>Add</Button>],
		});
	})
	.image("/add/frame/img", (c) => {
		return c.res({
			image: (
				<Background>
					<Text>Add Emojis to your cast sticker (up to 5)</Text>
				</Background>
			),
		});
	})
	.frame("/added/frame", async (c) => {
		if (!c.frameData?.inputText) return c.error({ message: "No emojis put." });
		if (!z.string().emoji().safeParse(c.frameData.inputText).success)
			return c.error({ message: "Not an emoji." });

		const emojis = c.frameData.inputText.split("");
		await saveSticker({
			key: c.frameData.fid.toString(),
			stickerUrl: `${process.env.APP_URL}/api/cast/${c.frameData.castId.hash}`,
			emojis,
		});
		return c.res({
			image: (
				<Background>
					<Text>Added</Text>
				</Background>
			),
		});
	});
