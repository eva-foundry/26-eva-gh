# EVA-Sovereign-UI Merge Plan
**Spark React Prototype → Copilot Web Components**

## 🎯 Objective
Merge Spark's beautiful visual design with Copilot's Web Components architecture to create production-ready, framework-agnostic UI library.

---

## 📊 Status: **IN PROGRESS**

### ✅ Phase 1: Port Visual Design Tokens (CURRENT)
- [ ] Extract Tailwind/CSS variables from Spark
- [ ] Convert to TypeScript design tokens
- [ ] Update color palette with Spark's oklch() values
- [ ] Add animations and transitions
- [ ] Update shadow/border/radius tokens

### ⏳ Phase 2: Enhance Existing Components (NEXT)
- [ ] Update EVAGCHeader with Spark styling
- [ ] Enhance EVAGCButton with all 6 variants
- [ ] Polish EVAChatPanel with Spark aesthetics
- [ ] Add animations to EVAHeroBanner
- [ ] Update all 16 components with new tokens

### ⏳ Phase 3: Port Missing Components
- [ ] Convert 46 shadcn/ui components to Web Components
- [ ] Add 9 missing GC Design components
- [ ] Implement hover/focus states from Spark
- [ ] Add loading/disabled states

### ⏳ Phase 4: Integration & Testing
- [ ] Update ESDC demo with Spark layouts
- [ ] Enhance Developer Kit
- [ ] Add visual regression tests
- [ ] Performance optimization

---

## 🔧 Technical Approach

### Design Token Migration

**From Spark (Tailwind CSS Variables):**
```css
.eva-theme-canada_gc_intranet {
  --primary: oklch(0.45 0.12 250);
  --secondary: oklch(0.50 0.20 25);
  --accent: oklch(0.55 0.15 150);
  --background: oklch(0.98 0 0);
  --muted: oklch(0.96 0 0);
  --border: oklch(0.88 0 0);
}
```

**To Copilot (TypeScript Tokens):**
```typescript
export const gcColors = {
  // Convert oklch to hex or keep oklch for modern browsers
  primary: 'oklch(0.45 0.12 250)',
  primaryForeground: 'oklch(0.98 0 0)',
  // ... all colors
};
```

### Component Styling Strategy

**Spark (Tailwind Classes):**
```tsx
<button className="inline-flex items-center justify-center gap-2 
  rounded-md text-sm font-medium transition-all 
  bg-primary text-primary-foreground 
  hover:bg-primary/90 focus-visible:ring-[3px]">
```

**Copilot (Shadow DOM CSS):**
```typescript
this.shadow.appendChild(this.createStyles(`
  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    font-weight: 500;
    transition: all 0.2s;
    background: var(--color-primary);
    color: var(--color-primary-foreground);
  }
  button:hover {
    background: color-mix(in srgb, var(--color-primary) 90%, black);
  }
  button:focus-visible {
    outline: 3px solid var(--color-ring);
    outline-offset: 2px;
  }
`));
```

---

## 📝 Files to Update

### Phase 1 Files:
- ✅ `MERGE-PLAN.md` (this file)
- [ ] `packages/eva-sovereign-ui-wc/src/tokens/colors.ts`
- [ ] `packages/eva-sovereign-ui-wc/src/tokens/typography.ts`
- [ ] `packages/eva-sovereign-ui-wc/src/tokens/spacing.ts`
- [ ] `packages/eva-sovereign-ui-wc/src/tokens/animations.ts` (NEW)
- [ ] `packages/eva-sovereign-ui-wc/src/tokens/shadows.ts` (NEW)
- [ ] `packages/eva-sovereign-ui-wc/src/themes/*.css` (5 files)

### Phase 2 Files (16 existing components):
- [ ] `packages/eva-sovereign-ui-wc/src/components/gc-design/eva-gc-header.ts`
- [ ] `packages/eva-sovereign-ui-wc/src/components/gc-design/eva-gc-footer.ts`
- [ ] `packages/eva-sovereign-ui-wc/src/components/gc-design/eva-gc-button.ts`
- [ ] `packages/eva-sovereign-ui-wc/src/components/layout/eva-page-shell.ts`
- [ ] `packages/eva-sovereign-ui-wc/src/components/layout/eva-hero-banner.ts`
- [ ] `packages/eva-sovereign-ui-wc/src/components/chat/eva-chat-panel.ts`
- [ ] ... (10 more)

### Phase 3 Files (46 new components from Spark):
- [ ] `packages/eva-sovereign-ui-wc/src/components/ui/eva-accordion.ts`
- [ ] `packages/eva-sovereign-ui-wc/src/components/ui/eva-alert.ts`
- [ ] `packages/eva-sovereign-ui-wc/src/components/ui/eva-avatar.ts`
- [ ] ... (43 more)

---

## 🎨 Visual Design Priorities

### High Priority (affects all components):
1. **Color System** - Spark's oklch() colors with smooth transitions
2. **Spacing** - Consistent 8px grid
3. **Typography** - Lato + Noto Sans with proper weights
4. **Shadows** - Subtle depth with shadow-xs, shadow-sm, shadow-md
5. **Border Radius** - Consistent rounding (sm/md/lg/xl)
6. **Focus States** - 3px ring with proper contrast

### Medium Priority:
7. Hover states with color-mix()
8. Transition timing functions
9. Responsive breakpoints
10. Dark mode support

### Low Priority:
11. Animation keyframes
12. Custom scrollbars
13. Print styles

---

## 📈 Success Metrics

### Visual Quality:
- [ ] All components match Spark's aesthetic
- [ ] Smooth transitions and animations
- [ ] Consistent spacing throughout
- [ ] Professional shadows and depth

### Technical Quality:
- [ ] All components use Web Components
- [ ] Shadow DOM isolation working
- [ ] No style leakage
- [ ] TypeScript types complete

### Accessibility:
- [ ] WCAG 2.2 AAA maintained
- [ ] Keyboard navigation preserved
- [ ] Screen reader compatibility
- [ ] Focus indicators visible

### Performance:
- [ ] Bundle size < 150KB gzipped
- [ ] Time to Interactive < 2s
- [ ] No layout shifts
- [ ] Smooth 60fps animations

---

## ⏱️ Timeline

- **Phase 1:** 2-3 days (design tokens)
- **Phase 2:** 3-4 days (enhance 16 components)
- **Phase 3:** 4-5 days (port 46 components)
- **Phase 4:** 2-3 days (polish & test)

**Total:** 11-15 days to full completion

---

## 🚀 Next Steps

1. ✅ Create merge branch: `merge-spark-copilot`
2. ✅ Document merge plan (this file)
3. ⏳ Extract and convert color tokens
4. ⏳ Update typography tokens
5. ⏳ Create animation/shadow tokens
6. ⏳ Update first component (eva-gc-button) as proof of concept

---

**Branch:** `merge-spark-copilot`  
**Target:** 70% → 100% completion  
**ETA:** December 14, 2025
