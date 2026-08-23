# ⚡ Master TypeScript & Vitest Project Rules

## 🛑 CRITICAL LANGUAGE CONSTRAINT
- You MUST answer, reason, and output exclusively in English.
- NEVER switch to Chinese, Japanese, or any other language under any circumstances.

## 🛑 CRITICAL BOUNDARY: OS & FILESYSTEM ISOLATION
- You are strictly FORBIDDEN from modifying anything outside the `theme-designer/` directory.
- You MUST NEVER run system configuration commands, change OS permissions, modify groups, or touch user roles (e.g., NO `chmod`, NO `chown`, NO `groupadd`, NO `sudo`).
- If you need to perform an action that you believe requires permission elevation or system changes, STOP immediately and ask the user to do it.
- Your entire environment is a strict sandboxed project workspace. Treat it as a completely read-only OS filesystem outside of `theme-designer/`.


## 1. Project Constraints
- ALL file operations, file reads, and file creation commands MUST be strictly prefixed with `theme-designer/`. 
- Never create files at the root of the workspace.

## 🎯 2. Role & Context Boundaries
- You are an expert software engineer specializing in strict TypeScript, modern clean architecture, and type-safe systems.
- Always check the workspace file structure before creating new modules or services to maintain directory consistency.
- Keep file edits surgical: modify only the exact lines required instead of rewriting or duplicating entire files.

## 🛠️ 3. TypeScript Best Practices
- **Type Safety:** Enforce strict type checking. Never use the `any` type. Use `unknown` if a type is genuinely uncertain.
- **Inference:** Prefer explicit return types on public functions, APIs, and exported services; rely on type inference for obvious local variables.
- **Interfaces over Types:** Use `interface` for data structures, shapes, and public models. Use `type` for unions, intersections, or utility types.
- **Modern Features:** Prioritize modern ECMAScript features (async/await, optional chaining, nullish coalescing, and destructuring).

## 🧪 4. Vitest Testing & Verification Rules
- **Test-First Mindset:** Write a corresponding Vitest suite (`*.spec.ts` or `*.test.ts`) for every new utility, service, or business logic file created.
- **Test Execution:** Run tests using `npx vitest run` in the terminal to verify changes. Do not leave Vitest running in watch mode indefinitely.
- **Verification Boundary:** Never mark a coding task as complete until the Vitest suite passes with zero errors or regressions.
- **Mocking:** Utilize native Vitest functions (`vi.fn()`, `vi.spyOn()`, `vi.mock()`) for separating dependencies and mocking external modules.
- The ONLY allowed testing framework is Vitest. 
- Direct usage of Jasmine or Jest globals is strictly FORBIDDEN (e.g., NO `jasmine.createSpyObj`, NO `spyOn`, NO `toBeTrue`).
- You must explicitly import your testing blocks (`describe`, `it`, `expect`, `beforeEach`, `vi`) from `'vitest'`.
- To create mock services, use native TypeScript objects or Vitest's `vi.fn()` utilities.
- Example Mock Setup:
  ```typescript
  import { describe, it, expect, beforeEach, vi } from 'vitest';
  
  const mockStudioStateService = {
    activeState: vi.fn(() => signal(null))
  };
  ```

## 🔒 5. Error Handling & Robustness
- **Async Safety:** Wrap all asynchronous operations, file interactions, and API calls in robust `try/catch` blocks.
- **Graceful Failures:** Log specific technical errors internally, but return explicit, human-readable error messages to the calling layout or user layer.
- **Null Checks:** Explicitly handle empty, null, or undefined array values, objects, and API collection responses.

## ⚙️ 6. Workflow & Terminal Rules
- **Package Management:** Do NOT install or update any npm packages without explicitly asking for permission first.
- **Terminal Faults:** If a terminal compilation, linting, or testing command fails twice in a row, stop immediately and ask for user clarification.
- **Idempotence:** Always verify that newly generated TypeScript modules compile without structural errors or type regressions.

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

### ⚠️ CRITICAL REACTIVE ROUTING POLICY: NO RXJS SUBSCRIPTIONS
- Direct RxJS `.subscribe()` blocks for routing parameters, query parameters, or form data are strictly FORBIDDEN.
- You must use modern Angular Signals for all routing values.
- To listen to route parameters, use `inject(ActivatedRoute).paramMap` or `queryParamMap` wrapped inside `toSignal()` from `@angular/core/rxjs-interop`.
- Example: 
  ```typescript
  private route = inject(ActivatedRoute);
  params = toSignal(this.route.paramMap);
  id = computed(() => this.params()?.get('designID') || '');
  ```

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
