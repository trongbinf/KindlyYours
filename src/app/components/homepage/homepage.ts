import { Component, CUSTOM_ELEMENTS_SCHEMA, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../../core/header/header';
import { Footer } from '../../core/footer/footer';
import { register } from 'swiper/element/bundle';
import type { SwiperContainer } from 'swiper/element';

register();

@Component({
  selector: 'app-homepage',
  imports: [CommonModule, Header, Footer],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
})
export class Homepage implements AfterViewInit {
  statistics = [
    { quantity: '100', text: 'Món quà' },
    { quantity: '300', text: 'Vật phẩm chọn lựa' },
    { quantity: '6', text: 'Mẫu hộp quà chủ đề' }
  ];

  productImages = [
    'https://api.teamogift.com/uploads/_NH_UP_TRANG_CH_/1726840771402_3.jpg',
    'https://api.teamogift.com/uploads/_NH_UP_TRANG_CH_/1726840771400_0.jpg',
    'https://api.teamogift.com/uploads/_NH_UP_TRANG_CH_/1726840771401_1.jpg',
    'https://api.teamogift.com/uploads/_NH_UP_TRANG_CH_/1726840771402_2.jpg'
  ];

  featuredImages = [
    'https://api.teamogift.com/uploads/_NH_UP_TRANG_CH_/1736921329241_0.jpg',
    'https://api.teamogift.com/uploads/_NH_UP_TRANG_CH_/1736921372822_0.jpg',
    'https://api.teamogift.com/uploads/_NH_UP_TRANG_CH_/1726840604508_0.jpg',
    'https://api.teamogift.com/uploads/_NH_UP_TRANG_CH_/1726840442801_0.jpg',
    'https://api.teamogift.com/uploads/_NH_UP_TRANG_CH_/1726840604510_4.jpg',
    'https://api.teamogift.com/uploads/_NH_UP_TRANG_CH_/1726840604510_3.jpg',
    'https://api.teamogift.com/uploads/_NH_UP_TRANG_CH_/1726840604509_2.jpg',
    'https://api.teamogift.com/uploads/_NH_UP_TRANG_CH_/1726840604509_1.jpg'
  ];

  testimonials = [
    {
      imageUrl: 'https://api.teamogift.com/uploads/1725608766074z5803326466935_91710bf275638497c4cfeb61ee0796d8.jpg',
      name: 'Tô Nguyễn',
      position: 'NV Văn phòng',
      description: 'Nhân viên tư vấn rất nhiệt tình, người yêu mình thích quà kiểu này cực.'
    },
    {
      imageUrl: 'https://api.teamogift.com/uploads/1725608767997z5803326475091_901debdc92b6340f7b36fd8b3d18700a.jpg',
      name: 'Tiến Đạt',
      position: 'Sinh viên',
      description: 'Nhân viên tư vấn rất nhiệt tình, người yêu mình thích quà kiểu này cực.'
    },
    {
      imageUrl: 'https://api.teamogift.com/uploads/1725608770210z5803326479725_88f789b8ea0e1e767a0aa41b3182be8c.jpg',
      name: 'Trần Minh Hiếu',
      position: 'NV Văn phòng',
      description: 'Quà đóng gói siêu cần thận, ship xa cũng không sợ móp nát gì bên trong luôn ý.'
    },
    {
      imageUrl: 'https://api.teamogift.com/uploads/1725608772129z5803326484573_efdbc034bb53b3e29a957899dd4fa1f7.jpg',
      name: 'Dũng Bùi',
      position: 'Sinh viên',
      description: 'Mua ở shop lần thứ 4 rồi, quà đẹp mà rất tiện. Chắc chắn sẽ còn quay lại nhiều lần nữa.'
    }
  ];

  partnerBrands = [
    'https://api.teamogift.com/uploads/LOGO___I_T_C__KHDN/1726802012943.jpg',
    'https://api.teamogift.com/uploads/LOGO___I_T_C__KHDN/1726801948111.jpg',
    'https://api.teamogift.com/uploads/LOGO___I_T_C__KHDN/1726802011145.jpg',
    'https://api.teamogift.com/uploads/LOGO___I_T_C__KHDN/1726801948110.jpg',
    'https://api.teamogift.com/uploads/LOGO___I_T_C__KHDN/1726802009598.jpg',
    'https://api.teamogift.com/uploads/LOGO___I_T_C__KHDN/1726801948115.jpg'
  ];

  heroBannerData = {
    desktopImage: 'https://api.teamogift.com/uploads/KHUNG__NH___CH_T_L__NG_CAO/1761114939853_1.jpg',
    mobileImage: 'https://api.teamogift.com/uploads/KHUNG__NH___CH_T_L__NG_CAO/1761114939846_0.jpg',
    link: 'https://www.teamogift.com/collection'
  };

  newProductData = {
    desktopImage: 'https://api.teamogift.com/uploads/KHUNG__NH___CH_T_L__NG_CAO/1761115032238_0.jpg',
    mobileImage: 'https://api.teamogift.com/uploads/KHUNG__NH___CH_T_L__NG_CAO/1761115088219_0.jpg'
  };

  qrCodeData = {
    desktopImage: 'https://api.teamogift.com/uploads/_NH_UP_TRANG_CH_/1732351150018_0.jpg',
    mobileImage: 'https://api.teamogift.com/uploads/_NH_UP_TRANG_CH_/1732351160057_0.jpg'
  };

  ngAfterViewInit() {
    // Initialize Featured Images Swiper
    const featuredSwiper = document.querySelector('#featured-swiper') as SwiperContainer;
    if (featuredSwiper) {
      featuredSwiper.slidesPerView = 1.7;
      featuredSwiper.spaceBetween = 16;
      featuredSwiper.breakpoints = {
        576: { slidesPerView: 2, spaceBetween: 20 },
        768: { slidesPerView: 3, spaceBetween: 20 },
        1024: { slidesPerView: 4, spaceBetween: 20 }
      };
      featuredSwiper.loop = true;
      featuredSwiper.pagination = { enabled: true };
      featuredSwiper.navigation = { enabled: true };
    }

    // Initialize Partner Brands Swiper
    const brandsSwiper = document.querySelector('#brands-swiper') as SwiperContainer;
    if (brandsSwiper) {
      brandsSwiper.slidesPerView = 2;
      brandsSwiper.spaceBetween = 20;
      brandsSwiper.breakpoints = {
        576: { slidesPerView: 3 },
        768: { slidesPerView: 4 },
        1024: { slidesPerView: 5 },
        1206: { slidesPerView: 6 }
      };
      brandsSwiper.loop = true;
      brandsSwiper.pagination = { enabled: true };
      brandsSwiper.navigation = { enabled: true };
    }
  }
}
