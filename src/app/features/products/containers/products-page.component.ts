import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Product } from '../models/product.model';
import { ProductsActions } from '../store/products.actions';
import {
  selectAllProducts,
  selectProductsLoading,
  selectProductsError,
} from '../store/products.selectors';
import { ProductListComponent } from '../components/product-list.component';

/**
 * SMART Component (Container)
 * - Использует OnPush change detection
 * - Работает со state management (NgRx)
 * - Обрабатывает бизнес-логику
 * - Использует async pipe для подписки на observables
 * - Не содержит прямых подписок в коде
 */
@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [CommonModule, ProductListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="products-page">
      <h1>Каталог продуктов</h1>
      
      <app-product-list
        [products]="(products$ | async) ?? []"
        [loading]="(loading$ | async) ?? false"
        [error]="(error$ | async)"
        (productAddToCart)="onAddToCart($event)"
        (productViewDetails)="onViewDetails($event)"
      />
    </div>
  `,
  styles: [`
    .products-page {
      max-width: 1400px;
      margin: 0 auto;
      padding: 2rem;

      h1 {
        margin-bottom: 2rem;
        color: #333;
      }
    }
  `],
})
export class ProductsPageComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly router = inject(Router);

  // Используем async pipe в шаблоне - НЕ подписываемся в коде
  products$ = this.store.select(selectAllProducts);
  loading$ = this.store.select(selectProductsLoading);
  error$ = this.store.select(selectProductsError);

  ngOnInit(): void {
    // Dispatch action для загрузки данных
    this.store.dispatch(ProductsActions.loadProducts());
  }

  onAddToCart(product: Product): void {
    // Обработка бизнес-логики в контейнере
    console.log('Adding to cart:', product);
    // Здесь можно dispatch action для добавления в корзину
    // this.store.dispatch(CartActions.addItem({ product }));
  }

  onViewDetails(product: Product): void {
    // Навигация
    this.router.navigate(['/products', product.id]);
  }
}

