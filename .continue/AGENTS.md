# Agent Operating Guide: Angular & PrimeNG Project

## 1. Project Overview & Directory Scope
* **CRITICAL ROOT PATH:** The root directory of the actual web application is strictly inside the `theme-designer/` folder. 
* **Target Execution Scope:** All source code generation, module imports, component folders, stylesheets, and assets live exclusively inside `theme-designer/src/app/`. Do not create files in the parent workspace root.
* **Terminal Context:** Every time you run an Angular CLI or npm command, you MUST change directories into `theme-designer/` first.

## 2. Core Execution Commands
* **Install Dependencies:** `cd theme-designer && npm install`
* **Local Dev Server:** `cd theme-designer && npm start`
* **Build Project:** `cd theme-designer && npm run build`
* **Scaffold Component:** `cd theme-designer && ng g component features/<name> --change-detection OnPush`

## 3. Project Overview & Tech Stack
* **Framework:** Angular v22+ (Zoneless architecture, standalone by default, modern control flow blocks).
* **UI Engine:** PrimeNG v21+ (Styled Mode via design presets).
* **State Management:** Angular Signals + Angular 21 Resource APIs for async network fetching.
* **Environment Guardrails:** NEVER downgrade `@angular/core` or `@angular/cli` to force dependency resolution.

## 4. Component Directory & File Structure
* **Isolated Folders:** ALWAYS create every new Angular component inside its own dedicated subdirectory named after the component. Never dump files into a shared parent folder.
* **Preferred Path:** Prefer structural features in a dedicated parent directory: `src/app/features/`.
* **No Inline Markup:** NEVER use inline HTML strings inside the `@Component` decorator (`template: '...'`). Every component MUST have a separate companion `*.component.html` file.
* **No Inline Styling:** NEVER use inline SCSS strings inside the decorator (`styles: [...]`). Every component MUST have a separate companion `*.component.scss` file.
* **CLI Guardrails:** When executing component blueprints via the CLI, always apply proper change detection syntax and paths. 
  * *Example:* `cd portfolio && ng g component features/login --change-detection OnPush`

## 5. Reference Material & Mocking
* **Design Placeholders:** Supply empty visual markup templates or raw `<svg>` definitions equipped with descriptive layout element classes so a secondary design AI can insert graphic visuals directly.
* **Architectural Source:** For concrete code architectures and architectural patterns, reference the exact structural files located in `_examples/`.