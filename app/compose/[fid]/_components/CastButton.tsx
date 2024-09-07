"use client";

import { postComposerCreateCastActionMessage } from "frog/next";

export function CastButton(props: { text: string; stickerImageSrc: string }) {
	return (
		<button
			className="group hover:after:p-2 hover:after:bg-primary hover:after:rounded hover:after:content-['Send_it'] after:absolute transition-all hover:after:flex flex items-center justify-center relative"
			type="button"
			onClick={() => {
				postComposerCreateCastActionMessage({
					embeds: [props.stickerImageSrc],
					text: props.text,
				});
			}}
		>
			<img
				className="transition-all group-hover:opacity-50"
				src={props.stickerImageSrc}
				alt="Sticker"
				height="100%"
				width={600}
			/>
		</button>
	);
}
