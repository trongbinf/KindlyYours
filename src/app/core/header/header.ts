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

  hotline = '0368.598.286';
  address = '126 Hạ Hội, Tân Lập, Đan Phượng, Hà Nội';
  
  socialMedia = {
    facebook: 'https://www.facebook.com/teamogift.official',
    instagram: 'https://www.instagram.com/teamogift',
    tiktok: 'https://www.tiktok.com/@teamogiftofficial'
  };

  navLinks = [
    { href: '/', label: 'Trang chủ', hasDropdown: false },
    { href: '/collection', label: 'GIFT BOX', hasDropdown: true },
    { href: '/corporate-gifts', label: 'Quà tặng doanh nghiệp', hasDropdown: false },
    { href: '/about', label: 'Giới thiệu', hasDropdown: false },
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
}
