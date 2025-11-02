import { Component, CUSTOM_ELEMENTS_SCHEMA, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Header } from '../../core/header/header';
import { Footer } from '../../core/footer/footer';
import { register } from 'swiper/element/bundle';
import type { SwiperContainer } from 'swiper/element';

register();

@Component({
  selector: 'app-homepage',
  imports: [CommonModule, FormsModule, Header, Footer],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
})
export class Homepage implements AfterViewInit {
  selectedPrice = '';
  selectedRecipient = '';
  selectedCatalog = '';
  selectedSort = 'best-selling';
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
    'https://api.teamogift.com/uploads/_NH_UP_TRANG_CH_/1726840604509_1.jpg',
    'https://api.teamogift.com/uploads/Gi_i_thi_u/1726843716681_0.jpg'
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

  heroBanners = [
    {
      desktopImage: 'https://api.teamogift.com/uploads/KHUNG__NH___CH_T_L__NG_CAO/1761114939853_1.jpg',
      mobileImage: 'https://api.teamogift.com/uploads/KHUNG__NH___CH_T_L__NG_CAO/1761114939846_0.jpg',
      link: 'https://www.teamogift.com/collection'
    },
    {
      desktopImage: 'https://api.teamogift.com/uploads/Gi_i_thi_u/1726843716681_0.jpg',
      mobileImage: 'https://api.teamogift.com/uploads/Gi_i_thi_u/1726843716681_0.jpg',
      link: 'https://www.teamogift.com/about'
    }
  ];

  newProductData = {
    desktopImage: 'https://api.teamogift.com/uploads/KHUNG__NH___CH_T_L__NG_CAO/1761115032238_0.jpg',
    mobileImage: 'https://api.teamogift.com/uploads/KHUNG__NH___CH_T_L__NG_CAO/1761115088219_0.jpg'
  };

  qrCodeData = {
    desktopImage: 'https://api.teamogift.com/uploads/_NH_UP_TRANG_CH_/1732351150018_0.jpg',
    mobileImage: 'https://api.teamogift.com/uploads/_NH_UP_TRANG_CH_/1732351160057_0.jpg'
  };

  ngAfterViewInit() {
    // Đợi một chút để đảm bảo DOM đã render
    setTimeout(() => {
      // Initialize Hero Banner Swiper with Autoplay
      const heroSwiper = document.querySelector('#hero-swiper') as SwiperContainer;
      if (heroSwiper) {
        heroSwiper.slidesPerView = 1;
        heroSwiper.spaceBetween = 0;
        heroSwiper.speed = 1000;
        heroSwiper.loop = true;
        
        // Cấu hình autoplay để tự động chạy
        heroSwiper.autoplay = {
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        };
        
        // Set pagination và navigation
        heroSwiper.pagination = { enabled: true };
        heroSwiper.navigation = { enabled: true };
        
        // Khởi tạo Swiper
        heroSwiper.initialize();
      }

      // Initialize Featured Images Swiper with Autoplay
      const featuredSwiper = document.querySelector('#featured-swiper') as SwiperContainer;
      if (featuredSwiper) {
        // Detect screen width để set slidesPerView phù hợp
        const screenWidth = window.innerWidth;
        let initialSlidesPerView = 2;
        
        if (screenWidth >= 1280) {
          initialSlidesPerView = 5;
        } else if (screenWidth >= 1024) {
          initialSlidesPerView = 4;
        } else if (screenWidth >= 768) {
          initialSlidesPerView = 3;
        } else if (screenWidth >= 576) {
          initialSlidesPerView = 2;
        }
        
        // Set các thuộc tính trực tiếp trên object
        featuredSwiper.slidesPerView = initialSlidesPerView;
        featuredSwiper.spaceBetween = 20;
        featuredSwiper.speed = 1000;
        featuredSwiper.loop = true;
        
        // Set breakpoints - hiển thị 4-5 ảnh trên desktop
        featuredSwiper.breakpoints = {
          576: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 20 },
          1024: { slidesPerView: 4, spaceBetween: 20 },
          1280: { slidesPerView: 5, spaceBetween: 20 }
        };
        
        // Cấu hình autoplay để tự động chạy mượt
        featuredSwiper.autoplay = {
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        };
        
        // Set pagination (giữ pagination dots)
        featuredSwiper.pagination = { enabled: true };
        // Tắt navigation buttons (next/prev)
        featuredSwiper.navigation = { enabled: false };
        
        // Khởi tạo Swiper
        featuredSwiper.initialize();
      }

      // Initialize Partner Brands Swiper with Autoplay
      const brandsSwiper = document.querySelector('#brands-swiper') as SwiperContainer;
      if (brandsSwiper) {
        // Detect screen width để set slidesPerView phù hợp
        const screenWidth = window.innerWidth;
        let initialSlidesPerView = 2;
        
        if (screenWidth >= 1206) {
          initialSlidesPerView = 6;
        } else if (screenWidth >= 1024) {
          initialSlidesPerView = 5;
        } else if (screenWidth >= 768) {
          initialSlidesPerView = 4;
        } else if (screenWidth >= 576) {
          initialSlidesPerView = 3;
        }
        
        // Set các thuộc tính trực tiếp trên object
        brandsSwiper.slidesPerView = initialSlidesPerView;
        brandsSwiper.spaceBetween = 20;
        brandsSwiper.speed = 1000; // Animation mượt
        brandsSwiper.loop = true;
        
        // Set breakpoints
        brandsSwiper.breakpoints = {
          576: { slidesPerView: 3, spaceBetween: 20 },
          768: { slidesPerView: 4, spaceBetween: 20 },
          1024: { slidesPerView: 5, spaceBetween: 20 },
          1206: { slidesPerView: 6, spaceBetween: 20 }
        };
        
        // Cấu hình autoplay để tự động chạy mượt
        brandsSwiper.autoplay = {
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        };
        
        // Set pagination (giữ pagination dots)
        brandsSwiper.pagination = { enabled: true };
        // Tắt navigation buttons (next/prev)
        brandsSwiper.navigation = { enabled: false };
        
        // Khởi tạo Swiper
        brandsSwiper.initialize();
      }
    }, 100);
  }
}
