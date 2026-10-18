// Captures real screenshots of Jerry's live sites into /public/projects.
// Usage:  npx playwright install chromium   (once)   then   npm run screenshots
import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'

const sites = {
  orderflow: 'https://orderflowlp.vercel.app/',
  sharpwork: 'https://sharp-work-landing-page.vercel.app',
  'emeritus-tutor': 'https://emeritus-tutor.vercel.app',
  'ibetc-debate': 'https://ibetcdebateregistration.vercel.app/',
  'jso-design': 'https://jsodesign.netlify.app',
}

await mkdir('public/projects', { recursive: true })
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } })

for (const [slug, url] of Object.entries(sites)) {
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 })
    await page.waitForTimeout(1500)
    await page.screenshot({ path: `public/projects/${slug}.jpg`, type: 'jpeg', quality: 82 })
    console.log('captured', slug)
  } catch (err) {
    console.warn('FAILED', slug, err.message)
  }
}
await browser.close()
