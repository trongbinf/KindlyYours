import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Header } from '../../core/header/header';
import { Footer } from '../../core/footer/footer';
import { GiftBoxTemplatesLocalService, GiftBoxTemplate } from '../../services/local/giftbox-templates-local.service';
import Swal from 'sweetalert2';

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
    // Scroll to top when component is initialized
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    const basePrice = g.promoPrice ?? g.price;
    return Math.round(basePrice * (1 - discount));
  }

  getOriginalPrice(g: GiftBoxTemplate): number {
    return g.promoPrice ?? g.price;
  }

  submitForm() {
    // Validate form - check all required fields
    if (!this.formData.customerName || !this.formData.customerName.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Thiếu thông tin',
        text: 'Vui lòng nhập tên khách hàng.',
        confirmButtonText: 'Đã hiểu',
        confirmButtonColor: '#B4232C'
      });
      return;
    }

    if (!this.formData.email || !this.formData.email.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Thiếu thông tin',
        text: 'Vui lòng nhập email.',
        confirmButtonText: 'Đã hiểu',
        confirmButtonColor: '#B4232C'
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.formData.email)) {
      Swal.fire({
        icon: 'warning',
        title: 'Email không hợp lệ',
        text: 'Vui lòng nhập địa chỉ email hợp lệ.',
        confirmButtonText: 'Đã hiểu',
        confirmButtonColor: '#B4232C'
      });
      return;
    }

    if (!this.formData.phone || !this.formData.phone.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Thiếu thông tin',
        text: 'Vui lòng nhập số điện thoại.',
        confirmButtonText: 'Đã hiểu',
        confirmButtonColor: '#B4232C'
      });
      return;
    }

    if (!this.formData.company || !this.formData.company.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Thiếu thông tin',
        text: 'Vui lòng nhập tên công ty/tổ chức.',
        confirmButtonText: 'Đã hiểu',
        confirmButtonColor: '#B4232C'
      });
      return;
    }

    if (!this.formData.quantity || !this.formData.quantity.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Thiếu thông tin',
        text: 'Vui lòng chọn số lượng set quà.',
        confirmButtonText: 'Đã hiểu',
        confirmButtonColor: '#B4232C'
      });
      return;
    }

    if (!this.formData.needs || !this.formData.needs.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Thiếu thông tin',
        text: 'Vui lòng nhập nhu cầu của doanh nghiệp.',
        confirmButtonText: 'Đã hiểu',
        confirmButtonColor: '#B4232C'
      });
      return;
    }

    // All validations passed
    console.log('Form submitted:', this.formData);
    Swal.fire({
      icon: 'success',
      title: 'Gửi yêu cầu thành công!',
      text: 'Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.',
      confirmButtonText: 'Đã hiểu',
      confirmButtonColor: '#B4232C'
    });
    
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

