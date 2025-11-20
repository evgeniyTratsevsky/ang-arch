# Data Access Library

Библиотека для работы с данными: HTTP CRUD операции, WebSocket и Real-Time обновления.

## 📦 Компоненты

### 1. CrudBaseService

Generic HTTP CRUD сервис для работы с REST API.

#### Возможности:
- ✅ CRUD операции (Create, Read, Update, Delete)
- ✅ Пагинация
- ✅ Фильтрация и сортировка
- ✅ Bulk операции
- ✅ Retry логика
- ✅ Автоматический маппинг DTO ↔ UI Model
- ✅ Обработка ошибок
- ✅ Кеширование через shareReplay

#### Использование:

```typescript
import { CrudBaseService } from 'data-access';

interface Product {
  id: string;
  name: string;
  price: number;
}

interface ProductDto {
  id: string;
  name: string;
  price_cents: number;
}

@Injectable({ providedIn: 'root' })
export class ProductsService extends CrudBaseService<Product, ProductDto> {
  constructor() {
    super('/api/products');
  }

  protected override mapFromDto(dto: ProductDto): Product {
    return {
      id: dto.id,
      name: dto.name,
      price: dto.price_cents / 100,
    };
  }

  protected override mapToDto(model: Partial<Product>): Partial<ProductDto> {
    return {
      name: model.name,
      price_cents: model.price ? Math.round(model.price * 100) : undefined,
    };
  }
}

// В компоненте
this.productsService.getAll().subscribe(products => {
  console.log('Products:', products);
});

this.productsService.create({ name: 'New Product', price: 99.99 })
  .subscribe(product => {
    console.log('Created:', product);
  });
```

#### API методы:

```typescript
// Получить все
getAll(params?, config?): Observable<TModel[]>
getAllPaginated(params?, config?): Observable<PaginatedResponse<TModel>>

// Получить по ID
getById(id, config?): Observable<TModel>

// Создать
create(data, config?): Observable<TModel>

// Обновить
update(id, data, config?): Observable<TModel>
patch(id, data, config?): Observable<TModel>

// Удалить
delete(id, config?): Observable<void>

// Bulk операции
bulkCreate(items, config?): Observable<TModel[]>
bulkDelete(ids, config?): Observable<void>
```

---

### 2. WebSocketService

Сервис для WebSocket коммуникации с автоматическим переподключением.

#### Возможности:
- ✅ Подключение к WebSocket серверу
- ✅ Автоматическое переподключение
- ✅ Типизированные сообщения
- ✅ Event-based подписки
- ✅ Обработка ошибок

#### Использование:

```typescript
import { WebSocketService } from 'data-access';

@Component({/*...*/})
export class MyComponent implements OnInit {
  constructor(private wsService: WebSocketService) {}

  ngOnInit() {
    // Подключиться
    this.wsService.connect({
      url: 'ws://localhost:3000',
      reconnect: true,
      reconnectInterval: 5000,
      reconnectAttempts: 10,
    }).subscribe();

    // Подписаться на события
    this.wsService.on<Product>('product:updated')
      .subscribe(product => {
        console.log('Product updated:', product);
      });

    // Отправить сообщение
    this.wsService.send('product:create', {
      name: 'New Product',
      price: 99.99,
    });
  }

  ngOnDestroy() {
    this.wsService.disconnect();
  }
}
```

#### API методы:

```typescript
// Подключение
connect(config): Observable<any>

// Отправка
send<T>(type: string, data: T): void

// Подписка на события
on<T>(type: string): Observable<T>
getAllMessages(): Observable<WebSocketMessage>

// Управление
disconnect(): void
reconnect(): void
isConnected(): boolean
```

---

### 3. RealTimeDataService

Абстрактный сервис для real-time обновления данных через WebSocket или polling.

#### Возможности:
- ✅ WebSocket real-time обновления
- ✅ Polling fallback
- ✅ Автоматическая загрузка данных
- ✅ Оптимистичные обновления
- ✅ Loading и error states
- ✅ Ручное обновление

#### Использование:

```typescript
import { RealTimeDataService, WebSocketService } from 'data-access';

@Injectable({ providedIn: 'root' })
export class ProductsRealTimeService extends RealTimeDataService<Product> {
  constructor(
    productsApi: ProductsApiService,
    wsService: WebSocketService
  ) {
    super(productsApi, wsService, {
      useWebSocket: true,
      websocketUrl: 'ws://localhost:3000',
      websocketEvent: 'products:updated',
      usePolling: true,
      pollingInterval: 30000, // 30 секунд
      autoStart: true,
    });
  }
}

// В компоненте
@Component({
  template: `
    @if (loading$ | async) {
      <p>Loading...</p>
    }

    @if (error$ | async; as error) {
      <p>Error: {{ error.message }}</p>
    }

    @for (product of data$ | async; track product.id) {
      <div>{{ product.name }} - {{ product.formattedPrice }}</div>
    }

    <button (click)="refresh()">Refresh</button>
  `
})
export class ProductsComponent {
  constructor(private productsRealTime: ProductsRealTimeService) {}

  data$ = this.productsRealTime.data$;
  loading$ = this.productsRealTime.loading$;
  error$ = this.productsRealTime.error$;

  refresh() {
    this.productsRealTime.refresh();
  }
}
```

#### API свойства:

```typescript
// Observables
data$: Observable<T[]>
loading$: Observable<boolean>
error$: Observable<Error | null>
```

#### API методы:

