import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'demo',
    loadComponent: () =>
      import('./features/realtime-demo/realtime-demo.component').then(
        (m) => m.RealtimeDemoComponent
      ),
  },
  {
    path: 'interceptors',
    loadComponent: () =>
      import('./features/interceptors-demo/interceptors-demo.component').then(
        (m) => m.InterceptorsDemoComponent
      ),
  },
];
