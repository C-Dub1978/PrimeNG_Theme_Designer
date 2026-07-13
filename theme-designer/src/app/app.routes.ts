import { Route, Routes } from '@angular/router';
import { SetupShell } from './setup/setup-shell';
import { StudioShell } from './studio/studio-shell';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'setup',
    pathMatch: 'full',
  },
  { path: 'setup', component: SetupShell },
  {
    path: 'studio/:designID',
    component: StudioShell,
    children: [
      { path: '', redirectTo: 'primitive', pathMatch: 'full' },
      { path: 'primitive', loadComponent: () => import('./studio/primitive/primitive') },
      { path: 'semantic', loadComponent: () => import('./studio/semantic/semantic') },
      { path: 'colors', loadComponent: () => import('./studio/colors/colors') },
      { path: 'components', loadComponent: () => import('./studio/components/components') },
      { path: 'custom', loadComponent: () => import('./studio/custom/custom') },
      { path: 'schema', loadComponent: () => import('./studio/schema/schema') },
    ],
  },
  {
    path: '**',
    redirectTo: 'setup',
  },
];

