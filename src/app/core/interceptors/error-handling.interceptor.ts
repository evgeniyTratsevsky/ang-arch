import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

/**
 * Error Handling Interceptor
 * Обрабатывает ошибки HTTP запросов
 * 
 * @example
 * // В app.config.ts
 * provideHttpClient(
 *   withInterceptors([errorHandlingInterceptor])
 * )
 */
export const errorHandlingInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  return next(req).pipe(
    // Retry логика для GET запросов
    retry({
      count: req.method === 'GET' ? 2 : 0,
      delay: 1000,
    }),
    // Обработка ошибок
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An error occurred';

      if (error.error instanceof ErrorEvent) {
        // Client-side ошибка
        errorMessage = `Client Error: ${error.error.message}`;
        console.error('[ErrorHandlingInterceptor] Client Error:', error.error.message);
      } else {
        // Server-side ошибка
        errorMessage = `Server Error: ${error.status} - ${error.message}`;
        console.error('[ErrorHandlingInterceptor] Server Error:', {
          status: error.status,
          message: error.message,
          url: req.url,
        });

        // Обработка специфичных статус кодов
        switch (error.status) {
          case 401:
            // Unauthorized - перенаправить на логин
            console.warn('[ErrorHandlingInterceptor] Unauthorized - token expired?');
            // В реальном приложении здесь будет роутер
            // inject(Router).navigate(['/login']);
            break;

          case 403:
            // Forbidden
            console.warn('[ErrorHandlingInterceptor] Forbidden - insufficient permissions');
            break;

          case 404:
            // Not Found
            console.warn('[ErrorHandlingInterceptor] Resource not found:', req.url);
            break;

          case 500:
            // Internal Server Error
            console.error('[ErrorHandlingInterceptor] Internal server error');
            break;

          case 503:
            // Service Unavailable
            console.error('[ErrorHandlingInterceptor] Service unavailable');
            break;
        }
      }

      // Можно показать toast/notification
      // inject(NotificationService).showError(errorMessage);

      return throwError(() => new Error(errorMessage));
    })
  );
};

