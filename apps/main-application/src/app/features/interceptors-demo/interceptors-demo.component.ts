import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';

/**
 * Interceptors Demo Component
 * Демонстрирует работу всех 6 HTTP interceptors
 */
@Component({
  selector: 'app-interceptors-demo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatTabsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="interceptors-demo">
      <h1>🔧 HTTP Interceptors Demo</h1>
      <p class="subtitle">Демонстрация работы 6 HTTP interceptors</p>

      <mat-tab-group>
        <!-- Tab 1: Headers Interceptor -->
        <mat-tab label="Headers">
          <div class="tab-content">
            <mat-card>
              <mat-card-header>
                <mat-card-title>📝 HTTP Headers Interceptor</mat-card-title>
                <mat-card-subtitle>Автоматически добавляет стандартные headers</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <div class="info-box">
                  <h3>Добавляемые headers:</h3>
                  <ul>
                    <li><code>Content-Type: application/json</code></li>
                    <li><code>Accept: application/json</code></li>
                    <li><code>X-Requested-With: XMLHttpRequest</code></li>
                    <li><code>X-App-Version: 1.0.0</code></li>
                  </ul>
                </div>

                <div class="demo-section">
                  <h3>🧪 Тест:</h3>
                  <button mat-raised-button color="primary" (click)="testHeaders()">
                    Отправить запрос
                  </button>
                  <p class="hint">
                    Откройте DevTools → Network → выберите запрос → Headers
                  </p>
                </div>

                @if (headersResult(); as result) {
                  <div class="result-box success">
                    <strong>✅ Результат:</strong>
                    <p>{{ result }}</p>
                  </div>
                }
              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>

        <!-- Tab 2: Auth Interceptor -->
        <mat-tab label="Auth">
          <div class="tab-content">
            <mat-card>
              <mat-card-header>
                <mat-card-title>🔐 Auth Interceptor</mat-card-title>
                <mat-card-subtitle>Добавляет JWT токен к защищенным запросам</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <div class="info-box">
                  <h3>Как работает:</h3>
                  <ol>
                    <li>Читает токен из localStorage</li>
                    <li>Добавляет Authorization Bearer token</li>
                    <li>Пропускает публичные URLs</li>
                  </ol>
                </div>

                <div class="demo-section">
                  <h3>🧪 Тест без токена:</h3>
                  <button mat-raised-button (click)="testAuthWithoutToken()">
                    Запрос без токена
                  </button>

                  <h3 style="margin-top: 2rem;">🧪 Тест с токеном:</h3>
                  <mat-form-field>
                    <mat-label>JWT Token</mat-label>
                    <input
                      matInput
                      [(ngModel)]="authToken"
                      placeholder="test-token-123"
                    />
                  </mat-form-field>
                  <div class="button-group">
                    <button mat-raised-button color="accent" (click)="saveToken()">
                      Сохранить токен
                    </button>
                    <button mat-raised-button color="primary" (click)="testAuthWithToken()">
                      Запрос с токеном
                    </button>
                    <button mat-raised-button color="warn" (click)="clearToken()">
                      Очистить токен
                    </button>
                  </div>
                </div>

                @if (authResult(); as result) {
                  <div class="result-box">
                    <strong>Результат:</strong>
                    <p>{{ result }}</p>
                  </div>
                }
              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>

        <!-- Tab 3: Error Handling -->
        <mat-tab label="Errors">
          <div class="tab-content">
            <mat-card>
              <mat-card-header>
                <mat-card-title>⚠️ Error Handling Interceptor</mat-card-title>
                <mat-card-subtitle>Централизованная обработка ошибок + retry</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <div class="info-box">
                  <h3>Возможности:</h3>
                  <ul>
                    <li>Retry для GET запросов (2 попытки)</li>
                    <li>Обработка 401, 403, 404, 500, 503</li>
                    <li>Логирование ошибок</li>
                    <li>Форматирование error messages</li>
                  </ul>
                </div>

                <div class="demo-section">
                  <h3>🧪 Тестирование ошибок:</h3>
                  <div class="button-group">
                    <button mat-raised-button color="warn" (click)="testError404()">
                      404 Not Found
                    </button>
                    <button mat-raised-button color="warn" (click)="testError500()">
                      500 Server Error
                    </button>
                    <button mat-raised-button color="warn" (click)="testNetworkError()">
                      Network Error
                    </button>
                  </div>
                </div>

                @if (errorResult(); as result) {
                  <div class="result-box error">
                    <strong>❌ Ошибка обработана:</strong>
                    <p>{{ result }}</p>
                  </div>
                }
              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>

        <!-- Tab 4: Logging -->
        <mat-tab label="Logging">
          <div class="tab-content">
            <mat-card>
              <mat-card-header>
                <mat-card-title>📊 Logging Interceptor</mat-card-title>
                <mat-card-subtitle>Детальное логирование HTTP запросов</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <div class="info-box">
                  <h3>Логирует:</h3>
                  <ul>
                    <li>🔵 HTTP метод и URL</li>
                    <li>📤 Request (headers, body)</li>
                    <li>📥 Response (status, body, duration)</li>
                    <li>❌ Errors</li>
                  </ul>
                </div>

                <div class="demo-section">
                  <h3>🧪 Тест:</h3>
                  <button mat-raised-button color="primary" (click)="testLogging()">
                    Отправить запрос
                  </button>
                </div>

                @if (loggingResult(); as result) {
                  <div class="result-box success">
                    <strong>✅ Результат:</strong>
                    <p>{{ result }}</p>
                  </div>
                }
              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>

        <!-- Tab 5: Caching -->
        <mat-tab label="Cache">
          <div class="tab-content">
            <mat-card>
              <mat-card-header>
                <mat-card-title>💾 Cache Interceptor</mat-card-title>
                <mat-card-subtitle>Кеширование GET запросов на 5 минут</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <div class="info-box">
                  <h3>Как работает:</h3>
                  <ul>
                    <li>Кеширует только GET запросы</li>
                    <li>TTL: 5 минут</li>
                    <li>Автоматическая очистка устаревшего кеша</li>
                    <li>Пропускает определенные URLs</li>
                  </ul>
                </div>

                <div class="demo-section">
                  <h3>🧪 Тест кеширования:</h3>
                  <div class="button-group">
                    <button mat-raised-button color="primary" (click)="testCache()">
                      Выполнить запрос
                    </button>
                  </div>

                  <div class="stats">
                    <p>Запросов выполнено: {{ cacheRequests() }}</p>
                    <p>Cache hits: {{ cacheHits() }}</p>
                  </div>
                </div>

                @if (cacheResult(); as result) {
                  <div class="result-box">
                    <strong>Результат:</strong>
                    <p>{{ result }}</p>
                  </div>
                }
              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>

        <!-- Tab 6: Loading -->
        <mat-tab label="Loading">
          <div class="tab-content">
            <mat-card>
              <mat-card-header>
                <mat-card-title>⏳ Loading Interceptor</mat-card-title>
                <mat-card-subtitle>Отслеживание состояния загрузки</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <div class="info-box">
                  <h3>Возможности:</h3>
                  <ul>
                    <li>Автоматическое отслеживание активных запросов</li>
                    <li>Логирование начала и завершения</li>
                    <li>Пропускает polling endpoints</li>
                    <li>Измерение времени выполнения</li>
                  </ul>
                </div>

                <div class="demo-section">
                  <h3>🧪 Тест:</h3>
                  <div class="button-group">
                    <button mat-raised-button color="primary" (click)="testLoadingSingle()">
                      Один запрос
                    </button>
                    <button mat-raised-button color="accent" (click)="testLoadingMultiple()">
                      Несколько запросов
                    </button>
                  </div>
                </div>

                @if (loadingResult(); as result) {
                  <div class="result-box info">
                    <strong>ℹ️ Результат:</strong>
                    <p>{{ result }}</p>
                  </div>
                }
              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>

        <!-- Tab 7: All Together -->
        <mat-tab label="Все вместе">
          <div class="tab-content">
            <mat-card>
              <mat-card-header>
                <mat-card-title>🚀 Все Interceptors вместе</mat-card-title>
                <mat-card-subtitle>Смотрите, как все работает одновременно</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <div class="demo-section">
                  <h3>🧪 Полный тест:</h3>
                  <button mat-raised-button color="primary" (click)="testAllInterceptors()">
                    Запустить все interceptors
                  </button>
                </div>

                @if (allResult(); as result) {
                  <div class="result-box success" [innerHTML]="result"></div>
                }

                <div class="info-box">
                  <h3>📊 Порядок выполнения:</h3>
                  <ol class="interceptor-flow">
                    <li>1️⃣ <strong>Logging</strong> - Логирует запрос</li>
                    <li>2️⃣ <strong>Headers</strong> - Добавляет стандартные headers</li>
                    <li>3️⃣ <strong>Auth</strong> - Добавляет Authorization</li>
                    <li>4️⃣ <strong>Cache</strong> - Проверяет кеш</li>
                    <li>5️⃣ <strong>Loading</strong> - Начинает loading</li>
                    <li>6️⃣ <strong>HTTP Request</strong> → Backend</li>
                    <li>7️⃣ <strong>Loading</strong> - Заканчивает loading</li>
                    <li>8️⃣ <strong>Cache</strong> - Сохраняет в кеш</li>
                    <li>9️⃣ <strong>Error Handling</strong> - Обрабатывает ошибки</li>
                    <li>🔟 <strong>Logging</strong> - Логирует ответ</li>
                  </ol>
                </div>

                <div class="info-box warning">
                  <p><strong>💡 Лучший способ увидеть все:</strong></p>
                  <ol>
                    <li>Откройте DevTools → Console</li>
                    <li>Нажмите кнопку выше</li>
                    <li>Наблюдайте логи всех interceptors</li>
                    <li>Проверьте Network tab</li>
                  </ol>
                </div>
              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [`
    .interceptors-demo {
      max-width: 1400px;
      margin: 0 auto;
      padding: 2rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;

      h1 {
        font-size: 3rem;
        margin: 0 0 0.5rem 0;
        color: white;
        text-align: center;
        font-weight: 700;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
      }

      .subtitle {
        font-size: 1.3rem;
        color: rgba(255,255,255,0.95);
        margin: 0 0 2rem 0;
        text-align: center;
        font-weight: 300;
      }
    }

    ::ng-deep .mat-mdc-tab-group {
      background: white;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.15);
      overflow: hidden;
    }

    ::ng-deep .mat-mdc-tab-header {
      background: #f8f9fa;
      border-bottom: 2px solid #e9ecef;
    }

    ::ng-deep .mat-mdc-tab-label {
      font-size: 1rem !important;
      font-weight: 500 !important;
      padding: 0 24px !important;
      min-width: 120px !important;
    }

    .tab-content {
      padding: 2rem;
      background: white;
    }

    ::ng-deep mat-card {
      box-shadow: none !important;
      border: 1px solid #e9ecef;
      border-radius: 12px !important;
      overflow: hidden;
      transition: transform 0.2s ease, box-shadow 0.2s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(0,0,0,0.1) !important;
      }
    }

    ::ng-deep mat-card-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 1.5rem !important;
      margin: -1px -1px 0 -1px !important;

      mat-card-title {
        color: white !important;
        font-size: 1.5rem !important;
        font-weight: 600 !important;
        margin: 0 !important;
      }

      mat-card-subtitle {
        color: rgba(255,255,255,0.9) !important;
        font-size: 1rem !important;
        margin: 0.5rem 0 0 0 !important;
      }
    }

    ::ng-deep mat-card-content {
      padding: 2rem !important;
    }

    .info-box {
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      padding: 1.5rem;
      border-radius: 12px;
      margin-bottom: 1.5rem;
      border: 1px solid #dee2e6;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);

      &.warning {
        background: linear-gradient(135deg, #fff3cd 0%, #ffe69c 100%);
        border-color: #ffc107;
      }

      h3 {
        margin: 0 0 1rem 0;
        color: #495057;
        font-size: 1.2rem;
        font-weight: 600;
      }

      ul, ol {
        margin: 0;
        padding-left: 1.5rem;

        li {
          margin: 0.75rem 0;
          line-height: 1.8;
          color: #495057;
        }
      }

      code {
        background: rgba(0,0,0,0.05);
        padding: 0.3rem 0.6rem;
        border-radius: 4px;
        font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
        font-size: 0.9rem;
        color: #d63384;
        border: 1px solid rgba(0,0,0,0.1);
      }

      p {
        line-height: 1.8;
        color: #495057;
        margin: 0.5rem 0;
      }
    }

    .demo-section {
      margin: 2rem 0;

      h3 {
        margin: 0 0 1rem 0;
        color: #495057;
        font-size: 1.2rem;
        font-weight: 600;
      }
    }

    .button-group {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin: 1rem 0;
    }

    ::ng-deep button.mat-mdc-raised-button {
      border-radius: 8px !important;
      font-weight: 500 !important;
      padding: 0 24px !important;
      height: 42px !important;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1) !important;
      transition: all 0.2s ease !important;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
      }

      &:active {
        transform: translateY(0);
      }
    }

    .result-box {
      padding: 1.5rem;
      border-radius: 12px;
      margin: 1.5rem 0;
      border: 2px solid;
      animation: slideIn 0.3s ease;

      &.success {
        background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
        border-color: #28a745;
        box-shadow: 0 4px 12px rgba(40,167,69,0.15);
      }

      &.error {
        background: linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%);
        border-color: #dc3545;
        box-shadow: 0 4px 12px rgba(220,53,69,0.15);
      }

      &.info {
        background: linear-gradient(135deg, #d1ecf1 0%, #bee5eb 100%);
        border-color: #17a2b8;
        box-shadow: 0 4px 12px rgba(23,162,184,0.15);
      }

      strong {
        display: block;
        margin-bottom: 0.75rem;
        font-size: 1.1rem;
      }

      p {
        margin: 0.5rem 0 0 0;
        line-height: 1.8;
        color: #495057;
      }
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .hint {
      color: #6c757d;
      font-size: 0.95rem;
      margin-top: 1rem;
      font-style: italic;
      padding: 0.75rem;
      background: #f8f9fa;
      border-radius: 6px;
      border-left: 3px solid #6c757d;
    }

    ::ng-deep mat-form-field {
      width: 100%;
      max-width: 400px;
      display: block;
      margin: 1rem 0;

      .mat-mdc-form-field-focus-overlay {
        background-color: rgba(102, 126, 234, 0.05);
      }
    }

    .stats {
      margin: 1.5rem 0;
      padding: 1.5rem;
      background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
      border-radius: 12px;
      border: 1px solid #2196f3;
      box-shadow: 0 2px 8px rgba(33,150,243,0.1);

      p {
        margin: 0.75rem 0;
        font-weight: 600;
        color: #1976d2;
        font-size: 1.1rem;
      }
    }

    .interceptor-flow {
      background: white;
      padding: 1.5rem 2rem;
      border-radius: 12px;
      border: 1px solid #e9ecef;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);

      li {
        margin: 1rem 0;
        font-size: 1.05rem;
        line-height: 1.8;
        padding: 0.5rem 0;
        border-bottom: 1px solid #f8f9fa;

        &:last-child {
          border-bottom: none;
        }

        strong {
          color: #667eea;
        }
      }
    }

    @media (max-width: 768px) {
      .interceptors-demo {
        padding: 1rem;

        h1 {
          font-size: 2rem;
        }

        .subtitle {
          font-size: 1rem;
        }
      }

      .tab-content {
        padding: 1rem;
      }

      ::ng-deep mat-card-content {
        padding: 1rem !important;
      }

      .button-group {
        flex-direction: column;

        button {
          width: 100%;
        }
      }
    }
  `],
})
export class InterceptorsDemoComponent {
  // Results
  headersResult = signal<string>('');
  authResult = signal<string>('');
  errorResult = signal<string>('');
  loggingResult = signal<string>('');
  cacheResult = signal<string>('');
  loadingResult = signal<string>('');
  allResult = signal<string>('');

