# Thanh Nam Huong Ky Codebase Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold a Vite React TypeScript app with the feature-based hybrid structure from the approved Thanh Nam hương ký spec.

**Architecture:** The codebase uses shared producer screens driven by product-specific configs and isolated mock data. Consumer MVP is scoped to bánh gai, while producer routes are generated for bánh gai, bánh xíu páo, kẹo sìu châu, and dồi.

**Tech Stack:** Vite, React, TypeScript, React Router, Tailwind CSS, local mock data.

---

### Task 1: Scaffold Tooling

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `vite.config.ts`
- Create: `tailwind.config.ts`
- Create: `postcss.config.js`
- Create: `src/vite-env.d.ts`

- [ ] Create Vite/React/TypeScript project files and dependency scripts.
- [ ] Add Tailwind config that scans `index.html` and `src/**/*.{ts,tsx}`.
- [ ] Add strict TypeScript config suitable for React.

### Task 2: App Shell And Routing

**Files:**
- Create: `src/main.tsx`
- Create: `src/app/App.tsx`
- Create: `src/app/router.tsx`
- Create: `src/app/providers/AppProviders.tsx`
- Create: `src/shared/styles/index.css`
- Create: `src/shared/components/layout/AppFrame.tsx`
- Create: `src/features/role-selection/pages/RoleSelectionPage.tsx`

- [ ] Create React root.
- [ ] Create browser router.
- [ ] Add role selection route at `/`.
- [ ] Add base visual theme using brown and gold brand direction.

### Task 3: Producer Shared Types, Configs, And Mock Data

**Files:**
- Create: `src/features/producer/shared/types.ts`
- Create: `src/features/producer/shared/productRegistry.ts`
- Create: `src/features/producer/banh-gai/config.ts`
- Create: `src/features/producer/banh-gai/data/index.ts`
- Create: `src/features/producer/banh-xiu-pao/config.ts`
- Create: `src/features/producer/banh-xiu-pao/data/index.ts`
- Create: `src/features/producer/keo-xiu-chau/config.ts`
- Create: `src/features/producer/keo-xiu-chau/data/index.ts`
- Create: `src/features/producer/doi/config.ts`
- Create: `src/features/producer/doi/data/index.ts`

- [ ] Define producer product config, metric, batch, alert, device, QR, and AI insight types.
- [ ] Create isolated product configs and mock datasets.
- [ ] Ensure bánh gai has an `Áp suất hấp` metric that other products do not have.

### Task 4: Producer Shared Screens

**Files:**
- Create: `src/features/producer/shared/components/MetricCard.tsx`
- Create: `src/features/producer/shared/components/ProducerNav.tsx`
- Create: `src/features/producer/shared/components/StatusBadge.tsx`
- Create: `src/features/producer/shared/screens/ProducerDashboard.tsx`
- Create: `src/features/producer/shared/screens/ProducerBatches.tsx`
- Create: `src/features/producer/shared/screens/ProducerBatchDetail.tsx`
- Create: `src/features/producer/shared/screens/ProducerProductionMap.tsx`
- Create: `src/features/producer/shared/screens/ProducerAlerts.tsx`
- Create: `src/features/producer/shared/screens/ProducerAiInsights.tsx`
- Create: `src/features/producer/shared/screens/ProducerDevices.tsx`
- Create: `src/features/producer/shared/screens/ProducerQrManagement.tsx`

- [ ] Implement eight reusable producer screens.
- [ ] Render all metrics and content from the active product config/data.
- [ ] Keep screen components product-agnostic.

### Task 5: Producer Routes

**Files:**
- Modify: `src/app/router.tsx`
- Create: `src/features/producer/shared/createProducerRoutes.tsx`

- [ ] Generate eight routes for each producer product.
- [ ] Use product key in the route path.
- [ ] Route batch detail by `batch/:id`.

### Task 6: Consumer Bánh Gai Flow

**Files:**
- Create: `src/features/consumer/banh-gai/data/index.ts`
- Create: `src/features/consumer/banh-gai/scan/ScanPage.tsx`
- Create: `src/features/consumer/banh-gai/auth-result/AuthResultPage.tsx`
- Create: `src/features/consumer/banh-gai/product-profile/ProductProfilePage.tsx`
- Create: `src/features/consumer/banh-gai/certificate/CertificatePage.tsx`
- Create: `src/features/consumer/banh-gai/timeline/TimelinePage.tsx`
- Create: `src/features/consumer/banh-gai/quality/QualityPage.tsx`
- Create: `src/features/consumer/banh-gai/heritage/HeritagePage.tsx`
- Create: `src/features/consumer/banh-gai/usage-guide/UsageGuidePage.tsx`
- Modify: `src/app/router.tsx`

- [ ] Implement QR-first consumer flow for bánh gai.
- [ ] Add routes for all eight consumer screens.
- [ ] Use local mock data only.

### Task 7: Verification

**Files:**
- Modify as needed only if verification finds compile errors.

- [ ] Run `npm.cmd install` if dependencies are not installed.
- [ ] Run `npm.cmd run build`.
- [ ] Run `npm.cmd run dev` or provide the command if a long-running server is not started.
- [ ] Verify generated producer paths exist for all four products.
