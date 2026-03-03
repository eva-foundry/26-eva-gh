import { copyFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const distDir = resolve(here, '..', 'dist')
const repoRoot = resolve(here, '..')
const source = resolve(distDir, 'index.html')
const destination = resolve(distDir, '404.html')
const productsJsonPath = resolve(repoRoot, 'src', 'data', 'eva-suite-products.json')

const routeAliases = {
  25: 'info-assistant',
}

const slugify = (value) => (
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
)

if (!existsSync(source)) {
  console.warn('[spa-fallback] dist/index.html not found; skipping 404.html creation')
  process.exit(0)
}

copyFileSync(source, destination)
console.log('[spa-fallback] Copied dist/index.html -> dist/404.html')

if (existsSync(productsJsonPath)) {
  try {
    const raw = readFileSync(productsJsonPath, 'utf8')
    const data = JSON.parse(raw)
    const products = data?.eva_suite?.products ?? []

    products.forEach((product) => {
      if (typeof product?.name !== 'string' || typeof product?.id !== 'number') {
        return
      }

      const slugSet = new Set()
      const alias = routeAliases[product.id]
      if (alias) {
        slugSet.add(alias)
      }

      const nameSlug = slugify(product.name)
      if (nameSlug) {
        slugSet.add(nameSlug)
        if (nameSlug.endsWith('-demo')) {
          slugSet.add(nameSlug.replace(/-demo$/, ''))
        }
      }

      slugSet.forEach((slug) => {
        if (!slug) {
          return
        }
        const outDir = resolve(distDir, 'products', slug)
        mkdirSync(outDir, { recursive: true })
        copyFileSync(source, resolve(outDir, 'index.html'))
        console.log(`[spa-fallback] Created /products/${slug}/index.html fallback`)
      })
    })
  } catch (error) {
    console.warn('[spa-fallback] Could not hydrate product entrypoints:', error.message)
  }
}
