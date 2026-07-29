# Thanh Nam Huong Ky React Structure Design

## Goal

Create a React MVP prototype for **Thanh Nam hương ký**, focused on traditional Nam Dinh food products. The main consumer-facing product is **bánh gai**. The producer side contains four separate product modules:

1. Bánh gai
2. Bánh xíu páo
3. Kẹo sìu châu
4. Dồi

The prototype uses frontend mock data only. There is no API and no backend.

## Product Scope

The app has two high-level flows:

- **Consumer flow**: starts with QR scan and authenticates a bánh gai product before showing product profile, certificate, production timeline, quality data, heritage, and usage guidance.
- **Producer flow**: contains four product-scoped producer modules. Each module has the same eight screen types, but its data, metrics, labels, and optional UI sections are isolated from the other products.

Producer modules must not mix product data. For example, `producer/banh-gai` must not show bánh xíu páo, kẹo sìu châu, or dồi information.

## Technical Scope

Use:

- Vite
- React
- TypeScript
- React Router
- Tailwind CSS
- Local mock data

Do not use:

- Backend server
- API integration
- Database
- Authentication service

All product data, QR responses, certificates, sensor readings, alerts, and AI insights are represented as local mock data or local state.

## Recommended Architecture

Use a feature-based hybrid structure:

```txt
src/
  app/
    App.tsx
    router.tsx
    providers/
      AppProviders.tsx

  assets/
    images/
    icons/

  shared/
    components/
      ui/
      layout/
      feedback/
    hooks/
    lib/
    types/
    constants/
    styles/

  features/
    role-selection/
      pages/
      components/

    consumer/
      banh-gai/
        scan/
        auth-result/
        product-profile/
        certificate/
        timeline/
        quality/
        heritage/
        usage-guide/
        data/
        types.ts

    producer/
      shared/
        components/
        layouts/
        screens/
        types.ts

      banh-gai/
        config.ts
        routes.tsx
        data/
        overrides/

      banh-xiu-pao/
        config.ts
        routes.tsx
        data/
        overrides/

      keo-xiu-chau/
        config.ts
        routes.tsx
        data/
        overrides/

      doi/
        config.ts
        routes.tsx
        data/
        overrides/

  mock/
    users.ts
    navigation.ts

  main.tsx
```

## Producer Screens

Each producer product module exposes the same eight screens:

1. Dashboard
2. Batch list
3. Batch detail
4. Production map / process
5. Alerts
6. AI insights
7. Devices / IoT mock
8. QR / serial management

Routes should be product-scoped:

```txt
/producer/banh-gai/dashboard
/producer/banh-gai/batches
/producer/banh-gai/batch/:id
/producer/banh-gai/production-map
/producer/banh-gai/alerts
/producer/banh-gai/ai-insights
/producer/banh-gai/devices
/producer/banh-gai/qr-management
```

The same route pattern repeats for:

- `/producer/banh-xiu-pao/...`
- `/producer/keo-xiu-chau/...`
- `/producer/doi/...`

## Config And Overrides

Producer shared screens should render from product config and product-specific mock data.

Example config shape:

```ts
export type ProducerProductConfig = {
  productKey: string
  productName: string
  theme: {
    primary: string
    accent: string
    background: string
  }
  metrics: Array<{
    key: string
    label: string
    unit?: string
    type: 'temperature' | 'humidity' | 'pressure' | 'time' | 'quality' | 'count'
  }>
  routes: {
    dashboard: string
    batches: string
    productionMap: string
    alerts: string
    aiInsights: string
    devices: string
    qrManagement: string
  }
  overrides?: {
    QualityPanel?: React.ComponentType<any>
    DashboardHero?: React.ComponentType<any>
    BatchDetailExtra?: React.ComponentType<any>
  }
}
```

This allows product-specific UI differences without duplicating entire screens.

Example: bánh gai can include an `Áp suất hấp` metric while other products do not. The shared dashboard renders whatever metrics are declared in the active product config.

## Data Isolation

Each producer product owns its own mock data:

```txt
features/producer/banh-gai/data/
  batches.ts
  sensors.ts
  alerts.ts
  aiInsights.ts
  qrCodes.ts

features/producer/banh-xiu-pao/data/
  batches.ts
  sensors.ts
  alerts.ts
  aiInsights.ts
  qrCodes.ts
```

Shared components must receive data through props. They must not import another product's data directly.

## Consumer Flow

Consumer flow is bánh-gai first:

```txt
Open app
-> Scan QR
-> Authentic product result
-> Product profile
-> Digital certificate
-> Production timeline
-> Quality indicators
-> Thanh Nam hương ký heritage
-> Usage / gifting guidance
```

Consumer routes:

```txt
/consumer/banh-gai/scan
/consumer/banh-gai/auth-result
/consumer/banh-gai/product
/consumer/banh-gai/certificate
/consumer/banh-gai/timeline
/consumer/banh-gai/quality
/consumer/banh-gai/heritage
/consumer/banh-gai/usage-guide
```

## Visual Direction

Use the supplied logo direction:

- Deep brown / earthy brown
- Gold accent
- Premium traditional gifting
- Nam Dinh heritage
- Craft and provenance

Avoid making the UI feel like a cold blue enterprise dashboard unless a specific technical section requires neutral status colors.

## Error And Empty States

Because this is mock-only, include simple frontend states where useful:

- QR not recognized
- Batch not found
- Empty alert list
- Device offline
- Certificate unavailable

These states can be triggered from mock data or static route examples.

## Testing And Verification

Minimum verification after scaffold:

- App starts locally.
- All product-scoped producer routes render.
- Consumer QR flow routes render.
- Product data does not leak across producer modules.
- Bánh gai can show a metric not present in other products.
- Shared producer screens work with all four product configs.

## Implementation Assumptions

- Use Vietnamese display names with accents in UI: `Bánh gai`, `Bánh xíu páo`, `Kẹo sìu châu`, `Dồi`.
- Consumer flow supports bánh gai only in the first MVP.
- The role selection screen should show consumer entry and four producer product entries directly.
- Exact mock values for quality, sensors, alerts, and AI insights can be invented during implementation, as long as each product keeps isolated data and bánh gai includes at least one metric not present in the others.
