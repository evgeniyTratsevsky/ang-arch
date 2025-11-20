import { Injectable } from '@angular/core';
import { RealTimeDataService } from '../services/real-time-data.service';
import { WebSocketService } from '../services/websocket.service';
import { ProductsApiService, Product, ProductDto } from './products-api.service';

/**
 * Products Real-Time Service
 * Обеспечивает real-time обновление данных о продуктах
 * 
 * @example
 * // В компоненте
 * constructor(private productsRealTime: ProductsRealTimeService) {}
 * 
 * ngOnInit() {
 *   // Подписаться на real-time данные
 *   this.productsRealTime.data$.subscribe(products => {
 *     console.log('Products updated:', products);
 *   });
 * 
 *   // Отслеживать loading
 *   this.productsRealTime.loading$.subscribe(loading => {
 *     console.log('Loading:', loading);
 *   });
 * 
 *   // Принудительно обновить
 *   this.productsRealTime.refresh();
 * }
 */
@Injectable({
  providedIn: 'root',
})
export class ProductsRealTimeService extends RealTimeDataService<Product> {
  constructor(
    productsApi: ProductsApiService,
    wsService: WebSocketService
  ) {
    super(productsApi as any, wsService, {
      // Использовать WebSocket (если доступен)
      useWebSocket: false, // Включите, когда WebSocket сервер будет готов
      websocketUrl: 'ws://localhost:3000',
      websocketEvent: 'products:updated',

      // Использовать polling
      usePolling: true,
      pollingInterval: 30000, // 30 секунд

      // Автоматически начать получение данных
      autoStart: true,
    });
  }

  /**
   * Кастомные методы для Products
   */
  addProduct(product: Product): void {
    this.addItemOptimistic(product);
  }

  updateProduct(id: string, updates: Partial<Product>): void {
    this.updateItemOptimistic((p) => p.id === id, updates);
  }

  deleteProduct(id: string): void {
    this.removeItemOptimistic((p) => p.id === id);
  }

  getProductById(id: string): Product | undefined {
    return this.getCurrentData().find((p) => p.id === id);
  }

  getProductsByCategory(category: string): Product[] {
    return this.getCurrentData().filter((p) => p.category === category);
  }
}

