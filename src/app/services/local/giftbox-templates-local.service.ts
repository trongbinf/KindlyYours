import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface GiftBoxTemplateItem { productId: string; quantity: number; }
export interface CardOption {
  name: string;
  image?: string;
}

export interface GiftBoxTemplate {
  id: string;
  name: string;
  price: number;
  rating?: number;
  discountPercent?: number;
  sold?: number;
  image?: string;
  description?: string;
  cardOptions?: (string | CardOption)[]; // Optional: if not provided, use all common cards
  items: GiftBoxTemplateItem[]; // preselected items (can be editable in UI)
}

@Injectable({ providedIn: 'root' })
export class GiftBoxTemplatesLocalService {
  private commonCards: CardOption[] | null = null;

  constructor(private http: HttpClient) {}

  getTemplates(): Promise<GiftBoxTemplate[]> {
    return firstValueFrom(this.http.get<GiftBoxTemplate[]>('assets/data/giftboxes.json'));
  }

  async getTemplateById(id: string): Promise<GiftBoxTemplate | undefined> {
    const all = await this.getTemplates();
    return all.find(t => t.id === id);
  }

  async getCommonCards(): Promise<CardOption[]> {
    if (this.commonCards) {
      return this.commonCards;
    }
    this.commonCards = await firstValueFrom(this.http.get<CardOption[]>('assets/data/cards.json'));
    return this.commonCards;
  }

  async getCardOptionsForProduct(product: GiftBoxTemplate): Promise<CardOption[]> {
    // Always use all common cards for all products
    return await this.getCommonCards();
  }
}


