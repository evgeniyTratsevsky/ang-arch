import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

/**
 * Simplified CRUD Service
 * Упрощенная версия для быстрого старта
 */
export abstract class SimpleCrudService<T> {
  protected readonly http = inject(HttpClient);
  protected abstract readonly baseUrl: string;

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.baseUrl);
  }

  getById(id: string | number): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${id}`);
  }

  create(data: Partial<T>): Observable<T> {
    return this.http.post<T>(this.baseUrl, data);
  }

  update(id: string | number, data: Partial<T>): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${id}`, data);
  }

  delete(id: string | number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

