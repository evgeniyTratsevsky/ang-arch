// Barrel file для публичного API модуля products
// Экспортируем только то, что должно быть доступно извне

// Models
export * from './models/product.model';

// Components (только если нужны извне, обычно только containers)
export * from './containers/products-page.component';

// Selectors (для использования в других модулях)
export * from './store/products.selectors';

// Actions (для dispatch из других модулей)
export * from './store/products.actions';

// Приватные компоненты, сервисы и store implementation НЕ экспортируются
// Это обеспечивает инкапсуляцию лучше, чем NgModules

