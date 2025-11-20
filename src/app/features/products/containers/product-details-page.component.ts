import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProductsActions } from '../store/products.actions';
import {
  selectSelectedProduct,
  selectProductsLoading,
  selectProductsError,
} from '../store/products.selectors';

/**
 * SMART Component для детальной страницы продукта
 */
@Component({
  selector: 'app-product-details-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatProgressSpinnerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="product-details-page">
      @if (loading$ | async) {
        <div class="loading">
          <mat-spinner></mat-spinner>
        </div>
      } @else if (error$ | async; as error) {
        <div class="error">
          <p>Ошибка: {{ error }}</p>
          <button mat-raised-button (click)="goBack()">Назад</button>
        </div>
      } @else if (product$ | async; as product) {
        <mat-card>
          <button mat-icon-button (click)="goBack()" class="back-button">
            ← Назад
          </button>
          
          <img mat-card-image [src]="product.imageUrl" [alt]="product.name" />
          
          <mat-card-header>
            <mat-card-title>{{ product.name }}</mat-card-title>
          </mat-card-header>
          
          <mat-card-content>
            <p class="description">{{ product.description }}</p>
            
            <div class="details">
              <div class="price">{{ product.formattedPrice }}</div>
              <div class="stock" [class.in-stock]="product.inStock">
                {{ product.inStock ? 'В наличии' : 'Нет в наличии' }}
              </div>
            </div>
          </mat-card-content>
          
          <mat-card-actions>
            <button
              mat-raised-button
              color="primary"
              [disabled]="!product.inStock"
              (click)="onAddToCart()"
            >
              Добавить в корзину
            </button>
          </mat-card-actions>
        </mat-card>
      }
    </div>
  `,
  styles: [`
    .product-details-page {
      max-width: 800px;
      margin: 2rem auto;
      padding: 1rem;
    }

    .loading,
    .error {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 400px;
      gap: 1rem;
    }

    .error {
      color: #f44336;
    }

    mat-card {
      position: relative;
    }

    .back-button {
      position: absolute;
      top: 1rem;
      left: 1rem;
      z-index: 1;
      background: rgba(255, 255, 255, 0.9);
    }

    .description {
      font-size: 1.1rem;
      line-height: 1.6;
      margin: 1rem 0;
    }

    .details {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 2rem 0;
    }

    .price {
      font-size: 2rem;
      font-weight: bold;
      color: #2196f3;
    }

    .stock {
      font-weight: 500;
      font-size: 1.2rem;
      color: #f44336;

      &.in-stock {
        color: #4caf50;
      }
    }

    mat-card-actions {
      padding: 1rem;
    }
  `],
})
export class ProductDetailsPageComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  product$ = this.store.select(selectSelectedProduct);
  loading$ = this.store.select(selectProductsLoading);
  error$ = this.store.select(selectProductsError);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.store.dispatch(ProductsActions.loadProduct({ id }));
    }
  }

  onAddToCart(): void {
    console.log('Adding to cart from details page');
    // this.store.dispatch(CartActions.addItem({ product }));
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }
}

