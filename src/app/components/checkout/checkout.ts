import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Header } from '../../core/header/header';
import { Footer } from '../../core/footer/footer';

interface CheckoutItem {
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, Header, Footer],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class CheckoutPage {
  customer = {
    name: '',
    phone: '',
    email: '',
    address: '',
    province: '',
    district: '',
    ward: '',
    note: ''
  };

  checkoutData = history.state || {};

  get items(): CheckoutItem[] {
    const box = this.checkoutData.box
      ? [{ name: this.checkoutData.box.name, quantity: 1, price: this.checkoutData.box.price || 0, image: this.checkoutData.box.image }]
      : [];
    const products: CheckoutItem[] = (this.checkoutData.items || []).map((it: any) => ({
      name: it.product?.name || 'Sản phẩm',
      quantity: it.quantity || 1,
      price: it.product?.price || 0,
      image: it.product?.images?.[0] || ''
    }));
    return [...box, ...products];
  }

  get subtotal(): number {
    if (typeof this.checkoutData.subtotal === 'number') return this.checkoutData.subtotal;
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  shippingFee = 35000;

  get total(): number {
    return this.subtotal + this.shippingFee;
  }

  placeOrder() {
    alert('Đặt hàng thành công!');
  }
}

