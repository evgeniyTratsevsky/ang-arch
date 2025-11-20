# План миграции в Nx Monorepo

## Текущая ситация
У нас есть standalone Angular проект с установленным Nx.

## Целевая структура
Nx monorepo с:
- `apps/main-application` - основное приложение
- `libs/ui-kit` - UI библиотека компонентов

## Шаги миграции
1. Создать структуру apps/ и libs/
2. Переместить текущее приложение в apps/main-application
3. Создать библиотеку ui-kit
4. Настроить tsconfig paths
5. Настроить nx.json для работы с монорепо

