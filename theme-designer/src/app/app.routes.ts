import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'setup',
    loadComponent: () =>
      import('./features/setup/setup').then((m) => m.Setup),
  },
  {
    path: 'studio',
    loadComponent: () =>
      import('./features/studio/studio').then((m) => m.Studio),
  },
  {
    path: 'studio:designID',
    loadComponent: () =>
      import('./features/studio/studio').then((m) => m.Studio),
  },
  {
    path: '',
    redirectTo: '/setup',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/setup',
  },
];