import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'setup',
    loadComponent: () =>
      import('./features/setup/setup').then((m) => m.SetupComponent),
  },
  {
    path: '/studio',
    loadComponent: () =>
      import('./features/studio/studio').then((m) => m.StudioComponent),
  },
  {
    path: '/studio:designID',
    loadComponent: () =>
      import('./features/studio/studio').then((m) => m.StudioComponent),
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