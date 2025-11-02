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

  hotline = '0368.598.286';
  address = '126 Hạ Hội, Tân Lập, Đan Phượng, Hà Nội';
  email = 'cskh.teamogift@gmail.com';
  
  socialMedia = {
    facebook: 'https://www.facebook.com/teamogift.official',
    instagram: 'https://www.instagram.com/teamogift',
    tiktok: 'https://www.tiktok.com/@teamogiftofficial'
  };

  zalo = '0368598286';
  messengerId = 'teamogift.official';

  quickLinks = [
    { href: '/', label: 'Trang chủ' },
    { href: '/collection', label: 'Bộ sưu tập' },
    { href: '/gift-box-available', label: 'Hộp quà có sẵn' },
    { href: '/create-gift-box', label: 'Tự làm hộp quà' },
    { href: '/corporate-gifts', label: 'Quà tặng doanh nghiệp' },
    { href: '/about', label: 'Giới thiệu' }
  ];
}
