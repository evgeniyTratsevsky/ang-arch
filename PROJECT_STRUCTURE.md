# 📊 Структура проектов main-application и ui-kit

## 🎯 main-application

### Описание
Основное Angular приложение, демонстрирующее использование UI Kit библиотеки и архитектурные best practices.

### Структура

```
apps/main-application/
├── src/
│   ├── app/
│   │   ├── app.component.ts          # Root компонент (OnPush)
│   │   ├── app.component.html        # Шаблон с демонстрацией UI Kit
│   │   ├── app.component.scss        # Стили
│   │   ├── app.component.spec.ts     # Тесты
│   │   ├── app.config.ts             # Application configuration
│   │   ├── app.routes.ts             # Routing configuration
│   │   └── nx-welcome.component.ts   # Nx welcome screen
│   │
│   ├── index.html                    # HTML entry point
│   ├── main.ts                       # Bootstrap приложения
│   ├── styles.scss                   # Глобальные стили
│   └── test-setup.ts                 # Jest setup
│
├── public/
│   └── favicon.ico
│
├── project.json                      # Nx project configuration
├── tsconfig.app.json                 # TypeScript config для app
├── tsconfig.spec.json                # TypeScript config для тестов
├── tsconfig.json                     # Base TypeScript config
├── tsconfig.editor.json              # Editor config
├── jest.config.cts                   # Jest configuration
└── eslint.config.cjs                 # ESLint configuration
```

### Ключевые особенности

1. **Использование UI Kit**
```typescript
import { ButtonComponent, CardComponent } from 'ui-kit';

@Component({
  imports: [ButtonComponent, CardComponent],
  // ...
})
```

2. **OnPush Change Detection**
```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
})
```

3. **Standalone Components**
```typescript
@Component({
  standalone: true,
  imports: [RouterOutlet, ButtonComponent, CardComponent],
})
```

### Targets (команды)

```bash
# Development server
nx serve main-application

# Production build
nx build main-application

# Tests
nx test main-application

# Lint
nx lint main-application

# Serve static (после build)
nx serve-static main-application
```

---

## 🎨 ui-kit

### Описание
Библиотека переиспользуемых UI компонентов для Angular приложений. Все компоненты следуют best practices: standalone, OnPush, signal inputs.

### Структура

```
libs/ui-kit/
├── src/
│   ├── lib/
│   │   ├── button/
│   │   │   └── button.component.ts       # Button компонент
│   │   │
│   │   ├── card/
│   │   │   └── card.component.ts         # Card компонент
│   │   │
│   │   └── ui-kit/
│   │       ├── ui-kit.component.ts       # Base компонент
│   │       ├── ui-kit.component.html
│   │       ├── ui-kit.component.scss
│   │       └── ui-kit.component.spec.ts
│   │
│   ├── index.ts                          # Barrel file (Public API)
│   └── test-setup.ts                     # Jest setup
│
├── project.json                          # Nx project configuration
├── tsconfig.lib.json                     # TypeScript config для lib
├── tsconfig.spec.json                    # TypeScript config для тестов
├── tsconfig.json                         # Base TypeScript config
├── jest.config.cts                       # Jest configuration
├── eslint.config.cjs                     # ESLint configuration
└── README.md                             # Документация библиотеки
```

### Компоненты

#### 1. ButtonComponent

**Selector:** `lib-button`

**Inputs:**
- `variant` - 'primary' | 'secondary' | 'success' | 'danger' | 'warning'
- `size` - 'small' | 'medium' | 'large'
- `type` - 'button' | 'submit' | 'reset'
- `disabled` - boolean
- `loading` - boolean
- `fullWidth` - boolean

**Outputs:**
- `clicked` - MouseEvent

**Пример использования:**
```typescript
<lib-button
  variant="primary"
  size="medium"
  [loading]="isLoading"
  (clicked)="handleClick($event)"
>
  Click Me
</lib-button>
```

**Особенности:**
- ✅ Signal inputs через `input()` и `input.required()`
- ✅ Computed classes через `computed()`
- ✅ OnPush change detection
- ✅ Standalone компонент
- ✅ Полная типизация

