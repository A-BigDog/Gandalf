/**
 * PNG pixel statistics — the "pixel eyes" fallback when no visual model is
 * available. Decodes a PNG (RGBA, 8-bit, non-interlaced) with zlib and
 * reports the dominant colors, brightness histogram, and palette checks.
 * Run: node scripts/png-stats.mjs <image.png>
 */
import { readFileSync } from 'node:fs'
import { inflateSync } from 'node:zlib'

const file = process.argv[2]
if (!file) { console.error('usage: node png-stats.mjs <image.png>'); process.exit(1) }
const buf = readFileSync(file)

// --- PNG header / IHDR ---
if (buf.readUInt32BE(0) !== 0x89504e47) { console.error('not a png'); process.exit(1) }
const width = buf.readUInt32BE(16)
const height = buf.readUInt32BE(20)
const bitDepth = buf[24]
const colorType = buf[25]
if (bitDepth !== 8 || (colorType !== 6 && colorType !== 2)) {
  console.error(`unsupported png: bitDepth=${bitDepth} colorType=${colorType}`)
  process.exit(1)
}

// --- Collect IDAT chunks ---
const idat = []
let pos = 8
while (pos < buf.length) {
  const len = buf.readUInt32BE(pos)
  const type = buf.toString('ascii', pos + 4, pos + 8)
  if (type === 'IDAT') idat.push(buf.subarray(pos + 8, pos + 8 + len))
  if (type === 'IEND') break
  pos += 12 + len
}
const raw = inflateSync(Buffer.concat(idat))

// --- Undo per-row filters ---
const bpp = colorType === 6 ? 4 : 3
const stride = width * bpp
const pixels = new Uint8Array(width * height * 4)
let off = 0
const prev = new Uint8Array(stride)
for (let y = 0; y < height; y++) {
  const filter = raw[off++]
  const row = raw.subarray(off, off + stride)
  const cur = new Uint8Array(stride)
  for (let x = 0; x < stride; x++) {
    const a = x >= bpp ? cur[x - bpp] : 0
    const b = prev[x]
    const c = x >= bpp ? prev[x - bpp] : 0
    let v = row[x]
    switch (filter) {
      case 1: v = (v + a) & 0xff; break
      case 2: v = (v + b) & 0xff; break
      case 3: v = (v + ((a + b) >> 1)) & 0xff; break
      case 4: {
        const p = a + b - c
        const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c)
        const pr = pa <= pb && pa <= pc ? a : pb <= pc ? b : c
        v = (v + pr) & 0xff; break
      }
    }
    cur[x] = v
  }
  for (let x = 0; x < stride; x += bpp) {
    const d = y * stride + x
    pixels[d] = cur[x]; pixels[d + 1] = cur[x + 1]; pixels[d + 2] = cur[x + 2]
    pixels[d + 3] = colorType === 6 ? cur[x + 3] : 255
  }
  prev.set(cur)
  off += stride
}

// --- Statistics ---
const N = width * height
const freq = new Map()
let brightSum = 0, minLum = 1, maxLum = 0
const buckets = new Array(10).fill(0)
const gold = [0xe8, 0xb0, 0x4c]
let goldNear = 0, darkPct = 0, lightPct = 0

const key = (r, g, b) => ((r >> 4) << 8) | ((g >> 4) << 4) | (b >> 4) // 4-bit quantize for top colors
for (let i = 0; i < N; i++) {
  const r = pixels[i * 4], g = pixels[i * 4 + 1], b = pixels[i * 4 + 2]
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b
  brightSum += lum
  if (lum < minLum) minLum = lum
  if (lum > maxLum) maxLum = lum
  buckets[Math.min(9, Math.floor(lum / 25.6))]++
  if (lum < 64) darkPct++
  if (lum > 200) lightPct++
  if (Math.abs(r - gold[0]) < 40 && Math.abs(g - gold[1]) < 40 && Math.abs(b - gold[2]) < 40) goldNear++
  const k = key(r, g, b)
  freq.set(k, (freq.get(k) || 0) + 1)
}

const top = [...freq.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10)
  .map(([k, c]) => { const r = (k >> 8) << 4, g = ((k >> 4) & 0xf) << 4, b = (k & 0xf) << 4; return `#${[r, g, b].map(v => v.toString(16).padStart(2, '0')).join('')} ${(c / N * 100).toFixed(1)}%` })

console.log(`size: ${width}x${height} (${N} px), avgLum: ${(brightSum / N).toFixed(0)}/255, lumRange: ${minLum.toFixed(0)}-${maxLum.toFixed(0)}`)
console.log(`dark(<64): ${(darkPct / N * 100).toFixed(1)}%  light(>200): ${(lightPct / N * 100).toFixed(1)}%  goldNear(#c9a35c): ${(goldNear / N * 100).toFixed(2)}%`)
console.log('brightness buckets (0-255, step 25.6):', buckets.map((v, i) => `${i * 25.6 | 0}:${(v / N * 100).toFixed(0)}%`).join(' '))
console.log('top colors:')
for (const t of top) console.log('  ' + t)
