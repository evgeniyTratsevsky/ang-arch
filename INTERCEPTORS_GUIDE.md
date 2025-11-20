# 🔧 HTTP Interceptors Guide

## ✅ Создано

### 📦 6 HTTP Interceptors

Все interceptors расположены в `src/app/core/interceptors/`

#### 1. **httpHeadersInterceptor** - Стандартные Headers
```typescript
// Автоматически добавляет:
'Content-Type': 'application/json'
'Accept': 'application/json'
'X-Requested-With': 'XMLHttpRequest'
'X-App-Version': '1.0.0'
```

#### 2. **authInterceptor** - Авторизация
```typescript
// Добавляет JWT токен к защищенным запросам
'Authorization': 'Bearer {token}'

// Использование:
localStorage.setItem('auth_token', 'your-jwt-token');
```

#### 3. **errorHandlingInterceptor** - Обработка ошибок
```typescript
// Функции:
- Retry для GET запросов (2 попытки)
- Обработка 401, 403, 404, 500, 503
- Логирование ошибок
- Форматирование error messages
```

#### 4. **loggingInterceptor** - Логирование (dev only)
```typescript
// Логирует:
🔵 HTTP GET /api/products
📤 Request: { url, method, headers, body }
📥 Response: { status: 200, body, duration: "123ms" }
❌ Error: { status: 404, message }
```

#### 5. **cacheInterceptor** - Кеширование
```typescript
// Кеширует GET запросы на 5 минут
import { clearHttpCache } from './core/interceptors';

clearHttpCache(); // Очистить кеш
```

#### 6. **loadingInterceptor** - Loading State
```typescript
// Отслеживает активные HTTP запросы
// Логирует начало и завершение
```

## 🚀 Использование

### Уже настроено в app.config.ts!

```typescript
provideHttpClient(
  withInterceptors([
    loggingInterceptor,        // 1. Логирование
    httpHeadersInterceptor,    // 2. Headers
    authInterceptor,           // 3. Auth
    cacheInterceptor,          // 4. Cache
    loadingInterceptor,        // 5. Loading
    errorHandlingInterceptor,  // 6. Errors
  ])
)
```

**Порядок важен!** Interceptors выполняются в указанном порядке.

## 📝 Примеры

### 1. Авторизация

```typescript
// В login компоненте
login(credentials) {
  this.authService.login(credentials).subscribe(response => {
    localStorage.setItem('auth_token', response.token);
    // Теперь все запросы будут с Authorization header
  });
}
```

### 2. Обработка ошибок

```typescript
// Interceptor автоматически обрабатывает ошибки
this.http.get('/api/protected').subscribe({
  next: data => console.log(data),
  error: error => {
    // Ошибка уже обработана interceptor
    // Здесь можно добавить UI логику
    this.showErrorToast(error.message);
  }
});
```

### 3. Кеширование

```typescript
// GET запросы автоматически кешируются на 5 минут
this.http.get('/api/products').subscribe(/*...*/);

// Второй запрос вернется из кеша
this.http.get('/api/products').subscribe(/*...*/);

// Очистить кеш вручную
import { clearHttpCache } from './core/interceptors';
clearHttpCache();
```

### 4. Кастомные headers для одного запроса

```typescript
this.http.get('/api/data', {
  headers: {
    'X-Custom-Header': 'value',
    'X-Another-Header': 'another-value'
  }
}).subscribe();
```

### 5. Пропустить interceptor

Если нужно пропустить определенный interceptor для URL:

```typescript
// В interceptor файле
function shouldSkip(url: string): boolean {
  return url.includes('/api/public') || 
         url.includes('/api/no-auth');
}

if (shouldSkip(req.url)) {
  return next(req);
}
```

## 🎯 Best Practices

### ✅ DO

```typescript
// ✅ Используйте interceptors для cross-cutting concerns
provideHttpClient(withInterceptors([authInterceptor]));

// ✅ Логируйте в interceptors
console.log('[AuthInterceptor] Added token');

// ✅ Обрабатывайте ошибки централизованно
catchError((error: HttpErrorResponse) => {
  this.handleError(error);
  return throwError(() => error);
});

// ✅ Клонируйте requests перед изменением
const modifiedReq = req.clone({
  setHeaders: { 'Authorization': `Bearer ${token}` }
});
```

