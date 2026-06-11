# Claude Design UI Upgrade for Thành Nam Hương Ký

## Goal

Upgrade the UI of the existing Thành Nam Hương Ký MVP using Claude Design principles while maintaining the heritage brown/gold brand identity. Focus on mobile-first experience for both consumer and producer flows, with improved typography, spacing, components, and interactions.

## Design Approach

**Refined Heritage:** Balance modern UX patterns with traditional craft aesthetics. Honor the heritage while feeling contemporary, maintaining strong brand identity.

## Brand Colors

### Primary Palette
- **Dark Brown:** `#4A2D1E` (primary brand, buttons, headers)
- **Antique Gold:** `#C0965A` (accents, CTAs, highlights)

### Extended Palette

**Lighter Browns:**
- `#6F4B35` (secondary elements, borders)
- `#8A6238` (tertiary text, subtle accents)
- `#7A3A18` (gradient stops)

**Parchment/Neutrals:**
- `#FDF4E7` (light background, cards on dark)
- `#F5EBD8` (subtle background tint)
- `#E6D1AB` (medium parchment, disabled states)
- `#E0C69B` (borders, dividers)

**Dark Backgrounds:**
- `#1A0A00` (deepest brown for splash/hero sections)
- `#2A1810` (secondary dark brown, primary text)

**Functional Colors:**
- **Success/Ready:** `#4A7C59` (muted green)
- **Warning:** `#D4841C` (amber/orange)
- **Critical/High Alert:** `#B8452B` (muted red-brown)
- **Info:** `#6B8CAE` (muted blue-gray)

### Usage Patterns
- Main app background: `#FDF4E7` (parchment)
- Card backgrounds: `#FFFFFF` with border `#E0C69B`
- Dark mode sections: `#4A2D1E` background with `#FDF4E7` text
- Interactive elements: `#C0965A` (gold) for primary actions
- Premium buttons: `linear-gradient(135deg, #4A2D1E 0%, #7A3A18 100%)`

## Typography

### Font Stack
- **Headings:** `ui-serif, Georgia, Cambria, "Times New Roman", Times, serif`
- **Body:** `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`
- **Numbers/Metrics:** Enable `font-variant-numeric: tabular-nums`

### Type Scale (Mobile-First)
- **Display:** 32px / 1.15 line-height, 700 weight (page heroes)
- **H1:** 24px / 1.25, 700 weight (section titles)
- **H2:** 20px / 1.3, 700 weight (card headers)
- **H3:** 17px / 1.35, 600 weight (sub-headers)
- **Body:** 15px / 1.6, 400 weight (main content)
- **Small:** 13px / 1.5, 400 weight (supporting text)
- **Tiny:** 11px / 1.4, 600 weight (labels, captions)
- **Metric Numbers:** 48px / 1.1, 700 weight (dashboard stats)

### Font Weights
- Regular: 400
- Medium: 500 (important labels)
- Semibold: 600 (buttons, card titles)
- Bold: 700 (numbers, headings)

### Text Color Hierarchy
- Primary text: `#2A1810` (very dark brown)
- Secondary text: `#6F4B35` (medium brown)
- Tertiary text: `rgba(74, 45, 30, 0.6)` (60% opacity)
- On dark backgrounds: `#FDF4E7` (parchment)

## Spacing & Layout

### Spacing Scale (4px base unit)
- `xs`: 4px
- `sm`: 8px
- `md`: 12px
- `base`: 16px
- `lg`: 20px
- `xl`: 24px
- `2xl`: 32px
- `3xl`: 40px
- `4xl`: 48px
- `5xl`: 64px

### Container & Padding
- Mobile max-width: 430px (centered with shadow)
- Mobile horizontal padding: 24px
- Card padding: 20px
- Section spacing: 16-20px between cards
- Page top/bottom padding: 24-32px

### Border Radius
- Small (badges): 6px
- Medium (buttons): 8px
- Large (cards): 12px
- XL (featured cards): 16px
- Icon containers: 12px
- Pills (status badges): 24px

## Component Specifications

### Metric Cards
```
Background: #FFFFFF
Border: 1px solid #E0C69B
Border-radius: 12px
Padding: 20px
Shadow: 0 1px 3px rgba(74, 45, 30, 0.08)

Structure:
- Icon: 16x16px, color #C0965A (top-left)
- Label: 11px, 600 weight, uppercase, tracking 0.12em, color #8A6238
- Value: 48px, 700 weight, color #2A1810
- Unit: 13px, 400 weight, color #6F4B35
- Trend (optional): small arrow + percentage, color based on direction
```

