import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Header } from '../../core/header/header';
import { Footer } from '../../core/footer/footer';
import { GiftBoxTemplatesLocalService, GiftBoxTemplate } from '../../services/local/giftbox-templates-local.service';

@Component({
  selector: 'app-corporate-gifts',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, Header, Footer],
  templateUrl: './corporate-gifts.html',
  styleUrl: './corporate-gifts.css'
})
export class CorporateGifts implements OnInit {
  constructor(private templatesService: GiftBoxTemplatesLocalService) {}

  corporateGiftboxes: GiftBoxTemplate[] = [];
  readonly Math = Math;

  // Form data
  formData = {
    customerName: '',
    email: '',
    phone: '',
    company: '',
    quantity: '',
    needs: ''
  };

  async ngOnInit() {
    window.scrollTo(0, 0);
    const allGiftboxes = await this.templatesService.getTemplates();
    // Filter for corporate gifts - include corporate-box and any others that might be corporate
    this.corporateGiftboxes = allGiftboxes.filter(g => 
      g.id === 'corporate-box' || 
      g.id.includes('corporate-gift-set') ||
      g.name.toLowerCase().includes('corporate') ||
      g.name.toLowerCase().includes('doanh nghiệp') ||
      g.name.toLowerCase().includes('đối tác')
    );
    // If no corporate boxes found, show all boxes as fallback
    if (this.corporateGiftboxes.length === 0) {
      this.corporateGiftboxes = allGiftboxes;
    }
  }

  getFinalPrice(g: GiftBoxTemplate): number {
    const discount = g.discountPercent || 0;
    return Math.round(g.price * (1 - discount));
  }

  submitForm() {
    // Handle form submission
    console.log('Form submitted:', this.formData);
    alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.');
    // Reset form
    this.formData = {
      customerName: '',
      email: '',
      phone: '',
      company: '',
      quantity: '',
      needs: ''
    };
  }
}

