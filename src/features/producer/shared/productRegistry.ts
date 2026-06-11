import { banhGaiModule } from '../banh-gai/config'
import { banhXiuPaoModule } from '../banh-xiu-pao/config'
import { doiModule } from '../doi/config'
import { keoXiuChauModule } from '../keo-xiu-chau/config'
import type { ProducerProductModule } from './types'

export const producerProducts: ProducerProductModule[] = [
  banhGaiModule,
  banhXiuPaoModule,
  keoXiuChauModule,
  doiModule,
]

export function findProducerProduct(productKey: string | undefined) {
  return producerProducts.find((product) => product.key === productKey)
}
