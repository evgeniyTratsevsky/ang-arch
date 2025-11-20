import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';

/**
 * HTTP Headers Interceptor
 * Добавляет стандартные заголовки ко всем HTTP запросам
 * 
 * @example
 * // В app.config.ts
 * provideHttpClient(
 *   withInterceptors([httpHeadersInterceptor])
 * )
 */
export const httpHeadersInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  // Клонируем запрос и добавляем заголовки
  const modifiedReq = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      // Можно добавить кастомные заголовки
      'X-App-Version': '1.0.0',
    },
  });

  console.log('[HttpHeadersInterceptor] Request:', {
    url: modifiedReq.url,
    method: modifiedReq.method,
    headers: modifiedReq.headers.keys(),
  });

  return next(modifiedReq);
};

