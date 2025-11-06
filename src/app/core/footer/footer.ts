import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  currentYear = new Date().getFullYear();

  hotline = '039 541 4344';
  address = '125 Hoàng Ngân, Thanh Xuân, Hà Nội, Vietnam';
  email = 'kindlyyours.official@gmail.com';
  
  socialMedia = {
    facebook: 'https://www.facebook.com/kindlyyours.official',
    instagram: 'https://www.instagram.com/kindlyyours.official',
    tiktok: 'https://www.tiktok.com/@kindlyyours.official'
  };

  zalo = '0395414344';
  messengerId = 'kindlyyours.official';

  quickLinks = [
    { href: '/', label: 'Trang chủ' },
    { href: '/collection', label: 'Bộ sưu tập' },
    { href: '/gift-box-available', label: 'Hộp quà có sẵn' },
    { href: '/create-gift-box', label: 'Tự làm hộp quà' },
    { href: '/corporate-gifts', label: 'Quà tặng doanh nghiệp' },
    { href: '/about', label: 'Giới thiệu' }
  ];

  openChatbot(event: Event) {
    event.preventDefault();
    // TODO: Implement chatbot opening logic
    // For now, you can add your chatbot widget initialization here
    console.log('Chatbot clicked');
  }
}
