import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * Simple HTTP Cache
 */
class HttpCache {
  private cache = new Map<string, { response: HttpResponse<any>; timestamp: number }>();
  private readonly maxAge = 5 * 60 * 1000; // 5 минут

  get(req: HttpRequest<any>): HttpResponse<any> | null {
    const cached = this.cache.get(req.urlWithParams);

    if (!cached) {
      return null;
    }

    // Проверить, не устарел ли кеш
    const isExpired = Date.now() - cached.timestamp > this.maxAge;
    if (isExpired) {
      this.cache.delete(req.urlWithParams);
      return null;
    }

    console.log('[HttpCache] Cache hit:', req.urlWithParams);
    return cached.response;
  }

  put(req: HttpRequest<any>, response: HttpResponse<any>): void {
    this.cache.set(req.urlWithParams, {
      response,
      timestamp: Date.now(),
    });
    console.log('[HttpCache] Cached response:', req.urlWithParams);
  }

  clear(): void {
    this.cache.clear();
    console.log('[HttpCache] Cache cleared');
  }
}

// Singleton instance
const httpCache = new HttpCache();

/**
 * Cache Interceptor
 * Кеширует GET запросы на 5 минут
 * 
 * @example
 * // В app.config.ts
 * provideHttpClient(
 *   withInterceptors([cacheInterceptor])
 * )
 */
export const cacheInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  // Кешируем только GET запросы
  if (req.method !== 'GET') {
    return next(req);
  }

  // Пропускаем определенные URL
  if (shouldSkipCache(req.url)) {
    return next(req);
  }

  // Проверяем кеш
  const cachedResponse = httpCache.get(req);
  if (cachedResponse) {
    return of(cachedResponse.clone());
  }

  // Если в кеше нет, делаем запрос и сохраняем результат
  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        httpCache.put(req, event);
      }
    })
  );
};

/**
 * Проверить, нужно ли пропустить кеширование
 */
function shouldSkipCache(url: string): boolean {
  const skipUrls = [
    '/api/auth',
    '/api/realtime',
    '/api/polling',
  ];
  return skipUrls.some((skipUrl) => url.includes(skipUrl));
}

/**
 * Очистить кеш (экспортируем для использования в приложении)
 */
export function clearHttpCache(): void {
  httpCache.clear();
}