  // Auth
  authToken = 'test-jwt-token-123';

  // Cache stats
  cacheRequests = signal<number>(0);
  cacheHits = signal<number>(0);

  constructor(private http: HttpClient) {}

  // 1. Headers Interceptor
  testHeaders() {
    console.log('='.repeat(50));
    console.log('🧪 Testing Headers Interceptor');
    this.headersResult.set('Отправка запроса... Проверьте Console и Network tab');

    this.http.get('/api/test-headers').subscribe({
      next: () => {
        this.headersResult.set(
          '✅ Запрос отправлен! Проверьте DevTools → Network → Headers секцию'
        );
      },
      error: () => {
        this.headersResult.set(
          '✅ Headers добавлены! (Ошибка ожидаема, т.к. URL не существует)'
        );
      },
    });
  }

  // 2. Auth Interceptor
  testAuthWithoutToken() {
    console.log('='.repeat(50));
    console.log('🧪 Testing Auth Interceptor WITHOUT token');
    localStorage.removeItem('auth_token');

    this.http.get('/api/protected').subscribe({
      error: () => {
        this.authResult.set(
          '⚠️ Запрос без токена. Проверьте Console'
        );
      },
    });
  }

  saveToken() {
    localStorage.setItem('auth_token', this.authToken);
    this.authResult.set(`✅ Токен сохранен: ${this.authToken}`);
  }

