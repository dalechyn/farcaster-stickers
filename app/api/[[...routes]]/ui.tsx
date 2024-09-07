import { createSystem } from "frog/ui";

export const { Box, VStack, HStack, Divider, Image, Text, vars } = createSystem(
	{
		frame: {
			height: 600,
			width: 600,
		},
		colors: {
			text: "#ffffff",
			background: "#17101f",
			muted: "#8b99a4",
		},
		fonts: {
			default: [
				{
					source: "google",
					name: "Inter",
					weight: 400,
				},
				{
					source: "google",
					name: "Inter",
					weight: 700,
				},
			],
		},
	},
);
