---
name: Angular 22 & PrimeNG 21 Coding Standards
description: Strict technical layout constraints for modern standalone code generation.
globs:
  - "theme-designer/**/*.ts"
  - "theme-designer/**/*.html"
  - "theme-designer/**/*.scss"
---

# Technical Code Guidelines

## 1. TypeScript & Dependency Injection
* **Strict Types:** Enforce strict type checking. Prefer type inference when obvious. Avoid `any`; use `unknown` if unsure. Only use `any` if zero other options exist.
* **DI Pattern:** Use the functional `inject()` function exclusively for services or facades. Never use traditional constructor injection.

## 2. Angular Architecture Rules
* **Standalone Metadata:** Do NOT set `standalone: true` or `changeDetection: ChangeDetectionStrategy.OnPush` inside component decorators. These are defaults in Angular v20/22+.
* **Host Properties:** Do NOT use `@HostBinding` or `@HostListener` decorators. Put host bindings explicitly inside the `host` object map of the `@Component` or `@Directive` decorator.
* **Component Primitives:** Use `input()`, `output()`, and `model()` signal functions exclusively. Never use legacy decorators (`@Input`, `@Output`).
* **Attributes over Directives:** Do NOT use `ngClass` or `ngStyle`; use modern native HTML attribute and class bindings instead.
* **Images:** Use `NgOptimizedImage` for all static images (does not apply to inline base64 images).
* **Forms:** Prefer Signal Forms (`@angular/forms/signals`) where applicable, or fall back to native Reactive Forms. Never use template-driven forms.
* **Route Guards:** Functional router guards checking global `AuthSignalService` state must read session parameters synchronously via signals.

## 3. Smart (Container) vs. Presentation (Dumb) Patterns
* **Smart Components:** Manage state, handle data streams, inject services via `inject()`, pass values down using signals, and catch events emitted by presentation layers. Keep layout/styling minimal.
* **Presentation Components:** Purely handle visual display. Receive incoming data via `input()` signals and push actions up via `output()` emitters. MUST NOT inject services, stores, or APIs.

## 4. State Management & Asynchronous Data (Resource API)
* **Local State:** Use `signal()` for component-level items. Use `computed()` or `linkedSignal()` for derived values.
* **State Operations:** Keep changes predictable. Do NOT use `mutate` on signals; utilize `update` or `set` instead. Use the `async` pipe to handle remaining raw observables.
* **Async & HTTP Mocking:** Use Angular 21 `resource()`, `httpResource()`, and `rxResource()` APIs for all backend fetching.
* **Syntax Mapping:** When building a resource, pass options using the Angular 21 `params` parameter (do NOT use the deprecated `request` key).

```typescript
// Angular 21 Resource API Specification Example
import { Component, inject, signal, resource } from '@angular/core';
import { ProjectService } from './project.service';

@Component({
  selector: 'app-project-grid',
  templateUrl: './project-grid.component.html',
  styleUrl: './project-grid.component.scss'
})
export class ProjectGridComponent {
  private projectService = inject(ProjectService);
  categoryFilter = signal('web-apps');

  projects = resource({
    params: () => ({ category: this.categoryFilter() }),
    loader: ({ params }) => this.projectService.fetchMockProjects(params.category)
  });
}
```

## 5. Anti-Pattern Rule: Empty Effects
* **Dependency Constraint:** An `effect()` block MUST read at least one reactive Signal value inside its tracking execution loop (e.g., `this.mySignal()`). 
* **Constraint:** NEVER create an `effect()` that only manipulates the raw DOM, queries `document`, or executes static logic without reading a tracking Signal first. 
* **Alternates:** For running code exactly once on startup without a signal tracking dependency, use native `ngOnInit()` or an Angular `inject(DestroyRef)` callback.

```typescript
// ✅ CORRECT PATTERN
effect(() => {
  const activeDarkModeState = this.isDarkSignal(); // Registers tracking dependency
  const rootElement = document.documentElement;
  rootElement.classList.toggle('p-dark', activeDarkModeState);
});
```

## 6. Accessibility Requirements
* Complete output files MUST pass all AXE validation checks.
* Follow all WCAG AA minimums, focusing heavily on explicit focus management, color contrast metrics, and descriptive ARIA attributes.

## 7. Anti-Pattern Rule: Empty Effects & Untracked Code Blocks
- **Strict Dependency Rule:** An `effect()` block MUST always read at least one reactive Signal value inside its tracking execution loop (e.g., `this.mySignal()`). 
- **Constraint:** NEVER create an `effect()` that only manipulates the raw DOM, queries `document`, or executes static logic without reading a tracking Signal value first. If there is no Signal dependency inside the block, the effect is dead and will never run again.
- **Alternate Patterns:** If you need to manipulate the DOM or run code exactly once on startup without a signal tracking dependency, use the native `ngOnInit()` lifecycle hook or an Angular `inject(DestroyRef)` callback instead.

### 🚫 BAD (Do NOT write code like this):
effect(() => {
  // Misuse: No signal is called. This runs once and dies, failing to track future changes.
  const rootElement = document.documentElement;
  rootElement.classList.toggle('p-dark');
});

### ✅ GOOD (Follow this pattern exactly):
effect(() => {
  // Correct: Explicitly reading the signal value registers it to the tracking dependency map.
  const activeDarkModeState = this.isDarkSignal(); 
  const rootElement = document.documentElement;
  
  if (activeDarkModeState) {
    rootElement.classList.add('p-dark');
  } else {
    rootElement.classList.remove('p-dark');
  }
});

## 7. Component File Naming (Omit Suffixes)
* **Suffix Deletion:** NEVER include the redundant `.component` label in filenames. File types are inferred by their location, exports, and metadata.
* **File Suffix Layout:** For a component named `ProjectDashboard`, generate exactly three companion files matching the following pattern:
  * TypeScript File: `projectDashboard.ts` (or `project-dashboard.ts` depending on workspace casing)
  * HTML Template: `projectDashboard.html`
  * SCSS Stylesheet: `projectDashboard.scss`

```typescript
// ✅ CORRECT COMPANION MAPPING PATTERN (Omit Suffixes)
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './projectDashboard.html',
  styleUrl: './projectDashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectDashboard {}
```
