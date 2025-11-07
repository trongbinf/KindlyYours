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
  promoPrice?: number; // Giá sau khi khuyến mãi tăng (trước khi discount)
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
    if (product.cardOptions && product.cardOptions.length > 0) {
      const common = await this.getCommonCards();
      return product.cardOptions.map((card) => {
        if (typeof card === 'string') {
          const found = common.find(c => c.name === card);
          return { name: card, image: found?.image };
        }
        // If card is already an object, prefer its image; if missing, try enrich from common list
        if (!card.image) {
          const found = common.find(c => c.name === card.name);
          return { name: card.name, image: found?.image };
        }
        return card;
      });
    }
    return await this.getCommonCards();
  }
}


