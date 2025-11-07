import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Header } from '../../core/header/header';
import { Footer } from '../../core/footer/footer';
import { GiftBoxTemplatesLocalService, GiftBoxTemplate } from '../../services/local/giftbox-templates-local.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-giftbox-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, Header, Footer],
  templateUrl: './giftbox-list.html',
  styleUrl: './giftbox-list.css'
})
export class GiftboxList implements OnInit {
  constructor(private templatesService: GiftBoxTemplatesLocalService) {}

  allGiftboxes: GiftBoxTemplate[] = [];
  giftboxes: GiftBoxTemplate[] = [];
  displayedGiftboxes: GiftBoxTemplate[] = [];
  readonly Math = Math;
  selectedSort = 'default';
  selectedPriceRange = '';
  searchText = '';
  isSortOpen = false;
  
  // Pagination
  itemsPerPage = 12;
  currentPage = 1;
  totalPages = 1;
  
  // Form data
  formData = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };
  
  sortOptions = [
    { value: 'newest', label: 'Theo mới nhất' },
    { value: 'oldest', label: 'Theo cũ nhất' },
    { value: 'price-low', label: 'Theo giá thấp nhất' },
    { value: 'price-high', label: 'Theo giá cao nhất' }
  ];

  async ngOnInit() {
    window.scrollTo(0, 0);
    this.allGiftboxes = await this.templatesService.getTemplates();
    this.giftboxes = this.allGiftboxes;
    this.updatePagination();
  }

  getFinalPrice(g: GiftBoxTemplate): number {
    const discount = g.discountPercent || 0;
    const basePrice = g.promoPrice ?? g.price;
    return Math.round(basePrice * (1 - discount));
  }

  getOriginalPrice(g: GiftBoxTemplate): number {
    return g.promoPrice ?? g.price;
  }

  applyPriceFilter() { this.applyFilters(); }

  applyFilters() {
    let data = this.allGiftboxes.slice();

    // price filter
    if (this.selectedPriceRange) {
      const [minStr, maxStr] = this.selectedPriceRange.split('-');
      const min = Number(minStr);
      const max = maxStr ? Number(maxStr) : Number.POSITIVE_INFINITY;
      data = data.filter(g => {
        const price = this.getFinalPrice(g);
        return price >= min && price <= max;
      });
    }

    // text search by name (case-insensitive, trims extra spaces)
    const q = this.searchText.trim().toLowerCase();
    if (q) {
      data = data.filter(g => g.name.toLowerCase().includes(q));
    }

    this.giftboxes = this.sortGiftboxes(data);
    this.currentPage = 1;
    this.updatePagination();
  }

  sortGiftboxes(data: GiftBoxTemplate[]): GiftBoxTemplate[] {
    const sorted = [...data];
    switch (this.selectedSort) {
      case 'price-low':
        return sorted.sort((a, b) => this.getFinalPrice(a) - this.getFinalPrice(b));
      case 'price-high':
        return sorted.sort((a, b) => this.getFinalPrice(b) - this.getFinalPrice(a));
      case 'newest':
        // Sort by sold count descending (most popular first) as proxy for newest
        return sorted.sort((a, b) => (b.sold || 0) - (a.sold || 0));
      case 'oldest':
        // Sort by sold count ascending (least popular first) as proxy for oldest
        return sorted.sort((a, b) => (a.sold || 0) - (b.sold || 0));
      default:
        return sorted;
    }
  }

  selectSort(value: string) {
    this.selectedSort = value;
    this.isSortOpen = false;
    this.applyFilters();
  }

  getSortLabel(): string {
    const opt = this.sortOptions.find(o => o.value === this.selectedSort);
    return opt ? opt.label : 'mặc định';
  }

  clearFilters() {
    this.selectedPriceRange = '';
    this.searchText = '';
    this.selectedSort = 'default';
    this.giftboxes = this.allGiftboxes;
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.giftboxes.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedGiftboxes = this.giftboxes.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxPages = 5; // Show max 5 page numbers
    let startPage = Math.max(1, this.currentPage - Math.floor(maxPages / 2));
    let endPage = Math.min(this.totalPages, startPage + maxPages - 1);
    
    if (endPage - startPage < maxPages - 1) {
      startPage = Math.max(1, endPage - maxPages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  submitForm() {
    // Validate form
    if (!this.formData.name || !this.formData.name.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Thiếu thông tin',
        text: 'Vui lòng nhập họ tên.',
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

    if (!this.formData.message || !this.formData.message.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Thiếu thông tin',
        text: 'Vui lòng nhập nội dung tin nhắn.',
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
      name: '',
      email: '',
      phone: '',
      message: ''
    };
  }
}


