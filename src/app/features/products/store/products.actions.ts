import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from '../models/product.model';

export const ProductsActions = createActionGroup({
  source: 'Products',
  events: {
    'Load Products': emptyProps(),
    'Load Products Success': props<{ products: Product[] }>(),
    'Load Products Failure': props<{ error: string }>(),

    'Load Product': props<{ id: string }>(),
    'Load Product Success': props<{ product: Product }>(),
    'Load Product Failure': props<{ error: string }>(),

    'Create Product': props<{ product: Partial<Product> }>(),
    'Create Product Success': props<{ product: Product }>(),
    'Create Product Failure': props<{ error: string }>(),

    'Update Product': props<{ id: string; product: Partial<Product> }>(),
    'Update Product Success': props<{ product: Product }>(),
    'Update Product Failure': props<{ error: string }>(),

    'Delete Product': props<{ id: string }>(),
    'Delete Product Success': props<{ id: string }>(),
    'Delete Product Failure': props<{ error: string }>(),
  },
});

