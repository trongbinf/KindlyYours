import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface GiftBoxTemplateItem { productId: string; quantity: number; }
export interface GiftBoxTemplate {
  id: string;
  name: string;
  price: number;
  image?: string;
  description?: string;
  cardOptions: string[]; // names of cards available for this box
  items: GiftBoxTemplateItem[]; // preselected items (can be editable in UI)
}

@Injectable({ providedIn: 'root' })
export class GiftBoxTemplatesLocalService {
  constructor(private http: HttpClient) {}

  getTemplates(): Promise<GiftBoxTemplate[]> {
    return firstValueFrom(this.http.get<GiftBoxTemplate[]>('assets/data/giftboxes.json'));
  }

  async getTemplateById(id: string): Promise<GiftBoxTemplate | undefined> {
    const all = await this.getTemplates();
    return all.find(t => t.id === id);
  }
}


