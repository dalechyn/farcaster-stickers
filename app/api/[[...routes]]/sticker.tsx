/** @jsxImportSource frog/jsx */

import { Frog } from "frog";
import { saveSticker } from "@/lib/actions/saveSticker";

export const sticker = new Frog({
	title: "Sticker",
});

sticker.castAction(
	"/add/action",
	async (c) => {
		await saveSticker({
			key: c.actionData.fid.toString(),
			stickerUrl: `${process.env.APP_URL}/api/cast/${c.actionData.castId.hash}`,
		});
		return c.message({ message: "Sticker saved!" });
	},
	{
		name: "Cast Stickers Action",
		description: "You can save casts as stickers!",
		icon: "file",
	},
);
