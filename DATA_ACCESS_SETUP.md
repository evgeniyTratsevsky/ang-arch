# 🔧 Data Access Library - Setup Guide

## ✅ Что создано

### 📦 Библиотека data-access

Расположение: `libs/data-access/`

**Экспортирует:**
- `SimpleCrudService` - Generic CRUD сервис
- `WebSocketService` - WebSocket коммуникация
- `SimpleProductsService` - Демо-сервис с mock данными

### 🎯 Демо приложение

Расположение: `apps/main-application/src/app/features/realtime-demo/`

**Компонент:** `RealtimeDemoComponent`
- Демонстрирует real-time обновления
- Polling каждые 30 секунд
- CRUD операции
- Mock данные

## 🚀 Быстрый старт

### 1. Запуск приложения

```bash
cd c:\Wokrspace\Angular\Architecture\arch-app

# Запустить dev server
npx nx serve main-application

# Открыть http://localhost:4200/demo
```

### 2. Использование в своих компонентах

#### Вариант A: SimpleCrudService (рекомендуется)

```typescript
import { Injectable } from '@angular/core';
import { SimpleCrudService } from 'data-access';

interface User {
  id: string;
  name: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class UsersService extends SimpleCrudService<User> {
  protected baseUrl = '/api/users';
}

// В компоненте
@Component({/*...*/})
export class UsersComponent {
  users$ = this.usersService.getAll();
  
  constructor(private usersService: UsersService) {}
  
  createUser(user: User) {
    this.usersService.create(user).subscribe(created => {
      console.log('Created:', created);
    });
  }
}
```

#### Вариант B: SimpleProductsService (для демо)

```typescript
import { SimpleProductsService } from 'data-access';

@Component({
  template: `
    @for (product of data$ | async; track product.id) {
      <div>{{ product.name }}</div>
    }
  `
})
export class ProductsComponent {
  data$ = this.productsService.data$;
  
  constructor(private productsService: SimpleProductsService) {}
}
```

#### Вариант C: WebSocket (для real-time)

```typescript
import { WebSocketService } from 'data-access';

@Component({/*...*/})
export class LiveDataComponent implements OnInit {
  constructor(private wsService: WebSocketService) {}
  
  ngOnInit() {
    // Подключиться к WebSocket
    this.wsService.connect('ws://localhost:3000').subscribe();
    
    // Подписаться на события
    this.wsService.on<Data>('data:updated')
      .subscribe(data => {
        console.log('Real-time update:', data);
      });
  }
  
  sendMessage() {
    this.wsService.send('data:create', { value: 'test' });
  }
}
```

## 📊 Архитектура

```
apps/main-application/
  └── features/realtime-demo/
      └── realtime-demo.component.ts  (Smart Component)
          ↓ uses
libs/data-access/
  ├── services/
  │   ├── simple-crud.service.ts     (Generic CRUD)
  │   ├── websocket.service.ts       (WebSocket)
  │   └── crud-base.service.ts       (Advanced - в разработке)
  └── examples/
      └── simple-products.service.ts (Mock data + polling)
```

## 🎯 Best Practices

### 1. Smart vs Dumb Components

```typescript
// SMART Component - работает с сервисами
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsPageComponent {
  products$ = this.productsService.data$;
  
  constructor(private productsService: SimpleProductsService) {}
}

// DUMB Component - только отображение
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  product = input.required<Product>();
  clicked = output<Product>();
}
```

### 2. Async Pipe

```typescript
// ✅ ХОРОШО - используем async pipe
<div *ngFor="let item of items$ | async">
  {{ item.name }}
</div>

// ❌ ПЛОХО - не подписываемся в коде
ngOnInit() {
  this.items$.subscribe(items => {
    this.items = items; // утечка памяти!
  });
}
```

### 3. OnPush Change Detection

```typescript
// ✅ Всегда используйте OnPush
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
})
```

### 4. Error Handling

```typescript
@Component({
  template: `
    @if (error$ | async; as error) {
      <div class="error">{{ error.message }}</div>
    }
  `
})
export class MyComponent {
  error$ = this.service.error$;
}
```

## 🧪 Тестирование

```bash
# Тестировать библиотеку
npx nx test data-access

# Тестировать приложение
npx nx test main-application
```

## 📚 Дополнительная документация

- `libs/data-access/README.md` - Полная документация библиотеки
- `libs/data-access/EXAMPLES.md` - Примеры использования
- `ARCHITECTURE.md` - Общая архитектура проекта
- `MONOREPO_STRUCTURE.md` - Структура Nx монорепо

## 🐛 Known Issues

1. **CrudBaseService** - требует доработки типизации для Angular 19
   - **Workaround:** Используйте `SimpleCrudService`

2. **RealTimeDataService** - требует доработки типизации
   - **Workaround:** Используйте `SimpleProductsService` как пример

## 🎉 Результат

✅ **HTTP CRUD Wrapper** - создан (SimpleCrudService)
✅ **Real-Time получение данных** - работает (polling в SimpleProductsService)
✅ **WebSocket сервис** - готов к использованию
✅ **Демо приложение** - работает и собирается
✅ **Best practices** - соблюдены

Проект готов к разработке! 🚀