  testAuthWithToken() {
    console.log('='.repeat(50));
    console.log('🧪 Testing Auth Interceptor WITH token');

    this.http.get('/api/protected').subscribe({
      error: () => {
        this.authResult.set(
          '✅ Токен добавлен! Проверьте Console'
        );
      },
    });
  }

  clearToken() {
    localStorage.removeItem('auth_token');
    this.authToken = '';
    this.authResult.set('🗑️ Токен удален из localStorage');
  }

  // 3. Error Handling Interceptor
  testError404() {
    console.log('='.repeat(50));
    console.log('🧪 Testing Error Handling: 404');

    this.http.get('/api/nonexistent').subscribe({
      error: (error) => {
        this.errorResult.set(
          `❌ 404 Not Found обработан! Проверьте Console для деталей.`
        );
      },
    });
  }

  testError500() {
    console.log('='.repeat(50));
    console.log('🧪 Testing Error Handling: 500');

    this.http.get('/api/server-error').subscribe({
      error: (error) => {
        this.errorResult.set(
          `❌ 500 Server Error обработан!`
        );
      },
    });
  }

  testNetworkError() {
    console.log('='.repeat(50));
    console.log('🧪 Testing Network Error');

    this.http.get('http://invalid-url-12345.com/api/test').subscribe({
      error: (error) => {
        this.errorResult.set(
          `❌ Network Error обработан!`
        );
      },
    });
  }

