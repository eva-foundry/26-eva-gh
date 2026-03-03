# Event Model Guide

This guide documents CustomEvents used across EVA Sovereign UI components, including event names, payloads, and dispatch options (bubbling and composed).

## Conventions

- Events are dispatched with `new CustomEvent(name, { detail, bubbles: true, composed: true })` via `EVABaseComponent.emit(name, detail)`.
- `bubbles: true` enables parent listeners; `composed: true` crosses Shadow DOM boundaries.
- Payloads are small POJOs. Avoid DOM references where possible.

## Core

- `eva:ready` — Detail: `{ component: string }` — Emitted when component initializes and first render completes.
- `eva:change` — Detail: `{ component: string, value: any }` — Generic change event for inputs/selectors.

## Pagination (`eva-pagination`)

- `pagination:change` — Detail: `{ page: number, total?: number }` — Fired when current page changes via click or keyboard.

## Menubar (`eva-menubar`)

- `menubar:open` — Detail: `{ index: number }` — A menu trigger opened.
- `menubar:close` — Detail: `{ index?: number }` — A menu trigger closed.
- `menubar:select` — Detail: `{ index: number, item: string }` — A menu item selected.

## Dropdown Menu (`eva-dropdown-menu`)

- `menu:open` — Detail: `{ id?: string }`
- `menu:close` — Detail: `{ id?: string }`
- `menu:select` — Detail: `{ id?: string, value: string }`

## Context Menu (`eva-context-menu`)

- `contextmenu:open` — Detail: `{ x: number, y: number }`
- `contextmenu:close` — Detail: `{}`
- `contextmenu:select` — Detail: `{ value: string }`

## Carousel (`eva-carousel`)

- `carousel:change` — Detail: `{ index: number }`
- `carousel:play` / `carousel:pause` — Detail: `{}`

## Language Switcher (`eva-language-switcher`)

- `language-changed` — Detail: `{ locale: string }` — Emitted upon user selection.

## Best Practices

- Always document events in `COMPONENT-API.md` for the component.
- Keep event names scoped and consistent (component:action).
- Ensure keyboard interactions emit the same events as pointer interactions.
- Test events using `vitest` and `@testing-library/dom` queries.

## Listening Examples

```ts
const pagination = document.querySelector('eva-pagination');
pagination?.addEventListener('pagination:change', (e: Event) => {
  const { page } = (e as CustomEvent).detail;
  console.log('Page changed', page);
});
```

## Emitting via Base Component

```ts
// inside a component class extending EVABaseComponent
this.emit('menu:select', { id: this.id, value });
```
