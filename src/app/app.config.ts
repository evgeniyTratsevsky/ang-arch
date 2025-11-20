import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouterStore } from '@ngrx/router-store';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { productsReducer } from './features/products/store/products.reducer';
import { ProductsEffects } from './features/products/store/products.effects';

// HTTP Interceptors
import {
  httpHeadersInterceptor,
  authInterceptor,
  errorHandlingInterceptor,
  loggingInterceptor,
  cacheInterceptor,
  loadingInterceptor,
} from './core/interceptors';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    // HTTP Client с interceptors (порядок важен!)
    provideHttpClient(
      withInterceptors([
        loggingInterceptor,        // 1. Логирование (первым для полной информации)
        httpHeadersInterceptor,    // 2. Добавление стандартных headers
        authInterceptor,           // 3. Добавление токена авторизации
        cacheInterceptor,          // 4. Кеширование GET запросов
        loadingInterceptor,        // 5. Управление loading state
        errorHandlingInterceptor,  // 6. Обработка ошибок (последним)
      ])
    ),
    provideStore({
      products: productsReducer,
    }),
    provideEffects([ProductsEffects]),
    provideRouterStore(),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
  ],
};
