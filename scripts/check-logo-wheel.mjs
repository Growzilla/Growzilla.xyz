import { chromium } from 'playwright'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const OUT = path.join(process.cwd(), '.playwright-mcp', 'logo-wheel-check')
await mkdir(OUT, { recursive: true })

const browser = await chromium.launch()
const results = []

for (const width of [320, 390, 640, 768, 1280]) {
  const page = await browser.newPage({ viewport: { width, height: 900 } })
  await page.goto('http://localhost:3000/#top', { waitUntil: 'networkidle' })
  await page.waitForTimeout(800)

  const metrics = await page.evaluate(() => {
    const doc = document.documentElement
    const names = ['Instagram', 'Facebook', 'TikTok', 'Meta', 'CapCut']
    const labels = names.map((name) => {
      const el = Array.from(document.querySelectorAll('span')).find(
        (s) => s.textContent?.trim() === name,
      )
      if (!el) return { name, visible: false }
      const r = el.getBoundingClientRect()
      return {
        name,
        visible: r.width > 0 && r.height > 0 && r.left >= 0 && r.right <= window.innerWidth,
      }
    })
    return {
      viewport: window.innerWidth,
      scrollOverflow: doc.scrollWidth > window.innerWidth + 1,
      scrollWidth: doc.scrollWidth,
      labels,
      allLabelsVisible: labels.every((l) => l.visible),
    }
  })

  results.push({ width, ...metrics })
  await page.screenshot({ path: path.join(OUT, `wheel-${width}.png`) })
  await page.close()
}

await writeFile(path.join(OUT, 'metrics.json'), JSON.stringify(results, null, 2))
console.log(JSON.stringify(results, null, 2))
await browser.close()