import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'observer',
    pathMatch: 'full'
  },
  {
    path: 'observer',
    loadComponent: () => import('./components/observer-example/observer-example').then(m => m.ObserverExample)
  },
  {
    path: 'rxjs',
    loadComponent: () => import('./components/rxjs-example/rxjs-example').then(m => m.RxjsExample)
  },
  {
    path: 'state-example',
    loadComponent: () => import('./components/state-example/state-example').then(m => m.StateExample)
  },
  {
    path: 'non-state-example',
    loadComponent: () => import('./components/non-state-example/non-state-example').then(m => m.NonStateExample)
  }
];