### ❌ DON'T

```typescript
// ❌ Не модифицируйте оригинальный request
req.headers.set('Auth', token); // ОШИБКА!

// ❌ Не добавляйте тяжелую логику в interceptors
// Interceptors должны быть быстрыми

// ❌ Не забывайте вызвать next()
export const myInterceptor: HttpInterceptorFn = (req, next) => {
  // ... logic ...
  return next(req); // Обязательно!
};
```

## 🔍 Debugging

### 1. Проверить какие interceptors сработали

Откройте Console в браузере - каждый interceptor логирует свою работу:

```
[HttpHeadersInterceptor] Request: { url, method, headers }
[AuthInterceptor] Added token to request: /api/data
[CacheInterceptor] Cache hit: /api/products
```

### 2. Проверить headers в Network tab

DevTools → Network → выберите запрос → Headers

### 3. Временно отключить interceptor

```typescript
// В app.config.ts закомментируйте нужный
withInterceptors([
  loggingInterceptor,
  // authInterceptor,  // Отключен
  errorHandlingInterceptor,
])
```

## 📊 Текущая конфигурация

```
Request Flow:
    ↓
1. loggingInterceptor       - Логирует запрос
    ↓
2. httpHeadersInterceptor   - Добавляет стандартные headers
    ↓
3. authInterceptor          - Добавляет Authorization
    ↓
4. cacheInterceptor         - Проверяет кеш (GET only)
    ↓
5. loadingInterceptor       - Начинает loading
    ↓
6. HTTP Request → Backend
    ↓
Response Flow:
    ↓
6. loadingInterceptor       - Заканчивает loading
    ↓
5. cacheInterceptor         - Сохраняет в кеш
    ↓
4. authInterceptor          - (no-op)
    ↓
3. httpHeadersInterceptor   - (no-op)
    ↓
2. errorHandlingInterceptor - Обрабатывает ошибки
    ↓
1. loggingInterceptor       - Логирует ответ
    ↓
Component
```

## 📁 Файлы

```
src/app/core/interceptors/
├── http-headers.interceptor.ts    ✅ Headers
├── auth.interceptor.ts            ✅ Authorization
├── error-handling.interceptor.ts  ✅ Error handling
├── loading.interceptor.ts         ✅ Loading state
├── logging.interceptor.ts         ✅ Logging
├── cache.interceptor.ts           ✅ Caching
├── index.ts                       ✅ Barrel file
└── README.md                      ✅ Документация
```

## 🧪 Тестирование

```bash
# Запустить приложение
npx nx serve main-application

# Открыть http://localhost:4200
# Открыть DevTools → Console
# Посмотреть логи interceptors
```

## 🎓 Обучающие примеры

### Пример 1: Посмотреть логирование

1. Запустите `npx nx serve main-application`
2. Откройте Console
3. Перейдите на `/demo`
4. Увидите:

```
🔵 HTTP GET /api/products
📤 Request: {...}
[HttpHeadersInterceptor] Request: /api/products
[AuthInterceptor] No token found
[CacheInterceptor] Cache miss
📥 Response: { status: 200, duration: "45ms" }
```

### Пример 2: Тестировать авторизацию

```typescript
// В Console браузера
localStorage.setItem('auth_token', 'test-token-123');

// Теперь сделайте запрос
// В Console увидите:
[AuthInterceptor] Added token to request
```

### Пример 3: Тестировать кеш

```typescript
// Первый запрос
this.http.get('/api/products').subscribe();
// Console: [CacheInterceptor] Cache miss

// Второй запрос (в течение 5 минут)
this.http.get('/api/products').subscribe();
// Console: [CacheInterceptor] Cache hit
```

## 🚀 Результат

✅ **6 профессиональных HTTP interceptors**
✅ **Автоматическая обработка headers**
✅ **JWT авторизация**
✅ **Централизованная обработка ошибок**
✅ **Умное кеширование**
✅ **Детальное логирование**
✅ **Loading state tracking**
✅ **Полная документация**

Проект готов для production! 🎉

