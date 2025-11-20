# HTTP Interceptors

Коллекция HTTP interceptors для обработки запросов и ответов.

## 📦 Доступные Interceptors

### 1. httpHeadersInterceptor
Добавляет стандартные HTTP headers ко всем запросам.

**Добавляемые headers:**
- `Content-Type: application/json`
- `Accept: application/json`
- `X-Requested-With: XMLHttpRequest`
- `X-App-Version: 1.0.0`

**Использование:**
```typescript
provideHttpClient(
  withInterceptors([httpHeadersInterceptor])
)
```

### 2. authInterceptor
Добавляет токен авторизации к защищенным запросам.

**Функции:**
- Автоматически добавляет `Authorization: Bearer {token}`
- Пропускает публичные URLs
- Читает токен из localStorage

**Использование:**
```typescript
// Сохранить токен
localStorage.setItem('auth_token', 'your-jwt-token');

// Interceptor автоматически добавит его к запросам
```

### 3. errorHandlingInterceptor
Обрабатывает HTTP ошибки и retry логику.

**Функции:**
- Retry для GET запросов (2 попытки)
- Обработка специфичных статус кодов (401, 403, 404, 500, 503)
- Логирование ошибок
- Форматирование error messages

**Обрабатываемые ошибки:**
- `401 Unauthorized` - токен истек
- `403 Forbidden` - недостаточно прав
- `404 Not Found` - ресурс не найден
- `500 Internal Server Error` - ошибка сервера
- `503 Service Unavailable` - сервис недоступен

### 4. loggingInterceptor
Логирует все HTTP запросы и ответы (только в development).

**Функции:**
- Логирует request (URL, method, headers, body)
- Логирует response (status, body, duration)
- Логирует errors
- Работает только в development режиме

**Пример вывода:**
```
🔵 HTTP GET /api/products
📤 Request: { url, method, headers, body }
📥 Response: { status: 200, body, duration: "123ms" }
```

### 5. cacheInterceptor
Кеширует GET запросы на 5 минут.

**Функции:**
- Кеширует только GET запросы
- TTL: 5 минут
- Пропускает определенные URLs
- Автоматически очищает устаревший кеш

**Использование:**
```typescript
import { clearHttpCache } from './core/interceptors';

// Очистить кеш вручную
clearHttpCache();
```

### 6. loadingInterceptor
Управляет глобальным состоянием загрузки.

**Функции:**
- Автоматически отслеживает активные запросы
- Логирует начало и завершение запросов
- Пропускает polling endpoints

## 🔧 Настройка

### Порядок interceptors (важно!)

```typescript
provideHttpClient(
  withInterceptors([
    loggingInterceptor,        // 1. Логирование (первым)
    httpHeadersInterceptor,    // 2. Стандартные headers
    authInterceptor,           // 3. Авторизация
    cacheInterceptor,          // 4. Кеширование
    loadingInterceptor,        // 5. Loading state
    errorHandlingInterceptor,  // 6. Обработка ошибок (последним)
  ])
)
```

**Почему порядок важен:**
- Логирование должно быть первым, чтобы видеть все изменения
- Headers добавляются перед авторизацией
- Кеширование происходит до обработки ошибок
- Обработка ошибок должна быть последней

## 📝 Примеры использования

### Добавить кастомный header к одному запросу

```typescript
this.http.get('/api/data', {
  headers: {
    'X-Custom-Header': 'value'
  }
}).subscribe();
```

### Пропустить interceptor для конкретного запроса

```typescript
// Добавьте проверку URL в interceptor
function shouldSkip(url: string): boolean {
  return url.includes('/api/skip-this');
}
```

### Обработать ошибку в компоненте

```typescript
this.http.get('/api/data').pipe(
  catchError(error => {
    console.error('Component error handler:', error);
    return of(null);
  })
).subscribe();
```

## 🎯 Best Practices

### 1. Не дублируйте логику
Interceptors - это cross-cutting concerns. Не дублируйте их логику в компонентах.

### 2. Используйте environment variables
```typescript
// Вместо хардкода
const isDevelopment = !environment.production;
```

### 3. Типизируйте ошибки
```typescript
interface ApiError {
  message: string;
  code: string;
  details?: any;
}
```

### 4. Тестируйте interceptors
```typescript
describe('httpHeadersInterceptor', () => {
  it('should add headers', () => {
    // Test implementation
  });
});
```

## 🔍 Debugging

### Включить детальное логирование
```typescript
// В loggingInterceptor
const isDevelopment = true; // Принудительно включить
```

### Посмотреть какие interceptors сработали
Проверьте console в браузере - каждый interceptor логирует свою работу.

### Проверить headers в Network tab
Откройте DevTools → Network → выберите запрос → Headers

## 🚀 Расширение

### Добавить новый interceptor

1. Создайте файл в `src/app/core/interceptors/`
2. Экспортируйте через `index.ts`
3. Добавьте в `app.config.ts`

```typescript
// my-custom.interceptor.ts
export const myCustomInterceptor: HttpInterceptorFn = (req, next) => {
  // Your logic
  return next(req);
};

// index.ts
export * from './my-custom.interceptor';

// app.config.ts
withInterceptors([
  myCustomInterceptor,
  // ... other interceptors
])
```

## 📚 Дополнительные ресурсы

- [Angular HttpClient](https://angular.dev/guide/http)
- [HTTP Interceptors Guide](https://angular.dev/guide/http/interceptors)
- [RxJS Operators](https://rxjs.dev/guide/operators)

