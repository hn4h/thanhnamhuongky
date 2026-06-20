export interface ConsumerProduct {
  code: string
  name: string
  grade: string
  batch: string
  producedAt: string
  expiresAt: string
  origin: string
  certificate: string
}

export interface TimelineItem {
  title: string
  date: string
  detail: string
  icon: string
  iotData?: { label: string; value: string }[]
}

export interface QualityMetric {
  label: string
  value: number
  max: number
  unit?: string
}

export interface HeritageChapter {
  title: string
  story: string
  imagePlaceholder: string
}

export interface PairingItem {
  title: string
  description: string
  imagePlaceholder: string
}

export interface FlavorProfile {
  sweet: number     // 0-100
  savory: number    // 0-100
  aroma: number     // 0-100
  bitterness: number // 0-100
  richness: number  // 0-100
}

export interface ConsumerProductData {
  key: string
  product: ConsumerProduct
  checks: string[]
  timeline: TimelineItem[]
  quality: QualityMetric[]
  grade: string
  heritage: HeritageChapter[]
  flavor: FlavorProfile
  pairings: PairingItem[]
  theme: {
    primary: string
    accent: string
    background: string
  }
}
