# 🏗️ Nx Monorepo Structure

## 📁 Структура монорепозитория

```
arch-app/
├── apps/                          # Приложения
│   └── main-application/          # Основное приложение
│       ├── src/
│       │   ├── app/
│       │   │   ├── app.component.ts
│       │   │   ├── app.config.ts
│       │   │   └── app.routes.ts
│       │   ├── index.html
│       │   ├── main.ts
│       │   └── styles.scss
│       ├── project.json           # Конфигурация проекта
│       ├── tsconfig.app.json
│       └── jest.config.cts
│
├── libs/                          # Библиотеки
│   └── ui-kit/                    # UI Kit библиотека
│       ├── src/
│       │   ├── lib/
│       │   │   ├── button/
│       │   │   │   └── button.component.ts
│       │   │   ├── card/
│       │   │   │   └── card.component.ts
│       │   │   └── ui-kit/
│       │   │       └── ui-kit.component.ts
│       │   └── index.ts           # Barrel file (публичный API)
│       ├── project.json
│       ├── tsconfig.lib.json
│       └── README.md
│
├── src/                           # Legacy код (нужно перенести)
│   └── app/
│       ├── core/
│       ├── shared/
│       └── features/
│           └── products/
│
├── node_modules/
├── .nx/                           # Nx cache
├── dist/                          # Build output
│
├── nx.json                        # Nx конфигурация
├── tsconfig.base.json             # Base TypeScript config + paths
├── jest.config.ts                 # Jest конфигурация
├── .eslintrc.json                 # ESLint конфигурация
├── .prettierrc                    # Prettier конфигурация
└── package.json
```

## 🎯 Принципы организации

### Apps (Приложения)

В директории `apps/` хранятся **deployable приложения**:

- `main-application` - основное web приложение
- Будущие приложения: admin-panel, mobile-app, etc.

**Характеристики:**
- Могут быть собраны и задеплоены
- Могут зависеть от libs
- НЕ могут зависеть от других apps

### Libs (Библиотеки)

В директории `libs/` хранятся **переиспользуемые библиотеки**:

- `ui-kit` - UI компоненты
- Будущие библиотеки: feature-auth, feature-products, data-access, utils, etc.

**Типы библиотек:**

1. **Feature Libraries** - функциональность по фичам
   - `feature-products`, `feature-cart`, `feature-auth`

2. **UI Libraries** - переиспользуемые компоненты
   - `ui-kit`, `ui-forms`, `ui-charts`

3. **Data Access Libraries** - работа с API
   - `data-access-products`, `data-access-users`

4. **Utility Libraries** - утилиты
   - `utils-formatting`, `utils-validation`

**Характеристики:**
- Могут быть переиспользованы в apps и других libs
- Имеют публичный API через barrel файлы (index.ts)
- Следуют принципу инкапсуляции

## 📦 TypeScript Paths

В `tsconfig.base.json` настроены пути импорта:

```json
{
  "paths": {
    "ui-kit": ["libs/ui-kit/src/index.ts"]
  }
}
```

Это позволяет импортировать:

```typescript
// ✅ Чистый импорт
import { ButtonComponent, CardComponent } from 'ui-kit';

// ❌ Вместо длинного пути
import { ButtonComponent } from '../../../libs/ui-kit/src/lib/button/button.component';
```

## 🚀 Команды Nx

### Разработка

```bash
# Запустить приложение
nx serve main-application

# Запустить с определенной конфигурацией
nx serve main-application --configuration=production
```

### Сборка

```bash
# Собрать приложение
nx build main-application

# Production build
nx build main-application --configuration=production

# Собрать библиотеку (если нужно)
nx build ui-kit
```

### Тестирование

```bash
# Запустить тесты приложения
nx test main-application

# Запустить тесты библиотеки
nx test ui-kit

# Watch mode
nx test main-application --watch

# Coverage
nx test main-application --coverage

# Тестировать только измененное
nx affected:test
```