```typescript
// Управление
start(): void
stop(): void
refresh(): void

// Данные
getCurrentData(): T[]

// Оптимистичные обновления
addItemOptimistic(item: T): void
updateItemOptimistic(predicate, updates): void
removeItemOptimistic(predicate): void
```

---

## 🎯 Примеры использования

### Пример 1: Простой CRUD

```typescript
import { ProductsApiService } from 'data-access';

@Component({/*...*/})
export class ProductsComponent {
  products$ = this.productsApi.getAll();

  constructor(private productsApi: ProductsApiService) {}

  createProduct() {
    this.productsApi.create({
      name: 'New Product',
      price: 99.99,
      category: 'electronics',
    }).subscribe(product => {
      console.log('Created:', product);
    });
  }

  updateProduct(id: string) {
    this.productsApi.update(id, {
      price: 149.99,
    }).subscribe(product => {
      console.log('Updated:', product);
    });
  }

  deleteProduct(id: string) {
    this.productsApi.delete(id).subscribe(() => {
      console.log('Deleted');
    });
  }
}
```

### Пример 2: Real-Time с WebSocket

```typescript
import { ProductsRealTimeService, WebSocketService } from 'data-access';

@Component({
  template: `
    <div class="products">
      @for (product of data$ | async; track product.id) {
        <product-card [product]="product" />
      }
    </div>
  `
})
export class ProductsComponent implements OnInit {
  data$ = this.productsRealTime.data$;

  constructor(
    private productsRealTime: ProductsRealTimeService,
    private wsService: WebSocketService
  ) {}

  ngOnInit() {
    // Real-time обновления уже работают (autoStart: true)
    
    // Или можно подключиться вручную к WebSocket
    this.wsService.on<Product>('product:created')
      .subscribe(product => {
        console.log('New product:', product);
        this.productsRealTime.addProduct(product);
      });
  }
}
```

### Пример 3: С NgRx Effects

```typescript
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductsApiService } from 'data-access';
import { ProductsActions } from './products.actions';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ProductsEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadProducts),
      switchMap(() =>
        this.productsApi.getAll().pipe(
          map(products => 
            ProductsActions.loadProductsSuccess({ products })
          ),
          catchError(error =>
            of(ProductsActions.loadProductsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private productsApi: ProductsApiService
  ) {}
}
```

### Пример 4: Polling без WebSocket

```typescript
@Injectable({ providedIn: 'root' })
export class DashboardDataService extends RealTimeDataService<DashboardData> {
  constructor(
    dashboardApi: DashboardApiService,
    wsService: WebSocketService
  ) {
    super(dashboardApi, wsService, {
      useWebSocket: false,
      usePolling: true,
      pollingInterval: 5000, // Обновлять каждые 5 секунд
      autoStart: true,
    });
  }
}
```

---

## 🏗️ Архитектурные паттерны

### Паттерн 1: Разделение ответственности

```
Component (Smart)
    ↓
RealTimeDataService (Real-time updates)
    ↓
CrudBaseService (HTTP CRUD)
    ↓
Backend API
```

### Паттерн 2: DTO → UI Model

```typescript
// Backend DTO
interface ProductDto {
  price_cents: number;
  image_url: string;
  created_at: string;
}

// UI Model
interface Product {
  price: number;
  formattedPrice: string;
  imageUrl: string;
  createdAt: Date;
}

// Mapper в CrudBaseService
protected mapFromDto(dto: ProductDto): Product {
  return {
    price: dto.price_cents / 100,
    formattedPrice: `$${(dto.price_cents / 100).toFixed(2)}`,
    imageUrl: dto.image_url,
    createdAt: new Date(dto.created_at),
  };
}
```

### Паттерн 3: Оптимистичные обновления

```typescript
createProduct(product: Partial<Product>) {
  // Оптимистичное обновление UI
  const tempProduct = { ...product, id: 'temp-' + Date.now() } as Product;
  this.realTimeService.addItemOptimistic(tempProduct);

  // Отправка на сервер
  this.apiService.create(product).subscribe({
    next: (created) => {
      // Обновить с реальным ID
      this.realTimeService.updateItemOptimistic(
        p => p.id === tempProduct.id,
        created
      );
    },
    error: (error) => {
      // Откатить при ошибке
      this.realTimeService.removeItemOptimistic(
        p => p.id === tempProduct.id
      );
    }
  });
}
```

---

## ✅ Best Practices

1. **Всегда используйте маппинг DTO → UI Model**
   - Не просачивайте backend структуры во frontend

2. **Используйте async pipe вместо subscribe**
   - Автоматическое управление подписками

3. **Обрабатывайте ошибки**
   - Переопределите `handleError` в CrudBaseService

4. **Используйте shareReplay для кеширования**
   - Уже встроено в CrudBaseService

5. **Real-time через WebSocket, fallback на polling**
   - Graceful degradation

6. **Оптимистичные обновления для лучшего UX**
   - Обновляйте UI сразу, откатывайте при ошибках

---

## 🧪 Тестирование

```typescript
describe('ProductsApiService', () => {
  let service: ProductsApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsApiService],
    });

    service = TestBed.inject(ProductsApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should map DTO to UI model', () => {
    service.getAll().subscribe(products => {
      expect(products[0].price).toBe(99.99);
      expect(products[0].formattedPrice).toBe('$99.99');
    });

    const req = httpMock.expectOne('/api/products');
    req.flush([{ id: '1', name: 'Test', price_cents: 9999 }]);
  });
});
```

---

## 📚 Дополнительные ресурсы

- [RxJS Documentation](https://rxjs.dev/)
- [WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
- [Angular HttpClient](https://angular.dev/guide/http)
