# Angular Architecture Guide

## 🏗️ Архитектура проекта

Этот проект следует современным best practices Angular разработки 2025 года.

## 📁 Структура проекта

```
src/app/
├── core/                          # Core модуль - singleton сервисы
│   ├── interceptors/              # HTTP interceptors
│   └── services/                  # Глобальные сервисы (auth, logger, etc.)
│       └── index.ts               # Barrel file
│
├── shared/                        # Shared модуль - переиспользуемые компоненты
│   ├── components/                # Dumb компоненты общего назначения
│   ├── pipes/                     # Pipes
│   ├── directives/                # Directives
│   └── components/index.ts        # Barrel file
│
└── features/                      # Feature модули
    └── products/                  # Пример feature модуля
        ├── components/            # DUMB компоненты (презентационные)
        │   ├── product-card.component.ts
        │   └── product-list.component.ts
        │
        ├── containers/            # SMART компоненты (контейнеры)
        │   ├── products-page.component.ts
        │   └── product-details-page.component.ts
        │
        ├── services/              # Data services (API коннекторы)
        │   └── products-data.service.ts
        │
        ├── store/                 # NgRx store
        │   ├── products.actions.ts
        │   ├── products.reducer.ts
        │   ├── products.effects.ts
        │   └── products.selectors.ts
        │
        ├── models/                # Модели и DTOs
        │   └── product.model.ts
        │
        ├── products.routes.ts     # Lazy-loaded routes
        └── index.ts               # Barrel file (публичный API)
```

## 🎯 Ключевые принципы

### 1. **Standalone Components**
- ✅ Используем только standalone компоненты
- ❌ NgModules больше не используются
- Более простая и эргономичная структура

### 2. **Smart vs Dumb Components**

#### Dumb Components (Презентационные)
- ✅ OnPush change detection
- ✅ Обязательные inputs через `input.required()`
- ✅ События через `output()`
- ❌ НЕТ подписок на observables в коде
- ❌ НЕТ доступа к store/services
- 🎯 Только отображение данных

```typescript
@Component({
  selector: 'app-product-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  product = input.required<Product>();  // Обязательный input
  addToCart = output<Product>();        // Output для событий
}
```

#### Smart Components (Контейнеры)
- ✅ OnPush change detection
- ✅ Работают со store/services
- ✅ async pipe для подписки на observables
- ❌ НЕТ прямых подписок в коде (только async pipe)
- 🎯 Обработка бизнес-логики

```typescript
@Component({
  selector: 'app-products-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsPageComponent {
  private store = inject(Store);
  
  // Используем async pipe в шаблоне
  products$ = this.store.select(selectAllProducts);
  
  // <app-product-list [products]="products$ | async" />
}
```

### 3. **OnPush Change Detection**
- ✅ Используется везде по умолчанию
- Заставляет писать более чистый код
- Улучшает производительность

### 4. **Async Pipe > Subscriptions**
- ✅ НЕ подписываемся на observables в коде
- ✅ Используем async pipe в шаблонах (90% времени)
- Автоматическое управление подписками
- Нет утечек памяти

### 5. **Lazy Loading**
- ✅ Ленивая загрузка всех feature модулей
- ✅ `loadComponent()` для компонентов
- ✅ `loadChildren()` для routes

```typescript
{
  path: 'products',
  loadChildren: () => import('./features/products/products.routes')
    .then(m => m.PRODUCTS_ROUTES)
}
```

### 6. **NgRx State Management**
- ✅ NgRx для глобального состояния
- ✅ Entity adapter для коллекций
- ✅ Effects для side effects
- ✅ Redux DevTools для отладки
- 🎯 Профессиональный подход к управлению состоянием

### 7. **Data Flow**

```
Backend DTO → Data Service → Mapper → UI Model → Component
     ↓
  NgRx Store
     ↓
  Selectors
     ↓
Smart Component (async pipe)
     ↓
Dumb Component (inputs)
```

#### НЕ просачиваем backend код в frontend!

```typescript
// ❌ ПЛОХО - используем DTO напрямую
interface ProductDto {
  price_cents: number;
  image_url: string;
}

// ✅ ХОРОШО - создаем UI модель
interface Product {
  price: number;
  formattedPrice: string;
  imageUrl: string;
}

// Mapper для преобразования
class ProductMapper {
  static fromDto(dto: ProductDto): Product { ... }
}
```

### 8. **Data Services**
- ✅ Простые коннекторы к API
- ✅ Преобразуют DTO в UI модели
- ❌ НЕ содержат бизнес-логику
- ❌ НЕ обрабатывают ошибки (это делает контейнер/effects)

```typescript
@Injectable({ providedIn: 'root' })
export class ProductsDataService {
  private http = inject(HttpClient);
  
  getProducts(): Observable<Product[]> {
    return this.http.get<ProductDto[]>('/api/products')
      .pipe(map(dtos => ProductMapper.fromDtoList(dtos)));
  }
}
```

### 9. **Barrel Files (index.ts)**
- ✅ Публичный API для каждого модуля
- ✅ Экспортируем только необходимое
- 🎯 Лучшая инкапсуляция чем NgModules

```typescript
// features/products/index.ts
export * from './models/product.model';
export * from './containers/products-page.component';
export * from './store/products.selectors';
export * from './store/products.actions';

// Приватные компоненты и сервисы НЕ экспортируются
```

### 10. **RxJS Best Practices**
- ✅ Операторы вместо подписок
- ✅ eslint-plugin-rxjs-angular для проверки
- ✅ switchMap, exhaustMap, concatMap вместо subscribe

## 🛠️ Технологический стек

- **Angular 19** - последняя версия
- **TypeScript** - strict mode
- **Nx** - tooling (Prettier, ESLint, Jest)
- **NgRx** - state management
- **Angular Material** - UI библиотека
- **Jest** - тестирование
- **SCSS** - стили
- **ESLint** - линтинг
- **Prettier** - форматирование

## 📝 Генерация кода через Nx

```bash
# Создать новый feature модуль
nx g @nx/angular:library my-feature --standalone

# Создать smart component
nx g @nx/angular:component my-page --changeDetection=OnPush --standalone

# Создать dumb component  
nx g @nx/angular:component my-card --changeDetection=OnPush --standalone

# Создать service
nx g @nx/angular:service my-data --project=my-feature
```

## 🧪 Тестирование

- ✅ Jest вместо Karma
- ✅ Тестируем как пользователь
- ✅ Мокаем только внешние сервисы
- ✅ Фокус на контейнерах и бизнес-логике

```bash
# Запуск тестов
npm run test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage
```

## 🔍 Линтинг и форматирование

```bash
# ESLint
nx lint

# Prettier
npx prettier --write .
```

## 🚀 Команды разработки

```bash
# Development server
npm start

# Production build
npm run build

# Run tests
npm test

# Lint
nx lint
```

## 📚 Дополнительные ресурсы

- [Angular Best Practices](https://angular.dev/best-practices)
- [NgRx Documentation](https://ngrx.io/)
- [Nx Documentation](https://nx.dev/)
- [Angular Material](https://material.angular.io/)

