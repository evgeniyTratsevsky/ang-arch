import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../models/product.model';

/**
 * DUMB Component (Презентационный компонент)
 * - Использует OnPush change detection
 * - Обязательные inputs через input() signal
 * - События через output()
 * - Без подписок, без state
 * - Только отображение данных
 */
@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>{{ product().name }}</mat-card-title>
      </mat-card-header>
      <img
        mat-card-image
        [src]="product().imageUrl"
        [alt]="product().name"
      />
      <mat-card-content>
        <p>{{ product().description }}</p>
        <p class="price">{{ product().formattedPrice }}</p>
        <p class="stock" [class.in-stock]="product().inStock">
          {{ product().inStock ? 'В наличии' : 'Нет в наличии' }}
        </p>
      </mat-card-content>
      <mat-card-actions>
        <button
          mat-raised-button
          color="primary"
          [disabled]="!product().inStock"
          (click)="addToCart.emit(product())"
        >
          Добавить в корзину
        </button>
        <button
          mat-button
          (click)="viewDetails.emit(product())"
        >
          Подробнее
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
    }

    mat-card {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    mat-card-content {
      flex: 1;
    }

    .price {
      font-size: 1.5rem;
      font-weight: bold;
      color: #2196f3;
      margin: 1rem 0;
    }

    .stock {
      font-weight: 500;
      color: #f44336;

      &.in-stock {
        color: #4caf50;
      }
    }

    mat-card-actions {
      display: flex;
      gap: 0.5rem;
      padding: 1rem;
    }
  `],
})
export class ProductCardComponent {
  // Обязательный input (required через input.required)
  product = input.required<Product>();

  // Outputs для событий
  addToCart = output<Product>();
  viewDetails = output<Product>();
}

