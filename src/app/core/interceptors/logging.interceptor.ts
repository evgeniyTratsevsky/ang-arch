import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * Logging Interceptor
 * Логирует все HTTP запросы и ответы (только в development)
 * 
 * @example
 * // В app.config.ts
 * provideHttpClient(
 *   withInterceptors([loggingInterceptor])
 * )
 */
export const loggingInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  // Включить только в development режиме
  const isDevelopment = !isProduction();

  if (!isDevelopment) {
    return next(req);
  }

  const startTime = Date.now();

  console.group(`🔵 HTTP ${req.method} ${req.url}`);
  console.log('📤 Request:', {
    url: req.url,
    method: req.method,
    headers: getHeadersObject(req.headers),
    body: req.body,
  });

  return next(req).pipe(
    tap({
      next: (event) => {
        if (event instanceof HttpResponse) {
          const duration = Date.now() - startTime;
          console.log('📥 Response:', {
            status: event.status,
            statusText: event.statusText,
            body: event.body,
            duration: `${duration}ms`,
          });
          console.groupEnd();
        }
      },
      error: (error) => {
        const duration = Date.now() - startTime;
        console.error('❌ Error:', {
          status: error.status,
          message: error.message,
          duration: `${duration}ms`,
        });
        console.groupEnd();
      },
    })
  );
};

/**
 * Проверить, является ли окружение production
 */
function isProduction(): boolean {
  // В реальном приложении это будет environment.production
  return false;
}

/**
 * Конвертировать HttpHeaders в обычный объект для логирования
 */
function getHeadersObject(headers: any): Record<string, string> {
  const headersObj: Record<string, string> = {};
  headers.keys().forEach((key: string) => {
    headersObj[key] = headers.get(key);
  });
  return headersObj;
}