### Status Badges
```
Border-radius: 24px (pill)
Padding: 8px vertical, 12px horizontal
Font: 11px, 600 weight, uppercase
Display: inline-flex, align-items center, gap 4px

Variants:
- Ready: bg #4A7C59/10, text #4A7C59, border 1px #4A7C59/20
- Warning: bg #D4841C/10, text #D4841C, border 1px #D4841C/20
- Critical: bg #B8452B/10, text #B8452B, border 1px #B8452B/20
- Info: bg #C0965A/10, text #C0965A, border 1px #C0965A/20
```

### Buttons

**Primary (Gold):**
```
Background: #C0965A
Color: #4A2D1E
Padding: 12px 20px
Border-radius: 8px
Font: 15px, 600 weight
Shadow: 0 2px 8px rgba(192, 150, 90, 0.25)

Hover: background #B38650
Active: transform scale(0.98)
```

**Secondary (Brown Gradient):**
```
Background: linear-gradient(135deg, #4A2D1E 0%, #7A3A18 100%)
Color: #FDF4E7
Padding: 12px 20px
Border-radius: 8px
Font: 15px, 600 weight
Shadow: 0 4px 16px rgba(74, 45, 30, 0.25)

Active: transform scale(0.98)
```

**Tertiary (Outline):**
```
Background: transparent
Border: 1.5px solid #E0C69B
Color: #4A2D1E
Padding: 12px 20px
Border-radius: 8px
Font: 15px, 600 weight

Hover: background #FDF4E7
Active: transform scale(0.98)
```

### Cards
```
Background: #FFFFFF
Border: 1px solid #E0C69B
Border-radius: 12px
Padding: 20px
Shadow: 0 2px 8px rgba(74, 45, 30, 0.06)

Hover (if interactive):
Shadow: 0 4px 16px rgba(74, 45, 30, 0.12)
Transition: 200ms ease
```

### List Items (Batches, Alerts)
```
Background: #FFFFFF
Border: 1px solid #E0C69B
Border-radius: 12px
Padding: 16px
Min-height: 44px (tap target)
Gap between items: 16px

Include:
- Left accent border: 4px width, color based on status
- Status badge (top-right)
- Title: 17px, 600 weight
- Subtitle: 13px, color #6F4B35
- Right chevron icon: 20px, color #6F4B35/60
```

### Navigation

**Bottom Tab Bar (Consumer Mobile):**
```
Height: 64px
Background: #FFFFFF
Border-top: 1px solid #E0C69B
Shadow: 0 -2px 8px rgba(74, 45, 30, 0.06)
Padding: 8px 0

Items:
- Icon: 24x24px
- Label: 11px, 500 weight
- Active color: #C0965A
- Inactive color: #8A6238
- Min tap target: 44x44px
```

**Top Header (Producer):**
```
Height: 60px
Background: #FFFFFF
Border-bottom: 1px solid #E0C69B
Padding: 0 24px
Sticky: top 0

Left: Product name + icon
Right: Notification bell (24x24px icon, tap target 44x44px)
```

## Screen Layouts

### Producer Dashboard
```
Structure:
1. Sticky header (60px)
   - Product name + icon (left)
   - Notification bell (right)

2. Optional hero section
   - Quick summary card with gradient background
   - Key highlight metric

3. Metrics grid
   - 2 columns on mobile
   - 3-4 columns on tablet+
   - 16px gap

4. Recent alerts section
   - Full-width card
   - Top alert displayed prominently
   - Link to view all alerts

5. Bottom navigation (mobile)
   - Dashboard, Batches, Alerts, More icons
```

### Producer Batch List
```
Structure:
1. Sticky search/filter bar
   - Search input (48px height)
   - Filter button (icon only)

2. Status filter chips
   - Horizontal scroll
   - Pills: All, Ready, In Progress, Delayed
   - Active chip: gold background

3. Batch list items
   - Batch name (17px bold)
   - Status badge (top-right)
   - 2-3 key metrics (small icons + values)
   - Date/time (13px, secondary color)
   - Right chevron
   - Left accent border (status color)

4. Empty state (if no batches)
   - Icon + message
   - CTA button
```

### Producer Batch Detail
```
Structure:
1. Hero card
   - Batch name (24px)
   - Large status badge
   - Key image or placeholder
   - Gradient background

2. Tabs
   - Overview, Timeline, Quality, Devices
   - Active tab: gold underline
   - Sticky below hero

3. Tab content
   - Mixed metric cards
   - Data lists
   - Charts (if applicable)

4. Sticky footer
   - Primary action button (e.g., "Đánh dấu sẵn sàng")
   - Full-width, gold background
```

