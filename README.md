# 🏗️ Angular Architecture App

Современное Angular приложение с использованием Nx монорепозитория и лучших практик 2025 года.

## 🎯 Особенности проекта

### ✅ Технологический стек

- **Angular 19** - последняя версия framework
- **Nx 22** - монорепозиторий и инструменты разработки
- **TypeScript (Strict Mode)** - типобезопасность
- **NgRx** - state management
- **Jest** - тестирование (вместо Karma)
- **ESLint + Prettier** - качество кода
- **SCSS** - стили
- **Angular Material** - UI компоненты

### ✅ Архитектурные принципы

#### 1. **Standalone Components**
- Без NgModules
- Более простая и эргономичная структура
- Улучшенное tree-shaking

#### 2. **Nx Monorepo**
- Разделение на `apps/` и `libs/`
- Переиспользуемые библиотеки
- TypeScript paths для чистых импортов
- Кеширование и параллелизация

#### 3. **Smart vs Dumb Components**
- **Dumb** - только отображение (OnPush)
- **Smart** - бизнес-логика + state
- Signal inputs (required)
- Output events

#### 4. **OnPush Everywhere**
- По умолчанию для всех компонентов
- Чистый и производительный код

#### 5. **Async Pipe > Subscriptions**
- 90% времени используем async pipe
- Нет утечек памяти
- Автоматическое управление подписками

#### 6. **Lazy Loading**
- Ленивая загрузка feature модулей
- `loadComponent()` и `loadChildren()`

#### 7. **NgRx State Management**
- Actions, Reducers, Effects, Selectors
- Entity adapter для коллекций
- Redux DevTools

#### 8. **Clean Data Flow**
```
Backend DTO → Mapper → UI Model → Store → Selectors → Components
```

## 📁 Структура проекта

```
arch-app/
├── apps/
│   └── main-application/     # Основное приложение
├── libs/
│   └── ui-kit/              # UI компоненты библиотека
├── src/                     # Legacy код (products feature)
│   └── app/
│       ├── core/            # Core сервисы
│       ├── shared/          # Shared компоненты
│       └── features/        # Feature модули
│           └── products/    # Пример feature с NgRx
└── docs/                    # Документация
```

## 🚀 Быстрый старт

### Установка зависимостей

```bash
npm install
```

### Запуск приложения

```bash
# Основное приложение
nx serve main-application

# Или через npm
npm start
```

Приложение будет доступно по адресу: `http://localhost:4200/`

### Запуск тестов

```bash
# Все тесты
nx test main-application

# Watch mode
nx test main-application --watch

# Coverage
nx test main-application --coverage
```

### Линтинг

```bash
# Проверить код
nx lint main-application

# Автоматически исправить
nx lint main-application --fix
```

### Сборка

```bash
# Production build
nx build main-application

# Development build
nx build main-application --configuration=development
```

## 📊 Nx команды

### Визуализация зависимостей

```bash
# Показать граф всех проектов
nx graph

# Граф для конкретного проекта
nx graph --focus=main-application
```

### Affected команды

```bash
# Тестировать только измененное
nx affected:test

# Линтить только измененное
nx affected:lint

# Собрать только измененное
nx affected:build
```

### Создание новых проектов

```bash
# Новое приложение
nx g @nx/angular:application my-app --directory=apps/my-app

# Новая библиотека
nx g @nx/angular:library my-lib --directory=libs/my-lib

# Новый компонент в библиотеке
nx g @nx/angular:component my-component --project=ui-kit --export
```

## 📚 Документация

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - детальное описание архитектуры
- **[MONOREPO_STRUCTURE.md](./MONOREPO_STRUCTURE.md)** - структура монорепозитория и команды Nx
- **[libs/ui-kit/README.md](./libs/ui-kit/README.md)** - документация UI Kit библиотеки

## 🎨 UI Kit

Библиотека переиспользуемых UI компонентов:

```typescript
import { ButtonComponent, CardComponent } from 'ui-kit';

@Component({
  imports: [ButtonComponent, CardComponent],
  template: `
    <lib-card title="Пример">
      <lib-button variant="primary" (clicked)="onClick()">
        Нажми меня
      </lib-button>
    </lib-card>
  `
})
```

### Компоненты UI Kit:
- ✅ ButtonComponent - кнопка с вариантами
- ✅ CardComponent - контейнер контента
- 🔜 InputComponent
- 🔜 ModalComponent
- 🔜 TableComponent

## 🧪 Тестирование

```bash
# Запустить тесты приложения
nx test main-application

# Запустить тесты библиотеки
nx test ui-kit

# Все тесты
nx run-many --target=test --all

# Watch mode
nx test main-application --watch

# Coverage
nx test main-application --coverage
```

## 🔧 Настройка IDE

### VS Code

Рекомендуемые расширения (см. `.vscode/extensions.json`):
- Angular Language Service
- ESLint
- Prettier
- Nx Console

### WebStorm

- Включите ESLint в настройках
- Настройте Prettier как code formatter

## 📈 CI/CD

Используйте Nx affected команды для оптимизации CI/CD:

```yaml
# .github/workflows/ci.yml
- name: Test
  run: nx affected:test --base=origin/main

- name: Build
  run: nx affected:build --base=origin/main
```

## 🎯 Roadmap

- [ ] Миграция legacy кода из `src/app/` в libs
- [ ] Добавить feature-auth библиотеку
- [ ] Расширить UI Kit компонентами
- [ ] Настроить Nx Cloud для remote caching
- [ ] E2E тесты с Cypress/Playwright
- [ ] Storybook для UI Kit
- [ ] Микро-фронтенды (Module Federation)

## 🤝 Contributing

1. Создайте feature branch
2. Используйте Nx генераторы для создания кода
3. Следуйте ESLint правилам
4. Пишите тесты
5. Создайте Pull Request

## 📄 License

MIT

## 👥 Команда

Разработано с ❤️ следуя Angular Best Practices 2025

---

**🔗 Полезные ссылки:**
- [Angular Documentation](https://angular.dev/)
- [Nx Documentation](https://nx.dev/)
- [NgRx Documentation](https://ngrx.io/)
- [Angular Material](https://material.angular.io/)
