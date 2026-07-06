import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/setup',
    pathMatch: 'full',
  },
  {
    path: 'setup',
    loadComponent: () =>
      import('./features/setup/setup').then((m) => m.Setup),
  },
  {
    path: 'studio/:designID',
    loadComponent: () =>
      import('./features/studio/studio').then((m) => m.Studio),
    children: [
      {
        path: '',
        redirectTo: '/setup',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/setup',
  },
];