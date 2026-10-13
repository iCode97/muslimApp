/**
 * Compresses server-rendered HTML (brotli / gzip).
 *
 * Static build assets are pre-compressed by Nitro (`compressPublicAssets`), but SSR HTML
 * is produced per request and the bare Node server (see Dockerfile) does not compress it.
 * A reverse proxy that already compresses is unaffected: it passes `Content-Encoding` through.
 */
import { brotliCompress, constants, gzip } from 'node:zlib'
import { promisify } from 'node:util'
import { getRequestHeader } from 'h3'

const brotli = promisify(brotliCompress)
const gz = promisify(gzip)
const MIN_BYTES = 1024

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:response', async (response, { event }) => {
    const body = response.body
    if (typeof body !== 'string' || body.length < MIN_BYTES) return
    const type = String(response.headers?.['content-type'] ?? '')
    if (!type.includes('text/html')) return
    if (response.headers?.['content-encoding']) return

    const accepted = String(getRequestHeader(event, 'accept-encoding') ?? '')
    const input = Buffer.from(body, 'utf8')
    let encoded: Buffer | null = null
    let encoding = ''
    try {
      if (/\bbr\b/.test(accepted)) {
        encoded = await brotli(input, { params: { [constants.BROTLI_PARAM_QUALITY]: 4 } })
        encoding = 'br'
      }
      else if (/\bgzip\b/.test(accepted)) {
        encoded = await gz(input)
        encoding = 'gzip'
      }
    }
    catch {
      return // fall back to the uncompressed body
    }
    if (!encoded) return

    response.body = encoded as unknown as string
    response.headers = {
      ...response.headers,
      'content-encoding': encoding,
      'vary': 'Accept-Encoding',
    }
  })
})
