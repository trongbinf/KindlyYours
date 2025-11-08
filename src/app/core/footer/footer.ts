import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Chatbot } from '../../components/chatbot/chatbot';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, RouterModule, Chatbot],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  currentYear = new Date().getFullYear();

  hotline = '039 541 4344';
  address = '125 Hoàng Ngân, Thanh Xuân, Hà Nội, Vietnam';
  email = 'kindlyyours.official@gmail.com';
  
  socialMedia = {
    facebook: 'https://www.facebook.com/profile.php?id=61582666884768',
    instagram: 'https://www.instagram.com/kindlyyours.official',
    tiktok: 'https://www.tiktok.com/@kindly_yours?_r=1&_t=ZS-91Dmh4Rnl81',
    messenger: 'https://m.me/836206576242335',
    zalo: 'https://zalo.me/0395414344'
  };

  zalo = '0395414344';
  messengerId = '836206576242335';

  quickLinks = [
    { href: '/', label: 'Trang chủ' },
    { href: '/collection', label: 'Bộ sưu tập' },
    { href: '/gift-box-available', label: 'Hộp quà có sẵn' },
    { href: '/create-gift-box', label: 'Tự làm hộp quà' },
    { href: '/corporate-gifts', label: 'Quà tặng doanh nghiệp' },
    { href: '/about', label: 'Giới thiệu' }
  ];
}
