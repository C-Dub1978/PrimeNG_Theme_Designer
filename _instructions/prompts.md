# Prompts #

PREWRITTEN BY GOOGLE:
Role: Expert Angular 22 & PrimeNG Structural Engineer.
Task: Populate the active file `studio-shell.html` with our structural application wireframe. No Tailwind.
Requirements to Write:
1. Create a parent container div named `.studio-shell-layout`.
2. Inside this parent layout, place your custom top banner element tag: `<td-studio-header (toggleMenu)="isDrawerOpen.set(!isDrawerOpen())"></td-studio-header>`.
3. Underneath the header, create a horizontal layout row div named `.studio-main-frame`.
4. Inside `.studio-main-frame`, place a sidebar container div named `.studio-sidebar-drawer` that binds the class modifier `[class.drawer-closed]="!isDrawerOpen()"`.
5. Inside `.studio-sidebar-drawer`, implement a PrimeNG `<p-tabview class="drawer-grouping-tabs">` component housing exactly 5 individual `<p-tabpanel>` sub-blocks with headers labeled "Label 1" through "Label 5". Place a generic placeholder div inside each panel.
6. Right next to the sidebar drawer inside `.studio-main-frame`, build a main sandbox container element: `<main class="studio-workspace-canvas">`.
7. Inside `.studio-workspace-canvas`, implement a scrollable PrimeNG `<p-tabview class="canvas-preview-tabs" [scrollable]="true">` component housing exactly 13 individual empty `<p-tabpanel>` blocks with these exact headers: 'Form', 'Button', 'Data', 'Panel', 'Overlay', 'File', 'Menu', 'Messages', 'Media', 'Misc', 'Utility', 'Dashboard', 'Kitchen Sink'.
8. Right below the canvas tabview, declare your `<router-outlet></router-outlet>` tag.
9. At the very bottom of the parent layout, declare your custom footer element tag: `<td-studio-footer></td-studio-footer>`.

Notes, ideas, and compoennt level details:


OPTIMIZED BY ME!!!!!
Role: Expert Angular 22 & PrimeNG Architect and Engineer.
Task: Build a drawer component to be used in conjunction with our studio-shell component with our structural application wireframe. No Tailwind.
Requirements to Write:
1. Create a new component at /theme-designer/src/app/core/components/td-drawer. DO NOT use the word 'Component' anywhere when naming the component or file itself!! This is extremely important! Use the angular cli to run 'ng g c /core/components/td-drawer/studio-drawer.
2. Inject (using the inject() function rather than a constructor injection) the /theme-designer/src/app/core/services/toolbar.service.ts ToolbarService, so that we can notify others when our open/closed state changes.
3. Add a signal directly to our StudioDrawerComponent called 'isDrawerVisible' - this will notify all of the other components and

