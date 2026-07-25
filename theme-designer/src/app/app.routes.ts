import { Routes } from '@angular/router';
import { Setup } from '@features/setup/setup';
import { StudioShell } from '@pages/studio-shell/studio-shell';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'setup',
    pathMatch: 'full',
  },
  {
    path: 'setup',
    component: Setup
  },
  {
    path: 'studio/:designID',
    component: StudioShell,
    children: [
      { 
        path: '', 
        redirectTo: 'primitive', 
        pathMatch: 'full' 
      },
      { 
        path: 'primitive', 
        loadComponent: () => import('./pages/primitive/primitive').then(m => m.Primitive) 
      },
      { 
        path: 'semantic', 
        loadComponent: () => import('./pages/semantic/semantic').then(m => m.Semantic) 
      },
      { 
        path: 'colors', 
        loadComponent: () => import('./pages/colors/colors').then(m => m.Colors) 
      },
      { 
        path: 'components', 
        loadComponent: () => import('./pages/components/components').then(m => m.Components) 
      },
      { 
        path: 'custom', 
        loadComponent: () => import('./pages/custom/custom').then(m => m.Custom) 
      },
      { 
        path: 'schema', 
        loadComponent: () => import('./pages/schema/schema').then(m => m.Schema) 
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'setup',
  },
];
