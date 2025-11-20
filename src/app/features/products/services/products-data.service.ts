import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product, ProductDto, ProductMapper } from '../models/product.model';

/**
 * Data Service - простой коннектор к API
 * Не содержит бизнес-логику, только HTTP запросы
 * Преобразует DTO в UI модели
 */
@Injectable({
  providedIn: 'root',
})
export class ProductsDataService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/products';

  getProducts(): Observable<Product[]> {
    return this.http
      .get<ProductDto[]>(this.apiUrl)
      .pipe(map((dtos) => ProductMapper.fromDtoList(dtos)));
  }

  getProduct(id: string): Observable<Product> {
    return this.http
      .get<ProductDto>(`${this.apiUrl}/${id}`)
      .pipe(map((dto) => ProductMapper.fromDto(dto)));
  }

  createProduct(product: Partial<Product>): Observable<Product> {
    return this.http
      .post<ProductDto>(this.apiUrl, product)
      .pipe(map((dto) => ProductMapper.fromDto(dto)));
  }

  updateProduct(id: string, product: Partial<Product>): Observable<Product> {
    return this.http
      .put<ProductDto>(`${this.apiUrl}/${id}`, product)
      .pipe(map((dto) => ProductMapper.fromDto(dto)));
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

