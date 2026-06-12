# Producer Mobile Bottom Tabs Layout Design

## Goal

Update the producer experience to use a mobile-first app layout like the approved reference: a large dark red operational header, quick status summary, scrollable dashboard content, and fixed bottom tabs. This first layout pass applies to producer screens, with `banh-gai` as the immediate target.

## Approved Visual Direction

- Header uses the existing premium Thanh Nam Huong Ky brown/red/gold identity.
- Top area shows logo, date, screen title, product/context subtitle, weather or sensor shortcut, and alert button with badge.
- Summary panel sits inside the header and exposes four compact operational stats.
- Main content uses a warm parchment background and white sensor cards with rounded corners, soft shadow, status pill, large numeric value, trend, and short AI note.
- Bottom navigation is fixed and always visible, matching the reference app style.

## Bottom Tabs

The producer tab set for this pass is:

1. `Bảng Điều Khiển`
2. `Lồng Hấp`
3. `Kho Lạnh`
4. `Dự Báo`
5. `Hồ Sơ`

These tabs replace the current horizontal producer nav on mobile-style producer screens. Each tab should use an icon from `lucide-react` where possible, with text below the icon. The active tab uses gold text and an active indicator.

## Scope For First Implementation

This pass changes the producer shell and dashboard layout first:

- Replace the current producer header/nav composition with the approved mobile app layout.
- Make the producer screen content fit within a phone-like full-height layout.
- Keep routes backed by the existing React Router structure.
- Map the current producer routes into the new tab labels where possible.
- Start with `banh-gai` dashboard content and keep other producer products functional.

The detailed bánh gai domain content from the new requirements, such as 5 steaming chambers, 4 cold rooms, VOC trend, pressure safety automation, and forecast charts, will be added after the shell is in place.

## Data And Components

Use existing producer mock data where possible for the first pass:

- `metrics` feed the dashboard sensor cards.
- `alerts` feed the alert badge and alert summary.
- `batches` feed basic activity counts.

Add small layout-specific helpers only if needed. Avoid a large data model rewrite in this pass.

## Error And Empty States

The shell should tolerate missing data:

- Alert badge shows `0` if no alerts exist.
- Sensor card grid renders an empty message if no metrics exist.
- Bottom tabs stay visible regardless of content.

## Verification

After implementation:

- Run `npm run build`.
- Start the local app and inspect the producer bánh gai dashboard.
- Verify the bottom tabs are fixed and usable on mobile viewport.
- Verify existing producer routes still render.
