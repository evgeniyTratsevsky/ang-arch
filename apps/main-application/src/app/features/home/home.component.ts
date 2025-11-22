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
    :host {
      display: block;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .home {
      max-width: 1400px;
      margin: 0 auto;
      padding: 3rem 2rem;
    }

    .header {
      text-align: center;
      margin-bottom: 4rem;
      animation: fadeInDown 0.6s ease;

      h1 {
        font-size: 3.5rem;
        margin: 0;
        color: white;
        font-weight: 700;
        text-shadow: 2px 2px 8px rgba(0,0,0,0.2);
        letter-spacing: -1px;
      }

      .subtitle {
        font-size: 1.5rem;
        color: rgba(255,255,255,0.95);
        margin: 1rem 0 0 0;
        font-weight: 300;
      }
    }

    @keyframes fadeInDown {
      from {
        opacity: 0;
        transform: translateY(-30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .main-content {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      animation: fadeInUp 0.6s ease 0.2s both;
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
      gap: 2rem;
      margin-bottom: 2rem;
    }

    ::ng-deep lib-card {
      transition: all 0.3s ease;
      box-shadow: 0 8px 24px rgba(0,0,0,0.15);

      &:hover {
        transform: translateY(-8px);
        box-shadow: 0 16px 48px rgba(0,0,0,0.2);
      }
    }

    .card-actions {
      margin-top: 1.5rem;
    }

    ul {
      margin: 1rem 0;
      padding-left: 1.5rem;

      li {
        margin: 0.75rem 0;
        line-height: 1.6;
        font-size: 1rem;
      }
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      padding: 1rem 0;

      .feature {
        text-align: center;
        padding: 2rem 1rem;
        background: rgba(255,255,255,0.1);
        border-radius: 12px;
        border: 1px solid rgba(255,255,255,0.2);
        transition: all 0.3s ease;

        &:hover {
          background: rgba(255,255,255,0.15);
          transform: translateY(-4px);
        }

        h3 {
          margin: 0 0 0.75rem 0;
          font-size: 1.3rem;
          color: white;
        }

        p {
          margin: 0;
          color: rgba(255,255,255,0.9);
          line-height: 1.6;
        }
      }
    }

    .practices-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 1rem;
      padding: 1rem 0;

      .practice {
        padding: 1.25rem;
        background: rgba(255,255,255,0.1);
        border-radius: 8px;
        text-align: center;
        font-weight: 500;
        color: white;
        border: 1px solid rgba(255,255,255,0.2);
        transition: all 0.2s ease;

        &:hover {
          background: rgba(255,255,255,0.2);
          transform: scale(1.05);
        }
      }
    }

    .commands {
      display: grid;
      gap: 1rem;
      padding: 1rem 0;

      .command {
        background: rgba(255,255,255,0.1);
        padding: 1.5rem;
        border-radius: 12px;
        border-left: 4px solid #4fc3f7;
        border: 1px solid rgba(255,255,255,0.2);
        transition: all 0.2s ease;

        &:hover {
          background: rgba(255,255,255,0.15);
          transform: translateX(8px);
        }

        code {
          display: block;
          font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
          font-size: 1rem;
          color: #4fc3f7;
          font-weight: 600;
          margin-bottom: 0.75rem;
          letter-spacing: 0.5px;
        }

        p {
          margin: 0;
          color: rgba(255,255,255,0.9);
          font-size: 0.95rem;
        }
      }
    }

    ::ng-deep lib-card {
      background: white;
      border-radius: 16px;
      overflow: hidden;
    }

    @media (max-width: 768px) {
      .home {
        padding: 2rem 1rem;
      }

      .header h1 {
        font-size: 2.5rem;
      }

      .header .subtitle {
        font-size: 1.2rem;
      }

      .cards-grid {
        grid-template-columns: 1fr;
      }

      .features-grid {
        grid-template-columns: 1fr;
      }

      .practices-grid {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      }
    }
  `],
})
export class HomeComponent {
  navigateTo(path: string): void {
    window.location.href = path;
  }
}