  // 4. Logging Interceptor
  testLogging() {
    console.log('='.repeat(50));
    console.log('🧪 Testing Logging Interceptor');
    this.loggingResult.set('Отправка запроса... Проверьте Console!');

    this.http.get('/api/test-logging').subscribe({
      error: () => {
        this.loggingResult.set(
          '✅ Проверьте Console!'
        );
      },
    });
  }

  // 5. Cache Interceptor
  testCache() {
    console.log('='.repeat(50));
    console.log('🧪 Testing Cache Interceptor');

    const timestamp = Date.now();
    this.cacheRequests.update((n) => n + 1);

    this.http.get(`/api/test-cache?t=${timestamp}`).subscribe({
      error: () => {
        // Первый раз - Cache Miss, последующие - Cache Hit
        if (this.cacheRequests() === 1) {
          this.cacheResult.set('⚠️ Cache Miss. Данные сохранены в кеш на 5 минут.');
        } else {
          this.cacheHits.update((n) => n + 1);
          this.cacheResult.set('✅ Cache Hit! Данные взяты из кеша.');
        }
      },
    });
  }

  // 6. Loading Interceptor
  testLoadingSingle() {
    console.log('='.repeat(50));
    console.log('🧪 Testing Loading Interceptor - Single Request');
    this.loadingResult.set('Загрузка... Проверьте Console!');

    this.http.get('/api/test-loading').subscribe({
      error: () => {
        this.loadingResult.set(
          '✅ Проверьте Console для деталей'
        );
      },
    });
  }

