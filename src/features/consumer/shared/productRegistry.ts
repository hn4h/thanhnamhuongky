import { consumerProductsData } from './data/consumerData'
import type { ConsumerProductData } from './types'

export const consumerProducts: ConsumerProductData[] = Object.values(consumerProductsData)

export function findConsumerProduct(productKey: string | undefined): ConsumerProductData | undefined {
  if (!productKey) return undefined
  return consumerProductsData[productKey]
}
