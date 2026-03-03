import type { EvaProduct } from '../components/ProductCard'

const routeAliases: Record<number, string> = {
  25: 'info-assistant',
}

export const slugifyProductName = (value: string): string => (
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
)

export const getProductRouteSegment = (product: Pick<EvaProduct, 'id' | 'name'>): string => {
  const alias = routeAliases[product.id]
  if (alias) {
    return alias
  }

  return slugifyProductName(product.name)
}

export const findProductByRouteParam = <T extends Pick<EvaProduct, 'id' | 'name'>>(products: T[], routeParam?: string): T | undefined => {
  if (!routeParam) {
    return undefined
  }

  const numericId = Number(routeParam)
  if (!Number.isNaN(numericId)) {
    const matchById = products.find((product) => product.id === numericId)
    if (matchById) {
      return matchById
    }
  }

  const normalizedParam = slugifyProductName(routeParam)

  return products.find((product) => {
    const routeSegment = getProductRouteSegment(product)
    if (slugifyProductName(routeSegment) === normalizedParam) {
      return true
    }

    const nameSlug = slugifyProductName(product.name)
    if (nameSlug === normalizedParam) {
      return true
    }

    if (nameSlug.endsWith('-demo') && nameSlug.replace(/-demo$/, '') === normalizedParam) {
      return true
    }

    return false
  })
}
