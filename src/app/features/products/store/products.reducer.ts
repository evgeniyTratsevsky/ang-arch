import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Product } from '../models/product.model';
import { ProductsActions } from './products.actions';

export interface ProductsState extends EntityState<Product> {
  selectedProductId: string | null;
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>({
  selectId: (product: Product) => product.id,
});

export const initialState: ProductsState = adapter.getInitialState({
  selectedProductId: null,
  loading: false,
  error: null,
});

export const productsReducer = createReducer(
  initialState,

  // Load Products
  on(ProductsActions.loadProducts, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ProductsActions.loadProductsSuccess, (state, { products }) =>
    adapter.setAll(products, {
      ...state,
      loading: false,
    })
  ),
  on(ProductsActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Load Product
  on(ProductsActions.loadProduct, (state, { id }) => ({
    ...state,
    selectedProductId: id,
    loading: true,
    error: null,
  })),
  on(ProductsActions.loadProductSuccess, (state, { product }) =>
    adapter.upsertOne(product, {
      ...state,
      loading: false,
    })
  ),
  on(ProductsActions.loadProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Create Product
  on(ProductsActions.createProduct, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ProductsActions.createProductSuccess, (state, { product }) =>
    adapter.addOne(product, {
      ...state,
      loading: false,
    })
  ),
  on(ProductsActions.createProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Update Product
  on(ProductsActions.updateProduct, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ProductsActions.updateProductSuccess, (state, { product }) =>
    adapter.updateOne(
      { id: product.id, changes: product },
      {
        ...state,
        loading: false,
      }
    )
  ),
  on(ProductsActions.updateProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Delete Product
  on(ProductsActions.deleteProduct, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ProductsActions.deleteProductSuccess, (state, { id }) =>
    adapter.removeOne(id, {
      ...state,
      loading: false,
    })
  ),
  on(ProductsActions.deleteProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

