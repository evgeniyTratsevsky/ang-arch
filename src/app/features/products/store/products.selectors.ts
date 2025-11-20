import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState, adapter } from './products.reducer';

export const selectProductsState = createFeatureSelector<ProductsState>('products');

const { selectAll, selectEntities, selectIds, selectTotal } = adapter.getSelectors();

export const selectAllProducts = createSelector(selectProductsState, selectAll);

export const selectProductEntities = createSelector(selectProductsState, selectEntities);

export const selectProductIds = createSelector(selectProductsState, selectIds);

export const selectProductsTotal = createSelector(selectProductsState, selectTotal);

export const selectProductsLoading = createSelector(
  selectProductsState,
  (state) => state.loading
);

export const selectProductsError = createSelector(
  selectProductsState,
  (state) => state.error
);

export const selectSelectedProductId = createSelector(
  selectProductsState,
  (state) => state.selectedProductId
);

export const selectSelectedProduct = createSelector(
  selectProductEntities,
  selectSelectedProductId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : null)
);

