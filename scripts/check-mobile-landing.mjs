import { chromium } from 'playwright'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const OUT = path.join(process.cwd(), '.playwright-mcp', 'mobile-landing-check')
await mkdir(OUT, { recursive: true })

const SECTIONS = ['top', 'compare', 'offers', 'proof', 'inbound', 'apply']
const VIEWPORTS = [
  { width: 320, height: 900, fullPage: false },
  { width: 390, height: 900, fullPage: true },
  { width: 768, height: 900, fullPage: false },
]

const browser = await chromium.launch()
const results = []
let failed = false

for (const { width, height, fullPage } of VIEWPORTS) {
  const page = await browser.newPage({ viewport: { width, height } })
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' })
  await page.waitForTimeout(800)

  const metrics = await page.evaluate((sections) => {
    const doc = document.documentElement
    const scrollOverflow = doc.scrollWidth > window.innerWidth + 1

    const heroH1 = document.querySelector('#top h1')
    const heroClip =
      heroH1 != null &&
      (() => {
        const r = heroH1.getBoundingClientRect()
        return r.left < -1 || r.right > window.innerWidth + 1
      })()

    const compareH2 = document.querySelector('#compare h2')
    const compareClip =
      compareH2 != null &&
      (() => {
        const r = compareH2.getBoundingClientRect()
        return r.left < -1 || r.right > window.innerWidth + 1
      })()

    const mobileWrapper = document.querySelector('#inbound .md\\:hidden')
    const desktopWrapper = document.querySelector('#inbound .hidden.md\\:block')
    const isMobile = window.innerWidth < 768
    const isVisible = (el) => el != null && el.getBoundingClientRect().height > 0

    const mosaicOk = isMobile
      ? isVisible(mobileWrapper) && !isVisible(desktopWrapper)
      : !isVisible(mobileWrapper) && isVisible(desktopWrapper)

    const scrollMtSections = sections
      .map((id) => {
        const el = document.getElementById(id)
        if (!el) return { id, found: false, hasScrollMt: false }
        const cls = el.className
        return {
          id,
          found: true,
          hasScrollMt: cls.includes('scroll-mt'),
        }
      })
      .filter((s) => s.found)

    return {
      viewport: window.innerWidth,
      scrollWidth: doc.scrollWidth,
      scrollOverflow,
      heroClip,
      compareClip,
      mosaicOk,
      scrollMtSections,
      heroText: heroH1?.textContent?.trim().slice(0, 40),
    }
  }, SECTIONS)

  const entry = { width, ...metrics, fullPage }
  results.push(entry)

  if (metrics.scrollOverflow) {
    console.error(`[${width}px] FAIL: horizontal scroll overflow`)
    failed = true
  }
  if (metrics.heroClip) {
    console.error(`[${width}px] FAIL: hero h1 clipped`)
    failed = true
  }
  if (metrics.compareClip) {
    console.error(`[${width}px] FAIL: compare h2 clipped`)
    failed = true
  }
  if (!metrics.mosaicOk) {
    console.error(`[${width}px] FAIL: inbound mosaic layout wrong for viewport`)
    failed = true
  }

  if (fullPage) {
    await page.screenshot({ path: path.join(OUT, `full-${width}.png`), fullPage: true })
  } else {
    for (const sectionId of SECTIONS) {
      const el = await page.$(`#${sectionId}`)
      if (el) {
        await el.scrollIntoViewIfNeeded()
        await page.waitForTimeout(200)
        await page.screenshot({
          path: path.join(OUT, `${sectionId}-${width}.png`),
        })
      }
    }
  }

  await page.close()
}

await writeFile(path.join(OUT, 'metrics.json'), JSON.stringify(results, null, 2))
console.log(JSON.stringify(results, null, 2))
await browser.close()

if (failed) {
  process.exit(1)
}