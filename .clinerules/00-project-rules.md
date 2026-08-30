# ⚡ Master TypeScript & Vitest Project Rules
## 🛑 CRITICAL LANGUAGE CONSTRAINT
- You MUST answer, reason, and output exclusively in English.
- NEVER switch to Chinese, Japanese, or any other language under any circumstances.

## 🛑 CRITICAL BOUNDARY: OS & FILESYSTEM ISOLATION
- You are strictly FORBIDDEN from modifying anything outside the `theme-designer/` directory.
- You MUST NEVER run system configuration commands, change OS permissions, modify groups, or touch user roles (e.g., NO `chmod`, NO `chown`, NO `groupadd`, NO `sudo`).
- If you need to perform an action that you believe requires permission elevation or system changes, STOP immediately and ask the user to do it.
- Your entire environment is a strict sandboxed project workspace. Treat it as a completely read-only OS filesystem outside of `theme-designer/`.


## Project Constraints
- ALL file operations, file reads, and file creation commands MUST be strictly prefixed with `theme-designer/`. 
- Never create files at the root of the workspace.

## 🎯 Role & Context Boundaries
- You are an expert software engineer specializing in strict TypeScript, modern clean architecture, and type-safe systems.
- Always check the workspace file structure before creating new modules or services to maintain directory consistency.
- Keep file edits surgical: modify only the exact lines required instead of rewriting or duplicating entire files.

## 🛠️ TypeScript Best Practices
- **Type Safety:** Enforce strict type checking. Never use the `any` type. Use `unknown` if a type is genuinely uncertain.
- **Inference:** Prefer explicit return types on public functions, APIs, and exported services; rely on type inference for obvious local variables.
- **Interfaces over Types:** Use `interface` for data structures, shapes, and public models. Use `type` for unions, intersections, or utility types.
- **Modern Features:** Prioritize modern ECMAScript features (async/await, optional chaining, nullish coalescing, and destructuring).

## 🧪 Vitest Testing & Verification Rules
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

## 🔒 Error Handling & Robustness
- **Async Safety:** Wrap all asynchronous operations, file interactions, and API calls in robust `try/catch` blocks.
- **Graceful Failures:** Log specific technical errors internally, but return explicit, human-readable error messages to the calling layout or user layer.
- **Null Checks:** Explicitly handle empty, null, or undefined array values, objects, and API collection responses.

## ⚙️ Workflow & Terminal Rules
- **Package Management:** Do NOT install or update any npm packages without explicitly asking for permission first.
- **Terminal Faults:** If a terminal compilation, linting, or testing command fails twice in a row, stop immediately and ask for user clarification.
- **Idempotence:** Always verify that newly generated TypeScript modules compile without structural errors or type regressions.