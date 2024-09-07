/** @jsxImportSource frog/jsx */

import { ComponentProps } from "react";
import { Box } from "../ui";

export function Background(props: ComponentProps<typeof Box>) {
	return (
		<Box
			backgroundColor="background"
			grow
			height="100%"
			padding="8"
			width="100%"
			alignVertical="center"
			{...props}
		/>
	);
}
