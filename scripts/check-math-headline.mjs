import { chromium } from 'playwright'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const OUT = path.join(process.cwd(), '.playwright-mcp', 'math-headline-check')

await mkdir(OUT, { recursive: true })

const browser = await chromium.launch()
const results = []

for (const width of [1280, 768, 390]) {
  const page = await browser.newPage({ viewport: { width, height: 900 } })
  await page.goto('http://localhost:3000/#compare', { waitUntil: 'networkidle' })
  await page.waitForTimeout(600)

  const metrics = await page.evaluate(() => {
    const h2 = document.querySelector('#compare h2')
    const inner = document.querySelector('#compare > div > div')
    const section = document.querySelector('#compare')
    if (!h2 || !section) return { error: 'missing elements' }

    const hr = h2.getBoundingClientRect()
    const sr = section.getBoundingClientRect()
    const ir = inner?.getBoundingClientRect()

    const center = (r) => r.left + r.width / 2
    const h2Center = center(hr)
    const sectionCenter = center(sr)
    const innerCenter = ir ? center(ir) : null

    return {
      viewport: window.innerWidth,
      h2: { left: hr.left, width: hr.width, center: h2Center },
      section: { left: sr.left, width: sr.width, center: sectionCenter },
      inner: ir
        ? { left: ir.left, width: ir.width, center: innerCenter, offset: h2Center - innerCenter }
        : null,
      offsetFromSection: h2Center - sectionCenter,
      centeredOnSection: Math.abs(h2Center - sectionCenter) <= 2,
      text: h2.textContent?.trim(),
      overflows: hr.width > (ir?.width ?? sr.width),
    }
  })

  results.push({ width, ...metrics })
  await page.screenshot({ path: path.join(OUT, `headline-${width}.png`) })
  await page.close()
}

await writeFile(path.join(OUT, 'metrics.json'), JSON.stringify(results, null, 2))
console.log(JSON.stringify(results, null, 2))
await browser.close()