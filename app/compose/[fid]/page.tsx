
import { redis } from "@/app/_db/redis"
import { CastButton } from "./_components/CastButton"
import { resolveUser } from "@/app/_actions/resolveUser"

export default async function ComposeForm({params}: {params: {fid: string}}) {
  const user = await resolveUser(Number(params.fid))
  const [_cursor, castHashes] =await redis.sscan(`stickers-of-${params.fid}`, 0)

  return ( 
    <div>
      <h1>Hello {user.display_name}! Here are your stickers:</h1>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: '16px'}}>
        {castHashes.map((castHash) => {
          const stickerImageSrc= `${process.env.APP_URL}/api/cast/${castHash}`
          return <div style={{display: 'flex', flexDirection: 'column', gap: '4px'}}>
            <img src={stickerImageSrc} height={157} width={300}/>
            <CastButton stickerImageSrc={stickerImageSrc} />
          </div>
        })}
      </div>
    </div>
  )
}
