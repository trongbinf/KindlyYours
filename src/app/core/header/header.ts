import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  mobileMenuOpen = false;

  hotline = '0368.598.286';
  address = '126 Hạ Hội, Tân Lập, Đan Phượng, Hà Nội';
  
  socialMedia = {
    facebook: 'https://www.facebook.com/teamogift.official',
    instagram: 'https://www.instagram.com/teamogift',
    tiktok: 'https://www.tiktok.com/@teamogiftofficial'
  };

  navLinks = [
    { href: '/', label: 'Trang chủ', hasDropdown: false },
    { href: '/collection', label: 'Bộ sưu tập', hasDropdown: true },
    { href: '/gift-box-available', label: 'Hộp quà có sẵn', hasDropdown: true },
    { href: '/corporate-gifts', label: 'Quà tặng doanh nghiệp', hasDropdown: false },
    { href: '/about', label: 'Giới thiệu', hasDropdown: false },
  ];

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
}
