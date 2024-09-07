/** @jsxImportSource frog/jsx */

import { Frog } from "frog";
import { Background } from "./_components/Background";
import { Text } from "./ui";
import { saveCollection } from "@/lib/actions/saveCollection";

export const collections = new Frog({ title: "Collection" });

collections.frame("/:key/save", async (c) => {
	if (!c.frameData) return c.error({ message: "No Frame Data" });
	await saveCollection({ fid: c.frameData.fid, key: c.req.param("key") });
	return c.res({
		image: (
			<Background>
				<Text>Collection saved</Text>
			</Background>
		),
	});
});
