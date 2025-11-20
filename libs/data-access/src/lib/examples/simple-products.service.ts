import { Injectable, signal } from '@angular/core';
import { Observable, BehaviorSubject, interval } from 'rxjs';
import { startWith, tap } from 'rxjs/operators';

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
 * Simple Products Service with mock data
 * Упрощенный сервис для демонстрации
 */
@Injectable({
  providedIn: 'root',
})
export class SimpleProductsService {
  private productsSubject = new BehaviorSubject<Product[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<Error | null>(null);

  public readonly data$ = this.productsSubject.asObservable();
  public readonly loading$ = this.loadingSubject.asObservable();
  public readonly error$ = this.errorSubject.asObservable();

  private mockProducts: Product[] = [];
  private nextId = 1;

  constructor() {
    this.initializeMockData();
    this.startPolling();
  }

  private initializeMockData() {
    this.mockProducts = [
      {
        id: String(this.nextId++),
        name: 'Ноутбук Pro',
        description: 'Мощный ноутбук для разработки',
        price: 1299.99,
        formattedPrice: '$1,299.99',
        imageUrl: 'https://via.placeholder.com/400x300/2196F3/FFFFFF?text=Laptop',
        inStock: true,
        category: 'Электроника',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: String(this.nextId++),
        name: 'Смартфон XZ',
        description: 'Флагманский смартфон',
        price: 899.99,
        formattedPrice: '$899.99',
        imageUrl: 'https://via.placeholder.com/400x300/4CAF50/FFFFFF?text=Phone',
        inStock: true,
        category: 'Электроника',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: String(this.nextId++),
        name: 'Наушники Pro',
        description: 'Беспроводные наушники с шумоподавлением',
        price: 299.99,
        formattedPrice: '$299.99',
        imageUrl: 'https://via.placeholder.com/400x300/FF9800/FFFFFF?text=Headphones',
        inStock: false,
        category: 'Аксессуары',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    this.productsSubject.next([...this.mockProducts]);
  }

  private startPolling() {
    interval(30000)
      .pipe(
        startWith(0),
        tap(() => {
          console.log('[SimpleProductsService] Polling data...');
          this.productsSubject.next([...this.mockProducts]);
        })
      )
      .subscribe();
  }

  refresh() {
    this.productsSubject.next([...this.mockProducts]);
  }

  addProduct(product: Product) {
    this.mockProducts.push(product);
    this.productsSubject.next([...this.mockProducts]);
  }

  updateProduct(id: string, updates: Partial<Product>) {
    const index = this.mockProducts.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.mockProducts[index] = { ...this.mockProducts[index], ...updates };
      this.productsSubject.next([...this.mockProducts]);
    }
  }

  deleteProduct(id: string) {
    this.mockProducts = this.mockProducts.filter((p) => p.id !== id);
    this.productsSubject.next([...this.mockProducts]);
  }

  getCurrentData(): Product[] {
    return [...this.mockProducts];
  }

  clearAll() {
    this.mockProducts = [];
    this.nextId = 1;
    this.productsSubject.next([]);
  }
}

