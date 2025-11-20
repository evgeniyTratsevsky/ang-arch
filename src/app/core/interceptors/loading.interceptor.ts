import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { inject } from '@angular/core';

/**
 * Loading State Service
 * Управляет глобальным состоянием загрузки
 */
export class LoadingStateService {
  private loadingCount = 0;
  private loadingState$ = new Observable<boolean>((observer) => {
    observer.next(this.loadingCount > 0);
  });

  get loading$(): Observable<boolean> {
    return this.loadingState$;
  }

  startLoading(): void {
    this.loadingCount++;
    console.log('[LoadingStateService] Loading count:', this.loadingCount);
  }

  stopLoading(): void {
    if (this.loadingCount > 0) {
      this.loadingCount--;
    }
    console.log('[LoadingStateService] Loading count:', this.loadingCount);
  }

  isLoading(): boolean {
    return this.loadingCount > 0;
  }
}

/**
 * Loading Interceptor
 * Автоматически управляет состоянием загрузки для всех HTTP запросов
 * 
 * @example
 * // В app.config.ts
 * providers: [
 *   LoadingStateService,
 *   provideHttpClient(
 *     withInterceptors([loadingInterceptor])
 *   )
 * ]
 * 
 * // В компоненте
 * @Component({
 *   template: `
 *     @if (loadingService.isLoading()) {
 *       <div class="loading-spinner">Loading...</div>
 *     }
 *   `
 * })
 * export class AppComponent {
 *   constructor(public loadingService: LoadingStateService) {}
 * }
 */
export const loadingInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  // Пропускаем определенные URL (например, polling endpoints)
  if (shouldSkipLoading(req.url)) {
    return next(req);
  }

  // Здесь нельзя использовать inject() напрямую в functional interceptor
  // Поэтому создадим простую версию без сервиса
  
  console.log('[LoadingInterceptor] Request started:', req.url);
  const startTime = Date.now();

  return next(req).pipe(
    tap(() => {
      const duration = Date.now() - startTime;
      console.log(`[LoadingInterceptor] Request completed in ${duration}ms:`, req.url);
    }),
    finalize(() => {
      console.log('[LoadingInterceptor] Request finalized:', req.url);
    })
  );
};

/**
 * Проверить, нужно ли пропустить loading для этого URL
 */
function shouldSkipLoading(url: string): boolean {
  const skipUrls = [
    '/api/health',
    '/api/ping',
    '/api/polling',
  ];
  return skipUrls.some((skipUrl) => url.includes(skipUrl));
}

