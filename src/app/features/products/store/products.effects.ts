import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, exhaustMap } from 'rxjs/operators';
import { ProductsActions } from './products.actions';
import { ProductsDataService } from '../services/products-data.service';

@Injectable()
export class ProductsEffects {
  private readonly actions$ = inject(Actions);
  private readonly productsDataService = inject(ProductsDataService);

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadProducts),
      switchMap(() =>
        this.productsDataService.getProducts().pipe(
          map((products) => ProductsActions.loadProductsSuccess({ products })),
          catchError((error) =>
            of(ProductsActions.loadProductsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  loadProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadProduct),
      switchMap(({ id }) =>
        this.productsDataService.getProduct(id).pipe(
          map((product) => ProductsActions.loadProductSuccess({ product })),
          catchError((error) =>
            of(ProductsActions.loadProductFailure({ error: error.message }))
          )
        )
      )
    )
  );

  createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.createProduct),
      exhaustMap(({ product }) =>
        this.productsDataService.createProduct(product).pipe(
          map((createdProduct) =>
            ProductsActions.createProductSuccess({ product: createdProduct })
          ),
          catchError((error) =>
            of(ProductsActions.createProductFailure({ error: error.message }))
          )
        )
      )
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.updateProduct),
      exhaustMap(({ id, product }) =>
        this.productsDataService.updateProduct(id, product).pipe(
          map((updatedProduct) =>
            ProductsActions.updateProductSuccess({ product: updatedProduct })
          ),
          catchError((error) =>
            of(ProductsActions.updateProductFailure({ error: error.message }))
          )
        )
      )
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.deleteProduct),
      exhaustMap(({ id }) =>
        this.productsDataService.deleteProduct(id).pipe(
          map(() => ProductsActions.deleteProductSuccess({ id })),
          catchError((error) =>
            of(ProductsActions.deleteProductFailure({ error: error.message }))
          )
        )
      )
    )
  );
}

