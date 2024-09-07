'use client'

import {postComposerCreateCastActionMessage} from 'frog/next'

export function CastButton(props: {stickerImageSrc: string}) {
  return <button onClick={() => {
    postComposerCreateCastActionMessage({embeds: [props.stickerImageSrc], text: 'aaa'})
  }}>Cast</button>
}
