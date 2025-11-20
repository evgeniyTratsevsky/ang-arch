import { inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry, shareReplay } from 'rxjs/operators';

/**
 * Интерфейс для пагинации
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

/**
 * Ответ с пагинацией
 */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Конфигурация для HTTP запросов
 */
export interface HttpConfig {
  headers?: HttpHeaders;
  params?: HttpParams;
  retryAttempts?: number;
}

/**
 * Generic HTTP CRUD Service
 * Базовый класс для всех data-access сервисов
 * 
 * @example
 * export class ProductsService extends CrudBaseService<Product, ProductDto> {
 *   constructor() {
 *     super('/api/products');
 *   }
 * 
 *   protected override mapFromDto(dto: ProductDto): Product {
 *     return ProductMapper.fromDto(dto);
 *   }
 * }
 */
export abstract class CrudBaseService<TModel, TDto = TModel> {
  protected readonly http = inject(HttpClient);
  protected readonly baseUrl: string;
  protected readonly defaultRetryAttempts = 2;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  /**
   * Получить все записи
   * @param params - параметры запроса (пагинация, фильтры)
   * @param config - конфигурация HTTP запроса
   */
  getAll(
    params?: PaginationParams & Record<string, any>,
    config?: HttpConfig
  ): Observable<TModel[]> {
    const httpParams = this.buildHttpParams(params);
    const options = this.buildHttpOptions(config, httpParams);

    return this.http.get<TDto[]>(this.baseUrl, options).pipe(
      retry(config?.retryAttempts ?? this.defaultRetryAttempts),
      map((dtos: TDto[]) => dtos.map((dto: TDto) => this.mapFromDto(dto))),
      catchError((error) => this.handleError(error)),
      shareReplay(1)
    );
  }

  /**
   * Получить все с пагинацией
   */
  getAllPaginated(
    params?: PaginationParams & Record<string, any>,
    config?: HttpConfig
  ): Observable<PaginatedResponse<TModel>> {
    const httpParams = this.buildHttpParams(params);
    const options = this.buildHttpOptions(config, httpParams);

    return this.http.get<PaginatedResponse<TDto>>(this.baseUrl, options).pipe(
      retry(config?.retryAttempts ?? this.defaultRetryAttempts),
      map((response: PaginatedResponse<TDto>) => ({
        ...response,
        data: response.data.map((dto: TDto) => this.mapFromDto(dto)),
      })),
      catchError((error) => this.handleError(error)),
      shareReplay(1)
    );
  }

  /**
   * Получить одну запись по ID
   */
  getById(id: string | number, config?: HttpConfig): Observable<TModel> {
    const options = this.buildHttpOptions(config);

    return this.http.get<TDto>(`${this.baseUrl}/${id}`, options).pipe(
      retry(config?.retryAttempts ?? this.defaultRetryAttempts),
      map((dto: TDto) => this.mapFromDto(dto)),
      catchError((error) => this.handleError(error)),
      shareReplay(1)
    );
  }

  /**
   * Создать новую запись
   */
  create(data: Partial<TModel>, config?: HttpConfig): Observable<TModel> {
    const dto = this.mapToDto(data);
    const options = this.buildHttpOptions(config);

    return this.http.post<TDto>(this.baseUrl, dto, options).pipe(
      map((dto: TDto) => this.mapFromDto(dto)),
      catchError((error) => this.handleError(error))
    );
  }

  /**
   * Обновить запись
   */
  update(
    id: string | number,
    data: Partial<TModel>,
    config?: HttpConfig
  ): Observable<TModel> {
    const dto = this.mapToDto(data);
    const options = this.buildHttpOptions(config);

    return this.http.put<TDto>(`${this.baseUrl}/${id}`, dto, options).pipe(
      map((dto: TDto) => this.mapFromDto(dto)),
      catchError((error) => this.handleError(error))
    );
  }

  /**
   * Частичное обновление (PATCH)
   */
  patch(
    id: string | number,
    data: Partial<TModel>,
    config?: HttpConfig
  ): Observable<TModel> {
    const dto = this.mapToDto(data);
    const options = this.buildHttpOptions(config);

    return this.http.patch<TDto>(`${this.baseUrl}/${id}`, dto, options).pipe(
      map((dto: TDto) => this.mapFromDto(dto)),
      catchError((error) => this.handleError(error))
    );
  }

  /**
   * Удалить запись
   */
  delete(id: string | number, config?: HttpConfig): Observable<void> {
    const options = this.buildHttpOptions(config);

    return this.http.delete<void>(`${this.baseUrl}/${id}`, options).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  /**
   * Bulk операции
   */
  bulkCreate(items: Partial<TModel>[], config?: HttpConfig): Observable<TModel[]> {
    const dtos = items.map((item) => this.mapToDto(item));
    const options = this.buildHttpOptions(config);

    return this.http.post<TDto[]>(`${this.baseUrl}/bulk`, dtos, options).pipe(
      map((dtos: TDto[]) => dtos.map((dto: TDto) => this.mapFromDto(dto))),
      catchError((error) => this.handleError(error))
    );
  }

  bulkDelete(ids: (string | number)[], config?: HttpConfig): Observable<void> {
    const options = this.buildHttpOptions(config);

    const requestOptions = {
      ...(options || {}),
      body: { ids },
    };
    return this.http
      .request<void>('DELETE', `${this.baseUrl}/bulk`, requestOptions)
      .pipe(catchError((error) => this.handleError(error)));
  }

  /**
   * Преобразование DTO в UI Model
   * Переопределите в наследнике для кастомной логики
   */
  protected mapFromDto(dto: TDto): TModel {
    return dto as unknown as TModel;
  }

  /**
   * Преобразование UI Model в DTO
   * Переопределите в наследнике для кастомной логики
   */
  protected mapToDto(model: Partial<TModel>): Partial<TDto> {
    return model as unknown as Partial<TDto>;
  }

  /**
   * Обработка ошибок
   * Переопределите для кастомной обработки
   */
  protected handleError(error: any): Observable<never> {
    console.error('HTTP Error:', error);

    let errorMessage = 'An error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(() => new Error(errorMessage));
  }

  /**
   * Построение HTTP параметров
   */
  protected buildHttpParams(
    params?: Record<string, any>
  ): HttpParams | undefined {
    if (!params) return undefined;

    let httpParams = new HttpParams();

    Object.keys(params).forEach((key) => {
      const value = params[key];
      if (value !== null && value !== undefined) {
        if (Array.isArray(value)) {
          value.forEach((item) => {
            httpParams = httpParams.append(key, item.toString());
          });
        } else {
          httpParams = httpParams.append(key, value.toString());
        }
      }
    });

    return httpParams;
  }

  /**
   * Построение HTTP опций
   */
  protected buildHttpOptions(
    config?: HttpConfig,
    params?: HttpParams
  ): any {
    return {
      headers: config?.headers,
      params: params || config?.params,
    };
  }
}

