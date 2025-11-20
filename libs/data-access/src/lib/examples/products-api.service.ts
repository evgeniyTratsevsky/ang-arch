import { Injectable } from '@angular/core';
import { CrudBaseService } from '../services/crud-base.service';

/**
 * Product UI Model
 */
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  formattedPrice: string;
  imageUrl: string;
  inStock: boolean;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Product DTO (от backend)
 */
export interface ProductDto {
  id: string;
  name: string;
  description: string;
  price_cents: number;
  image_url: string;
  stock_quantity: number;
  category: string;
  created_at: string;
  updated_at: string;
}

/**
 * Products API Service
 * Пример использования CrudBaseService
 * 
 * @example
 * // В компоненте
 * constructor(private productsApi: ProductsApiService) {}
 * 
 * ngOnInit() {
 *   // Получить все продукты
 *   this.productsApi.getAll().subscribe(products => {
 *     console.log('Products:', products);
 *   });
 * 
 *   // Получить продукт по ID
 *   this.productsApi.getById('123').subscribe(product => {
 *     console.log('Product:', product);
 *   });
 * 
 *   // Создать продукт
 *   this.productsApi.create({
 *     name: 'New Product',
 *     price: 99.99,
 *     category: 'electronics'
 *   }).subscribe(product => {
 *     console.log('Created:', product);
 *   });
 * }
 */
@Injectable({
  providedIn: 'root',
})
export class ProductsApiService extends CrudBaseService<Product, ProductDto> {
  constructor() {
    super('/api/products');
  }

  /**
   * Преобразование DTO в UI Model
   */
  protected override mapFromDto(dto: ProductDto): Product {
    return {
      id: dto.id,
      name: dto.name,
      description: dto.description,
      price: dto.price_cents / 100,
      formattedPrice: `$${(dto.price_cents / 100).toFixed(2)}`,
      imageUrl: dto.image_url,
      inStock: dto.stock_quantity > 0,
      category: dto.category,
      createdAt: new Date(dto.created_at),
      updatedAt: new Date(dto.updated_at),
    };
  }

  /**
   * Преобразование UI Model в DTO
   */
  protected override mapToDto(model: Partial<Product>): Partial<ProductDto> {
    const dto: Partial<ProductDto> = {};

    if (model.name !== undefined) dto.name = model.name;
    if (model.description !== undefined) dto.description = model.description;
    if (model.price !== undefined) dto.price_cents = Math.round(model.price * 100);
    if (model.imageUrl !== undefined) dto.image_url = model.imageUrl;
    if (model.category !== undefined) dto.category = model.category;

    return dto;
  }

  /**
   * Кастомные методы для Products
   */
  getByCategory(category: string) {
    return this.getAll({ category });
  }

  searchByName(query: string) {
    return this.getAll({ search: query });
  }

  getInStock() {
    return this.getAll({ inStock: true });
  }
}