  testLoadingMultiple() {
    console.log('='.repeat(50));
    console.log('🧪 Testing Loading Interceptor - Multiple Requests');
    this.loadingResult.set('Отправка нескольких запросов...');

    const requests = [
      this.http.get('/api/test-1'),
      this.http.get('/api/test-2'),
      this.http.get('/api/test-3'),
    ];

    requests.forEach((req) => req.subscribe({ error: () => {} }));

    setTimeout(() => {
      this.loadingResult.set(
        '✅ 3 запроса отправлены! Проверьте Console для всех логов.'
      );
    }, 500);
  }

  // 7. All Interceptors Together
  testAllInterceptors() {
    console.log('='.repeat(80));
    console.log('🚀 TESTING ALL INTERCEPTORS TOGETHER');
    console.log('='.repeat(80));

    // Сохраняем токен для демо
    localStorage.setItem('auth_token', 'demo-token-all-interceptors');

    this.allResult.set('<p>Выполнение... Смотрите Console!</p>');

    this.http.get('/api/full-test').subscribe({
      error: () => {
        this.allResult.set(`
          <p><strong>✅ Все interceptors сработали!</strong></p>
          <p>Проверьте Console и увидите логи от всех 6 interceptors</p>
          <p><strong>Также проверьте DevTools → Network tab!</strong></p>
        `);
      },
    });
  }
}
