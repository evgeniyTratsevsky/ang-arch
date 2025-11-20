import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Auth Interceptor
 * Добавляет токен авторизации к запросам
 * 
 * @example
 * // В app.config.ts
 * provideHttpClient(
 *   withInterceptors([authInterceptor])
 * )
 */
export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  // Получить токен из localStorage/sessionStorage
  const token = getAuthToken();

  // Пропускаем публичные URL
  if (isPublicUrl(req.url)) {
    return next(req);
  }

  // Если есть токен, добавляем Authorization header
  if (token) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('[AuthInterceptor] Added token to request:', req.url);
    return next(clonedReq);
  }

  return next(req);
};

/**
 * Получить токен авторизации
 */
function getAuthToken(): string | null {
  // В реальном приложении здесь будет сервис авторизации
  return localStorage.getItem('auth_token');
}

/**
 * Проверить, является ли URL публичным
 */
function isPublicUrl(url: string): boolean {
  const publicUrls = ['/api/auth/login', '/api/auth/register', '/api/public'];
  return publicUrls.some((publicUrl) => url.includes(publicUrl));
}

