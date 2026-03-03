# EVA Suite Design Tokens

**Version:** 0.1  
**Last Updated:** 2025-11-24  
**Purpose:** Baseline design tokens for EVA Suite demo application

---

## 🎨 Colors

### Primary Colors
- `--primary`: `#007bff` — Primary brand color (Azure blue)
- `--secondary`: `#ff8c00` — Secondary brand color (EVA orange)
- `--success`: `#28a745` — Success states
- `--warning`: `#ffc107` — Warning states
- `--danger`: `#dc3545` — Error/danger states

### Neutral Colors
- `--dark`: `#2c3e50` — Dark text and backgrounds
- `--neutral`: `#6c757d` — Muted text and borders
- `--background`: `#f4f7f9` — Page background

---

## 📐 Spacing

### Base Unit: 8px

- `--spacing-xs`: `0.5rem` (8px)
- `--spacing-sm`: `1rem` (16px)
- `--spacing-md`: `1.5rem` (24px)
- `--spacing-lg`: `2rem` (32px)
- `--spacing-xl`: `3rem` (48px)

### Container
- `--container-max-width`: `1400px`
- `--container-padding`: `20px`

---

## ✍️ Typography

### Font Family
- `--font-family-base`: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`
- `--font-family-mono`: `'Courier New', monospace`

### Font Sizes
- `--font-size-xs`: `0.75rem` (12px)
- `--font-size-sm`: `0.875rem` (14px)
- `--font-size-base`: `1rem` (16px)
- `--font-size-lg`: `1.25rem` (20px)
- `--font-size-xl`: `1.5rem` (24px)
- `--font-size-2xl`: `2rem` (32px)
- `--font-size-3xl`: `2.5rem` (40px)

### Font Weights
- `--font-weight-light`: `300`
- `--font-weight-normal`: `400`
- `--font-weight-semibold`: `600`
- `--font-weight-bold`: `700`

### Line Heights
- `--line-height-tight`: `1.2`
- `--line-height-base`: `1.6`
- `--line-height-relaxed`: `1.8`

---

## 🧩 Usage Examples

### In CSS
```css
.hero-title {
  color: var(--secondary);
  font-size: var(--font-size-3xl);
  margin-bottom: var(--spacing-md);
}
```

### In React Components
```tsx
<div style={{
  padding: 'var(--spacing-lg)',
  background: 'var(--primary)',
  color: 'white'
}}>
  EVA Suite
</div>
```

---

## 🔮 Future Enhancements

<!-- TODO: Sprint 002+ -->
- Add CSS custom properties for borders/shadows
- Define motion/animation tokens
- Create bilingual typography scales (EN/FR)
- Add dark mode token overrides
- Document accessible color contrast ratios

---

**Referenced by:** `src/index.css`, `src/App.css`  
**Maintained by:** EVA UI/UX Lane
