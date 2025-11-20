import { Component, OnInit, ChangeDetectionStrategy, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import {
  SimpleProductsService,
  Product,
} from 'data-access';
import { CardComponent, ButtonComponent } from 'ui-kit';

/**
 * Real-Time Demo Component
 * Демонстрирует работу CRUD операций и real-time обновлений
 */
@Component({
  selector: 'app-realtime-demo',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatChipsModule,
    CardComponent,
    ButtonComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="realtime-demo">
      <h1>📡 Real-Time Data Demo</h1>
      <p class="subtitle">HTTP CRUD + Real-Time Updates с Polling</p>

      <!-- Controls -->
      <lib-card title="Управление" class="controls">
        <div class="button-group">
          <lib-button
            variant="primary"
            (clicked)="refresh()"
            [disabled]="(loading$ | async) || false"
          >
            🔄 Обновить данные
          </lib-button>

          <lib-button
            variant="success"
            (clicked)="addRandomProduct()"
            [disabled]="(loading$ | async) || false"
          >
            ➕ Добавить продукт
          </lib-button>

          <lib-button
            variant="danger"
            (clicked)="clearMockData()"
          >
            🗑️ Очистить все
          </lib-button>

          <lib-button
            variant="secondary"
            (clicked)="togglePolling()"
          >
            {{ isPollingActive() ? '⏸️ Остановить' : '▶️ Запустить' }} Polling
          </lib-button>
        </div>

        <div class="info">
          <mat-chip>
            <mat-icon>schedule</mat-icon>
            Polling: каждые 30 сек
          </mat-chip>
          <mat-chip>
            <mat-icon>update</mat-icon>
            Последнее обновление: {{ lastUpdate() | date:'medium' }}
          </mat-chip>
        </div>
      </lib-card>

      <!-- Loading State -->
      @if (loading$ | async) {
        <lib-card>
          <div class="loading-state">
            <mat-spinner diameter="40"></mat-spinner>
            <p>Загрузка данных...</p>
          </div>
        </lib-card>
      }

      <!-- Error State -->
      @if (error$ | async; as error) {
        <lib-card>
          <div class="error-state">
            <mat-icon>error</mat-icon>
            <p>{{ error.message }}</p>
          </div>
        </lib-card>
      }

      <!-- Mock Data Info -->
      <lib-card title="ℹ️ Информация">
        <div class="mock-info">
          <p>
            Это демо использует <strong>mock данные</strong> в памяти,
            так как у нас нет реального backend API.
          </p>
          <p>
            Real-time обновления симулируются через <strong>polling</strong>
            каждые 30 секунд. В реальном приложении можно использовать WebSocket.
          </p>
          <p>
            <strong>Попробуйте:</strong>
          </p>
          <ul>
            <li>Добавить продукт</li>
            <li>Обновить цену</li>
            <li>Удалить продукт</li>
            <li>Посмотрите как данные обновляются автоматически</li>
          </ul>
        </div>
      </lib-card>

      <!-- Products Grid -->
      <div class="products-grid">
        @for (product of data$ | async; track product.id) {
          <lib-card [title]="product.name" [hoverable]="true">
            <div class="product-card">
              <img
                [src]="product.imageUrl"
                [alt]="product.name"
                class="product-image"
              />

              <div class="product-info">
                <p class="description">{{ product.description }}</p>

                <div class="price-section">
                  <span class="price">{{ product.formattedPrice }}</span>
                  <mat-chip [class.in-stock]="product.inStock">
                    {{ product.inStock ? '✅ В наличии' : '❌ Нет' }}
                  </mat-chip>
                </div>

                <div class="meta">
                  <small>Категория: {{ product.category }}</small>
                  <small>ID: {{ product.id }}</small>
                </div>
              </div>

              <div class="actions">
                <lib-button
                  size="small"
                  variant="primary"
                  (clicked)="updatePrice(product)"
                >
                  💰 Изменить цену
                </lib-button>

                <lib-button
                  size="small"
                  variant="danger"
                  (clicked)="deleteProduct(product.id)"
                >
                  🗑️ Удалить
                </lib-button>
              </div>
            </div>
          </lib-card>
        } @empty {
          <lib-card>
            <div class="empty-state">
              <mat-icon>inventory_2</mat-icon>
              <p>Нет продуктов</p>
              <lib-button variant="primary" (clicked)="addRandomProduct()">
                Добавить первый продукт
              </lib-button>
            </div>
          </lib-card>
        }
      </div>

      <!-- Stats -->
      <lib-card title="📊 Статистика">
        <div class="stats">
          <div class="stat">
            <div class="stat-value">{{ (data$ | async)?.length || 0 }}</div>
            <div class="stat-label">Всего продуктов</div>
          </div>
          <div class="stat">
            <div class="stat-value">
              {{ getInStockCount() }}
            </div>
            <div class="stat-label">В наличии</div>
          </div>
          <div class="stat">
            <div class="stat-value">\${{ getTotalValue() }}</div>
            <div class="stat-label">Общая стоимость</div>
          </div>
        </div>
      </lib-card>
    </div>
  `,
  styles: [
    `
      .realtime-demo {
        max-width: 1400px;
        margin: 0 auto;
        padding: 2rem;

        h1 {
          font-size: 2.5rem;
          margin: 0 0 0.5rem 0;
          color: #333;
        }

        .subtitle {
          font-size: 1.2rem;
          color: #666;
          margin: 0 0 2rem 0;
        }
      }

      .controls {
        margin-bottom: 2rem;
      }

      .button-group {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        margin-bottom: 1.5rem;
      }

      .info {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;

        mat-chip {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
      }

      .loading-state,
      .error-state,
      .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 3rem;
        gap: 1rem;

        mat-icon {
          font-size: 3rem;
          width: 3rem;
          height: 3rem;
        }
      }

      .error-state {
        color: #f44336;
      }

      .mock-info {
        p {
          margin: 0.75rem 0;
          line-height: 1.6;
        }

        ul {
          margin: 1rem 0;
          padding-left: 2rem;

          li {
            margin: 0.5rem 0;
          }
        }

        strong {
          color: #2196f3;
        }
      }

      .products-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        gap: 1.5rem;
        margin: 2rem 0;
      }

      .product-card {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .product-image {
        width: 100%;
        height: 200px;
        object-fit: cover;
        border-radius: 4px;
        background: #f5f5f5;
      }

      .product-info {
        flex: 1;

        .description {
          color: #666;
          margin: 0 0 1rem 0;
        }
      }

      .price-section {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 1rem 0;

        .price {
          font-size: 1.5rem;
          font-weight: bold;
          color: #2196f3;
        }

        mat-chip.in-stock {
          background: #4caf50;
          color: white;
        }
      }

      .meta {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        color: #999;
        font-size: 0.85rem;
      }

      .actions {
        display: flex;
        gap: 0.5rem;
        margin-top: auto;
      }

      .stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 2rem;
        text-align: center;

        .stat {
          padding: 1rem;
        }

        .stat-value {
          font-size: 2rem;
          font-weight: bold;
          color: #2196f3;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          color: #666;
          font-size: 0.9rem;
        }
      }
    `,
  ],
})
export class RealtimeDemoComponent implements OnInit {
  // Mock data store
  private mockProducts: Product[] = [];
  private nextId = 1;

  lastUpdate = signal(new Date());
  isPollingActive = signal(true);

  // Real-time service observables - initialized in ngOnInit
  data$!: Observable<Product[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<Error | null>;

  constructor(
    private productsService: SimpleProductsService
  ) {}

  ngOnInit() {
    // Initialize observables
    this.data$ = this.productsService.data$;
    this.loading$ = this.productsService.loading$;
    this.error$ = this.productsService.error$;

    // Обновляем lastUpdate при каждом обновлении данных
    this.data$.subscribe(() => {
      this.lastUpdate.set(new Date());
    });
  }

  refresh() {
    this.productsService.refresh();
  }

  addRandomProduct() {
    const categories = ['Электроника', 'Аксессуары', 'Одежда', 'Книги'];
    const names = ['Продукт', 'Товар', 'Устройство', 'Гаджет'];

    const product: Product = {
      id: String(this.nextId++),
      name: `${names[Math.floor(Math.random() * names.length)]} ${this.nextId}`,
      description: `Описание продукта #${this.nextId}`,
      price: Math.round(Math.random() * 1000 * 100) / 100,
      formattedPrice: '',
      imageUrl: `https://via.placeholder.com/400x300/E91E63/FFFFFF?text=Product${this.nextId}`,
      inStock: Math.random() > 0.3,
      category: categories[Math.floor(Math.random() * categories.length)],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    product.formattedPrice = `$${product.price.toFixed(2)}`;

    this.productsService.addProduct(product);
  }

  updatePrice(product: Product) {
    const newPrice = Math.round(Math.random() * 1000 * 100) / 100;
    const updates: Partial<Product> = {
      price: newPrice,
      formattedPrice: `$${newPrice.toFixed(2)}`,
      updatedAt: new Date(),
    };

    this.productsService.updateProduct(product.id, updates);
  }

  deleteProduct(id: string) {
    this.productsService.deleteProduct(id);
  }

  clearMockData() {
    this.productsService.clearAll();
    this.nextId = 1;
  }

  togglePolling() {
    // Polling всегда активен в SimpleProductsService
    this.isPollingActive.set(!this.isPollingActive());
  }

  getInStockCount(): number {
    const products = this.productsService.getCurrentData();
    return products.filter((p) => p.inStock).length;
  }

  getTotalValue(): string {
    const products = this.productsService.getCurrentData();
    const total = products.reduce((sum, p) => sum + p.price, 0);
    return total.toFixed(2);
  }
}

