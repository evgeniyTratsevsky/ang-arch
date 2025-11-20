import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Product } from '../models/product.model';
import { ProductCardComponent } from './product-card.component';

/**
 * DUMB Component (Презентационный компонент)
 * - Только отображение списка
 * - Все данные через inputs
 * - Все события через outputs
 */
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, MatProgressSpinnerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (loading()) {
      <div class="loading">
        <mat-spinner></mat-spinner>
        <p>Загрузка продуктов...</p>
      </div>
    } @else if (error()) {
      <div class="error">
        <p>Ошибка загрузки: {{ error() }}</p>
      </div>
    } @else if (products().length === 0) {
      <div class="empty">
        <p>Продукты не найдены</p>
      </div>
    } @else {
      <div class="products-grid">
        @for (product of products(); track product.id) {
          <app-product-card
            [product]="product"
            (addToCart)="productAddToCart.emit($event)"
            (viewDetails)="productViewDetails.emit($event)"
          />
        }
      </div>
    }
  `,
  styles: [`
    .loading,
    .error,
    .empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 400px;
    }

    .error {
      color: #f44336;
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
      padding: 1.5rem;
    }
  `],
})
export class ProductListComponent {
  products = input.required<Product[]>();
  loading = input<boolean>(false);
  error = input<string | null>(null);

  productAddToCart = output<Product>();
  productViewDetails = output<Product>();
}

