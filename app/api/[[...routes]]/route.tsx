/** @jsxImportSource frog/jsx */

import { Frog } from 'frog'
import { devtools } from 'frog/dev'
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'
import { redis } from '../../_db/redis'
import { Box, vars, Image, Text, HStack, VStack, Divider } from './ui'
import { resolveCast } from '@/app/_actions/resolveCast'

const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  origin: process.env.APP_URL,
  ui: {
    vars
  },
  imageOptions: {
    height: 314,
    width: 600
  },
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
  title: 'Cast Stickers',
})

// Uncomment to use Edge Runtime
// export const runtime = 'edge'
// 
//https://warpcast.com/~/add-cast-action?url=https://6599-91-227-182-2.ngrok-free.app/api/action
app.castAction('/action', async (c) => {
  await redis.sadd(`stickers-of-${c.actionData.fid}`, c.actionData.castId.hash)
  return c.message({message:'You saved the cast as a sticker!'})
}, {
    name: 'Cast Stickers Action',
    description: 'You can save casts as stickers!',
    icon: 'file'
  })

app.composerAction('/compose',(c) => {
  return c.res({title: 'Cast Stickers', url: `${process.env.APP_URL}/compose/${c.actionData.fid}`})
},{
    name: 'Cast Stickers',
    description: 'Add cast stickers to your collection and use them',
    icon: 'file',
    imageUrl: ''
  })

app.image('/cast/:hash', async (c) => {
  const cast = await resolveCast(c.req.param('hash'))
  return c.res({
    headers: {
      'Content-Type': 'image/png',
    },
    image: (
      <Box
        grow
        height="100%"
        width="100%"
        alignVertical="center"
        backgroundColor="background"
      >
        <VStack grow gap="8">
          <HStack padding="8" width="100%" gap="8" alignItems='center'>
            <Box borderRadius="256" borderWidth="1" borderColor="muted" overflow='hidden' minHeight={{custom: '64px'}} minWidth={{custom: '64px'}} maxWidth={{custom: '64px'}} maxHeight={{custom: '64px'}}>
              <Image src={cast.author.pfp_url?.replaceAll('rectcrop', 'squarecrop') ?? 'https://wrpcd.net/cdn-cgi/image/anim=false,fit=contain,f=auto,w=336/https%3A%2F%2Fi.imgur.com%2F7SIMuyb.jpg'}/>
            </Box>

            <VStack>
              <Text size={{custom: '24px'}} weight='700'>{cast.author.display_name}</Text>
              <Text size={{custom: '24px'}} color="muted">@{cast.author.username}</Text>
            </VStack>
          </HStack>
          <Divider color="muted"/>
          <Box padding="8" overflow='hidden' grow maxHeight={{custom: '220px'}} lineClamp={1}>
            <Text size={{custom: '24px'}}>
              {cast.text.split('\n').map(content => <>{content}<br/></>)}
            </Text>
          </Box>
        </VStack>
      </Box>
    ),
  })
})

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)

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
