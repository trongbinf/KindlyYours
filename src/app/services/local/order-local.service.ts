import { Injectable } from '@angular/core';
import { Order } from '../../models';
import { loadFromStorage, saveToStorage } from './storage.util';

const KEY = 'ky.orders';

@Injectable({ providedIn: 'root' })
export class OrderLocalService {
  private map: Record<string, Order>;

  constructor() {
    this.map = loadFromStorage<Record<string, Order>>(KEY, {});
  }

  async createOrder(order: Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'code'>) {
    const id = crypto.randomUUID();
    const code = this.generateOrderCode();
    const created: Order = {
      ...order,
      id,
      code,
      status: 'pending',
      createdAt: Date.now(),
    } as Order;
    this.map[id] = created;
    saveToStorage(KEY, this.map);
    return { id };
  }

  async getOrder(id: string) {
    return this.map[id];
  }

  async updateOrder(id: string, partial: Partial<Order>) {
    const cur = this.map[id];
    if (!cur) return;
    this.map[id] = { ...cur, ...partial, updatedAt: Date.now() } as Order;
    saveToStorage(KEY, this.map);
  }

  private generateOrderCode() {
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `KY-${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase()}`;
  }
}


