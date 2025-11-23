import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  mobileMenuOpen = false;
  searchQuery = '';
  cartCount = 0;
  activeDropdown: 'giftbox' | 'corporate' | null = null;

  hotline = '039 541 4344';
  address = '125 Hoàng Ngân, Thanh Xuân, Hà Nội, Vietnam';
  
  socialMedia = {
    facebook: 'https://www.facebook.com/profile.php?id=61582666884768',
    instagram: 'https://www.instagram.com/kindlyyours.official',
    tiktok: 'https://www.tiktok.com/@kindly_yours?_r=1&_t=ZS-91Dmh4Rnl81',
    messenger: 'https://m.me/836206576242335',
    zalo: 'https://zalo.me/0395414344'
  };

  navLinks = [
    { href: '/', label: 'Trang chủ', hasDropdown: false },
    { href: '/collections/giftboxes', label: 'Bộ sưu tập', hasDropdown: true, key: 'giftbox' as const },
    { href: '/corporate-gifts', label: 'Quà tặng doanh nghiệp', hasDropdown: true, key: 'corporate' as const },
    { href: '/about', label: 'Giới thiệu', hasDropdown: false },
  ];

  // Mega dropdown data
  giftboxRecipients: string[] = [
    'Quà tặng cho cô ấy',
    'Quà tặng cho anh ấy',
    'Quà tặng cho mọi giới tính',
    'Quà tặng cho thanh thiếu niên',
    'Quà tặng cho các cặp đôi hoặc gia đình'
  ];

  giftboxOccasions: string[] = [
    'Period Care Package',
    'Healing Box',
    'Refesh Box',
    'Season Box (đầu đông)',
    'First Work Day Box',
    'Birthday Care Box',
    'Love & Care Box',
    'Joy box',
    'Corporate box',
    'For Him box'
  ];

  corporateLinks: string[] = [
    'Chúng tôi làm gì',
    'Liên hệ với chúng tôi',
    'Quà tặng nhân viên',
    'Quà tặng khách hàng',
    'Quà tặng sự kiện',
    'Quà tặng có thương hiệu',
    'Quà tặng Giáng sinh của doanh nghiệp',
    'Mua ngay'
  ];

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  onSearch() {
    if (this.searchQuery.trim()) {
      // Navigate to search page or filter products
      console.log('Searching for:', this.searchQuery);
      // You can add routing logic here
      // Example: this.router.navigate(['/search'], { queryParams: { q: this.searchQuery } });
    }
  }

  openCart() {
    // Open cart drawer or navigate to cart page
    console.log('Opening cart...');
    // Example: this.router.navigate(['/cart']);
    // or trigger cart drawer/modal
  }

  openDropdown(key: 'giftbox' | 'corporate' | null | undefined) {
    if (key === 'giftbox' || key === 'corporate') {
      this.activeDropdown = key;
    }
  }

  closeDropdown() {
    this.activeDropdown = null;
  }
}
