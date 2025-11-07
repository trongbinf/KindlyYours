import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Header } from '../../core/header/header';
import { Footer } from '../../core/footer/footer';
import { ProvincesService, Province, District, Ward } from '../../services/provinces/provinces.service';
import Swal from 'sweetalert2';

interface CheckoutItem {
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule, Header, Footer],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class CheckoutPage implements OnInit {
  customer = {
    name: '',
    phone: '',
    email: '',
    address: '',
    province: '',
    district: '',
    ward: '',
    note: ''
  };

  checkoutData = history.state || {};

  provinces: Province[] = [];
  districts: District[] = [];
  wards: Ward[] = [];
  
  selectedProvinceCode: number | null = null;
  selectedDistrictCode: number | null = null;

  get items(): CheckoutItem[] {
    const box = this.checkoutData.box
      ? [{ name: this.checkoutData.box.name, quantity: 1, price: this.checkoutData.box.price || 0, image: this.checkoutData.box.image }]
      : [];
    const products: CheckoutItem[] = (this.checkoutData.items || []).map((it: any) => ({
      name: it.product?.name || 'Sản phẩm',
      quantity: it.quantity || 1,
      price: it.product?.price || 0,
      image: it.product?.images?.[0] || ''
    }));
    return [...box, ...products];
  }

  get subtotal(): number {
    if (typeof this.checkoutData.subtotal === 'number') return this.checkoutData.subtotal;
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  shippingFee = 35000;

  constructor(private provincesService: ProvincesService, private router: Router) {}

  ngOnInit() {
    window.scrollTo(0, 0);
    
    // Validate: kiểm tra xem có items không
    if (!this.checkoutData.box && (!this.checkoutData.items || this.checkoutData.items.length === 0)) {
      Swal.fire({
        icon: 'warning',
        title: 'Chưa có sản phẩm',
        text: 'Vui lòng chọn sản phẩm trước khi thanh toán.',
        confirmButtonText: 'Quay lại chọn sản phẩm',
        confirmButtonColor: '#B4232C'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/create-gift-box']);
        } else {
          this.router.navigate(['/']);
        }
      });
      return;
    }
    
    this.loadProvinces();
  }

  loadProvinces() {
    this.provincesService.getProvinces().subscribe({
      next: (data) => {
        this.provinces = data;
      },
      error: (err) => {
        console.error('Error loading provinces:', err);
      }
    });
  }

  onProvinceChange() {
    const province = this.provinces.find(p => p.name === this.customer.province);
    if (province) {
      this.selectedProvinceCode = province.code;
      this.customer.district = '';
      this.customer.ward = '';
      this.districts = [];
      this.wards = [];
      
      // Sử dụng districts từ province object nếu có, nếu không thì gọi API
      if (province.districts && province.districts.length > 0) {
        this.districts = province.districts;
      } else {
        this.provincesService.getDistricts(province.code).subscribe({
          next: (data) => {
            this.districts = data;
          },
          error: (err) => {
            console.error('Error loading districts:', err);
          }
        });
      }
    }
  }

  onDistrictChange() {
    const district = this.districts.find(d => d.name === this.customer.district);
    if (district) {
      this.selectedDistrictCode = district.code;
      this.customer.ward = '';
      this.wards = [];
      
      // Luôn gọi API để lấy wards
      this.provincesService.getWards(district.code).subscribe({
        next: (data) => {
          console.log('Wards API response:', data);
          // API trả về District object với property wards là array
          if (data && data.wards && Array.isArray(data.wards) && data.wards.length > 0) {
            this.wards = data.wards;
          } else if (data && Array.isArray(data) && data.length > 0) {
            // Nếu trả về array trực tiếp
            this.wards = data;
          } else if (district.wards && Array.isArray(district.wards) && district.wards.length > 0) {
            // Fallback: dùng wards từ district object
            this.wards = district.wards;
          } else {
            console.warn('No wards found for district:', district, 'Response:', data);
            this.wards = [];
            // Hiển thị thông báo nếu không có xã/phường
            if (data && (!data.wards || data.wards.length === 0)) {
              Swal.fire({
                icon: 'info',
                title: 'Không có xã/phường',
                text: 'Quận/huyện này không có xã/phường. Vui lòng chọn quận/huyện khác.',
                confirmButtonText: 'Đã hiểu',
                confirmButtonColor: '#B4232C'
              });
            }
          }
        },
        error: (err) => {
          console.error('Error loading wards:', err);
          // Fallback: thử dùng wards từ district object nếu có
          if (district.wards && Array.isArray(district.wards) && district.wards.length > 0) {
            this.wards = district.wards;
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Lỗi tải dữ liệu',
              text: 'Không thể tải danh sách xã/phường. Vui lòng thử lại.',
              confirmButtonText: 'Đã hiểu',
              confirmButtonColor: '#B4232C'
            });
          }
        }
      });
    }
  }

  get total(): number {
    return this.subtotal + this.shippingFee;
  }

  placeOrder() {
    // Validate form
    if (!this.customer.name || !this.customer.phone || !this.customer.address || 
        !this.customer.province || !this.customer.district || !this.customer.ward) {
      Swal.fire({
        icon: 'warning',
        title: 'Thiếu thông tin',
        text: 'Vui lòng điền đầy đủ thông tin giao hàng.',
        confirmButtonText: 'Đã hiểu',
        confirmButtonColor: '#B4232C'
      });
      return;
    }

    Swal.fire({
      icon: 'success',
      title: 'Đặt hàng thành công!',
      text: 'Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ liên hệ với bạn sớm nhất có thể.',
      confirmButtonText: 'Đã hiểu',
      confirmButtonColor: '#B4232C'
    }).then(() => {
      this.router.navigate(['/']);
    });
  }
}

