import type { ComponentType } from 'react'

export type MetricType = 'temperature' | 'humidity' | 'pressure' | 'time' | 'quality' | 'count'

export type ProducerMetric = {
  key: string
  label: string
  value: string
  unit?: string
  type: MetricType
  status: 'good' | 'warning' | 'critical'
  aiRecommendation?: string
}

export type ProducerBatch = {
  id: string
  name: string
  status: 'ready' | 'in-progress' | 'watch' | 'hold'
  startedAt: string
  expectedAt: string
  quantity: string
  qualityScore: number
  notes: string
}

export type ProducerAlert = {
  id: string
  title: string
  severity: 'low' | 'medium' | 'high'
  message: string
  createdAt: string
}

export type ProducerDevice = {
  id: string
  name: string
  location: string
  status: 'online' | 'warning' | 'offline'
  battery: number
  lastSignal: string
}

export type ProducerAiInsight = {
  id: string
  title: string
  confidence: number
  recommendation: string
}

export type ProducerQrCode = {
  id: string
  batchId: string
  serial: string
  status: 'active' | 'printed' | 'revoked'
}

export type ProducerProductData = {
  metrics: ProducerMetric[]
  batches: ProducerBatch[]
  alerts: ProducerAlert[]
  devices: ProducerDevice[]
  insights: ProducerAiInsight[]
  qrCodes: ProducerQrCode[]
}

export type ProducerProductConfig = {
  key: string
  name: string
  shortName: string
  description: string
  origin: string
  theme: {
    primary: string
    accent: string
    soft: string
    background: string
  }
  routes: {
    dashboard: string
    batches: string
    productionMap: string
    alerts: string
    aiPredict: string
    devices: string
    qrManagement: string
    profile: string
  }
  overrides?: {
    DashboardHero?: ComponentType<{ product: ProducerProductConfig; data: ProducerProductData }>
    BatchDetailExtra?: ComponentType<{ batch: ProducerBatch }>
  }
}

export type ProducerProductModule = ProducerProductConfig & {
  data: ProducerProductData
}
