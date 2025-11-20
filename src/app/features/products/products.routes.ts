import { Routes } from '@angular/router';

export const PRODUCTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./containers/products-page.component').then((m) => m.ProductsPageComponent),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./containers/product-details-page.component').then(
        (m) => m.ProductDetailsPageComponent
      ),
  },
];