#### 2. CardComponent

**Selector:** `lib-card`

**Inputs:**
- `title` - string
- `subtitle` - string
- `footer` - boolean
- `hoverable` - boolean
- `clickable` - boolean
- `padding` - 'none' | 'small' | 'medium' | 'large'

**Пример использования:**
```typescript
<lib-card
  title="Card Title"
  subtitle="Card Subtitle"
  [hoverable]="true"
>
  Card content goes here
</lib-card>
```

**Особенности:**
- ✅ Content projection с `<ng-content>`
- ✅ Named slots для footer
- ✅ Динамические классы
- ✅ Hover эффекты

### Public API (index.ts)

```typescript
// Barrel file - экспортируем только публичные компоненты
export * from './lib/ui-kit/ui-kit.component';
export * from './lib/button/button.component';
export * from './lib/card/card.component';
```

### Targets (команды)

```bash
# Tests
nx test ui-kit

# Lint
nx lint ui-kit

# Watch tests
nx test ui-kit --watch

# Coverage
nx test ui-kit --coverage
```

---

## 🔗 Связь между проектами

### TypeScript Paths (tsconfig.base.json)

```json
{
  "paths": {
    "ui-kit": ["libs/ui-kit/src/index.ts"]
  }
}
```

### Dependency Graph

```
main-application
       ↓
    ui-kit
```

Приложение `main-application` зависит от библиотеки `ui-kit`.

### Nx Graph

Визуализируйте зависимости:

```bash
nx graph --focus=main-application
```

---

## 📋 Чеклист best practices

### ✅ main-application

- [x] Standalone components
- [x] OnPush change detection
- [x] Использует библиотеки через TypeScript paths
- [x] Lazy loading routes готов (app.routes.ts)
- [x] Jest для тестирования
- [x] ESLint + Prettier настроены
- [x] SCSS для стилей
- [x] Responsive дизайн

### ✅ ui-kit

- [x] Standalone components
- [x] OnPush change detection
- [x] Signal inputs (input, input.required)
- [x] Typed outputs (output<T>)
- [x] Barrel file (index.ts) для публичного API
- [x] Полная типизация
- [x] Тесты для каждого компонента
- [x] Документация в README
- [x] SCSS для стилей
- [x] Нет внешних зависимостей (кроме @angular)

---

## 🚀 Следующие шаги

### Для main-application:

1. **Добавить фичи:**
   - Feature modules (products, cart, etc.)
   - NgRx store integration
   - Lazy-loaded routes

2. **Улучшения:**
   - Error handling
   - Loading states
   - Interceptors
   - Guards

### Для ui-kit:

1. **Новые компоненты:**
   - InputComponent
   - SelectComponent
   - ModalComponent
   - TableComponent
   - ToastComponent

2. **Улучшения:**
   - Темизация
   - Accessibility (a11y)
   - Анимации
   - Storybook

---

## 📚 Документация по компонентам

Детальная документация доступна в:
- `libs/ui-kit/README.md` - документация библиотеки
- `ARCHITECTURE.md` - архитектурные принципы
- `MONOREPO_STRUCTURE.md` - структура монорепозитория

---

## 🎓 Обучающие примеры

### Создание нового компонента в ui-kit

```bash
# 1. Генерация компонента
nx g @nx/angular:component input \
  --project=ui-kit \
  --changeDetection=OnPush \
  --standalone=true \
  --export

# 2. Добавить в index.ts
echo "export * from './lib/input/input.component';" >> libs/ui-kit/src/index.ts

# 3. Использовать в main-application
import { InputComponent } from 'ui-kit';
```

### Создание нового feature модуля

```bash
# Создать feature библиотеку
nx g @nx/angular:library feature-products \
  --directory=libs/feature-products \
  --style=scss \
  --standalone=true

# Добавить в app.routes.ts
{
  path: 'products',
  loadChildren: () => import('feature-products')
    .then(m => m.PRODUCTS_ROUTES)
}
```

