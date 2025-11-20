import { Injectable, inject } from '@angular/core';
import { Observable, Subject, timer, NEVER } from 'rxjs';
import {
  webSocket,
  WebSocketSubject,
  WebSocketSubjectConfig,
} from 'rxjs/webSocket';
import {
  retryWhen,
  tap,
  delayWhen,
  switchMap,
  shareReplay,
  filter,
} from 'rxjs/operators';

/**
 * Конфигурация WebSocket
 */
export interface WebSocketConfig {
  url: string;
  reconnect?: boolean;
  reconnectInterval?: number;
  reconnectAttempts?: number;
}

/**
 * WebSocket сообщение
 */
export interface WebSocketMessage<T = any> {
  type: string;
  data: T;
  timestamp?: number;
}

/**
 * WebSocket Service для real-time коммуникации
 * 
 * @example
 * // В компоненте
 * this.wsService.connect('ws://localhost:3000');
 * 
 * // Подписка на сообщения
 * this.wsService.on<Product>('product:updated')
 *   .subscribe(product => console.log('Product updated:', product));
 * 
 * // Отправка сообщений
 * this.wsService.send('product:create', { name: 'New Product' });
 */
@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket$: WebSocketSubject<any> | null = null;
  private messagesSubject$ = new Subject<WebSocketMessage>();
  private readonly messages$ = this.messagesSubject$.asObservable();
  private reconnectAttempt = 0;
  private config: WebSocketConfig | null = null;

  /**
   * Подключиться к WebSocket серверу
   */
  connect(config: string | WebSocketConfig): Observable<any> {
    if (typeof config === 'string') {
      config = {
        url: config,
        reconnect: true,
        reconnectInterval: 5000,
        reconnectAttempts: 10,
      };
    }

    this.config = config;

    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = this.createWebSocket(config);
      this.reconnectAttempt = 0;
    }

    return this.socket$.pipe(
      tap({
        next: (message) => {
          console.log('[WebSocket] Received:', message);
          this.messagesSubject$.next(message);
        },
        error: (error) => {
          console.error('[WebSocket] Error:', error);
        },
        complete: () => {
          console.log('[WebSocket] Connection closed');
        },
      }),
      retryWhen((errors) =>
        errors.pipe(
          tap((error) => {
            this.reconnectAttempt++;
            console.log(
              `[WebSocket] Reconnecting... Attempt ${this.reconnectAttempt}`
            );
          }),
          delayWhen(() => {
            if (
              config.reconnect &&
              this.reconnectAttempt <= (config.reconnectAttempts || 10)
            ) {
              return timer(config.reconnectInterval || 5000);
            }
            return NEVER;
          })
        )
      ),
      shareReplay(1)
    );
  }

  /**
   * Создать WebSocket подключение
   */
  private createWebSocket(config: WebSocketConfig): WebSocketSubject<any> {
    const wsConfig: WebSocketSubjectConfig<any> = {
      url: config.url,
      openObserver: {
        next: () => {
          console.log('[WebSocket] Connected');
          this.reconnectAttempt = 0;
        },
      },
      closeObserver: {
        next: () => {
          console.log('[WebSocket] Disconnected');
        },
      },
    };

    return webSocket(wsConfig);
  }

  /**
   * Отправить сообщение через WebSocket
   */
  send<T = any>(type: string, data: T): void {
    if (!this.socket$ || this.socket$.closed) {
      console.error('[WebSocket] Not connected. Call connect() first.');
      return;
    }

    const message: WebSocketMessage<T> = {
      type,
      data,
      timestamp: Date.now(),
    };

    console.log('[WebSocket] Sending:', message);
    this.socket$.next(message);
  }

  /**
   * Подписаться на сообщения определенного типа
   */
  on<T = any>(type: string): Observable<T> {
    return this.messages$.pipe(
      filter((message) => message.type === type),
      tap((message) => console.log(`[WebSocket] Message '${type}':`, message)),
      switchMap((message) => {
        // Если data - это observable, разворачиваем его
        if (message.data && typeof (message.data as any).subscribe === 'function') {
          return message.data as Observable<T>;
        }
        return [message.data as T];
      })
    );
  }

  /**
   * Получить все сообщения
   */
  getAllMessages(): Observable<WebSocketMessage> {
    return this.messages$;
  }

  /**
   * Отключиться от WebSocket
   */
  disconnect(): void {
    if (this.socket$) {
      this.socket$.complete();
      this.socket$ = null;
    }
  }

  /**
   * Проверить статус подключения
   */
  isConnected(): boolean {
    return this.socket$ !== null && !this.socket$.closed;
  }

  /**
   * Переподключиться
   */
  reconnect(): void {
    if (this.config) {
      this.disconnect();
      this.connect(this.config).subscribe();
    }
  }
}

