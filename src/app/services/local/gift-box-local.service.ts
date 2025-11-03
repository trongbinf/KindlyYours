import { Injectable } from '@angular/core';
import { GiftBox } from '../../models';
import { loadFromStorage, saveToStorage } from './storage.util';

const KEY = 'ky.giftBoxes';

@Injectable({ providedIn: 'root' })
export class GiftBoxLocalService {
  private map: Record<string, GiftBox>;

  constructor() {
    this.map = loadFromStorage<Record<string, GiftBox>>(KEY, {});
  }

  async createGiftBox(box: Omit<GiftBox, 'id' | 'createdAt' | 'updatedAt'>) {
    const id = crypto.randomUUID();
    const created: GiftBox = { ...box, id, createdAt: Date.now(), updatedAt: Date.now() };
    this.map[id] = created;
    saveToStorage(KEY, this.map);
    return { id };
  }

  async getGiftBox(id: string) {
    return this.map[id];
  }

  async updateGiftBox(id: string, partial: Partial<GiftBox>) {
    const cur = this.map[id];
    if (!cur) return;
    this.map[id] = { ...cur, ...partial, updatedAt: Date.now() } as GiftBox;
    saveToStorage(KEY, this.map);
  }
}