### Consumer Shell
```
Structure:
1. Full-bleed header
   - Background image or gradient
   - Back button (top-left, 44x44 tap target)
   - Title (24px, centered or left-aligned)

2. Content area
   - Parchment background (#FDF4E7)
   - White content cards
   - Floating appearance with shadows
   - 24px horizontal padding

3. Bottom CTA (if needed)
   - Sticky on scroll
   - Gold button, full-width (with padding)
```

### Consumer QR Scan
```
Structure:
1. Dark background (#4A2D1E)
2. Centered QR placeholder
   - Dashed border (gold)
   - 200px square on mobile
   - QR icon (92px, gold)

3. Instructions text
   - Above placeholder
   - 15px, parchment color
   - Centered

4. Demo button
   - Below placeholder
   - Gold button with dark text
   - "Quét hộp [batch-id]"
```

### Consumer Product Profile
```
Structure:
1. Hero image
   - Full-width
   - 240px height on mobile
   - Gradient overlay at bottom

2. Product header
   - Product name (32px serif, bold)
   - Certification badge (prominent, gold)

3. Info cards section
   - White cards with borders
   - Icon + label + value
   - 2 columns grid, 12px gap

4. Navigation cards
   - To Certificate, Timeline, Quality, Heritage, Usage Guide
   - Full-width cards
   - Icon + title + description + chevron
   - 16px gap between cards
```

## Interactions & Animations

### Transitions
- Page transitions: 300ms ease-out
- Card hover: 200ms ease
- Button press: 100ms ease, scale(0.98)
- Modal/sheet: slide-up 250ms cubic-bezier(0.4, 0, 0.2, 1)

### Micro-interactions
- Loading states: Gold shimmer effect on skeleton screens
- Pull-to-refresh: Brown spinner with gold accent
- Success feedback: Scale + green check icon, 300ms
- Tap feedback: Opacity 0.7, 100ms on cards
- Scroll reveal: Cards fade in with slight upward motion (optional enhancement)

### Progressive Enhancement
- Smooth scrolling enabled
- `prefers-reduced-motion` support for accessibility
- Skeleton screens while loading data
- Optimistic UI updates where possible
- Touch feedback with `active` states

## Implementation Notes

### Tailwind CSS Configuration

Update `tailwind.config.js` to include the Claude Design system:

```js
export default {
  theme: {
    extend: {
      colors: {
        'dark-brown': '#4A2D1E',
        'antique-gold': '#C0965A',
        'brown-light': '#6F4B35',
        'brown-tertiary': '#8A6238',
        'brown-gradient': '#7A3A18',
        'parchment': '#FDF4E7',
        'parchment-tint': '#F5EBD8',
        'parchment-medium': '#E6D1AB',
        'parchment-border': '#E0C69B',
        'dark-bg': '#1A0A00',
        'dark-text': '#2A1810',
        'success': '#4A7C59',
        'warning': '#D4841C',
        'critical': '#B8452B',
        'info': '#6B8CAE',
      },
      fontFamily: {
        serif: ['ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      fontSize: {
        'display': ['32px', { lineHeight: '1.15', fontWeight: '700' }],
        'metric': ['48px', { lineHeight: '1.1', fontWeight: '700' }],
      },
      spacing: {
        '18': '4.5rem', // 72px
      },
      borderRadius: {
        'card': '12px',
        'button': '8px',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(74, 45, 30, 0.06)',
        'card-hover': '0 4px 16px rgba(74, 45, 30, 0.12)',
        'metric': '0 1px 3px rgba(74, 45, 30, 0.08)',
        'gold-glow': '0 0 40px rgba(192, 150, 90, 0.34)',
      },
    },
  },
}
```

### Component Library Structure

Create reusable components in `src/shared/components/claude-design/`:

- `Button.tsx` (Primary, Secondary, Tertiary variants)
- `Card.tsx` (with hover and shadow variants)
- `MetricCard.tsx` (upgraded version)
- `StatusBadge.tsx` (upgraded version)
- `ListItem.tsx` (for batches, alerts)
- `Header.tsx` (producer top bar)
- `TabBar.tsx` (consumer bottom nav)
- `Tab.tsx` (content tabs)
- `HeroSection.tsx` (consumer pages)

