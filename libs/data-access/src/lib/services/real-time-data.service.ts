import { Injectable, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  Observable,
  BehaviorSubject,
  interval,
  merge,
  of,
  timer,
} from 'rxjs';
import {
  switchMap,
  map,
  distinctUntilChanged,
  shareReplay,
  catchError,
  tap,
  startWith,
} from 'rxjs/operators';
import { WebSocketService } from './websocket.service';
import { CrudBaseService } from './crud-base.service';

/**
 * Конфигурация real-time обновлений
 */
export interface RealTimeConfig {
  /** Использовать WebSocket для real-time обновлений */
  useWebSocket?: boolean;
  /** URL WebSocket сервера */
  websocketUrl?: string;
  /** Событие WebSocket для обновлений */
  websocketEvent?: string;
  /** Использовать polling */
  usePolling?: boolean;
  /** Интервал polling в миллисекундах */
  pollingInterval?: number;
  /** Автоматически начать получение данных */
  autoStart?: boolean;
}

/**
 * Real-Time Data Service
 * Обеспечивает real-time обновление данных через WebSocket или polling
 * 
 * @example
 * export class ProductsRealTimeService extends RealTimeDataService<Product> {
 *   constructor(
 *     private productsService: ProductsService,
 *     wsService: WebSocketService
 *   ) {
 *     super(
 *       productsService,
 *       wsService,
 *       {
 *         useWebSocket: true,
 *         websocketUrl: 'ws://localhost:3000',
 *         websocketEvent: 'products:updated',
 *         usePolling: true,
 *         pollingInterval: 30000,
 *         autoStart: true
 *       }
 *     );
 *   }
 * }
 */
export abstract class RealTimeDataService<T> {
  private readonly destroyRef = inject(DestroyRef);
  private readonly dataSubject$ = new BehaviorSubject<T[]>([]);
  private readonly loadingSubject$ = new BehaviorSubject<boolean>(false);
  private readonly errorSubject$ = new BehaviorSubject<Error | null>(null);

  public readonly data$ = this.dataSubject$.asObservable();
  public readonly loading$ = this.loadingSubject$.asObservable();
  public readonly error$ = this.errorSubject$.asObservable();

  private isStarted = false;

  constructor(
    protected readonly crudService: CrudBaseService<T>,
    protected readonly wsService: WebSocketService,
    protected readonly config: RealTimeConfig
  ) {
    if (config.autoStart) {
      this.start();
    }
  }

  /**
   * Начать получение данных в real-time
   */
  start(): void {
    if (this.isStarted) {
      console.warn('[RealTimeDataService] Already started');
      return;
    }

    this.isStarted = true;
    this.loadingSubject$.next(true);

    const sources: Observable<T[]>[] = [];

    // WebSocket source
    if (this.config.useWebSocket && this.config.websocketUrl) {
      this.wsService
        .connect(this.config.websocketUrl)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe();

      const wsSource$ = this.wsService
        .on<T | T[]>(this.config.websocketEvent || 'data:updated')
        .pipe(
          map((data) => (Array.isArray(data) ? data : [data])),
          tap(() => console.log('[RealTimeDataService] WebSocket data received'))
        );

      sources.push(wsSource$);
    }

    // Polling source
    if (this.config.usePolling) {
      const pollingSource$ = interval(
        this.config.pollingInterval || 30000
      ).pipe(
        startWith(0), // Немедленная первая загрузка
        switchMap(() => {
          console.log('[RealTimeDataService] Polling data...');
          return this.crudService.getAll();
        }),
        catchError((error) => {
          console.error('[RealTimeDataService] Polling error:', error);
          this.errorSubject$.next(error);
          return of([]);
        })
      );

      sources.push(pollingSource$);
    }

    // Если нет источников, просто загружаем данные один раз
    if (sources.length === 0) {
      this.crudService
        .getAll()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (data) => {
            this.dataSubject$.next(data);
            this.loadingSubject$.next(false);
          },
          error: (error) => {
            this.errorSubject$.next(error);
            this.loadingSubject$.next(false);
          },
        });
      return;
    }

    // Объединяем все источники
    merge(...sources)
      .pipe(
        distinctUntilChanged(
          (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
        ),
        tap({
          next: (data) => {
            console.log('[RealTimeDataService] Data updated:', data.length);
            this.dataSubject$.next(data);
            this.loadingSubject$.next(false);
            this.errorSubject$.next(null);
          },
          error: (error) => {
            console.error('[RealTimeDataService] Error:', error);
            this.errorSubject$.next(error);
            this.loadingSubject$.next(false);
          },
        }),
        shareReplay(1),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  /**
   * Остановить получение данных
   */
  stop(): void {
    this.isStarted = false;
    if (this.config.useWebSocket) {
      this.wsService.disconnect();
    }
  }

  /**
   * Принудительно обновить данные
   */
  refresh(): void {
    this.loadingSubject$.next(true);
    this.crudService
      .getAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.dataSubject$.next(data);
          this.loadingSubject$.next(false);
        },
        error: (error) => {
          this.errorSubject$.next(error);
          this.loadingSubject$.next(false);
        },
      });
  }

  /**
   * Получить текущие данные
   */
  getCurrentData(): T[] {
    return this.dataSubject$.value;
  }

  /**
   * Добавить элемент локально (оптимистичное обновление)
   */
  addItemOptimistic(item: T): void {
    const currentData = this.dataSubject$.value;
    this.dataSubject$.next([...currentData, item]);
  }

  /**
   * Обновить элемент локально
   */
  updateItemOptimistic(
    predicate: (item: T) => boolean,
    updates: Partial<T>
  ): void {
    const currentData = this.dataSubject$.value;
    const updatedData = currentData.map((item) =>
      predicate(item) ? { ...item, ...updates } : item
    );
    this.dataSubject$.next(updatedData);
  }

  /**
   * Удалить элемент локально
   */
  removeItemOptimistic(predicate: (item: T) => boolean): void {
    const currentData = this.dataSubject$.value;
    const filteredData = currentData.filter((item) => !predicate(item));
    this.dataSubject$.next(filteredData);
  }
}

