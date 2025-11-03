import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Category, Product } from '../../models';

@Injectable({ providedIn: 'root' })
export class CatalogLocalService {
  constructor(private http: HttpClient) {}

  getCategories(): Promise<Category[]> {
    return firstValueFrom(this.http.get<Category[]>('assets/data/categories.json'));
  }

  async getProducts(): Promise<Product[]> {
    return firstValueFrom(this.http.get<Product[]>('assets/data/products.json'));
  }

  async getProductsByCategory(categoryId: string): Promise<Product[]> {
    const all = await this.getProducts();
    return all.filter((p) => p.categoryIds?.includes(categoryId));
  }

  async getProduct(productId: string): Promise<Product | undefined> {
    const all = await this.getProducts();
    return all.find((p) => p.id === productId);
  }
}


