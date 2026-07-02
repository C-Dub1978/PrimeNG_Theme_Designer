# 🚀 Angular v22 & PrimeNG Guidelines

You are an expert in TypeScript, Angular v22, and scalable web development. Follow these strict architectural boundaries to write performant, functional, and clean standalone code.

## 💻 Tech Stack Context
- **Core Framework:** Angular v22 (standalone architecture by default). NEVER downgrade `@angular/core` or `@angular/cli`.
- **UI Engine:** PrimeNG v22 (Styled Mode).

## 📂 Architecture & Component Rules
- **Component File Structure:** For a component named `ProjectDashboard`, omit the `.component` suffix in the filename. Generate exactly three files:
  - TypeScript: `project-dashboard.ts` (or camelCase `projectDashboard.ts` based on workspace convention)
  - HTML Template: `project-dashboard.html`
  - SCSS Stylesheet: `project-dashboard.scss`
- **Metadata Selector Prefix:** Every component metadata configuration MUST explicitly use the custom project prefix: **`td-`** (e.g., `selector: 'td-project-dashboard'`). NEVER use the default `app-` prefix.
- **Dependency Injection:** Use the functional `inject()` function exclusively. Never use constructor injection.
- **Folder Placement:** Keep components small, focused on single responsibility, and contained within their own folders under a feature-based hierarchy (e.g., `src/app/features/`).

## 🧱 Component Decorator Constraints
- **System Defaults:** Do NOT explicitly write `standalone: true` or `changeDetection: ChangeDetectionStrategy.OnPush` inside component decorators. These are system defaults in Angular v22+.
- **Host Properties:** Do NOT use legacy `@HostBinding` or `@HostListener` decorators. Put host bindings explicitly inside the `host: {}` configuration map of the `@Component` or `@Directive` decorator.
- **Signal Primitives:** Use `input()`, `output()`, and `model()` signal functions exclusively. Never use legacy `@Input` or `@Output` decorators.
- **Native Attributes:** Do NOT use `ngClass` or `ngStyle`. Use modern, native HTML attribute and class bindings instead.
- **Images:** Use `NgOptimizedImage` for all static images (Note: does not work for inline base64 images).
- **Forms:** Enforce Signal Forms (`@angular/forms/signals`) for ALL form architectures across the application with zero exceptions. Never use template-driven or legacy reactive forms.

## 🔄 Smart (Container) vs. Presentation (Dumb) Patterns
- **Smart Components:** Manage state, handle data streams, inject services via `inject()`, pass values down using signals, and catch events emitted by presentation layers. Keep layout/styling minimal.
- **Presentation Components:** Purely handle visual display. Receive incoming data via `input()` signals and push actions up via `output()` emitters. MUST NOT inject services, stores, or APIs.

## ⚡ State Management & Angular 22 Resource API
- **Local State:** Use `signal()` for component-level items. Use `computed()` or `linkedSignal()` for derived values. Do NOT use `mutate` on signals; utilize `update` or `set` instead.
- **Async & HTTP Operations:** Use the Angular 22 `resource()`, `httpResource()`, and `rxResource()` APIs for all asynchronous operations and API mocking.
- **Syntax Mapping:** When building a resource, pass the resource options object using the `params` parameter. Do NOT use the deprecated `request` key name.

```typescript
// ✅ Angular 22 Resource API Specification Example
import { Component, inject, signal, resource } from '@angular/core';
import { ProjectService } from './project.service';

@Component({
  selector: 'td-project-grid',
  templateUrl: './project-grid.html',
  styleUrl: './project-grid.scss'
})
export class ProjectGridComponent {
  private projectService = inject(ProjectService);
  categoryFilter = signal('web-apps');

  // Modern Angular 22 resource definition pattern
  projects = resource({
    params: () => ({ category: this.categoryFilter() }), // Uses modern 'params' property
    loader: ({ params }) => this.projectService.fetchMockProjects(params.category)
  });
}
```

## 🔒 Route Guards
- **Functional Guards:** Route guards must be functional (`CanActivateFn`). Router guards checking global `AuthSignalService` state must read session parameters synchronously via signals.

```typescript
// ✅ Functional Route Guard Example
import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthSignalService } from '../services/auth-signal.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthSignalService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }
  router.navigate(['/landing']);
  return false;
};
```

## ⚠️ Anti-Pattern Rule: Empty Effects & Untracked Code Blocks
- **Strict Dependency Rule:** An `effect()` block MUST always read at least one reactive Signal value inside its tracking execution loop (e.g., `this.mySignal()`). 
- **Constraint:** NEVER create an `effect()` that only manipulates the raw DOM, queries `document`, or executes static logic without reading a tracking Signal value first. If there is no Signal dependency inside the block, the effect is dead and will never run again.

```typescript
// 🚫 BAD (Runs once and dies, failing to track future changes)
effect(() => {
  const rootElement = document.documentElement;
  rootElement.classList.toggle('p-dark');
});

// ✅ GOOD (Explicitly reading the signal registers it to the tracking dependency map)
effect(() => {
  const activeDarkModeState = this.isDarkSignal();
  const rootElement = document.documentElement;
  if (activeDarkModeState) {
    rootElement.classList.add('p-dark');
  } else {
    rootElement.classList.remove('p-dark');
  }
});
```