### Линтинг

```bash
# Проверить приложение
nx lint main-application

# Проверить библиотеку
nx lint ui-kit

# Проверить только измененное
nx affected:lint

# Автоматически исправить
nx lint main-application --fix
```

### Визуализация

```bash
# Показать граф зависимостей
nx graph

# Показать граф для конкретного проекта
nx graph --focus=main-application

# Показать affected граф
nx affected:graph
```

## 🔄 Affected Commands

Nx умеет определять, какие проекты затронуты изменениями:

```bash
# Показать затронутые проекты
nx affected:apps
nx affected:libs

# Тестировать только затронутое
nx affected:test

# Линтить только затронутое
nx affected:lint

# Собрать только затронутое
nx affected:build

# Базовая ветка для сравнения
nx affected:test --base=main
```

## 📊 Кеширование

Nx кеширует результаты выполнения команд:

```bash
# Очистить кеш
nx reset

# Информация о кеше
nx show project main-application
```

## 🎨 Генерация кода

### Создать новое приложение

```bash
nx g @nx/angular:application my-app \
  --directory=apps/my-app \
  --style=scss \
  --routing=true \
  --standalone=true
```

### Создать библиотеку

```bash
nx g @nx/angular:library my-lib \
  --directory=libs/my-lib \
  --style=scss \
  --standalone=true
```

### Создать компонент в библиотеке

```bash
nx g @nx/angular:component my-component \
  --project=ui-kit \
  --changeDetection=OnPush \
  --standalone=true \
  --export
```

### Создать feature library

```bash
nx g @nx/angular:library feature-products \
  --directory=libs/feature-products \
  --style=scss \
  --standalone=true
```

## 🔒 Architectural Constraints

Настройте в `.eslintrc.json` ограничения зависимостей:

```json
{
  "@nx/enforce-module-boundaries": [
    "error",
    {
      "allow": [],
      "depConstraints": [
        {
          "sourceTag": "type:app",
          "onlyDependOnLibsWithTags": ["type:feature", "type:ui", "type:util"]
        },
        {
          "sourceTag": "type:feature",
          "onlyDependOnLibsWithTags": ["type:ui", "type:data-access", "type:util"]
        },
        {
          "sourceTag": "type:ui",
          "onlyDependOnLibsWithTags": ["type:util"]
        }
      ]
    }
  ]
}
```

## 🏷️ Tagging Projects

В `project.json` добавьте теги:

```json
{
  "tags": ["type:app", "scope:client"]
}
```

Типы тегов:
- `type:` - app, feature, ui, data-access, util
- `scope:` - client, admin, shared
- `platform:` - web, mobile, desktop

## 📚 Миграция legacy кода

План миграции кода из `src/app/` в монорепо:

### 1. Feature Products → Библиотека

```bash
nx g @nx/angular:library feature-products \
  --directory=libs/feature-products \
  --style=scss \
  --standalone=true

# Переместить код из src/app/features/products в libs/feature-products
```

### 2. Shared компоненты → UI Kit

```bash
# Создать компоненты в ui-kit
nx g @nx/angular:component shared-component \
  --project=ui-kit \
  --changeDetection=OnPush \
  --standalone=true
```

### 3. Core сервисы → Библиотека

```bash
nx g @nx/angular:library core \
  --directory=libs/core \
  --standalone=true

# Переместить сервисы из src/app/core
```

## 🎯 Best Practices

1. **Одна ответственность** - каждая библиотека решает одну задачу
2. **Публичный API** - используйте barrel files (index.ts)
3. **Теги** - маркируйте проекты для enforce-module-boundaries
4. **Affected** - используйте affected команды в CI/CD
5. **Кеширование** - включите remote caching для команды

## 📖 Полезные ссылки

- [Nx Documentation](https://nx.dev/)
- [Angular Best Practices](https://angular.dev/best-practices)
- [Monorepo Patterns](https://nx.dev/concepts/more-concepts/monorepo-patterns)

