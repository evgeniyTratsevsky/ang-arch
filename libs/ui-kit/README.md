# UI Kit Library

Библиотека переиспользуемых UI компонентов для Angular приложений.

## Компоненты

### ButtonComponent

Переиспользуемый компонент кнопки с различными вариантами и размерами.

**Использование:**

```typescript
import { ButtonComponent } from 'ui-kit';

@Component({
  imports: [ButtonComponent],
  template: `
    <lib-button
      variant="primary"
      size="medium"
      (clicked)="handleClick($event)"
    >
      Нажми меня
    </lib-button>
  `
})
```

**Inputs:**
- `variant`: 'primary' | 'secondary' | 'success' | 'danger' | 'warning'
- `size`: 'small' | 'medium' | 'large'
- `type`: 'button' | 'submit' | 'reset'
- `disabled`: boolean
- `loading`: boolean
- `fullWidth`: boolean

**Outputs:**
- `clicked`: MouseEvent

### CardComponent

Контейнер для контента с заголовком и футером.

**Использование:**

```typescript
import { CardComponent } from 'ui-kit';

@Component({
  imports: [CardComponent],
  template: `
    <lib-card
      title="Заголовок"
      subtitle="Подзаголовок"
      [hoverable]="true"
    >
      Контент карточки
    </lib-card>
  `
})
```

**Inputs:**
- `title`: string
- `subtitle`: string
- `footer`: boolean
- `hoverable`: boolean
- `clickable`: boolean
- `padding`: 'none' | 'small' | 'medium' | 'large'

## Архитектура

Все компоненты:
- ✅ Standalone
- ✅ OnPush change detection
- ✅ Signal inputs
- ✅ Typed outputs
- ✅ Полностью типизированы
