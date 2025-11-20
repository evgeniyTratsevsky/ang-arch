import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardComponent, ButtonComponent } from 'ui-kit';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, CardComponent, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="home">
      <header class="header">
        <h1>🏗️ Nx Monorepo Architecture</h1>
        <p class="subtitle">Angular Best Practices 2025</p>
      </header>

      <main class="main-content">
        <div class="cards-grid">
          <lib-card title="📡 Real-Time Demo" [hoverable]="true" [clickable]="true">
            <p>Демонстрация работы:</p>
            <ul>
              <li>HTTP CRUD операции</li>
              <li>Real-time обновления (polling)</li>
              <li>Mock данные</li>
              <li>Loading & Error states</li>
            </ul>
            <div class="card-actions">
              <lib-button
                variant="primary"
                [fullWidth]="true"
                (clicked)="navigateTo('/demo')"
              >
                Открыть демо
              </lib-button>
            </div>
          </lib-card>

          <lib-card title="🔧 HTTP Interceptors" [hoverable]="true" [clickable]="true">
            <p>Интерактивная демонстрация:</p>
            <ul>
              <li>6 HTTP Interceptors</li>
              <li>Headers, Auth, Errors</li>
              <li>Logging, Cache, Loading</li>
              <li>Живые примеры</li>
            </ul>
            <div class="card-actions">
              <lib-button
                variant="success"
                [fullWidth]="true"
                (clicked)="navigateTo('/interceptors')"
              >
                Тестировать Interceptors
              </lib-button>
            </div>
          </lib-card>
        </div>

        <lib-card
          title="📦 Монорепозиторий"
          subtitle="Структура проекта"
        >
          <div class="features-grid">
            <div class="feature">
              <h3>✅ Nx Workspace</h3>
              <p>Интегрированный монорепозиторий</p>
            </div>
            <div class="feature">
              <h3>✅ UI Kit</h3>
              <p>Библиотека переиспользуемых компонентов</p>
            </div>
            <div class="feature">
              <h3>✅ Data Access</h3>
              <p>HTTP CRUD + Real-Time сервисы</p>
            </div>
            <div class="feature">
              <h3>✅ Interceptors</h3>
              <p>6 HTTP interceptors</p>
            </div>
          </div>
        </lib-card>

        <lib-card
          title="🎯 Best Practices"
        >
          <div class="practices-grid">
            <div class="practice">✅ Standalone компоненты</div>
            <div class="practice">✅ OnPush everywhere</div>
            <div class="practice">✅ Signal inputs</div>
            <div class="practice">✅ Async pipe</div>
            <div class="practice">✅ HTTP Interceptors</div>
            <div class="practice">✅ Jest тестирование</div>
            <div class="practice">✅ ESLint + Prettier</div>
            <div class="practice">✅ TypeScript strict</div>
          </div>
        </lib-card>

        <lib-card
          title="🚀 Команды Nx"
        >
          <div class="commands">
            <div class="command">
              <code>nx serve main-application</code>
              <p>Запустить приложение</p>
            </div>
            <div class="command">
              <code>nx build main-application</code>
              <p>Собрать приложение</p>
            </div>
            <div class="command">
              <code>nx test main-application</code>
              <p>Запустить тесты</p>
            </div>
            <div class="command">
              <code>nx lint main-application</code>
              <p>Проверить код</p>
            </div>
            <div class="command">
              <code>nx graph</code>
              <p>Показать граф зависимостей</p>
            </div>
          </div>
        </lib-card>
      </main>
    </div>
  `,
  styles: [`
    .home {
      max-width: 1400px;
      margin: 0 auto;
      padding: 2rem;
    }

    .header {
      text-align: center;
      margin-bottom: 3rem;

      h1 {
        font-size: 3rem;
        margin: 0;
        color: #333;
      }

      .subtitle {
        font-size: 1.5rem;
        color: #666;
        margin: 1rem 0 0 0;
      }
    }

    .main-content {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2rem;
    }

    .card-actions {
      margin-top: 1.5rem;
    }

    ul {
      margin: 1rem 0;
      padding-left: 1.5rem;

      li {
        margin: 0.5rem 0;
      }
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;

      .feature {
        text-align: center;
        padding: 1rem;

        h3 {
          margin: 0 0 0.5rem 0;
          font-size: 1.2rem;
        }

        p {
          margin: 0;
          color: #666;
        }
      }
    }

    .practices-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1rem;

      .practice {
        padding: 1rem;
        background: #f5f5f5;
        border-radius: 4px;
        text-align: center;
        font-weight: 500;
      }
    }

    .commands {
      display: grid;
      gap: 1rem;

      .command {
        background: #f5f5f5;
        padding: 1rem;
        border-radius: 4px;
        border-left: 4px solid #2196f3;

        code {
          display: block;
          font-family: 'Courier New', monospace;
          font-size: 0.95rem;
          color: #2196f3;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        p {
          margin: 0;
          color: #666;
          font-size: 0.9rem;
        }
      }
    }
  `],
})
export class HomeComponent {
  navigateTo(path: string): void {
    window.location.href = path;
  }
}