### Mobile-First Responsive Breakpoints

```css
/* Mobile: default (0-639px) */
/* Tablet: sm (640px+) */
/* Desktop: lg (1024px+) */
/* Wide: xl (1280px+) */
```

Focus implementation on mobile (320-430px width), then enhance for tablet and desktop.

### Accessibility Requirements

- All interactive elements: min 44x44px tap targets
- Color contrast: WCAG AA minimum (4.5:1 for text, 3:1 for UI)
- Focus indicators: 2px gold outline, 2px offset
- Screen reader labels for icon-only buttons
- Semantic HTML (proper heading hierarchy)
- Keyboard navigation support
- `prefers-reduced-motion` respect

### Performance Considerations

- Lazy load images (consumer product images)
- Use CSS transforms for animations (hardware-accelerated)
- Minimize re-renders with proper React memoization
- Keep bundle size small (no heavy icon libraries, use lucide-react selectively)
- Optimize shadow rendering (use single-level shadows)

## Upgrade Scope

### Phase 1: Core Components & Producer Dashboard
1. Update Tailwind config with Claude Design tokens
2. Create component library in `src/shared/components/claude-design/`
3. Upgrade `ProducerDashboard.tsx`:
   - New MetricCard design
   - Improved layout and spacing
   - Enhanced status badges
   - Refined typography
4. Upgrade `ProducerScreenShell.tsx`:
   - New header design
   - Better navigation
5. Update `ProducerNav.tsx` with new styles

### Phase 2: Producer Screens
1. Upgrade `ProducerBatches.tsx`:
   - New list item design
   - Search/filter bar
   - Status chips
2. Upgrade `ProducerBatchDetail.tsx`:
   - Hero section
   - Tab design
   - Sticky footer
3. Upgrade `ProducerAlerts.tsx`:
   - New alert card design
   - Priority indicators
4. Upgrade remaining producer screens:
   - `ProducerAiInsights.tsx`
   - `ProducerDevices.tsx`
   - `ProducerProductionMap.tsx`
   - `ProducerQrManagement.tsx`

### Phase 3: Consumer Flow
1. Upgrade `ConsumerShell.tsx`:
   - New header design
   - Refined content area
2. Upgrade `ScanPage.tsx`:
   - Dark background
   - Enhanced QR placeholder
   - Better CTA button
3. Upgrade consumer content pages:
   - `AuthResultPage.tsx`
   - `ProductProfilePage.tsx`
   - `CertificatePage.tsx`
   - `TimelinePage.tsx`
   - `QualityPage.tsx`
   - `HeritagePage.tsx`
   - `UsageGuidePage.tsx`

### Phase 4: Entry & Polish
1. Upgrade `RoleSelectionPage.tsx`:
   - Refined card design
   - Better hierarchy
2. Add animations and transitions
3. Final polish:
   - Consistent spacing across all screens
   - Loading states
   - Empty states
   - Error states

## Design Validation Criteria

After implementation, verify:

1. **Visual Consistency:**
   - All screens use consistent spacing scale
   - Typography hierarchy is clear and consistent
   - Color usage follows the defined palette
   - Shadows and borders match specifications

2. **Mobile Experience:**
   - All tap targets are minimum 44x44px
   - Text is readable at mobile sizes (15px body minimum)
   - Cards don't overflow on 320px screens
   - Horizontal scrolling only where intentional

3. **Brand Alignment:**
   - Brown/gold heritage feel is maintained
   - Premium and trustworthy appearance
   - Not overly "tech startup" or generic
   - Craft and tradition are evident

4. **Interaction Quality:**
   - Buttons provide clear feedback
   - Transitions feel smooth (not janky)
   - Loading states are informative
   - Navigation is intuitive

5. **Accessibility:**
   - Color contrast passes WCAG AA
   - Focus indicators are visible
   - Semantic HTML structure
   - Screen reader friendly

## Success Metrics

The UI upgrade is successful when:

1. Mobile users can comfortably interact with all screens on 360-430px devices
2. Typography is legible and hierarchy is clear at a glance
3. The app feels premium and trustworthy (matching the product positioning)
4. Component reuse is high (80%+ shared components)
5. Brand identity (brown/gold heritage) is stronger than before
6. No accessibility regressions (maintain or improve current state)

## References

- Existing spec: `docs/superpowers/specs/2026-06-11-thanh-nam-huong-ky-react-structure-design.md`
- MVP planning: `outputs/mvp-screen-planning-form.md`
- Current implementation: `src/features/` directory
