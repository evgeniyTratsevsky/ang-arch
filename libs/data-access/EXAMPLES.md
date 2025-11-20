# 📚 Data Access Library - Examples

## ✅ Успешно реализовано

### 1. SimpleCrudService

Generic CRUD сервис для быстрой разработки.

```typescript
import { SimpleCrudService } from 'data-access';

export interface User {
  id: string;
  name: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class UsersService extends SimpleCrudService<User> {
  protected baseUrl = '/api/users';
}

// Использование
const users$ = this.usersService.getAll();
```

### 2. SimpleProductsService

Демо-сервис с mock данными и real-time обновлениями через polling.

```typescript
import { SimpleProductsService } from 'data-access';

@Component({/*...*/})
export class ProductsComponent {
  data$ = this.productsService.data$;
  loading$ = this.productsService.loading$;
  
  constructor(private productsService: SimpleProductsService) {}
  
  addProduct() {
    this.productsService.addProduct(newProduct);
  }
}
```

### 3. WebSocketService

Сервис для WebSocket коммуникации (готов к использованию).

```typescript
import { WebSocketService } from 'data-access';

this.wsService.connect('ws://localhost:3000').subscribe();

this.wsService.on<Product>('product:updated')
  .subscribe(product => console.log(product));

this.wsService.send('product:create', { name: 'New' });
```

## 📦 Доступно в исходниках

### CrudBaseService

Расширенный CRUD сервис с:
- DTO → UI Model mapping
- Пагинация
- Retry логика
- Кеширование

**Статус:** Требует доработки типизации для Angular 19

### RealTimeDataService

Абстрактный сервис для real-time обновлений через:
- WebSocket
- Polling
- Оптимистичные обновления

**Статус:** Требует доработки типизации для Angular 19

## 🚀 Запуск демо

```bash
# Запустить приложение
npx nx serve main-application

# Открыть http://localhost:4200/demo
```

## 🎯 Real-Time Demo Features

- ✅ Mock данные в памяти
- ✅ Polling каждые 30 секунд
- ✅ CRUD операции (Create, Update, Delete)
- ✅ Оптимистичные обновления UI
- ✅ Loading и Error states
- ✅ Статистика в real-time

## 📝 Roadmap

- [ ] Исправить типизацию CrudBaseService для Angular 19
- [ ] Добавить поддержку Server-Sent Events
- [ ] Добавить offline mode
- [ ] Добавить кеширование запросов
- [ ] Интеграция с NgRx

